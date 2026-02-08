# Scraper Documentation

Scripts para extraer datos de menús desde PDFs, guardar en Supabase (BD + Storage) y opcionalmente generar JSON/SQL.

## Prerrequisitos

- **Bun**: gestión de paquetes y ejecución.
- **poppler-utils**: para `pdftoppm` (PDF → imágenes). Ej.: `brew install poppler` (macOS), `apt install poppler-utils` (Debian/Ubuntu).
- **Variables de entorno** (`.env`):
  ```env
  AI_GATEWAY_API_KEY=...
  DATABASE_URL=postgresql://...   # Supabase Postgres
  NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=...  # Solo servidor/scripts, nunca en cliente
  ```

## Modos de uso

### 1. Modo `--doc-id` (recomendado para la app)

Procesa un PDF ya registrado en la BD (`pdf_documents`), guarda menús en la BD y sube la imagen del plato a Supabase Storage.

```bash
bun run scrap --doc-id 1
bun run scrap --doc-id 5 --start 13 --end 62
```

- **Entrada**: ID del registro en `pdf_documents`.
- **PDF**: Si el documento tiene `storage_path`, se descarga desde Supabase Storage (bucket `pdfs`). Si no, se usa `file_path` en disco.
- **Salida**:
  - Tablas: `menus` (con `image_url`), `menu_nutrition`, `recipes`, `menu_recipes`.
  - Imágenes de platos en Storage: bucket `dish-images`, ruta `{pdf_document_id}/{índice}.png`.
- El script actualiza `pdf_documents.status` (`processing` → `done` o `error`) y `processed_at` / `error_message`.

### 2. Modo URL o ruta local (sin BD)

Extrae menús y escribe solo `menus.json` (sin BD ni Storage).

```bash
bun run scrap
bun run scrap recipes.pdf
bun run scrap "https://cdn.www.gob.pe/.../recetario.pdf"
bun run scrap "https://..." --start 13 --end 62
```

- **Entrada**: URL (se descarga a `downloads/`) o ruta local.
- **Salida**: `pdf_images/<doc_id>/` (PNG) y `menus.json`.

### 3. Generar SQL desde JSON (legacy)

Si tienes `menus.json` y quieres generar un dump SQL normalizado:

```bash
bun run to-sql
```

- **Entrada**: `menus.json`
- **Salida**: `dump.sql` (tablas `menus`, `menu_nutrition`, `recipes`, `menu_recipes`; sin `pdf_document_id` ni `image_url`).

## Storage (Supabase)

- **Bucket `pdfs`**: PDFs subidos. Ruta: `{department_slug}/{pdf_document_id}_{filename}.pdf`. El upload en la app sube aquí y guarda `storage_path` en `pdf_documents`.
- **Bucket `dish-images`**: Imagen por plato (primer PNG de cada par de páginas). Ruta: `{pdf_document_id}/{menu_index}.png`. Lectura pública para mostrar en la app.

## Estructura del proyecto

- `scrap.ts`: scraping con IA, modo `--doc-id` (BD + Storage) o modo URL/path (solo JSON).
- `to_normalized_sql.ts`: generación de `dump.sql` desde `menus.json`.
- `lib/supabase-storage.ts`: utilidades para subir/descargar en Supabase Storage (service role).
- `.gitignore`: ignora `menus.json`, `dump.sql`, `pdf_images/`, `downloads/`.
