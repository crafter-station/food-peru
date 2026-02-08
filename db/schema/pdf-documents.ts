import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const pdfStatusEnum = pgEnum("pdf_status", [
  "pending",
  "processing",
  "done",
  "error",
]);

export type PdfDocumentInsert = typeof pdfDocuments.$inferInsert;
export type PdfDocumentSelect = typeof pdfDocuments.$inferSelect;

export const pdfDocuments = pgTable("pdf_documents", {
  id: serial("id").primaryKey(),

  // Relación con departamento
  departmentId: integer("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),

  // Archivo
  originalName: text("original_name").notNull(),
  fileName: text("file_name").notNull().unique(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(), // bytes
  /** Ruta en Supabase Storage (bucket pdfs). Si existe, el scraper puede leer desde Storage. */
  storagePath: text("storage_path"),

  // Estado del procesamiento (scraping)
  status: pdfStatusEnum("status").notNull().default("pending"),
  errorMessage: text("error_message"),

  // Timestamps
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  processedAt: timestamp("processed_at"),
});
