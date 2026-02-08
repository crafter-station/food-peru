/** Constantes compartidas para preferencias (onboarding y perfil). */

export const DEPARTAMENTOS = [
  { id: "amazonas", label: "Amazonas" },
  { id: "ancash", label: "Áncash" },
  { id: "apurimac", label: "Apurímac" },
  { id: "arequipa", label: "Arequipa" },
  { id: "ayacucho", label: "Ayacucho" },
  { id: "cajamarca", label: "Cajamarca" },
  { id: "callao", label: "Callao" },
  { id: "cusco", label: "Cusco" },
  { id: "huancavelica", label: "Huancavelica" },
  { id: "huanuco", label: "Huánuco" },
  { id: "ica", label: "Ica" },
  { id: "junin", label: "Junín" },
  { id: "la-libertad", label: "La Libertad" },
  { id: "lambayeque", label: "Lambayeque" },
  { id: "lima", label: "Lima" },
  { id: "loreto", label: "Loreto" },
  { id: "madre-de-dios", label: "Madre de Dios" },
  { id: "moquegua", label: "Moquegua" },
  { id: "pasco", label: "Pasco" },
  { id: "piura", label: "Piura" },
  { id: "puno", label: "Puno" },
  { id: "san-martin", label: "San Martín" },
  { id: "tacna", label: "Tacna" },
  { id: "tumbes", label: "Tumbes" },
  { id: "ucayali", label: "Ucayali" },
] as const;

export const COOKING_TIMES = [
  { id: "quick", label: "Poco tiempo", description: "15-20 minutos" },
  { id: "normal", label: "Normal", description: "30-45 min" },
  { id: "relaxed", label: "Con calma", description: "1 hora o más" },
  { id: "varies", label: "Depende del día", description: "Varía" },
] as const;

export const SHOPPING_PLACES = [
  { id: "mercado", label: "Mercado" },
  { id: "supermercado", label: "Supermercado" },
  { id: "bodega", label: "Bodega" },
  { id: "feria", label: "Feria / Paradita" },
] as const;

export const DIETARY_RESTRICTIONS = [
  { id: "ninguna", label: "Ninguna" },
  { id: "diabetes", label: "Diabetes" },
  { id: "hipertension", label: "Hipertensión" },
  { id: "gluten", label: "Sin gluten" },
  { id: "lactosa", label: "Sin lactosa" },
  { id: "vegetariano", label: "Vegetariano" },
  { id: "vegano", label: "Vegano" },
  { id: "mariscos", label: "Sin mariscos" },
] as const;

export const CHILD_AGE_GROUPS = [
  { id: "babies", label: "Bebés (0-2 años)" },
  { id: "toddlers", label: "Niños pequeños (3-6)" },
  { id: "schoolers", label: "Escolares (7-12)" },
  { id: "teens", label: "Adolescentes (13-17)" },
] as const;

export function getDepartmentLabel(id: string): string {
  return DEPARTAMENTOS.find((d) => d.id === id)?.label ?? id;
}

export function getCookingTimeLabel(id: string): string {
  return COOKING_TIMES.find((t) => t.id === id)?.label ?? id;
}

export function getShoppingPlaceLabel(id: string): string {
  return SHOPPING_PLACES.find((p) => p.id === id)?.label ?? id;
}

export function getRestrictionLabel(id: string): string {
  return DIETARY_RESTRICTIONS.find((r) => r.id === id)?.label ?? id;
}
