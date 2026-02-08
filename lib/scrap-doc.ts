import { exec } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { generateObject } from "ai";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  pdfDocuments,
  menus as menusTable,
  menuNutrition,
  recipes as recipesTable,
  menuRecipes,
} from "@/db/schema";
import { getPdftoppmPath } from "@/lib/pdftoppm-path";
import { uploadDishImage } from "@/lib/supabase-storage";

const execAsync = promisify(exec);

const PDF_IMAGES_BASE = "pdf_images";
const DEFAULT_START_PAGE = 13;
const DEFAULT_END_PAGE = 62;

type RecipeType = "starter" | "main" | "drink";

function normalizeRecipeText(s: string): string {
  if (!s || typeof s !== "string") return "";
  return s
    .replace(/\$[^$]*\$/g, " ")
    .replace(/\\[a-zA-Z]+\s*(\{[^}]*\})?/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toNormalizedText(arr: string[]): string {
  if (!Array.isArray(arr)) return "";
  return arr.map((x) => normalizeRecipeText(String(x))).filter(Boolean).join("; ");
}

function parseNum(str: string | undefined): string | null {
  if (!str) return null;
  const match = String(str).match(/[0-9.]+/);
  return match ? match[0] : null;
}

const CourseSchema = z.object({
  name: z.string(),
  ingredients: z.array(z.string()),
  preparation: z.array(z.string()),
});

const NutritionalInfoSchema = z.object({
  energy: z.string(),
  protein: z.string(),
  carbohydrates: z.string(),
  iron: z.string(),
  vitaminA: z.string(),
  zinc: z.string(),
});

const MenuSchema = z.object({
  menus: z.array(
    z.object({
      name: z.string(),
      nutritionalInfo: NutritionalInfoSchema,
      starter: CourseSchema.nullable(),
      mainCourse: CourseSchema,
      drink: CourseSchema.nullable(),
      fruit: z.string().nullable(),
    })
  ),
});

/**
 * Ejecuta el scraping completo para un documento: pdftoppm, extracción con IA,
 * subida de imágenes de platos a Storage e inserción en BD.
 * Al final actualiza status a "done" (o deja "error" si hubo fallo fatal).
 * Lanza error si no se pueden generar imágenes o hay fallo fatal (para que el caller haga rollback).
 */
export async function runScrapForDoc(
  docId: number,
  pdfPath: string
): Promise<void> {
  const outputDir = path.join(process.cwd(), PDF_IMAGES_BASE, `doc_${docId}`);
  await fs.mkdir(outputDir, { recursive: true });

  const startPage = DEFAULT_START_PAGE;
  const endPage = DEFAULT_END_PAGE;
  const pagePrefix = path.join(outputDir, "page");
  const pdftoppm = await getPdftoppmPath();
  const command = `"${pdftoppm}" -png -f ${startPage} -l ${endPage} "${pdfPath}" "${pagePrefix}"`;
  await execAsync(command);

  const files = await fs.readdir(outputDir);
  const imageFiles = files.filter((f) => f.endsWith(".png")).sort();
  if (imageFiles.length === 0) {
    await db
      .update(pdfDocuments)
      .set({ status: "error", errorMessage: "No se generaron imágenes del PDF." })
      .where(eq(pdfDocuments.id, docId));
    throw new Error("No se generaron imágenes del PDF.");
  }

  let globalMenuIndex = 0;
  const pairErrors: string[] = [];

  for (let i = 0; i < imageFiles.length; i += 2) {
    const file1 = imageFiles[i];
    const file2 = imageFiles[i + 1];
    const image1Path = path.join(outputDir, file1);

    try {
      const image1Buffer = await fs.readFile(image1Path);
      const images: { type: "image"; image: Buffer }[] = [
        { type: "image", image: image1Buffer },
      ];
      if (file2) {
        const image2Buffer = await fs.readFile(path.join(outputDir, file2));
        images.push({ type: "image", image: image2Buffer });
      }

      const result = await generateObject({
        model: "anthropic/claude-haiku-4.5",
        schema: MenuSchema,
        messages: [
          {
            role: "system",
            content:
              "You are an expert at extracting structured nutritional and recipe data from PDF images. Extract names, ingredients, preparation steps, and nutritional values. Use plain text only (no LaTeX or math symbols) for ingredients and preparation.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "These images are a single lunch menu (two pages). Extract the complete menu into the schema. Use plain text for ingredients and steps (e.g. 1/2 cup, not LaTeX).",
              },
              ...images,
            ],
          },
        ],
      });

      const menus = result.object.menus;

      for (const menu of menus) {
        const menuIndex = globalMenuIndex++;
        const imageUrl = await uploadDishImage(docId, menuIndex, image1Buffer);

        const n = menu.nutritionalInfo;
        const [menuRow] = await db
          .insert(menusTable)
          .values({
            pdfDocumentId: docId,
            menuName: menu.name,
            fruit: menu.fruit ?? null,
            imageUrl,
          })
          .returning({ id: menusTable.id });

        if (!menuRow) continue;

        const menuId = menuRow.id;
        await db.insert(menuNutrition).values({
          menuId,
          energyKcal: parseNum(n.energy),
          proteinG: parseNum(n.protein),
          carbsG: parseNum(n.carbohydrates),
          ironMg: parseNum(n.iron),
          vitaminAUg: parseNum(n.vitaminA),
          zincMg: parseNum(n.zinc),
        });

        const processRecipe = async (
          recipeData: { name: string; ingredients: string[]; preparation: string[] } | null,
          type: RecipeType
        ) => {
          if (!recipeData) return;
          const ingredientsText = toNormalizedText(recipeData.ingredients);
          const preparationText = toNormalizedText(recipeData.preparation);

          const existing = await db.query.recipes.findFirst({
            where: (r, { and, eq: eqOp }) =>
              and(eqOp(r.name, recipeData.name), eqOp(r.type, type)),
          });

          let recipeId: number;
          if (existing) {
            recipeId = existing.id;
          } else {
            const [inserted] = await db
              .insert(recipesTable)
              .values({
                name: recipeData.name,
                type,
                ingredientsText: ingredientsText || null,
                preparationText: preparationText || null,
              })
              .returning({ id: recipesTable.id });
            recipeId = inserted!.id;
          }

          await db.insert(menuRecipes).values({
            menuId,
            recipeId,
            type,
          });
        };

        await processRecipe(menu.starter, "starter");
        await processRecipe(menu.mainCourse, "main");
        await processRecipe(menu.drink, "drink");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      pairErrors.push(`Par ${file1}/${file2 ?? ""}: ${msg}`);
    }
  }

  const errorMessage =
    pairErrors.length > 0
      ? `${pairErrors.length} par(es) con error. ${pairErrors.slice(0, 2).join("; ")}`
      : null;

  await db
    .update(pdfDocuments)
    .set({
      status: "done",
      processedAt: new Date(),
      errorMessage,
    })
    .where(eq(pdfDocuments.id, docId));
}
