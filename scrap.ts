import { exec } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { promisify } from "node:util";
import { generateObject } from "ai";
import "dotenv/config";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { pdfDocuments } from "@/db/schema";
import { getPdftoppmPath } from "@/lib/pdftoppm-path";

const execAsync = promisify(exec);

const DEFAULT_PDF_INPUT = "recipes.pdf";
const DOWNLOADS_DIR = "downloads";
const PDF_IMAGES_BASE = "pdf_images";
const JSON_OUTPUT_PATH = "menus.json";
const DEFAULT_START_PAGE = 13;
const DEFAULT_END_PAGE = 62;

type RecipeType = "starter" | "main" | "drink";

function parseCliArgs(): {
	input: string;
	startPage: number;
	endPage: number;
	docId: number | null;
} {
	const args = process.argv.slice(2);
	let input = DEFAULT_PDF_INPUT;
	let startPage = DEFAULT_START_PAGE;
	let endPage = DEFAULT_END_PAGE;
	let docId: number | null = null;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === "--doc-id" && args[i + 1]) {
			docId = parseInt(args[i + 1], 10);
			if (isNaN(docId)) docId = null;
			i++;
		} else if (args[i] === "--start" && args[i + 1]) {
			startPage = parseInt(args[i + 1], 10);
			i++;
		} else if (args[i] === "--end" && args[i + 1]) {
			endPage = parseInt(args[i + 1], 10);
			i++;
		} else if (args[i] === "--input" && args[i + 1]) {
			input = args[i + 1];
			i++;
		} else if (!args[i].startsWith("--")) {
			input = args[i];
		}
	}

	return { input, startPage, endPage, docId };
}

function sanitizeDocId(name: string): string {
	return name.replace(/[^a-zA-Z0-9-_]/g, "_").substring(0, 80) || `doc_${Date.now()}`;
}

/** Normaliza texto con LaTeX/símbolos a texto plano (ingredientes, preparación). */
function normalizeRecipeText(s: string): string {
	if (!s || typeof s !== "string") return "";
	let t = s
		.replace(/\$[^$]*\$/g, " ")
		.replace(/\\[a-zA-Z]+\s*(\{[^}]*\})?/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	return t;
}

/** Convierte array de strings (ingredientes o pasos) a texto normalizado unido. */
function toNormalizedText(arr: string[]): string {
	if (!Array.isArray(arr)) return "";
	return arr.map((x) => normalizeRecipeText(String(x))).filter(Boolean).join("; ");
}

/** Extrae el primer número de una cadena para valores nutricionales. */
function parseNum(str: string | undefined): string | null {
	if (!str) return null;
	const match = String(str).match(/[0-9.]+/);
	return match ? match[0] : null;
}

/**
 * Resuelve el PDF a una ruta local. Si es URL, descarga a DOWNLOADS_DIR.
 */
async function getPdfPath(input: string): Promise<{ pdfPath: string; docId: string }> {
	const isUrl = input.startsWith("http://") || input.startsWith("https://");

	if (isUrl) {
		const res = await fetch(input);
		if (!res.ok) {
			throw new Error(`Failed to download PDF: ${res.status} ${res.statusText}`);
		}
		const buffer = Buffer.from(await res.arrayBuffer());
		await fs.mkdir(DOWNLOADS_DIR, { recursive: true });
		const urlPath = new URL(input).pathname;
		const suggestedName = path.basename(urlPath) || "downloaded.pdf";
		const baseName = path.basename(suggestedName, path.extname(suggestedName)) || "document";
		const fileName = `${sanitizeDocId(baseName)}_${Date.now()}.pdf`;
		const pdfPath = path.join(process.cwd(), DOWNLOADS_DIR, fileName);
		await fs.writeFile(pdfPath, buffer);
		return { pdfPath, docId: sanitizeDocId(baseName) };
	}

	const pdfPath = path.resolve(process.cwd(), input);
	const docId = sanitizeDocId(path.basename(input, path.extname(input)) || "document");
	return { pdfPath, docId };
}

const CourseSchema = z.object({
	name: z.string().describe("Nombre del plato"),
	ingredients: z.array(z.string()).describe("Lista de ingredientes"),
	preparation: z.array(z.string()).describe("Pasos de preparación"),
});

const NutritionalInfoSchema = z.object({
	energy: z.string().describe("Energía (Kcal)"),
	protein: z.string().describe("Proteínas (g)"),
	carbohydrates: z.string().describe("Carbohidratos (g)"),
	iron: z.string().describe("Hierro (mg)"),
	vitaminA: z.string().describe("Vitamina A (µg retinol)"),
	zinc: z.string().describe("Zinc (mg)"),
});

const MenuSchema = z.object({
	menus: z.array(
		z.object({
			name: z
				.string()
				.describe(
					'El título descriptivo completo del menú (ej: "Seco de carne con frejoles...", NO "Almuerzo 1"). Usa el nombre del plato principal o la descripción completa del encabezado.'
				),
			nutritionalInfo: NutritionalInfoSchema,
			starter: CourseSchema.nullable().describe("Entrada (si existe)"),
			mainCourse: CourseSchema.describe("Plato de Fondo"),
			drink: CourseSchema.nullable().describe("Refresco (si existe)"),
			fruit: z.string().nullable().describe("Fruta o Postre (si existe). Solo el nombre de la fruta, ej: aguaymanto, mandarina."),
		})
	),
});

type Menu = z.infer<typeof MenuSchema>["menus"][number];

async function runWithDocId(docId: number): Promise<void> {
	const { downloadPdfFromStorage } = await import("@/lib/supabase-storage");
	const { runScrapForDoc } = await import("@/lib/scrap-doc");

	const doc = await db.query.pdfDocuments.findFirst({
		where: eq(pdfDocuments.id, docId),
	});

	if (!doc) {
		throw new Error(`Documento con id ${docId} no encontrado.`);
	}

	let pdfPath: string;
	let tmpDir: string | null = null;

	if (doc.storagePath) {
		const buffer = await downloadPdfFromStorage(doc.storagePath);
		tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "scrap-"));
		pdfPath = path.join(tmpDir, "document.pdf");
		await fs.writeFile(pdfPath, buffer);
	} else {
		pdfPath = path.resolve(process.cwd(), doc.filePath);
		const stat = await fs.stat(pdfPath).catch(() => null);
		if (!stat?.isFile()) {
			throw new Error(`Archivo local no encontrado: ${pdfPath}`);
		}
	}

	try {
		await db.update(pdfDocuments).set({ status: "processing" }).where(eq(pdfDocuments.id, docId));
		await runScrapForDoc(docId, pdfPath);
		console.log(`\nProcesamiento terminado. Documento ${docId}: status=done.`);
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		await db
			.update(pdfDocuments)
			.set({ status: "error", errorMessage: msg })
			.where(eq(pdfDocuments.id, docId));
		throw err;
	} finally {
		if (tmpDir) {
			await fs.rm(tmpDir, { recursive: true }).catch(() => {});
		}
	}
}

async function runStandalone(input: string, startPage: number, endPage: number): Promise<void> {
	let pdfPath: string;
	let outputDir: string;

	const resolved = await getPdfPath(input);
	pdfPath = resolved.pdfPath;
	outputDir = path.join(PDF_IMAGES_BASE, resolved.docId);

	await fs.mkdir(outputDir, { recursive: true });

	const pagePrefix = path.join(outputDir, "page");
	const pdftoppm = await getPdftoppmPath();
	const command = `"${pdftoppm}" -png -f ${startPage} -l ${endPage} "${pdfPath}" "${pagePrefix}"`;
	await execAsync(command);

	const files = await fs.readdir(outputDir);
	const imageFiles = files.filter((f) => f.endsWith(".png")).sort();
	if (imageFiles.length === 0) {
		throw new Error("No images generated or found");
	}

	const allMenus: Menu[] = [];

	for (let i = 0; i < imageFiles.length; i += 2) {
		const file1 = imageFiles[i];
		const file2 = imageFiles[i + 1];
		const image1Buffer = await fs.readFile(path.join(outputDir, file1));
		const images: { type: "image"; image: Buffer }[] = [
			{ type: "image", image: image1Buffer },
		];
		if (file2) {
			const image2Buffer = await fs.readFile(path.join(outputDir, file2));
			images.push({ type: "image", image: image2Buffer });
		}

		try {
			const result = await generateObject({
				model: "anthropic/claude-haiku-4.5",
				schema: MenuSchema,
				messages: [
					{
						role: "system",
						content:
							"You are an expert at extracting structured nutritional and recipe data from PDF images. Use plain text only (no LaTeX) for ingredients and preparation.",
					},
					{
						role: "user",
						content: [
							{
								type: "text",
								text: "These images represent a single lunch menu. Extract the complete menu data into the provided schema.",
							},
							...images,
						],
					},
				],
			});
			const menus = result.object.menus;
			allMenus.push(...menus);
			for (const menu of menus) {
				console.log(`✅ Found Menu: ${menu.name}`);
			}
			await fs.writeFile(JSON_OUTPUT_PATH, JSON.stringify({ menus: allMenus }, null, 2));
		} catch (error: unknown) {
			console.error(`❌ Error processing pair ${file1}/${file2 ?? ""}:`, error);
		}
	}

	console.log(`\nData saved to ${JSON_OUTPUT_PATH}. Found ${allMenus.length} menus.`);
}

async function main(): Promise<void> {
	const { input, startPage, endPage, docId } = parseCliArgs();

	if (docId !== null) {
		console.log(`Modo --doc-id: procesando documento ${docId} y guardando en BD + Storage.`);
		try {
			await runWithDocId(docId);
		} catch (err) {
			console.error("Error:", err instanceof Error ? err.message : err);
			process.exit(1);
		}
		return;
	}

	try {
		console.log(`Resolving input: ${input}`);
		await runStandalone(input, startPage, endPage);
	} catch (err) {
		console.error("Failed:", err instanceof Error ? err.message : err);
		process.exit(1);
	}
}

main().catch(console.error);
