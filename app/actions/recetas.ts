"use server";

import { db } from "@/db";
import { departments } from "@/db/schema/departments";
import { menuNutrition, menuRecipes, menus } from "@/db/schema/menus";
import { pdfDocuments } from "@/db/schema/pdf-documents";
import { eq, inArray } from "drizzle-orm";

export type RecipeForList = {
  id: number;
  name: string;
  type: "starter" | "main" | "drink";
  typeLabel: string;
  departmentName: string | null;
  imageUrl: string | null;
  ingredientsText: string | null;
  preparationText: string | null;
};

export type RecipeNutrition = {
  energyKcal: string | null;
  proteinG: string | null;
  carbsG: string | null;
  ironMg: string | null;
  vitaminAUg: string | null;
  zincMg: string | null;
};

export type RecipeDetail = RecipeForList & {
  menuName: string | null;
  nutrition: RecipeNutrition | null;
};

const TYPE_LABELS: Record<"starter" | "main" | "drink", string> = {
  starter: "Entrada",
  main: "Plato principal",
  drink: "Refresco",
};

/** Lista todas las recetas desde la BD con departamento (desde el menú donde aparece). */
export async function getRecetas(): Promise<RecipeForList[]> {
  const recipesList = await db.query.recipes.findMany({
    columns: {
      id: true,
      name: true,
      type: true,
      ingredientsText: true,
      preparationText: true,
    },
    orderBy: (r, { asc }) => [asc(r.name)],
  });

  const recipeIds = recipesList.map((r) => r.id);
  if (recipeIds.length === 0) {
    return [];
  }

  const deptRows = await db
    .select({
      recipeId: menuRecipes.recipeId,
      departmentName: departments.name,
    })
    .from(menuRecipes)
    .innerJoin(menus, eq(menus.id, menuRecipes.menuId))
    .innerJoin(pdfDocuments, eq(pdfDocuments.id, menus.pdfDocumentId))
    .innerJoin(departments, eq(departments.id, pdfDocuments.departmentId))
    .where(inArray(menuRecipes.recipeId, recipeIds));

  const imageRows = await db
    .select({
      recipeId: menuRecipes.recipeId,
      imageUrl: menus.imageUrl,
    })
    .from(menuRecipes)
    .innerJoin(menus, eq(menus.id, menuRecipes.menuId))
    .where(inArray(menuRecipes.recipeId, recipeIds));

  const deptByRecipe = new Map<number, string>();
  for (const row of deptRows) {
    if (!deptByRecipe.has(row.recipeId)) {
      deptByRecipe.set(row.recipeId, row.departmentName);
    }
  }

  const imageByRecipe = new Map<number, string | null>();
  for (const row of imageRows) {
    if (!imageByRecipe.has(row.recipeId) && row.imageUrl) {
      imageByRecipe.set(row.recipeId, row.imageUrl);
    }
  }

  return recipesList.map((r) => ({
    id: r.id,
    name: r.name,
    type: r.type,
    typeLabel: TYPE_LABELS[r.type],
    departmentName: deptByRecipe.get(r.id) ?? null,
    imageUrl: imageByRecipe.get(r.id) ?? null,
    ingredientsText: r.ingredientsText ?? null,
    preparationText: r.preparationText ?? null,
  }));
}

/** Obtiene una receta por id con menú y nutrición (de un menú donde aparece). */
export async function getRecetaById(id: number): Promise<RecipeDetail | null> {
  const recipe = await db.query.recipes.findFirst({
    where: (r, { eq }) => eq(r.id, id),
    columns: {
      id: true,
      name: true,
      type: true,
      ingredientsText: true,
      preparationText: true,
    },
  });

  if (!recipe) return null;

  const link = await db
    .select({
      menuName: menus.menuName,
      imageUrl: menus.imageUrl,
      departmentName: departments.name,
      energyKcal: menuNutrition.energyKcal,
      proteinG: menuNutrition.proteinG,
      carbsG: menuNutrition.carbsG,
      ironMg: menuNutrition.ironMg,
      vitaminAUg: menuNutrition.vitaminAUg,
      zincMg: menuNutrition.zincMg,
    })
    .from(menuRecipes)
    .innerJoin(menus, eq(menus.id, menuRecipes.menuId))
    .innerJoin(pdfDocuments, eq(pdfDocuments.id, menus.pdfDocumentId))
    .innerJoin(departments, eq(departments.id, pdfDocuments.departmentId))
    .leftJoin(menuNutrition, eq(menuNutrition.menuId, menus.id))
    .where(eq(menuRecipes.recipeId, id))
    .limit(1)
    .then((rows) => rows[0]);

  return {
    id: recipe.id,
    name: recipe.name,
    type: recipe.type,
    typeLabel: TYPE_LABELS[recipe.type],
    departmentName: link?.departmentName ?? null,
    imageUrl: link?.imageUrl ?? null,
    ingredientsText: recipe.ingredientsText ?? null,
    preparationText: recipe.preparationText ?? null,
    menuName: link?.menuName ?? null,
    nutrition:
      link && (link.energyKcal ?? link.proteinG ?? link.carbsG ?? link.ironMg ?? link.vitaminAUg ?? link.zincMg)
        ? {
            energyKcal: link.energyKcal != null ? String(link.energyKcal) : null,
            proteinG: link.proteinG != null ? String(link.proteinG) : null,
            carbsG: link.carbsG != null ? String(link.carbsG) : null,
            ironMg: link.ironMg != null ? String(link.ironMg) : null,
            vitaminAUg: link.vitaminAUg != null ? String(link.vitaminAUg) : null,
            zincMg: link.zincMg != null ? String(link.zincMg) : null,
          }
        : null,
  };
}
