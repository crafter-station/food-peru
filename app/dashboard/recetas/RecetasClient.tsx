"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  Flame,
  Heart,
  ChevronDown,
  X,
  SlidersHorizontal,
} from "lucide-react";
import DashboardShell from "../components/DashboardShell";

// Types
interface Recipe {
  id: string;
  name: string;
  emoji: string;
  region: string;
  time: string;
  difficulty: "Fácil" | "Medio" | "Elaborado";
  cost: number;
  calories: number;
  tags: string[];
  isFavorite: boolean;
}

// Mock data
const MOCK_RECIPES: Recipe[] = [
  { id: "1", name: "Ají de Gallina", emoji: "🍲", region: "Lima", time: "45 min", difficulty: "Medio", cost: 8.0, calories: 580, tags: ["Tradición", "Alto en proteína"], isFavorite: true },
  { id: "2", name: "Lomo Saltado", emoji: "🥩", region: "Lima", time: "30 min", difficulty: "Fácil", cost: 12.0, calories: 520, tags: ["Rápido", "Favorito familiar"], isFavorite: false },
  { id: "3", name: "Arroz con Pollo", emoji: "🍗", region: "Costa", time: "50 min", difficulty: "Medio", cost: 7.5, calories: 490, tags: ["Económico", "Familiar"], isFavorite: true },
  { id: "4", name: "Ceviche", emoji: "🐟", region: "Piura", time: "20 min", difficulty: "Fácil", cost: 15.0, calories: 180, tags: ["Bajo en calorías", "Rápido"], isFavorite: false },
  { id: "5", name: "Causa Limeña", emoji: "🥔", region: "Lima", time: "40 min", difficulty: "Medio", cost: 6.0, calories: 350, tags: ["Tradición", "Económico"], isFavorite: false },
  { id: "6", name: "Seco de Res", emoji: "🍖", region: "Lambayeque", time: "60 min", difficulty: "Elaborado", cost: 10.0, calories: 620, tags: ["Alto en proteína"], isFavorite: true },
  { id: "7", name: "Tacu Tacu", emoji: "🍚", region: "Lima", time: "35 min", difficulty: "Fácil", cost: 5.5, calories: 450, tags: ["Económico", "Rápido"], isFavorite: false },
  { id: "8", name: "Papa a la Huancaína", emoji: "🥔", region: "Lima", time: "25 min", difficulty: "Fácil", cost: 4.0, calories: 380, tags: ["Económico", "Rápido"], isFavorite: false },
  { id: "9", name: "Rocoto Relleno", emoji: "🌶️", region: "Arequipa", time: "90 min", difficulty: "Elaborado", cost: 12.0, calories: 520, tags: ["Tradición", "Picante"], isFavorite: false },
  { id: "10", name: "Pachamanca", emoji: "🥩", region: "Sierra", time: "180 min", difficulty: "Elaborado", cost: 20.0, calories: 750, tags: ["Tradición", "Especial"], isFavorite: false },
  { id: "11", name: "Chupe de Camarones", emoji: "🦐", region: "Arequipa", time: "60 min", difficulty: "Medio", cost: 18.0, calories: 420, tags: ["Mariscos"], isFavorite: true },
  { id: "12", name: "Juane", emoji: "🌿", region: "Selva", time: "120 min", difficulty: "Elaborado", cost: 8.0, calories: 550, tags: ["Tradición", "Selva"], isFavorite: false },
];

const REGIONS = ["Todas", "Lima", "Costa", "Sierra", "Selva", "Arequipa", "Piura", "Lambayeque"];
const DIFFICULTIES = ["Todas", "Fácil", "Medio", "Elaborado"];
const TIME_FILTERS = ["Cualquiera", "< 30 min", "30-60 min", "> 60 min"];

// Componente: Recipe Card
function RecipeCard({
  recipe,
  onToggleFavorite,
}: Readonly<{
  recipe: Recipe;
  onToggleFavorite: () => void;
}>) {
  return (
    <div className="bg-card rounded-2xl border border-card-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group">
      {/* Image */}
      <div className="relative h-36 sm:h-40 bg-gradient-to-br from-accent-yellow to-accent-orange flex items-center justify-center">
        <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">
          {recipe.emoji}
        </span>
        <button
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            recipe.isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 text-muted-foreground hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${recipe.isFavorite ? "fill-current" : ""}`} />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-secondary">
            {recipe.region}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-2">{recipe.name}</h3>

        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.time}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            {recipe.calories} kcal
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              recipe.difficulty === "Fácil"
                ? "bg-accent-green text-success"
                : recipe.difficulty === "Medio"
                  ? "bg-accent-yellow text-secondary"
                  : "bg-accent-orange text-secondary"
            }`}
          >
            {recipe.difficulty}
          </span>
          <span className="text-lg font-bold text-primary">S/ {recipe.cost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

// Componente: Filter Chip
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

// Main Component
export default function RecetasClient({ userName }: Readonly<{ userName: string }>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Todas");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");
  const [selectedTime, setSelectedTime] = useState("Cualquiera");
  const [showFilters, setShowFilters] = useState(false);
  const [recipes, setRecipes] = useState(MOCK_RECIPES);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const handleToggleFavorite = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "Todas" || recipe.region === selectedRegion;
    const matchesDifficulty = selectedDifficulty === "Todas" || recipe.difficulty === selectedDifficulty;
    const matchesFavorite = !showOnlyFavorites || recipe.isFavorite;

    let matchesTime = true;
    if (selectedTime === "< 30 min") {
      matchesTime = parseInt(recipe.time) < 30;
    } else if (selectedTime === "30-60 min") {
      const time = parseInt(recipe.time);
      matchesTime = time >= 30 && time <= 60;
    } else if (selectedTime === "> 60 min") {
      matchesTime = parseInt(recipe.time) > 60;
    }

    return matchesSearch && matchesRegion && matchesDifficulty && matchesTime && matchesFavorite;
  });

  const activeFiltersCount = [
    selectedRegion !== "Todas",
    selectedDifficulty !== "Todas",
    selectedTime !== "Cualquiera",
    showOnlyFavorites,
  ].filter(Boolean).length;

  return (
    <DashboardShell userName={userName} title="Recetas" subtitle="Explora más de 500 recetas peruanas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search Bar */}
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

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-card rounded-2xl border border-card-border p-4 space-y-4">
            {/* Region */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Región</p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((region) => (
                  <FilterChip
                    key={region}
                    label={region}
                    isActive={selectedRegion === region}
                    onClick={() => setSelectedRegion(region)}
                  />
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Dificultad</p>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTIES.map((diff) => (
                  <FilterChip
                    key={diff}
                    label={diff}
                    isActive={selectedDifficulty === diff}
                    onClick={() => setSelectedDifficulty(diff)}
                  />
                ))}
              </div>
            </div>

            {/* Time */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Tiempo</p>
              <div className="flex flex-wrap gap-2">
                {TIME_FILTERS.map((time) => (
                  <FilterChip
                    key={time}
                    label={time}
                    isActive={selectedTime === time}
                    onClick={() => setSelectedTime(time)}
                  />
                ))}
              </div>
            </div>

            {/* Favorites Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-card-border">
              <span className="text-sm font-medium text-foreground">Solo favoritas</span>
              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  showOnlyFavorites ? "bg-primary" : "bg-card-border"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    showOnlyFavorites ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setSelectedRegion("Todas");
                  setSelectedDifficulty("Todas");
                  setSelectedTime("Cualquiera");
                  setShowOnlyFavorites(false);
                }}
                className="w-full py-2 text-sm text-primary hover:text-primary-hover font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredRecipes.length} recetas encontradas
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleFavorite={() => handleToggleFavorite(recipe.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🍽️</span>
            <h3 className="text-xl font-bold text-foreground mb-2">No hay recetas</h3>
            <p className="text-muted-foreground">
              Intenta con otros filtros o busca algo diferente.
            </p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
