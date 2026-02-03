# Scraper Documentation

This project includes a set of scripts to extract recipe data from a PDF and generate a normalized SQL dump for database import.

## Prerequisites

- **Bun**: This project uses Bun for package management and script execution.
- **poppler-utils**: Required for `pdftoppm` (used to convert PDF pages to images).
- **Environment Variables**: Create a `.env` file in the root:
  ```env
  AI_GATEWAY_API_KEY=your_key_here
  # OR if using specific providers
  ANTHROPIC_API_KEY=your_key_here
  GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
  OPENAI_API_KEY=your_key_here
  ```

### 1. Scraping Data
Extracts structured recipe and nutritional data from `recipes.pdf`.
```bash
bun run scrap
```
- **Inputs**: `recipes.pdf`
- **Outputs**: 
  - `pdf_images/`: Temporary directory with page images.
  - `menus.json`: Extracted data in JSON format.
- **Model**: Defaulted to `anthropic/claude-haiku-4.5`.

### 2. Generating SQL
Converts the extracted JSON data into a normalized SQL dump.
```bash
bun run to-sql
```
- **Inputs**: `menus.json`
- **Outputs**: `dump.sql`
- **Tables Created**: `menus`, `menu_nutrition`, `recipes`, `menu_recipes`.

## Project Structure
- `scrap.ts`: Core AI scraping logic.
- `to_normalized_sql.ts`: SQL generation and normalization logic.
- `recipes.pdf`: Source PDF file (not tracked in Git).
- `.gitignore`: Configured to ignore generated artifacts (`menus.json`, `dump.sql`, `pdf_images/`).
