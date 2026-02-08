"use client";

import { useState } from "react";
import { Check, Minus, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { DEPARTAMENTOS } from "@/lib/preferences-constants";

export type ChildGroup = { ageGroup: string; count: number };

/* ─── Constantes de UI (con emojis e iconos) ─── */

const CHILD_AGE_GROUPS_UI = [
  { id: "babies", label: "Bebés", description: "0 - 2 años", icon: "👶" },
  { id: "toddlers", label: "Niños pequeños", description: "3 - 6 años", icon: "🧒" },
  { id: "schoolers", label: "Escolares", description: "7 - 12 años", icon: "📚" },
  { id: "teens", label: "Adolescentes", description: "13 - 17 años", icon: "🎒" },
];

const COOKING_TIMES_UI = [
  { id: "quick", label: "Tengo poco tiempo", description: "15-20 minutos", icon: "⚡" },
  { id: "normal", label: "Tiempo normal", description: "30-45 min", icon: "👩‍🍳" },
  { id: "relaxed", label: "Con calma", description: "1 hora o más", icon: "☕" },
  { id: "varies", label: "Depende del día", description: "A veces sí, a veces no", icon: "📅" },
];

const SHOPPING_PLACES_UI = [
  { id: "mercado", label: "Mercado", icon: "🏪", description: "Productos frescos" },
  { id: "supermercado", label: "Supermercado", icon: "🛒", description: "Plaza Vea, Metro..." },
  { id: "bodega", label: "Bodega", icon: "🏠", description: "Del día a día" },
  { id: "feria", label: "Feria", icon: "🥬", description: "Productos locales" },
];

const RESTRICTIONS_UI = [
  { id: "ninguna", label: "Ninguna restricción", icon: "✅" },
  { id: "diabetes", label: "Diabetes", icon: "💉" },
  { id: "hipertension", label: "Hipertensión", icon: "❤️" },
  { id: "gluten", label: "Sin Gluten", icon: "🌾" },
  { id: "lactosa", label: "Sin Lactosa", icon: "🥛" },
  { id: "vegetariano", label: "Vegetariano", icon: "🥬" },
  { id: "vegano", label: "Vegano", icon: "🌱" },
  { id: "mariscos", label: "Sin Mariscos", icon: "🦐" },
];

/* Re-exportar para onboarding u otros consumidores */
export {
  CHILD_AGE_GROUPS_UI,
  COOKING_TIMES_UI,
  SHOPPING_PLACES_UI,
  RESTRICTIONS_UI,
};

/* ─────────────── Helpers de estilo ─────────────── */

const accent = "#FFB800";
const accentBg = "#FFF8E1";

function selectedCard(isSelected: boolean): string {
  return isSelected
    ? `border-[${accent}] bg-[${accentBg}]`
    : "border-gray-200 bg-white hover:border-gray-300";
}

/* ═══════════════════════════════════════════════════
   1. HouseholdSizePicker
   ═══════════════════════════════════════════════════ */

export function HouseholdSizePicker({
  value,
  onChange,
}: Readonly<{ value: number; onChange: (v: number) => void }>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <Minus className="w-5 h-5 text-gray-600" />
        </button>
        <div className="text-center min-w-[80px]">
          <span className="text-5xl font-bold text-[#FFB800]">{value}</span>
          <p className="text-gray-500 text-sm mt-1">
            {value === 1 ? "persona" : "personas"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(12, value + 1))}
          className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-10 h-10 rounded-full font-medium text-sm transition-all ${
              value === num
                ? "bg-[#FFB800] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   2. ChildrenPicker
   ═══════════════════════════════════════════════════ */

export function ChildrenPicker({
  value,
  onChange,
}: Readonly<{ value: ChildGroup[]; onChange: (v: ChildGroup[]) => void }>) {
  const hasChildren = value.length > 0;

  const getCount = (ageGroup: string) =>
    value.find((c) => c.ageGroup === ageGroup)?.count ?? 0;

  const updateCount = (ageGroup: string, delta: number) => {
    const current = getCount(ageGroup);
    const next = Math.max(0, current + delta);
    const rest = value.filter((c) => c.ageGroup !== ageGroup);
    if (next === 0) {
      onChange(rest);
    } else {
      onChange([...rest, { ageGroup, count: next }]);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => onChange([])}
        className={`w-full p-3 rounded-2xl border-2 transition-all flex items-center gap-3 ${
          !hasChildren ? selectedCard(true) : selectedCard(false)
        }`}
      >
        <span className="text-xl">👨‍👩‍👦</span>
        <span className="font-medium text-gray-700 flex-1 text-left text-sm">
          No hay niños en casa
        </span>
        {!hasChildren && <Check className="w-4 h-4 text-[#FFB800]" />}
      </button>

      <div className="space-y-2">
        {CHILD_AGE_GROUPS_UI.map((group) => {
          const count = getCount(group.id);
          return (
            <div
              key={group.id}
              className={`p-3 rounded-2xl border-2 transition-all ${
                count > 0 ? selectedCard(true) : selectedCard(false)
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{group.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-700 text-sm">{group.label}</p>
                  <p className="text-xs text-gray-400">{group.description}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateCount(group.id, -1)}
                    disabled={count === 0}
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  <span
                    className={`w-5 text-center font-bold text-sm ${
                      count > 0 ? "text-[#FFB800]" : "text-gray-300"
                    }`}
                  >
                    {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCount(group.id, 1)}
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   3. CookingTimePicker
   ═══════════════════════════════════════════════════ */

export function CookingTimePicker({
  value,
  onChange,
}: Readonly<{ value: string; onChange: (v: string) => void }>) {
  return (
    <div className="space-y-2">
      {COOKING_TIMES_UI.map((time) => {
        const isSelected = value === time.id;
        return (
          <button
            key={time.id}
            type="button"
            onClick={() => onChange(time.id)}
            className={`w-full p-3 rounded-2xl border-2 transition-all flex items-center gap-3 ${selectedCard(
              isSelected,
            )}`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                isSelected ? "bg-[#FFB800]" : "bg-gray-100"
              }`}
            >
              {time.icon}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="font-semibold text-gray-700 text-sm">{time.label}</p>
              <p className="text-xs text-gray-400">{time.description}</p>
            </div>
            {isSelected && <Check className="w-4 h-4 text-[#FFB800] shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   4. BudgetPicker
   ═══════════════════════════════════════════════════ */

export function BudgetPicker({
  value,
  onChange,
}: Readonly<{ value: number; onChange: (v: number) => void }>) {
  const daily = Math.round(value / 7);
  return (
    <div className="space-y-4">
      <div className="text-center">
        <span className="text-4xl font-bold text-[#FFB800]">S/ {value}</span>
        <p className="text-gray-400 text-xs mt-1">
          por semana &middot; aprox.{" "}
          <span className="font-semibold text-[#FFB800]">S/ {daily}</span> /
          día
        </p>
      </div>
      <div className="px-1">
        <Slider
          value={[value]}
          min={50}
          max={500}
          step={10}
          onValueChange={(v: number[]) => onChange(v[0] ?? 200)}
          className="py-3"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>S/ 50</span>
          <span>S/ 500</span>
        </div>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {[100, 150, 200, 300, 400].map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onChange(amount)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              value === amount
                ? "bg-[#FFB800] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            S/ {amount}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   5. ShoppingPlacePicker
   ═══════════════════════════════════════════════════ */

export function ShoppingPlacePicker({
  value,
  onChange,
}: Readonly<{ value: string[]; onChange: (v: string[]) => void }>) {
  const toggle = (id: string) => {
    const has = value.includes(id);
    onChange(has ? value.filter((p) => p !== id) : [...value, id]);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {SHOPPING_PLACES_UI.map((place) => {
        const isSelected = value.includes(place.id);
        return (
          <button
            key={place.id}
            type="button"
            onClick={() => toggle(place.id)}
            className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 text-center ${selectedCard(
              isSelected,
            )}`}
          >
            <span className="text-3xl">{place.icon}</span>
            <p className="font-semibold text-gray-700 text-sm">{place.label}</p>
            <p className="text-[11px] text-gray-400 leading-tight">{place.description}</p>
            {isSelected && <Check className="w-4 h-4 text-[#FFB800]" />}
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   6. RestrictionsPicker
   ═══════════════════════════════════════════════════ */

export function RestrictionsPicker({
  value,
  onChange,
}: Readonly<{ value: string[]; onChange: (v: string[]) => void }>) {
  const toggle = (id: string) => {
    if (id === "ninguna") {
      onChange(value.includes("ninguna") ? [] : ["ninguna"]);
    } else {
      const has = value.includes(id);
      const withoutNinguna = value.filter((r) => r !== "ninguna");
      onChange(has ? withoutNinguna.filter((r) => r !== id) : [...withoutNinguna, id]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {RESTRICTIONS_UI.map((restriction) => {
        const isSelected = value.includes(restriction.id);
        const isNinguna = restriction.id === "ninguna";
        return (
          <button
            key={restriction.id}
            type="button"
            onClick={() => toggle(restriction.id)}
            className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-2.5 ${
              isNinguna ? "col-span-2 justify-center" : ""
            } ${selectedCard(isSelected)}`}
          >
            <span className="text-xl">{restriction.icon}</span>
            <span className="font-medium text-gray-700 text-sm">{restriction.label}</span>
            {isSelected && <Check className="w-4 h-4 text-[#FFB800] ml-auto shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   7. DepartmentPicker
   ═══════════════════════════════════════════════════ */

export function DepartmentPicker({
  value,
  onChange,
}: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const selectedDept = DEPARTAMENTOS.find((d) => d.id === value);
  const filtered = DEPARTAMENTOS.filter((d) =>
    d.label.toLowerCase().includes(search.toLowerCase()),
  );
  const inputValue = search !== "" || focused ? search : selectedDept?.label ?? "";

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <Input
          type="text"
          placeholder="Buscar departamento..."
          value={inputValue}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => {
            setFocused(true);
            setSearch("");
          }}
          onBlur={() => setFocused(false)}
          className="pl-10 h-11 rounded-xl border-gray-200 bg-white"
          autoComplete="off"
        />
      </div>
      <div className="max-h-[240px] overflow-y-auto space-y-1.5 pr-1">
        {filtered.map((dept) => {
          const isSelected = value === dept.id;
          return (
            <button
              key={dept.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(dept.id);
                setSearch("");
                setFocused(false);
              }}
              className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between text-left ${selectedCard(
                isSelected,
              )}`}
            >
              <span
                className={`font-medium text-sm ${
                  isSelected ? "text-gray-800" : "text-gray-600"
                }`}
              >
                {dept.label}
              </span>
              {isSelected && <Check className="w-4 h-4 text-[#FFB800] shrink-0" />}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-3">
            No se encontró el departamento
          </p>
        )}
      </div>
    </div>
  );
}
