"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Clock,
  Flame,
  ShoppingCart,
  Calendar,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import DashboardShell from "../components/DashboardShell";

// Types
interface PlannedMeal {
  id: string;
  name: string;
  emoji: string;
  time: string;
  calories: number;
  cost: number;
  isCompleted: boolean;
}

interface DayPlan {
  date: Date;
  meal: PlannedMeal | null;
}

// Mock data
const MOCK_RECIPES: PlannedMeal[] = [
  { id: "1", name: "Ají de Gallina", emoji: "🍲", time: "45 min", calories: 580, cost: 8.0, isCompleted: false },
  { id: "2", name: "Lomo Saltado", emoji: "🥩", time: "30 min", calories: 520, cost: 12.0, isCompleted: true },
  { id: "3", name: "Arroz con Pollo", emoji: "🍗", time: "50 min", calories: 490, cost: 7.5, isCompleted: false },
  { id: "4", name: "Ceviche", emoji: "🐟", time: "20 min", calories: 180, cost: 15.0, isCompleted: false },
  { id: "5", name: "Causa Limeña", emoji: "🥔", time: "40 min", calories: 350, cost: 6.0, isCompleted: true },
  { id: "6", name: "Seco de Res", emoji: "🍖", time: "60 min", calories: 620, cost: 10.0, isCompleted: false },
  { id: "7", name: "Tacu Tacu", emoji: "🍚", time: "35 min", calories: 450, cost: 5.5, isCompleted: false },
];

const DAYS_OF_WEEK = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const DAYS_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function getWeekDays(date: Date): Date[] {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function generateWeekPlan(weekDays: Date[]): DayPlan[] {
  return weekDays.map((date, index) => ({
    date,
    meal: index < MOCK_RECIPES.length ? MOCK_RECIPES[index] : null,
  }));
}

// Componente: Card del día
function DayCard({
  dayPlan,
  isToday,
  onToggleComplete,
  onAddMeal,
}: Readonly<{
  dayPlan: DayPlan;
  isToday: boolean;
  onToggleComplete: () => void;
  onAddMeal: () => void;
}>) {
  const dayName = DAYS_OF_WEEK[dayPlan.date.getDay()];
  const dayNumber = dayPlan.date.getDate();

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden transition-all ${
        isToday
          ? "border-primary bg-primary-light/50"
          : "border-card-border bg-card hover:border-primary/30"
      }`}
    >
      {/* Day Header */}
      <div
        className={`px-4 py-3 flex items-center justify-between ${
          isToday ? "bg-primary text-white" : "bg-card-border/30"
        }`}
      >
        <div>
          <p className={`text-xs ${isToday ? "text-white/70" : "text-muted-foreground"}`}>
            {dayName}
          </p>
          <p className={`text-xl font-bold ${isToday ? "text-white" : "text-foreground"}`}>
            {dayNumber}
          </p>
        </div>
        {isToday && (
          <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">Hoy</span>
        )}
      </div>

      {/* Meal Content */}
      <div className="p-4">
        {dayPlan.meal ? (
          <div className="space-y-3">
            {/* Meal Info */}
            <div className="flex items-start gap-3">
              <span className="text-3xl">{dayPlan.meal.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{dayPlan.meal.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {dayPlan.meal.time}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {dayPlan.meal.calories} kcal
                  </span>
                </div>
              </div>
            </div>

            {/* Cost & Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-card-border">
              <span className="text-sm font-bold text-primary">S/ {dayPlan.meal.cost.toFixed(2)}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleComplete}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    dayPlan.meal.isCompleted
                      ? "bg-success text-white"
                      : "border-2 border-card-border hover:border-success"
                  }`}
                >
                  {dayPlan.meal.isCompleted && <Check className="w-4 h-4" />}
                </button>
                <button className="w-8 h-8 rounded-full hover:bg-accent-yellow/50 flex items-center justify-center transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onAddMeal}
            className="w-full py-6 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-card-border group-hover:border-primary flex items-center justify-center transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm">Agregar almuerzo</span>
          </button>
        )}
      </div>
    </div>
  );
}

// Componente: Vista de lista (mobile)
function ListView({
  weekPlan,
  today,
  onToggleComplete,
  onAddMeal,
}: Readonly<{
  weekPlan: DayPlan[];
  today: Date;
  onToggleComplete: (index: number) => void;
  onAddMeal: (index: number) => void;
}>) {
  return (
    <div className="space-y-3">
      {weekPlan.map((dayPlan, index) => {
        const isToday = dayPlan.date.toDateString() === today.toDateString();
        const isPast = dayPlan.date < today && !isToday;

        return (
          <div
            key={dayPlan.date.toISOString()}
            className={`rounded-xl border overflow-hidden transition-all ${
              isToday
                ? "border-primary bg-primary-light/30"
                : isPast
                  ? "border-card-border bg-card/50 opacity-60"
                  : "border-card-border bg-card"
            }`}
          >
            <div className="flex items-center">
              {/* Date Column */}
              <div
                className={`w-16 sm:w-20 flex-shrink-0 py-4 flex flex-col items-center justify-center border-r ${
                  isToday ? "bg-primary text-white border-primary" : "bg-card-border/20 border-card-border"
                }`}
              >
                <span className={`text-xs ${isToday ? "text-white/70" : "text-muted-foreground"}`}>
                  {DAYS_SHORT[dayPlan.date.getDay()]}
                </span>
                <span className={`text-2xl font-bold ${isToday ? "text-white" : "text-foreground"}`}>
                  {dayPlan.date.getDate()}
                </span>
              </div>

              {/* Meal Content */}
              <div className="flex-1 p-3 sm:p-4">
                {dayPlan.meal ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl">{dayPlan.meal.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{dayPlan.meal.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{dayPlan.meal.time}</span>
                        <span>•</span>
                        <span>{dayPlan.meal.calories} kcal</span>
                        <span>•</span>
                        <span className="font-medium text-primary">S/ {dayPlan.meal.cost.toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleComplete(index)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                        dayPlan.meal.isCompleted
                          ? "bg-success text-white"
                          : "border-2 border-card-border hover:border-success"
                      }`}
                    >
                      {dayPlan.meal.isCompleted && <Check className="w-4 h-4" />}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddMeal(index)}
                    className="w-full flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-card-border flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Agregar almuerzo</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Componente: Resumen semanal
function WeeklySummary({ weekPlan }: Readonly<{ weekPlan: DayPlan[] }>) {
  const plannedMeals = weekPlan.filter((d) => d.meal !== null);
  const completedMeals = plannedMeals.filter((d) => d.meal?.isCompleted);
  const totalCost = plannedMeals.reduce((sum, d) => sum + (d.meal?.cost || 0), 0);
  const totalCalories = plannedMeals.reduce((sum, d) => sum + (d.meal?.calories || 0), 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-card rounded-xl border border-card-border p-4 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-foreground">{plannedMeals.length}/7</p>
        <p className="text-xs sm:text-sm text-muted-foreground">Días planificados</p>
      </div>
      <div className="bg-card rounded-xl border border-card-border p-4 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-success">{completedMeals.length}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">Completados</p>
      </div>
      <div className="bg-card rounded-xl border border-card-border p-4 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-primary">S/ {totalCost.toFixed(0)}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">Costo semanal</p>
      </div>
      <div className="bg-card rounded-xl border border-card-border p-4 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-secondary">{totalCalories}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">kcal totales</p>
      </div>
    </div>
  );
}

// Main Component
export default function PlanClient({ userName }: Readonly<{ userName: string }>) {
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    return start;
  });

  const weekDays = getWeekDays(currentWeekStart);
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => generateWeekPlan(weekDays));

  const navigateWeek = (direction: number) => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + direction * 7);
    setCurrentWeekStart(newStart);
    setWeekPlan(generateWeekPlan(getWeekDays(newStart)));
  };

  const handleToggleComplete = (index: number) => {
    setWeekPlan((prev) =>
      prev.map((day, i) =>
        i === index && day.meal
          ? { ...day, meal: { ...day.meal, isCompleted: !day.meal.isCompleted } }
          : day
      )
    );
  };

  const handleAddMeal = (index: number) => {
    // TODO: Abrir modal de selección de receta
    console.log("Agregar almuerzo para el día", index);
  };

  const weekLabel = `${weekDays[0].getDate()} - ${weekDays[6].getDate()} de ${MONTHS[weekDays[0].getMonth()]}`;

  return (
    <DashboardShell userName={userName} title="Plan Semanal" subtitle="Organiza tus almuerzos de la semana">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 hover:bg-accent-yellow/50 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">{weekLabel}</h2>
            <p className="text-sm text-muted-foreground">{currentWeekStart.getFullYear()}</p>
          </div>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 hover:bg-accent-yellow/50 rounded-xl transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Weekly Summary */}
        <WeeklySummary weekPlan={weekPlan} />

        {/* Week Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-7 gap-4">
          {weekPlan.map((dayPlan, index) => (
            <DayCard
              key={dayPlan.date.toISOString()}
              dayPlan={dayPlan}
              isToday={dayPlan.date.toDateString() === today.toDateString()}
              onToggleComplete={() => handleToggleComplete(index)}
              onAddMeal={() => handleAddMeal(index)}
            />
          ))}
        </div>

        {/* List View - Mobile/Tablet */}
        <div className="lg:hidden">
          <ListView
            weekPlan={weekPlan}
            today={today}
            onToggleComplete={handleToggleComplete}
            onAddMeal={handleAddMeal}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors btn-primary-glow">
            <Sparkles className="w-5 h-5" />
            Autocompletar semana
          </button>
          <button className="flex-1 py-4 border-2 border-primary text-primary font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-light transition-colors">
            <ShoppingCart className="w-5 h-5" />
            Generar lista de compras
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
