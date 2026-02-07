import type { Metadata } from "next";
import { getDepartmentsWithPdfCount } from "@/app/actions/pdfs";
import PdfsUploadClient from "./PdfsUploadClient";

export const metadata: Metadata = {
  title: "Subir PDFs | Misky Admin",
  description: "Sube los PDFs de recetas organizados por departamento.",
};

export default async function AdminPdfsPage() {
  const departments = await getDepartmentsWithPdfCount();

  return <PdfsUploadClient departments={departments} />;
}
