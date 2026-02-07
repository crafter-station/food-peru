"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Flame,
  ShoppingCart,
  ChefHat,
  Check,
  RefreshCw,
  Heart,
  Share2,
  Sparkles,
} from "lucide-react";
import DashboardShell from "./components/DashboardShell";

// Types
interface Recipe {
  id: string;
  name: string;
  emoji: string;
  region: string;
  time: string;
  difficulty: "Fácil" | "Medio" | "Elaborado";
  cost: number;
  baseServings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  ingredients: { name: string; amount: string; unit: string }[];
  steps: string[];
}

// Mock data
const DAILY_SUGGESTIONS: Recipe[] = [
  {
    id: "aji-gallina",
    name: "Ají de Gallina",
    emoji: "🍲",
    region: "Lima",
    time: "45 min",
    difficulty: "Medio",
    cost: 8.0,
    baseServings: 4,
    calories: 580,
    protein: 32,
    carbs: 45,
    fat: 28,
    tags: ["Tradición", "Alto en proteína"],
    ingredients: [
      { name: "Pechuga de pollo", amount: "500", unit: "g" },
      { name: "Ají amarillo", amount: "4", unit: "unidades" },
      { name: "Pan de molde", amount: "4", unit: "rebanadas" },
      { name: "Leche evaporada", amount: "1", unit: "taza" },
      { name: "Queso parmesano", amount: "50", unit: "g" },
      { name: "Nueces", amount: "50", unit: "g" },
      { name: "Cebolla", amount: "1", unit: "unidad" },
      { name: "Ajo", amount: "3", unit: "dientes" },
      { name: "Arroz", amount: "2", unit: "tazas" },
      { name: "Papa amarilla", amount: "4", unit: "unidades" },
      { name: "Huevo", amount: "2", unit: "unidades" },
      { name: "Aceitunas", amount: "8", unit: "unidades" },
    ],
    steps: [
      "Cocina el pollo en agua con sal hasta que esté tierno. Desmenuza y reserva el caldo.",
      "Licúa el ají amarillo, pan remojado en leche, nueces y un poco de caldo.",
      "Sofríe la cebolla y el ajo. Agrega la crema de ají y cocina 10 minutos.",
      "Incorpora el pollo desmenuzado y ajusta la sal. Añade el queso parmesano.",
      "Sirve sobre arroz blanco con papa amarilla, huevo duro y aceitunas.",
    ],
  },
  {
    id: "lomo-saltado",
    name: "Lomo Saltado",
    emoji: "🥩",
    region: "Lima",
    time: "30 min",
    difficulty: "Fácil",
    cost: 12.0,
    baseServings: 4,
    calories: 520,
    protein: 38,
    carbs: 42,
    fat: 22,
    tags: ["Rápido", "Favorito familiar"],
    ingredients: [
      { name: "Lomo de res", amount: "500", unit: "g" },
      { name: "Cebolla roja", amount: "2", unit: "unidades" },
      { name: "Tomate", amount: "2", unit: "unidades" },
      { name: "Ají amarillo", amount: "1", unit: "unidad" },
      { name: "Sillao", amount: "3", unit: "cucharadas" },
      { name: "Vinagre", amount: "2", unit: "cucharadas" },
      { name: "Papas fritas", amount: "400", unit: "g" },
      { name: "Arroz", amount: "2", unit: "tazas" },
      { name: "Cilantro", amount: "1", unit: "manojo" },
    ],
    steps: [
      "Corta el lomo en tiras y sazónalo con sal y pimienta.",
      "En un wok caliente, sella la carne a fuego alto. Retira y reserva.",
      "Saltea la cebolla en plumas y el tomate en gajos. Agrega el ají.",
      "Regresa la carne, añade sillao y vinagre. Mezcla rápidamente.",
      "Incorpora las papas fritas y cilantro. Sirve con arroz.",
    ],
  },
  {
    id: "arroz-con-pollo",
    name: "Arroz con Pollo",
    emoji: "🍗",
    region: "Costa",
    time: "50 min",
    difficulty: "Medio",
    cost: 7.5,
    baseServings: 4,
    calories: 490,
    protein: 28,
    carbs: 58,
    fat: 16,
    tags: ["Económico", "Familiar"],
    ingredients: [
      { name: "Pollo en presas", amount: "1", unit: "kg" },
      { name: "Arroz", amount: "3", unit: "tazas" },
      { name: "Culantro", amount: "1", unit: "atado" },
      { name: "Espinaca", amount: "100", unit: "g" },
      { name: "Arveja", amount: "1", unit: "taza" },
      { name: "Zanahoria", amount: "1", unit: "unidad" },
      { name: "Pimiento", amount: "1", unit: "unidad" },
      { name: "Cerveza negra", amount: "1/2", unit: "taza" },
      { name: "Ají amarillo", amount: "2", unit: "cucharadas" },
    ],
    steps: [
      "Licúa el culantro y espinaca con un poco de agua para hacer la pasta verde.",
      "Dora las presas de pollo sazonadas. Retira y reserva.",
      "Sofríe cebolla, ajo y ají. Agrega la pasta verde y cerveza.",
      "Incorpora el arroz, las verduras y el caldo. Cocina tapado 20 min.",
      "Sirve con salsa criolla y rodajas de huevo duro.",
    ],
  },
];

const DAYS_OF_WEEK = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

// Componente: Tarjeta de Sugerencia
function SuggestionCard({
  recipe,
  isSelected,
  onSelect,
  servings,
}: Readonly<{
  recipe: Recipe;
  isSelected: boolean;
  onSelect: () => void;
  servings: number;
}>) {
  const multiplier = servings / recipe.baseServings;
  const adjustedCost = (recipe.cost * multiplier).toFixed(2);

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all ${
        isSelected
          ? "border-primary bg-primary-light shadow-lg shadow-primary/20"
          : "border-card-border bg-card hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <div className="relative h-32 sm:h-28 bg-gradient-to-br from-accent-yellow to-accent-orange flex items-center justify-center">
        <span className="text-5xl sm:text-4xl">{recipe.emoji}</span>
        {isSelected && (
          <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-secondary">
            {recipe.region}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-foreground mb-1 text-sm">{recipe.name}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {recipe.time}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {recipe.calories} kcal
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {recipe.tags.slice(0, 1).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-accent-green rounded-full text-xs font-medium text-success">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm font-bold text-primary">S/ {adjustedCost}</span>
        </div>
      </div>
    </button>
  );
}

// Componente: Detalle de Receta
function SelectedRecipeDetail({
  recipe,
  servings,
  onChangeServings,
}: Readonly<{
  recipe: Recipe;
  servings: number;
  onChangeServings: (delta: number) => void;
}>) {
  const [activeTab, setActiveTab] = useState<"ingredientes" | "preparacion">("ingredientes");
  const multiplier = servings / recipe.baseServings;

  const adjustAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const adjusted = num * multiplier;
    return adjusted % 1 === 0 ? adjusted.toString() : adjusted.toFixed(1);
  };

  return (
    <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
      <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-accent-yellow via-accent-orange to-primary/30 flex items-center justify-center">
        <span className="text-7xl sm:text-8xl lg:text-9xl">{recipe.emoji}</span>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Heart className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-secondary">
            📍 {recipe.region}
          </span>
        </div>
      </div>

      <div className="p-5 lg:p-6 border-b border-card-border">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{recipe.name}</h2>
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
          <div className="text-center p-2 sm:p-3 bg-accent-yellow/50 rounded-xl">
            <p className="text-base sm:text-lg font-bold text-foreground">{Math.round(recipe.calories * multiplier)}</p>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-accent-green/50 rounded-xl">
            <p className="text-base sm:text-lg font-bold text-foreground">{Math.round(recipe.protein * multiplier)}g</p>
            <p className="text-xs text-muted-foreground">proteína</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-accent-blue/50 rounded-xl">
            <p className="text-base sm:text-lg font-bold text-foreground">{Math.round(recipe.carbs * multiplier)}g</p>
            <p className="text-xs text-muted-foreground">carbs</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-accent-purple/50 rounded-xl">
            <p className="text-base sm:text-lg font-bold text-foreground">{Math.round(recipe.fat * multiplier)}g</p>
            <p className="text-xs text-muted-foreground">grasas</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center justify-between flex-1 p-3 sm:p-4 bg-accent-yellow/30 rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">Porciones</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onChangeServings(-1)}
                disabled={servings <= 1}
                className="w-8 h-8 rounded-full bg-white border border-card-border flex items-center justify-center hover:border-primary disabled:opacity-40 transition-colors"
              >
                -
              </button>
              <span className="text-xl font-bold text-primary w-6 text-center">{servings}</span>
              <button
                onClick={() => onChangeServings(1)}
                disabled={servings >= 12}
                className="w-8 h-8 rounded-full bg-white border border-card-border flex items-center justify-center hover:border-primary disabled:opacity-40 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-center gap-4 p-3 sm:p-4 bg-primary/10 rounded-xl sm:min-w-[160px]">
            <span className="text-sm text-foreground sm:hidden">Costo estimado</span>
            <div className="text-right sm:text-center">
              <p className="text-2xl font-bold text-primary">S/ {(recipe.cost * multiplier).toFixed(2)}</p>
              <p className="text-xs text-muted-foreground hidden sm:block">costo estimado</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.time}
          </span>
          <span className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            {recipe.difficulty}
          </span>
        </div>
      </div>

      <div className="flex border-b border-card-border">
        <button
          onClick={() => setActiveTab("ingredientes")}
          className={`flex-1 py-4 text-sm font-semibold transition-colors ${
            activeTab === "ingredientes" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🥕 Ingredientes ({recipe.ingredients.length})
        </button>
        <button
          onClick={() => setActiveTab("preparacion")}
          className={`flex-1 py-4 text-sm font-semibold transition-colors ${
            activeTab === "preparacion" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          👨‍🍳 Preparación ({recipe.steps.length} pasos)
        </button>
      </div>

      <div className="p-5 lg:p-6">
        {activeTab === "ingredientes" ? (
          <ul className="space-y-2 sm:space-y-3">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex items-center justify-between py-2 border-b border-card-border last:border-0">
                <span className="text-foreground">{ing.name}</span>
                <span className="text-sm font-medium text-primary">
                  {adjustAmount(ing.amount)} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ol className="space-y-4 lg:space-y-5">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3 sm:gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-foreground leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="p-5 lg:p-6 border-t border-card-border">
        <button className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors btn-primary-glow">
          <ShoppingCart className="w-5 h-5" />
          Agregar a lista de compras
        </button>
      </div>
    </div>
  );
}

// Componente: Calendario Semanal
function WeeklyCalendar({
  selectedDate,
  onSelectDate,
  plannedDays,
}: Readonly<{
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  plannedDays: string[];
}>) {
  const today = new Date();
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return (
    <div className="flex justify-between gap-1 sm:gap-2">
      {days.map((date) => {
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const isToday = date.toDateString() === today.toDateString();
        const isPlanned = plannedDays.includes(date.toDateString());

        return (
          <button
            key={date.toISOString()}
            onClick={() => onSelectDate(date)}
            className={`flex-1 flex flex-col items-center py-2 sm:py-3 rounded-xl transition-all ${
              isSelected ? "bg-primary text-white" : isToday ? "bg-primary-light text-primary" : "hover:bg-accent-yellow/50"
            }`}
          >
            <span className={`text-xs sm:text-sm ${isSelected ? "text-white/70" : "text-muted-foreground"}`}>
              {DAYS_OF_WEEK[date.getDay()]}
            </span>
            <span className={`text-lg sm:text-xl font-bold ${isSelected ? "text-white" : "text-foreground"}`}>
              {date.getDate()}
            </span>
            {isPlanned && !isSelected && <div className="w-1.5 h-1.5 rounded-full bg-success mt-1" />}
            {isSelected && isPlanned && <div className="w-1.5 h-1.5 rounded-full bg-white mt-1" />}
          </button>
        );
      })}
    </div>
  );
}

// Componente: Header con navegación de fecha
function DateHeader({
  selectedDate,
  onNavigateDay,
}: Readonly<{
  selectedDate: Date;
  onNavigateDay: (direction: number) => void;
}>) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("es-PE", options);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <button onClick={() => onNavigateDay(-1)} className="p-2 hover:bg-accent-yellow/50 rounded-xl transition-colors">
        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
      </button>
      <h2 className="text-base sm:text-lg font-semibold text-foreground capitalize">{formatDate(selectedDate)}</h2>
      <button onClick={() => onNavigateDay(1)} className="p-2 hover:bg-accent-yellow/50 rounded-xl transition-colors">
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
}

// Main Component
export default function DashboardHomeClient({ userName }: Readonly<{ userName: string }>) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(DAILY_SUGGESTIONS[0]);
  const [servings, setServings] = useState(4);
  const [plannedDays] = useState<string[]>([new Date().toDateString()]);

  const navigateDay = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const handleChangeServings = (delta: number) => {
    setServings((prev) => Math.max(1, Math.min(12, prev + delta)));
  };

  return (
    <DashboardShell userName={userName} title="Tu almuerzo de hoy" subtitle="Elige qué cocinar hoy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Date Navigation - Mobile only */}
        <div className="lg:hidden">
          <DateHeader selectedDate={selectedDate} onNavigateDay={navigateDay} />
        </div>

        {/* Weekly Calendar */}
        <div className="mb-6">
          <WeeklyCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} plannedDays={plannedDays} />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Suggestions Column */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Elige tu almuerzo</h2>
                </div>
                <button className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Otras</span>
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:flex lg:flex-col">
                {DAILY_SUGGESTIONS.map((recipe) => (
                  <div key={recipe.id} className="min-w-[200px] sm:min-w-0">
                    <SuggestionCard
                      recipe={recipe}
                      isSelected={selectedRecipe.id === recipe.id}
                      onSelect={() => setSelectedRecipe(recipe)}
                      servings={servings}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recipe Detail Column */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center gap-2 mb-4 lg:hidden">
              <ChefHat className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Tu almuerzo de hoy</h2>
            </div>
            <SelectedRecipeDetail recipe={selectedRecipe} servings={servings} onChangeServings={handleChangeServings} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
