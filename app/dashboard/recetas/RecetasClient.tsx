"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Flame,
  Leaf,
  MapPin,
  Search,
  SlidersHorizontal,
  UtensilsCrossed,
  X,
} from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import type {
  RecipeDetail,
  RecipeForList,
} from "@/app/actions/recetas";

const TYPE_OPTIONS = [
  { value: "all", label: "Todas" },
  { value: "starter", label: "Entrada" },
  { value: "main", label: "Plato principal" },
  { value: "drink", label: "Refresco" },
];

function formatNum(value: string | null): string {
  if (value == null || value === "") return "—";
  return String(value);
}

function RecipeCard({
  recipe,
  onSelect,
}: Readonly<{ recipe: RecipeForList; onSelect: () => void }>) {
  const ingredientsPreview = recipe.ingredientsText
    ? recipe.ingredientsText.slice(0, 100).replace(/;.*$/, "")
    : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left bg-card rounded-2xl border border-card-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
    >
      {recipe.imageUrl ? (
        <div className="relative h-36 sm:h-40 bg-muted overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      ) : (
        <div className="h-24 sm:h-28 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <span className="text-4xl text-muted-foreground">🍽️</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {recipe.typeLabel}
          </span>
          {recipe.departmentName && (
            <span className="px-2 py-1 bg-white/80 rounded-full text-xs font-medium text-secondary border border-card-border">
              {recipe.departmentName}
            </span>
          )}
        </div>
        <h3 className="font-bold text-foreground mb-2">{recipe.name}</h3>
        {ingredientsPreview && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {ingredientsPreview}
            {recipe.ingredientsText && recipe.ingredientsText.length > 100 ? "…" : ""}
          </p>
        )}
      </div>
    </button>
  );
}

function RecetaModalContent({ recipe }: Readonly<{ recipe: RecipeDetail }>) {
  const ingredientsList = recipe.ingredientsText
    ? recipe.ingredientsText
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const preparationSteps = recipe.preparationText
    ? recipe.preparationText
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="space-y-5" id="modal-recipe-title">
      {/* Imagen completa (sin recortar) */}
      {recipe.imageUrl ? (
        <div className="flex min-h-[180px] max-h-[min(55vh,420px)] w-full items-center justify-center overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex aspect-4/3 max-h-52 items-center justify-center rounded-2xl bg-primary/10">
          <span className="text-5xl text-muted-foreground">🍽️</span>
        </div>
      )}

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
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          {recipe.name}
        </h2>
        {recipe.menuName && (
          <p className="mt-1 text-sm text-muted-foreground">
            Parte del menú: {recipe.menuName}
          </p>
        )}
      </div>

      {recipe.nutrition && (
        <section className="rounded-2xl border border-card-border bg-card p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Flame className="h-4 w-4 text-primary" />
            Aporte nutricional por ración
          </h3>
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

      <section className="rounded-2xl border border-card-border bg-card p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Leaf className="h-4 w-4 text-primary" />
          Ingredientes
        </h3>
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

      <section className="rounded-2xl border border-card-border bg-card p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <UtensilsCrossed className="h-4 w-4 text-primary" />
          Preparación
        </h3>
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

function FilterChip({
  label,
  isActive,
  onClick,
}: Readonly<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}>) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        isActive
          ? "bg-primary text-white"
          : "bg-card border border-card-border text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

export default function RecetasClient({
  userName,
  initialRecetas,
  getRecetaById,
}: Readonly<{
  userName: string;
  initialRecetas: RecipeForList[];
  getRecetaById: (id: number) => Promise<RecipeDetail | null>;
}>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState("Todas");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const loadDetail = useCallback(
    async (id: number) => {
      setDetailLoading(true);
      setRecipeDetail(null);
      try {
        const detail = await getRecetaById(id);
        setRecipeDetail(detail ?? null);
      } finally {
        setDetailLoading(false);
      }
    },
    [getRecetaById]
  );

  useEffect(() => {
    if (selectedRecipeId != null) {
      loadDetail(selectedRecipeId);
    } else {
      setRecipeDetail(null);
    }
  }, [selectedRecipeId, loadDetail]);

  const closeModal = useCallback(() => {
    setSelectedRecipeId(null);
  }, []);

  useEffect(() => {
    if (selectedRecipeId == null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedRecipeId, closeModal]);

  const departments = useMemo(() => {
    const set = new Set<string>();
    for (const r of initialRecetas) {
      if (r.departmentName) set.add(r.departmentName);
    }
    return ["Todas", ...Array.from(set).sort()];
  }, [initialRecetas]);

  const filteredRecipes = useMemo(() => {
    return initialRecetas.filter((recipe) => {
      const matchesSearch = recipe.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === "all" || recipe.type === selectedType;
      const matchesDepartment =
        selectedDepartment === "Todas" ||
        recipe.departmentName === selectedDepartment;
      return matchesSearch && matchesType && matchesDepartment;
    });
  }, [initialRecetas, searchQuery, selectedType, selectedDepartment]);

  const activeFiltersCount = [
    selectedType !== "all",
    selectedDepartment !== "Todas",
  ].filter(Boolean).length;

  return (
    <DashboardShell
      userName={userName}
      title="Recetas"
      subtitle="Recetas peruanas saludables de la base de datos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar recetas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-card-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 px-4 rounded-xl border flex items-center gap-2 transition-colors ${
              showFilters || activeFiltersCount > 0
                ? "bg-primary text-white border-primary"
                : "bg-card border-card-border text-muted-foreground hover:border-primary"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-white text-primary text-xs font-bold rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="bg-card rounded-2xl border border-card-border p-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Tipo</p>
              <div className="flex flex-wrap gap-2">
                {TYPE_OPTIONS.map((opt) => (
                  <FilterChip
                    key={opt.value}
                    label={opt.label}
                    isActive={selectedType === opt.value}
                    onClick={() => setSelectedType(opt.value)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Departamento
              </p>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <FilterChip
                    key={dept}
                    label={dept}
                    isActive={selectedDepartment === dept}
                    onClick={() => setSelectedDepartment(dept)}
                  />
                ))}
              </div>
            </div>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedType("all");
                  setSelectedDepartment("Todas");
                }}
                className="w-full py-2 text-sm text-primary hover:text-primary-hover font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          {filteredRecipes.length} recetas encontradas
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={() => setSelectedRecipeId(recipe.id)}
            />
          ))}
        </div>

        {/* Modal receta */}
        {selectedRecipeId != null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-recipe-title"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <div
              className="bg-background rounded-2xl border border-card-border shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-end p-2 border-b border-card-border shrink-0">
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                {detailLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <span className="text-4xl mb-2">🍽️</span>
                    <p className="text-sm">Cargando receta…</p>
                  </div>
                ) : recipeDetail ? (
                  <RecetaModalContent recipe={recipeDetail} />
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    <p>No se pudo cargar la receta.</p>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-2 text-sm text-primary hover:underline"
                    >
                      Cerrar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🍽️</span>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No hay recetas
            </h3>
            <p className="text-muted-foreground">
              Sube PDFs en Admin para cargar recetas o prueba otros filtros.
            </p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
