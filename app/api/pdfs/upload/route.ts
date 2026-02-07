import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { db } from "@/db";
import { departments } from "@/db/schema/departments";
import { pdfDocuments } from "@/db/schema/pdf-documents";
import { eq } from "drizzle-orm";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "pdfs");
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

async function ensureUploadDir(slug: string): Promise<string> {
  const dir = path.join(UPLOAD_DIR, slug);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

function generateFileName(originalName: string): string {
  const ext = path.extname(originalName);
  const base = path
    .basename(originalName, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .substring(0, 50);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${base}_${timestamp}_${random}${ext}`;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const departmentId = formData.get("departmentId");
    const files = formData.getAll("files") as File[];

    if (!departmentId || typeof departmentId !== "string") {
      return NextResponse.json(
        { success: false, uploaded: 0, errors: ["Departamento no seleccionado."] },
        { status: 400 }
      );
    }

    const deptId = parseInt(departmentId, 10);
    if (isNaN(deptId)) {
      return NextResponse.json(
        { success: false, uploaded: 0, errors: ["ID de departamento inválido."] },
        { status: 400 }
      );
    }

    const dept = await db.query.departments.findFirst({
      where: eq(departments.id, deptId),
    });

    if (!dept) {
      return NextResponse.json(
        { success: false, uploaded: 0, errors: ["Departamento no encontrado."] },
        { status: 404 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, uploaded: 0, errors: ["No se seleccionaron archivos."] },
        { status: 400 }
      );
    }

    const dir = await ensureUploadDir(dept.slug);
    const errors: string[] = [];
    let uploaded = 0;

    for (const file of files) {
      if (file.type !== "application/pdf") {
        errors.push(`"${file.name}" no es un archivo PDF.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`"${file.name}" excede el límite de 50MB.`);
        continue;
      }

      try {
        const fileName = generateFileName(file.name);
        const filePath = path.join(dir, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        await db.insert(pdfDocuments).values({
          departmentId: deptId,
          originalName: file.name,
          fileName,
          filePath: path.relative(process.cwd(), filePath),
          fileSize: file.size,
          status: "pending",
        });

        uploaded++;
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Error desconocido";
        errors.push(`Error subiendo "${file.name}": ${msg}`);
      }
    }

    return NextResponse.json({ success: uploaded > 0, uploaded, errors });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { success: false, uploaded: 0, errors: [msg] },
      { status: 500 }
    );
  }
}
