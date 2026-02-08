import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { pdfDocuments } from "./pdf-documents";

export const recipeTypeEnum = pgEnum("recipe_type", [
  "starter",
  "main",
  "drink",
]);

export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  pdfDocumentId: integer("pdf_document_id")
    .notNull()
    .references(() => pdfDocuments.id, { onDelete: "cascade" }),
  menuName: text("menu_name").notNull(),
  fruit: text("fruit"),
  imageUrl: text("image_url"),
});

export const menuNutrition = pgTable("menu_nutrition", {
  menuId: integer("menu_id")
    .primaryKey()
    .references(() => menus.id, { onDelete: "cascade" }),
  energyKcal: numeric("energy_kcal", { precision: 10, scale: 2 }),
  proteinG: numeric("protein_g", { precision: 10, scale: 2 }),
  carbsG: numeric("carbs_g", { precision: 10, scale: 2 }),
  ironMg: numeric("iron_mg", { precision: 10, scale: 2 }),
  vitaminAUg: numeric("vitamin_a_ug", { precision: 10, scale: 2 }),
  zincMg: numeric("zinc_mg", { precision: 10, scale: 2 }),
});

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: recipeTypeEnum("type").notNull(),
  ingredientsText: text("ingredients_text"),
  preparationText: text("preparation_text"),
});

export const menuRecipes = pgTable(
  "menu_recipes",
  {
    menuId: integer("menu_id")
      .notNull()
      .references(() => menus.id, { onDelete: "cascade" }),
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    type: recipeTypeEnum("type").notNull(),
  },
  (t) => [primaryKey({ columns: [t.menuId, t.type] })]
);

export type MenuInsert = typeof menus.$inferInsert;
export type MenuSelect = typeof menus.$inferSelect;
export type MenuNutritionInsert = typeof menuNutrition.$inferInsert;
export type RecipeInsert = typeof recipes.$inferInsert;
export type RecipeSelect = typeof recipes.$inferSelect;
export type MenuRecipeInsert = typeof menuRecipes.$inferInsert;
