import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

// Tipos para los campos JSON
export type ChildGroup = {
  ageGroup: string;
  count: number;
};

export type UserPreferencesInsert = typeof userPreferences.$inferInsert;
export type UserPreferencesSelect = typeof userPreferences.$inferSelect;

export const userPreferences = pgTable("user_preferences", {
  // Clerk user ID como primary key
  userId: text("user_id").primaryKey(),

  // Datos del hogar
  householdSize: integer("household_size").notNull().default(4),
  children: json("children").$type<ChildGroup[]>().default([]),

  // Preferencias de cocina
  cookingTime: text("cooking_time").notNull().default("normal"),
  // Valores: 'quick' | 'normal' | 'relaxed' | 'varies'

  // Presupuesto semanal en soles
  weeklyBudget: integer("weekly_budget").notNull().default(200),

  // Lugares de compra (array de IDs)
  shoppingPlaces: json("shopping_places").$type<string[]>().default(["mercado"]),
  // Valores posibles: 'mercado' | 'supermercado' | 'bodega' | 'feria'

  // Restricciones alimentarias (array de IDs)
  restrictions: json("restrictions").$type<string[]>().default([]),
  // Valores posibles: 'ninguna' | 'diabetes' | 'hipertension' | 'gluten' | 'lactosa' | 'vegetariano' | 'vegano' | 'mariscos'

  // Ubicación
  departamento: text("departamento").notNull().default("lima"),

  // Estado del onboarding
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
