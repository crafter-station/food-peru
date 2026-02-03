import { exec } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { generateObject } from "ai";
import "dotenv/config";
import { z } from "zod";

const execAsync = promisify(exec);

// Configuration Constants
const PDF_PATH = "recipes.pdf";
const OUTPUT_DIR = "pdf_images";
const JSON_OUTPUT_PATH = "menus.json";
const START_PAGE = 13;
const END_PAGE = 62;

// Define structures for the menu components
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

// Main Schema for the full menu
const MenuSchema = z.object({
	menus: z.array(z.object({
		name: z.string().describe('El título descriptivo completo del menú (ej: "Seco de carne con frejoles...", NO pongas "Almuerzo 1" o "Almuerzo 2", busca el nombre del plato principal o la descripción completa del encabezado)'),
		nutritionalInfo: NutritionalInfoSchema,
		starter: CourseSchema.nullable().describe("Entrada (si existe)"),
		mainCourse: CourseSchema.describe("Plato de Fondo"),
		drink: CourseSchema.nullable().describe("Refresco (si existe)"),
		fruit: z.string().nullable().describe("Fruta o Postre (si existe)"),
	})),
});

type Menu = z.infer<typeof MenuSchema>["menus"][number];

async function main(): Promise<void> {
	console.log(`Processing ${PDF_PATH} (Pages ${START_PAGE}-${END_PAGE})...`);

	try {
		// 1. Ensure output directories exist
		try {
			await fs.access(OUTPUT_DIR);
		} catch {
			await fs.mkdir(OUTPUT_DIR);
		}

		// 3. Convert PDF pages to images using pdftoppm
		console.log(`Converting pages ${START_PAGE}-${END_PAGE} using pdftoppm...`);
		const command = `pdftoppm -png -f ${START_PAGE} -l ${END_PAGE} "${PDF_PATH}" "${path.join(OUTPUT_DIR, "page")}"`;
		await execAsync(command);

		// 4. Read the generated images
		const files = await fs.readdir(OUTPUT_DIR);
		const imageFiles = files.filter((f) => f.endsWith(".png")).sort();

		if (imageFiles.length === 0) {
			throw new Error("No images generated or found");
		}

		console.log(`Found ${imageFiles.length} page images.`);

		const allMenus: Menu[] = [];

		for (let i = 0; i < imageFiles.length; i += 2) {
			const file1 = imageFiles[i];
			const file2 = imageFiles[i + 1];

			console.log(`\n[${i + 1}/${imageFiles.length}] Analyzing pair: ${file1}${file2 ? ` and ${file2}` : ""}...`);

			try {
				const images = [];
				const image1Buffer = await fs.readFile(path.join(OUTPUT_DIR, file1));
				images.push({ type: "image" as const, image: image1Buffer });

				if (file2) {
					const image2Buffer = await fs.readFile(path.join(OUTPUT_DIR, file2));
					images.push({ type: "image" as const, image: image2Buffer });
				}

				const result = await generateObject({
					model: 'anthropic/claude-haiku-4.5',
					schema: MenuSchema,
					messages: [
						{
							role: "system",
							content: "You are an expert at extracting structured nutritional and recipe data from PDF images. You extract all details accurately including names, ingredients, preparation steps, and nutritional values.",
						},
						{
							role: "user",
							content: [
								{ type: "text", text: "These images represent a single lunch menu spread across two pages (one page usually has the name/nutritional info and the other has ingredients/steps). Extract the complete menu data into the provided schema. If you cannot extract data, explain why." },
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

				// Incremental save
				await fs.writeFile(JSON_OUTPUT_PATH, JSON.stringify({ menus: allMenus }, null, 2));
			} catch (error: unknown) {
				console.error(`❌ Error processing pair ${file1}/${file2 || ""}:`);
				if (error instanceof Error) {
					console.error(error.message);
				}
				continue;
			}
		}

		console.log(`\nProcess completed. Data saved to ${JSON_OUTPUT_PATH}. Found ${allMenus.length} menus.`);
	} catch (error: unknown) {
		console.error("An error occurred:", error);
	}
}

main().catch(console.error);
