"use client";

import type { RecipeDetail } from "@/app/actions/recetas";
import { Flame, Leaf, MapPin, UtensilsCrossed } from "lucide-react";

function formatNum(value: string | null): string {
  if (value == null || value === "") return "—";
  return String(value);
}

export default function RecetaDetailClient({
  recipe,
}: Readonly<{ recipe: RecipeDetail }>) {
  const ingredientsList = recipe.ingredientsText
    ? recipe.ingredientsText.split(";").map((s) => s.trim()).filter(Boolean)
    : [];
  const preparationSteps = recipe.preparationText
    ? recipe.preparationText.split(";").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <article className="space-y-6">
      {/* Imagen */}
      {recipe.imageUrl ? (
        <div className="relative aspect-[4/3] max-h-80 w-full overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] max-h-80 items-center justify-center rounded-2xl bg-primary/10">
          <span className="text-6xl text-muted-foreground">🍽️</span>
        </div>
      )}

      {/* Título y meta */}
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {recipe.typeLabel}
          </span>
          {recipe.departmentName && (
            <span className="inline-flex items-center gap-1 rounded-full border border-card-border bg-card px-3 py-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {recipe.departmentName}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {recipe.name}
        </h1>
        {recipe.menuName && (
          <p className="mt-1 text-sm text-muted-foreground">
            Parte del menú: {recipe.menuName}
          </p>
        )}
      </div>

      {/* Aporte nutricional (del menú) */}
      {recipe.nutrition && (
        <section className="rounded-2xl border border-card-border bg-card p-4">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Flame className="h-4 w-4 text-primary" />
            Aporte nutricional por ración
          </h2>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted-foreground">Energía</dt>
              <dd className="font-medium text-foreground">
                {formatNum(recipe.nutrition.energyKcal)} kcal
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Proteínas</dt>
              <dd className="font-medium text-foreground">
                {formatNum(recipe.nutrition.proteinG)} g
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Carbohidratos</dt>
              <dd className="font-medium text-foreground">
                {formatNum(recipe.nutrition.carbsG)} g
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Hierro</dt>
              <dd className="font-medium text-foreground">
                {formatNum(recipe.nutrition.ironMg)} mg
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Vitamina A</dt>
              <dd className="font-medium text-foreground">
                {formatNum(recipe.nutrition.vitaminAUg)} µg
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Zinc</dt>
              <dd className="font-medium text-foreground">
                {formatNum(recipe.nutrition.zincMg)} mg
              </dd>
            </div>
          </dl>
        </section>
      )}

      {/* Ingredientes */}
      <section className="rounded-2xl border border-card-border bg-card p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Leaf className="h-4 w-4 text-primary" />
          Ingredientes
        </h2>
        {ingredientsList.length > 0 ? (
          <ul className="list-inside list-disc space-y-1 text-sm text-foreground">
            {ingredientsList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : recipe.ingredientsText ? (
          <p className="whitespace-pre-wrap text-sm text-foreground">
            {recipe.ingredientsText}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Sin datos.</p>
        )}
      </section>

      {/* Preparación */}
      <section className="rounded-2xl border border-card-border bg-card p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <UtensilsCrossed className="h-4 w-4 text-primary" />
          Preparación
        </h2>
        {preparationSteps.length > 0 ? (
          <ol className="list-inside list-decimal space-y-2 text-sm text-foreground">
            {preparationSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        ) : recipe.preparationText ? (
          <p className="whitespace-pre-wrap text-sm text-foreground">
            {recipe.preparationText}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Sin datos.</p>
        )}
      </section>
    </article>
  );
}
