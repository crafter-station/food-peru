"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat,
  Users,
  AlertCircle,
  Utensils,
  Wallet,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Plus,
  X,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface OnboardingData {
  recentMeals: string[];
  restrictions: string[];
  householdSize: number;
  kitchenEquipment: string[];
  weeklyBudget: number;
  cookingTime: string;
}

const KITCHEN_EQUIPMENT = [
  { id: "olla", label: "Olla", icon: "🍲" },
  { id: "sarten", label: "Sartén", icon: "🍳" },
  { id: "horno", label: "Horno", icon: "🔥" },
  { id: "microondas", label: "Microondas", icon: "📡" },
  { id: "licuadora", label: "Licuadora", icon: "🥤" },
  { id: "olla-arrocera", label: "Olla Arrocera", icon: "🍚" },
  { id: "freidora-aire", label: "Freidora de Aire", icon: "🌬️" },
  { id: "batidora", label: "Batidora", icon: "🥄" },
  { id: "procesador", label: "Procesador", icon: "⚙️" },
  { id: "parrilla", label: "Parrilla", icon: "🥩" },
];

const COOKING_TIMES = [
  { id: "15min", label: "15 minutos", description: "Recetas ultra rápidas" },
  { id: "30min", label: "30 minutos", description: "Comidas del día a día" },
  { id: "45min", label: "45 minutos", description: "Más elaboradas" },
  { id: "60min", label: "1 hora o más", description: "Recetas especiales" },
];

const COMMON_RESTRICTIONS = [
  { id: "gluten", label: "Sin Gluten", icon: "🌾" },
  { id: "lactosa", label: "Sin Lactosa", icon: "🥛" },
  { id: "vegetariano", label: "Vegetariano", icon: "🥬" },
  { id: "vegano", label: "Vegano", icon: "🌱" },
  { id: "mariscos", label: "Sin Mariscos", icon: "🦐" },
  { id: "frutos-secos", label: "Sin Frutos Secos", icon: "🥜" },
  { id: "huevo", label: "Sin Huevo", icon: "🥚" },
  { id: "soya", label: "Sin Soya", icon: "🫘" },
];

const steps = [
  {
    id: "meals",
    title: "¿Qué has cocinado últimamente?",
    subtitle: "Cuéntanos sobre tus comidas de las últimas 2 semanas",
    icon: ChefHat,
    color: "mint",
  },
  {
    id: "restrictions",
    title: "Restricciones Alimentarias",
    subtitle: "¿Hay algo que no puedas comer por salud o preferencia?",
    icon: AlertCircle,
    color: "teal",
  },
  {
    id: "household",
    title: "¿Para cuántas personas cocinas?",
    subtitle: "Ajustaremos las porciones de las recetas",
    icon: Users,
    color: "sage",
  },
  {
    id: "equipment",
    title: "Tu Equipamiento de Cocina",
    subtitle: "¿Qué implementos tienes disponibles?",
    icon: Utensils,
    color: "lavender",
  },
  {
    id: "budget",
    title: "Presupuesto Semanal",
    subtitle: "¿Cuánto destinas para las compras de la semana?",
    icon: Wallet,
    color: "sage",
  },
  {
    id: "time",
    title: "Tiempo para Cocinar",
    subtitle: "¿Cuánto tiempo tienes disponible normalmente?",
    icon: Clock,
    color: "lavender",
  },
];

const colorVariants = {
  mint: {
    gradient: "from-[#a8e6cf] to-[#88d8c0]",
    glow: "rgba(168, 230, 207, 0.2)",
    bg: "bg-[#a8e6cf]/10",
    border: "border-[#a8e6cf]/30",
    text: "text-[#a8e6cf]",
  },
  teal: {
    gradient: "from-[#88d8c0] to-[#5fb8a0]",
    glow: "rgba(136, 216, 192, 0.2)",
    bg: "bg-[#88d8c0]/10",
    border: "border-[#88d8c0]/30",
    text: "text-[#88d8c0]",
  },
  sage: {
    gradient: "from-[#8bc99a] to-[#6ba87a]",
    glow: "rgba(139, 201, 154, 0.2)",
    bg: "bg-[#8bc99a]/10",
    border: "border-[#8bc99a]/30",
    text: "text-[#8bc99a]",
  },
  lavender: {
    gradient: "from-[#b8a9c9] to-[#9d8ec9]",
    glow: "rgba(184, 169, 201, 0.2)",
    bg: "bg-[#b8a9c9]/10",
    border: "border-[#b8a9c9]/30",
    text: "text-[#b8a9c9]",
  },
};

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    recentMeals: [],
    restrictions: [],
    householdSize: 2,
    kitchenEquipment: ["olla", "sarten"],
    weeklyBudget: 200,
    cookingTime: "30min",
  });
  const [mealInput, setMealInput] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const currentColor = steps[currentStep].color as keyof typeof colorVariants;
  const colors = colorVariants[currentColor];

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

  const addMeal = () => {
    if (mealInput.trim() && !data.recentMeals.includes(mealInput.trim())) {
      setData((prev) => ({
        ...prev,
        recentMeals: [...prev.recentMeals, mealInput.trim()],
      }));
      setMealInput("");
    }
  };

  const removeMeal = (meal: string) => {
    setData((prev) => ({
      ...prev,
      recentMeals: prev.recentMeals.filter((m) => m !== meal),
    }));
  };

  const toggleRestriction = (id: string) => {
    setData((prev) => ({
      ...prev,
      restrictions: prev.restrictions.includes(id)
        ? prev.restrictions.filter((r) => r !== id)
        : [...prev.restrictions, id],
    }));
  };

  const toggleEquipment = (id: string) => {
    setData((prev) => ({
      ...prev,
      kitchenEquipment: prev.kitchenEquipment.includes(id)
        ? prev.kitchenEquipment.filter((e) => e !== id)
        : [...prev.kitchenEquipment, id],
    }));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case "meals":
        return (
          <div className="space-y-6">
            <div className="flex gap-3">
              <Input
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMeal()}
                placeholder="Ej: Lomo saltado, Arroz con pollo..."
                className="flex-1 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <Button
                onClick={addMeal}
                size="lg"
                className={`bg-gradient-to-r ${colors.gradient} text-gray-900 font-semibold hover:opacity-90`}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[120px] p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <AnimatePresence mode="popLayout">
                {data.recentMeals.map((meal) => (
                  <motion.div
                    key={meal}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    layout
                  >
                    <Badge
                      variant="secondary"
                      className="h-9 px-4 gap-2 text-sm bg-white/10 hover:bg-white/15 border-white/10"
                    >
                      {meal}
                      <button
                        onClick={() => removeMeal(meal)}
                        className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center hover:bg-red-500/60 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
              {data.recentMeals.length === 0 && (
                <p className="text-white/30 text-sm w-full text-center py-8">
                  Agrega las comidas que has preparado recientemente...
                </p>
              )}
            </div>
          </div>
        );

      case "restrictions":
        return (
          <div className="grid grid-cols-2 gap-3">
            {COMMON_RESTRICTIONS.map((restriction) => {
              const isSelected = data.restrictions.includes(restriction.id);
              return (
                <motion.div
                  key={restriction.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? `${colors.bg} ${colors.border} border-2`
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
                    }`}
                    onClick={() => toggleRestriction(restriction.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <span className="text-2xl">{restriction.icon}</span>
                      <span className="font-medium text-sm flex-1">
                        {restriction.label}
                      </span>
                      <Checkbox
                        checked={isSelected}
                        className={isSelected ? "border-[#a8e6cf] bg-[#a8e6cf] text-gray-900" : ""}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        );

      case "household":
        return (
          <div className="space-y-10">
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    householdSize: Math.max(1, prev.householdSize - 1),
                  }))
                }
                className="w-14 h-14 rounded-full bg-white/5 border-white/10 hover:bg-white/10"
              >
                <Minus className="w-6 h-6" />
              </Button>
              <motion.div
                key={data.householdSize}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center min-w-[120px]"
              >
                <span className={`text-7xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                  {data.householdSize}
                </span>
                <p className="text-white/50 mt-2 text-lg">
                  {data.householdSize === 1 ? "persona" : "personas"}
                </p>
              </motion.div>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    householdSize: Math.min(12, prev.householdSize + 1),
                  }))
                }
                className="w-14 h-14 rounded-full bg-white/5 border-white/10 hover:bg-white/10"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Button
                  key={num}
                  variant={data.householdSize === num ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    setData((prev) => ({ ...prev, householdSize: num }))
                  }
                  className={`w-10 h-10 rounded-full ${
                    data.householdSize === num
                      ? `bg-gradient-to-r ${colors.gradient} text-gray-900`
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        );

      case "equipment":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {KITCHEN_EQUIPMENT.map((item) => {
              const isSelected = data.kitchenEquipment.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? `${colors.bg} ${colors.border} border-2`
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
                    }`}
                    onClick={() => toggleEquipment(item.id)}
                  >
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check className={`w-4 h-4 ${colors.text}`} />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        );

      case "budget":
        return (
          <div className="space-y-10">
            <motion.div
              key={data.weeklyBudget}
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <span className={`text-6xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                S/ {data.weeklyBudget}
              </span>
              <p className="text-white/50 mt-2 text-lg">por semana</p>
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
              <div className="flex justify-between text-sm text-white/40 mt-3">
                <span>S/ 50</span>
                <span>S/ 500</span>
              </div>
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {[100, 150, 200, 300, 400].map((amount) => (
                <Button
                  key={amount}
                  variant={data.weeklyBudget === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setData((prev) => ({ ...prev, weeklyBudget: amount }))
                  }
                  className={
                    data.weeklyBudget === amount
                      ? `bg-gradient-to-r ${colors.gradient} text-gray-900 border-0`
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }
                >
                  S/ {amount}
                </Button>
              ))}
            </div>
          </div>
        );

      case "time":
        return (
          <div className="space-y-3">
            {COOKING_TIMES.map((time) => {
              const isSelected = data.cookingTime === time.id;
              return (
                <motion.div
                  key={time.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? `bg-gradient-to-r ${colors.gradient}/10 ${colors.border} border-2`
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
                    }`}
                    onClick={() =>
                      setData((prev) => ({ ...prev, cookingTime: time.id }))
                    }
                  >
                    <CardContent className="p-5 flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? `bg-gradient-to-r ${colors.gradient}`
                            : "bg-white/10"
                        }`}
                      >
                        <Clock
                          className={`w-6 h-6 ${
                            isSelected ? "text-gray-900" : "text-white/60"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{time.label}</p>
                        <p className="text-sm text-white/50">{time.description}</p>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check className={`w-6 h-6 ${colors.text}`} />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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
        className="min-h-screen flex items-center justify-center p-6 animated-gradient"
      >
        <div className="text-center space-y-8 max-w-md">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
            className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-r from-[#a8e6cf] to-[#88d8c0] flex items-center justify-center shadow-2xl shadow-[#a8e6cf]/30"
          >
            <Sparkles className="w-16 h-16 text-gray-900" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold gradient-text">¡Todo Listo!</h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Ya conocemos tus preferencias. Ahora podemos sugerirte las mejores
              recetas personalizadas para ti.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              size="lg"
              className="h-14 px-10 text-lg bg-gradient-to-r from-[#a8e6cf] to-[#88d8c0] text-gray-900 font-bold shadow-xl shadow-[#a8e6cf]/20 hover:opacity-90"
            >
              Explorar Recetas
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
    <div className="min-h-screen flex flex-col animated-gradient">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl float-animation"
          style={{ background: colors.glow }}
          animate={{ background: colors.glow }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl float-animation"
          style={{ background: colors.glow, animationDelay: "-4s" }}
          animate={{ background: colors.glow }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={progress} className="h-1 rounded-none bg-white/5" />
      </div>

      {/* Step indicators */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 px-5 py-3 rounded-full glass">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? `w-8 bg-gradient-to-r ${colors.gradient}`
                  : index < currentStep
                  ? "w-2 bg-white/60"
                  : "w-2 bg-white/20"
              }`}
              layout
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6 pt-24 pb-32">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-8"
            >
              {/* Step header */}
              <div className="text-center space-y-5">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center shadow-xl`}
                  style={{ boxShadow: `0 20px 50px ${colors.glow}` }}
                >
                  <CurrentIcon className="w-10 h-10 text-gray-900" />
                </motion.div>
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {steps[currentStep].title}
                  </h1>
                  <p className="text-white/50 text-base">
                    {steps[currentStep].subtitle}
                  </p>
                </div>
              </div>

              {/* Step content */}
              <Card className="glass border-white/10 shadow-2xl">
                <CardContent className="p-6">{renderStepContent()}</CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`gap-2 h-12 px-6 ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Anterior
          </Button>

          <span className="text-white/40 text-sm font-medium">
            {currentStep + 1} de {steps.length}
          </span>

          <Button
            onClick={nextStep}
            size="lg"
            className={`gap-2 h-12 px-6 bg-gradient-to-r ${colors.gradient} text-gray-900 font-semibold shadow-lg hover:opacity-90`}
            style={{ boxShadow: `0 10px 30px ${colors.glow}` }}
          >
            {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
