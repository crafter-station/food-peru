import fs from "node:fs/promises";

// Configuration Constants
const INPUT_JSON_PATH = "menus.json";
const OUTPUT_SQL_PATH = "dump.sql";

interface NutritionalInfo {
  energy: string;
  protein: string;
  carbohydrates: string;
  iron: string;
  vitaminA: string;
  zinc: string;
}

interface Recipe {
  name: string;
  ingredients: string[];
  preparation: string[];
}

interface MenuData {
  name: string;
  nutritionalInfo: NutritionalInfo;
  starter: Recipe | null;
  mainCourse: Recipe;
  drink: Recipe | null;
  fruit: string | null;
}

interface RootData {
  menus: MenuData[];
}

async function generateSQL(): Promise<void> {
  try {
    const jsonContent = await fs.readFile(INPUT_JSON_PATH, "utf-8");
    const data: RootData = JSON.parse(jsonContent);

    let sql = `-- Database Migration: Normalized Menus (Bulk Insert Version)\n\n`;

    // 1. Cleanup and DDL
    sql += `DROP TABLE IF EXISTS menu_recipes CASCADE;\n`;
    sql += `DROP TABLE IF EXISTS recipes CASCADE;\n`;
    sql += `DROP TABLE IF EXISTS menu_nutrition CASCADE;\n`;
    sql += `DROP TABLE IF EXISTS menus CASCADE;\n`;
    sql += `DROP TYPE IF EXISTS recipe_type CASCADE;\n\n`;

    sql += `CREATE TYPE recipe_type AS ENUM ('starter', 'main', 'drink');\n\n`;

    sql += `CREATE TABLE menus (\n    id SERIAL PRIMARY KEY,\n    menu_name TEXT NOT NULL,\n    fruit TEXT\n);\n\n`;

    sql += `CREATE TABLE menu_nutrition (\n    menu_id INTEGER PRIMARY KEY REFERENCES menus(id) ON DELETE CASCADE,\n    energy_kcal NUMERIC,\n    protein_g NUMERIC,\n    carbs_g NUMERIC,\n    iron_mg NUMERIC,\n    vitamin_a_ug NUMERIC,\n    zinc_mg NUMERIC\n);\n\n`;

    sql += `CREATE TABLE recipes (\n    id SERIAL PRIMARY KEY,\n    name TEXT NOT NULL,\n    type recipe_type NOT NULL,\n    ingredients_text TEXT,\n    preparation_text TEXT\n);\n\n`;

    sql += `CREATE TABLE menu_recipes (\n    menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,\n    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,\n    type recipe_type NOT NULL,\n    PRIMARY KEY (menu_id, type)\n);\n\n`;

    const parseNum = (str: string | undefined): string => {
      if (!str) return "NULL";
      const match = str.match(/[0-9.]+/);
      return match ? match[0] : "NULL";
    };

    const escapeStr = (str: string | null): string => {
      if (!str) return "NULL";
      return `'${str.replace(/'/g, "''")}'`;
    };

    const menusRows: string[] = [];
    const nutritionRows: string[] = [];
    const recipeRows: string[] = [];
    const menuRecipeRows: string[] = [];

    const recipeMap = new Map<string, number>();
    let recipeIdCounter = 1;

    for (let i = 0; i < data.menus.length; i++) {
      const menu = data.menus[i];
      const menuId = i + 1;

      menusRows.push(`(${menuId}, ${escapeStr(menu.name)}, ${escapeStr(menu.fruit)})`);

      const n = menu.nutritionalInfo;
      nutritionRows.push(
        `(${menuId}, ${parseNum(n.energy)}, ${parseNum(n.protein)}, ${parseNum(n.carbohydrates)}, ${parseNum(n.iron)}, ${parseNum(n.vitaminA)}, ${parseNum(n.zinc)})`,
      );

      const processRecipe = (recipeData: Recipe | null, type: string) => {
        if (!recipeData) return;

        const key = `${recipeData.name}|${type}`;
        let rId: number;

        if (recipeMap.has(key)) {
          rId = recipeMap.get(key)!;
        } else {
          rId = recipeIdCounter++;
          recipeMap.set(key, rId);
          recipeRows.push(
            `(${rId}, ${escapeStr(recipeData.name)}, '${type}', ${escapeStr(recipeData.ingredients.join("; "))}, ${escapeStr(recipeData.preparation.join("; "))})`,
          );
        }

        menuRecipeRows.push(`(${menuId}, ${rId}, '${type}')`);
      };

      processRecipe(menu.starter, "starter");
      processRecipe(menu.mainCourse, "main");
      processRecipe(menu.drink, "drink");
    }

    // Bulk Inserts
    sql += `INSERT INTO menus (id, menu_name, fruit) VALUES\n${menusRows.join(",\n")};\n\n`;
    sql += `INSERT INTO menu_nutrition (menu_id, energy_kcal, protein_g, carbs_g, iron_mg, vitamin_a_ug, zinc_mg) VALUES\n${nutritionRows.join(",\n")};\n\n`;
    sql += `INSERT INTO recipes (id, name, type, ingredients_text, preparation_text) VALUES\n${recipeRows.join(",\n")};\n\n`;
    sql += `INSERT INTO menu_recipes (menu_id, recipe_id, type) VALUES\n${menuRecipeRows.join(",\n")};\n\n`;

    // Reset sequences
    sql += `SELECT setval('menus_id_seq', (SELECT MAX(id) FROM menus));\n`;
    sql += `SELECT setval('recipes_id_seq', (SELECT MAX(id) FROM recipes));\n`;

    await fs.writeFile(OUTPUT_SQL_PATH, sql);
    console.log("✅ dump.sql generated successfully with bulk inserts!");
  } catch (error: unknown) {
    console.error("❌ Error generating SQL:", error);
  }
}

generateSQL().catch(console.error);
