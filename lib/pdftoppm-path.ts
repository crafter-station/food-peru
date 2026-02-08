import fs from "node:fs/promises";

const COMMON_PATHS = [
  "/opt/homebrew/bin/pdftoppm",
  "/usr/local/bin/pdftoppm",
];

/**
 * Devuelve la ruta del binario pdftoppm (poppler).
 * 1. Si PDFTOPPM_PATH está definida, se usa esa.
 * 2. Si no, se buscan rutas típicas de Homebrew.
 * 3. Si no, se devuelve "pdftoppm" (se espera que esté en PATH).
 */
export async function getPdftoppmPath(): Promise<string> {
  const envPath = process.env.PDFTOPPM_PATH;
  if (envPath?.trim()) {
    return envPath.trim();
  }
  for (const p of COMMON_PATHS) {
    try {
      await fs.access(p, fs.constants.X_OK);
      return p;
    } catch {
      // no existe o no ejecutable, siguiente
    }
  }
  return "pdftoppm";
}
