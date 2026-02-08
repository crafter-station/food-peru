import type { Metadata } from "next";
import { getDepartmentsWithPdfCount } from "@/app/actions/pdfs";
import PdfsUploadClient from "./PdfsUploadClient";

/** Scraping puede tardar varios minutos (pdftoppm + IA por cada par de páginas). */
export const maxDuration = 300;

export const metadata: Metadata = {
  title: "Subir PDFs | Misky Admin",
  description: "Sube los PDFs de recetas organizados por departamento.",
};

export default async function AdminPdfsPage() {
  const departments = await getDepartmentsWithPdfCount();

  return <PdfsUploadClient departments={departments} />;
}
