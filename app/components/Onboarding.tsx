"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Baby,
  Clock,
  Wallet,
  ShoppingCart,
  AlertCircle,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Plus,
  Minus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface ChildGroup {
  ageGroup: string;
  count: number;
}

interface OnboardingData {
  householdSize: number;
  children: ChildGroup[];
  mealsAtHome: string[];
  cookingTime: string;
  weeklyBudget: number;
  shoppingPlace: string[];
  restrictions: string[];
  departamento: string;
}

// Constants
const CHILD_AGE_GROUPS = [
  { id: "babies", label: "Bebés", description: "0 - 2 años", icon: "👶" },
  { id: "toddlers", label: "Niños pequeños", description: "3 - 6 años", icon: "🧒" },
  { id: "schoolers", label: "Escolares", description: "7 - 12 años", icon: "📚" },
  { id: "teens", label: "Adolescentes", description: "13 - 17 años", icon: "🎒" },
];

const COOKING_TIMES = [
  { id: "quick", label: "Tengo poco tiempo", description: "Recetas de 15-20 minutos", icon: "⚡" },
  { id: "normal", label: "Tiempo normal", description: "Puedo cocinar tranquila (30-45 min)", icon: "👩‍🍳" },
  { id: "relaxed", label: "Me gusta cocinar con calma", description: "1 hora o más", icon: "☕" },
  { id: "varies", label: "Depende del día", description: "A veces tengo tiempo, a veces no", icon: "📅" },
];

const SHOPPING_PLACES = [
  { id: "mercado", label: "Mercado", icon: "🏪", description: "Productos frescos y económicos" },
  { id: "supermercado", label: "Supermercado", icon: "🛒", description: "Plaza Vea, Metro, Tottus..." },
  { id: "bodega", label: "Bodega", icon: "🏠", description: "Compras del día a día" },
  { id: "feria", label: "Feria / Paradita", icon: "🥬", description: "Productos locales y frescos" },
];

const DIETARY_RESTRICTIONS = [
  { id: "ninguna", label: "Ninguna restricción", icon: "✅" },
  { id: "diabetes", label: "Diabetes", icon: "💉" },
  { id: "hipertension", label: "Hipertensión", icon: "❤️" },
  { id: "gluten", label: "Sin Gluten", icon: "🌾" },
  { id: "lactosa", label: "Sin Lactosa", icon: "🥛" },
  { id: "vegetariano", label: "Vegetariano", icon: "🥬" },
  { id: "vegano", label: "Vegano", icon: "🌱" },
  { id: "mariscos", label: "Sin Mariscos", icon: "🦐" },
];

const DEPARTAMENTOS = [
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
];

const steps = [
  {
    id: "household",
    title: "¿Para cuántas personas cocinas?",
    subtitle: "Ajustaremos las porciones de las recetas",
    icon: Users,
  },
  {
    id: "children",
    title: "¿Hay niños en casa?",
    subtitle: "Adaptaremos las recetas para toda la familia",
    icon: Baby,
  },
  {
    id: "time",
    title: "¿Cuánto tiempo tienes para cocinar?",
    subtitle: "Te sugeriremos recetas que se ajusten a tu rutina",
    icon: Clock,
  },
  {
    id: "budget",
    title: "¿Cuál es tu presupuesto semanal?",
    subtitle: "Para las compras de comida de la semana",
    icon: Wallet,
  },
  {
    id: "shopping",
    title: "¿Dónde haces tus compras?",
    subtitle: "Esto nos ayuda a sugerir ingredientes disponibles",
    icon: ShoppingCart,
  },
  {
    id: "restrictions",
    title: "¿Alguna restricción alimentaria?",
    subtitle: "Por salud o preferencia de algún miembro de la familia",
    icon: AlertCircle,
  },
  {
    id: "departamento",
    title: "¿En qué departamento vives?",
    subtitle: "Te mostraremos recetas con ingredientes de tu zona",
    icon: MapPin,
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    householdSize: 4,
    children: [],
    mealsAtHome: ["almuerzo"],
    cookingTime: "normal",
    weeklyBudget: 200,
    shoppingPlace: ["mercado"],
    restrictions: [],
    departamento: "lima",
  });
  const [noChildren, setNoChildren] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [deptSearch, setDeptSearch] = useState("");

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateChildCount = (ageGroup: string, delta: number) => {
    setData((prev) => {
      const existing = prev.children.find((c) => c.ageGroup === ageGroup);
      if (existing) {
        const newCount = Math.max(0, existing.count + delta);
        if (newCount === 0) {
          return {
            ...prev,
            children: prev.children.filter((c) => c.ageGroup !== ageGroup),
          };
        }
        return {
          ...prev,
          children: prev.children.map((c) =>
            c.ageGroup === ageGroup ? { ...c, count: newCount } : c
          ),
        };
      } else if (delta > 0) {
        return {
          ...prev,
          children: [...prev.children, { ageGroup, count: 1 }],
        };
      }
      return prev;
    });
    setNoChildren(false);
  };

  const getChildCount = (ageGroup: string) => {
    return data.children.find((c) => c.ageGroup === ageGroup)?.count || 0;
  };

  const toggleShoppingPlace = (id: string) => {
    setData((prev) => ({
      ...prev,
      shoppingPlace: prev.shoppingPlace.includes(id)
        ? prev.shoppingPlace.filter((p) => p !== id)
        : [...prev.shoppingPlace, id],
    }));
  };

  const toggleRestriction = (id: string) => {
    if (id === "ninguna") {
      setData((prev) => ({
        ...prev,
        restrictions: prev.restrictions.includes("ninguna") ? [] : ["ninguna"],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        restrictions: prev.restrictions.includes(id)
          ? prev.restrictions.filter((r) => r !== id)
          : [...prev.restrictions.filter((r) => r !== "ninguna"), id],
      }));
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case "household":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    householdSize: Math.max(1, prev.householdSize - 1),
                  }))
                }
                className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-6 h-6 text-gray-600" />
              </button>
              <motion.div
                key={data.householdSize}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center min-w-[100px]"
              >
                <span className="text-6xl font-bold text-[#FFB800]">
                  {data.householdSize}
                </span>
                <p className="text-gray-500 mt-1">
                  {data.householdSize === 1 ? "persona" : "personas"}
                </p>
              </motion.div>
              <button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    householdSize: Math.min(12, prev.householdSize + 1),
                  }))
                }
                className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Plus className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    setData((prev) => ({ ...prev, householdSize: num }))
                  }
                  className={`w-11 h-11 rounded-full font-medium transition-all ${
                    data.householdSize === num
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

      case "children":
        return (
          <div className="space-y-4">
            {/* No children option */}
            <button
              onClick={() => {
                setNoChildren(!noChildren);
                if (!noChildren) {
                  setData((prev) => ({ ...prev, children: [] }));
                }
              }}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                noChildren
                  ? "border-[#FFB800] bg-[#FFF8E1]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-2xl">👨‍👩‍👦</span>
              <span className="font-medium text-gray-700 flex-1 text-left">No hay niños en casa</span>
              {noChildren && <Check className="w-5 h-5 text-[#FFB800]" />}
            </button>

            {/* Age groups */}
            {!noChildren && (
              <div className="space-y-3 mt-2">
                <p className="text-gray-400 text-sm text-center">
                  Indica cuántos niños hay de cada edad
                </p>
                {CHILD_AGE_GROUPS.map((group) => {
                  const count = getChildCount(group.id);
                  return (
                    <div
                      key={group.id}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        count > 0
                          ? "border-[#FFB800] bg-[#FFF8E1]"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{group.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-700">{group.label}</p>
                          <p className="text-sm text-gray-400">{group.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateChildCount(group.id, -1)}
                            disabled={count === 0}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-30 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className={`w-6 text-center font-bold ${count > 0 ? "text-[#FFB800]" : "text-gray-300"}`}>
                            {count}
                          </span>
                          <button
                            onClick={() => updateChildCount(group.id, 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case "time":
        return (
          <div className="space-y-3">
            {COOKING_TIMES.map((time) => {
              const isSelected = data.cookingTime === time.id;
              return (
                <motion.button
                  key={time.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setData((prev) => ({ ...prev, cookingTime: time.id }))
                  }
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    isSelected
                      ? "border-[#FFB800] bg-[#FFF8E1]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      isSelected ? "bg-[#FFB800]" : "bg-gray-100"
                    }`}
                  >
                    {time.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-700">{time.label}</p>
                    <p className="text-sm text-gray-400">{time.description}</p>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-[#FFB800]" />}
                </motion.button>
              );
            })}
          </div>
        );

      case "budget":
        const dailyBudget = Math.round(data.weeklyBudget / 7);
        return (
          <div className="space-y-8">
            <motion.div
              key={data.weeklyBudget}
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <span className="text-5xl font-bold text-[#FFB800]">
                S/ {data.weeklyBudget}
              </span>
              <p className="text-gray-400 mt-1">por semana</p>
              <p className="text-gray-500 text-sm mt-2">
                Aprox. <span className="font-semibold text-[#FFB800]">S/ {dailyBudget}</span> por día
              </p>
            </motion.div>
            <div className="px-2">
              <Slider
                value={[data.weeklyBudget]}
                min={50}
                max={500}
                step={10}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, weeklyBudget: value[0] }))
                }
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>S/ 50</span>
                <span>S/ 500</span>
              </div>
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {[100, 150, 200, 300, 400].map((amount) => (
                <button
                  key={amount}
                  onClick={() =>
                    setData((prev) => ({ ...prev, weeklyBudget: amount }))
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    data.weeklyBudget === amount
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

      case "shopping":
        return (
          <div className="grid grid-cols-2 gap-3">
            {SHOPPING_PLACES.map((place) => {
              const isSelected = data.shoppingPlace.includes(place.id);
              return (
                <motion.button
                  key={place.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleShoppingPlace(place.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center ${
                    isSelected
                      ? "border-[#FFB800] bg-[#FFF8E1]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="text-4xl">{place.icon}</span>
                  <p className="font-semibold text-gray-700">{place.label}</p>
                  <p className="text-xs text-gray-400">{place.description}</p>
                  {isSelected && <Check className="w-5 h-5 text-[#FFB800]" />}
                </motion.button>
              );
            })}
          </div>
        );

      case "restrictions":
        return (
          <div className="grid grid-cols-2 gap-3">
            {DIETARY_RESTRICTIONS.map((restriction) => {
              const isSelected = data.restrictions.includes(restriction.id);
              const isNinguna = restriction.id === "ninguna";
              return (
                <motion.button
                  key={restriction.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleRestriction(restriction.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                    isNinguna ? "col-span-2 justify-center" : ""
                  } ${
                    isSelected
                      ? "border-[#FFB800] bg-[#FFF8E1]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{restriction.icon}</span>
                  <span className="font-medium text-gray-700">{restriction.label}</span>
                  {isSelected && <Check className="w-5 h-5 text-[#FFB800] ml-auto" />}
                </motion.button>
              );
            })}
          </div>
        );

      case "departamento":
        const filteredDepts = DEPARTAMENTOS.filter((dept) =>
          dept.label.toLowerCase().includes(deptSearch.toLowerCase())
        );
        return (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar departamento..."
                value={deptSearch}
                onChange={(e) => setDeptSearch(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 bg-white"
              />
            </div>
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {filteredDepts.map((dept) => {
                const isSelected = data.departamento === dept.id;
                return (
                  <motion.button
                    key={dept.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setData((prev) => ({ ...prev, departamento: dept.id }));
                      setDeptSearch("");
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-[#FFB800] bg-[#FFF8E1]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span className={`font-medium ${isSelected ? "text-gray-800" : "text-gray-600"}`}>
                      {dept.label}
                    </span>
                    {isSelected && <Check className="w-5 h-5 text-[#FFB800]" />}
                  </motion.button>
                );
              })}
              {filteredDepts.length === 0 && (
                <p className="text-center text-gray-400 py-4">
                  No se encontró el departamento
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-6 bg-white"
      >
        <div className="text-center space-y-6 max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 mx-auto rounded-3xl bg-[#FFB800] flex items-center justify-center"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h1 className="text-3xl font-bold text-gray-800">¡Todo Listo!</h1>
            <p className="text-gray-500 leading-relaxed">
              Ya conocemos tus preferencias. Ahora podemos sugerirte recetas
              perfectas para ti y tu familia.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-[#FFB800] hover:bg-[#E5A600] text-white font-semibold rounded-2xl btn-primary-glow"
            >
              Ver mis recetas
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const CurrentIcon = steps[currentStep].icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Progress value={progress} className="h-1 rounded-none" />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 pt-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`p-2 rounded-full transition-colors ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-400">
            {currentStep + 1} de {steps.length}
          </span>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col pt-20 pb-28 px-6">
        <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              {/* Step header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-[#FFF8E1] flex items-center justify-center mb-4"
                >
                  <CurrentIcon className="w-8 h-8 text-[#FFB800]" />
                </motion.div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {steps[currentStep].title}
                </h1>
                <p className="text-gray-400">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              {/* Step content */}
              <Card className="card-shadow border-0 rounded-3xl bg-white">
                <CardContent className="p-6">{renderStepContent()}</CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={nextStep}
            size="lg"
            className="w-full h-14 text-lg bg-[#FFB800] hover:bg-[#E5A600] text-white font-semibold rounded-2xl btn-primary-glow"
          >
            {currentStep === steps.length - 1 ? "Finalizar" : "Continuar"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
