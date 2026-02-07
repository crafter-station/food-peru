import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export type DepartmentInsert = typeof departments.$inferInsert;
export type DepartmentSelect = typeof departments.$inferSelect;

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Los 25 departamentos del Perú + Callao
 * Usar para seed inicial de la tabla departments
 */
export const PERU_DEPARTMENTS = [
  { name: "Amazonas", slug: "amazonas" },
  { name: "Áncash", slug: "ancash" },
  { name: "Apurímac", slug: "apurimac" },
  { name: "Arequipa", slug: "arequipa" },
  { name: "Ayacucho", slug: "ayacucho" },
  { name: "Cajamarca", slug: "cajamarca" },
  { name: "Callao", slug: "callao" },
  { name: "Cusco", slug: "cusco" },
  { name: "Huancavelica", slug: "huancavelica" },
  { name: "Huánuco", slug: "huanuco" },
  { name: "Ica", slug: "ica" },
  { name: "Junín", slug: "junin" },
  { name: "La Libertad", slug: "la-libertad" },
  { name: "Lambayeque", slug: "lambayeque" },
  { name: "Lima", slug: "lima" },
  { name: "Loreto", slug: "loreto" },
  { name: "Madre de Dios", slug: "madre-de-dios" },
  { name: "Moquegua", slug: "moquegua" },
  { name: "Pasco", slug: "pasco" },
  { name: "Piura", slug: "piura" },
  { name: "Puno", slug: "puno" },
  { name: "San Martín", slug: "san-martin" },
  { name: "Tacna", slug: "tacna" },
  { name: "Tumbes", slug: "tumbes" },
  { name: "Ucayali", slug: "ucayali" },
] as const;
