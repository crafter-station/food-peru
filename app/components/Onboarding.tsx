"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { saveOnboardingData } from "@/app/actions/onboarding";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  HouseholdSizePicker,
  ChildrenPicker,
  CookingTimePicker,
  BudgetPicker,
  ShoppingPlacePicker,
  RestrictionsPicker,
  DepartmentPicker,
} from "@/components/preferences/PreferenceEditors";
import type { ChildGroup } from "@/components/preferences/PreferenceEditors";

interface OnboardingData {
  householdSize: number;
  children: ChildGroup[];
  cookingTime: string;
  weeklyBudget: number;
  shoppingPlace: string[];
  restrictions: string[];
  departamento: string;
}

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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    householdSize: 4,
    children: [],
    cookingTime: "normal",
    weeklyBudget: 200,
    shoppingPlace: ["mercado"],
    restrictions: [],
    departamento: "lima",
  });
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSaving(true);
      try {
        await saveOnboardingData({
          householdSize: data.householdSize,
          children: data.children,
          cookingTime: data.cookingTime,
          weeklyBudget: data.weeklyBudget,
          shoppingPlace: data.shoppingPlace,
          restrictions: data.restrictions,
          departamento: data.departamento,
        });
        setIsComplete(true);
      } catch (error) {
        console.error("Error guardando onboarding:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case "household":
        return (
          <HouseholdSizePicker
            value={data.householdSize}
            onChange={(v) => setData((prev) => ({ ...prev, householdSize: v }))}
          />
        );

      case "children":
        return (
          <ChildrenPicker
            value={data.children}
            onChange={(v) => setData((prev) => ({ ...prev, children: v }))}
          />
        );

      case "time":
        return (
          <CookingTimePicker
            value={data.cookingTime}
            onChange={(v) => setData((prev) => ({ ...prev, cookingTime: v }))}
          />
        );

      case "budget":
        return (
          <BudgetPicker
            value={data.weeklyBudget}
            onChange={(v) => setData((prev) => ({ ...prev, weeklyBudget: v }))}
          />
        );

      case "shopping":
        return (
          <ShoppingPlacePicker
            value={data.shoppingPlace}
            onChange={(v) => setData((prev) => ({ ...prev, shoppingPlace: v }))}
          />
        );

      case "restrictions":
        return (
          <RestrictionsPicker
            value={data.restrictions}
            onChange={(v) => setData((prev) => ({ ...prev, restrictions: v }))}
          />
        );

      case "departamento":
        return (
          <DepartmentPicker
            value={data.departamento}
            onChange={(v) => setData((prev) => ({ ...prev, departamento: v }))}
          />
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
              onClick={() => router.push("/dashboard")}
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
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Progress value={progress} className="h-1 rounded-none" />
      </div>

      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 pt-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`p-2 rounded-full transition-colors ${
              currentStep === 0 ? "opacity-0 pointer-events-none" : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-400">
            {currentStep + 1} de {steps.length}
          </span>
          <div className="w-10" />
        </div>
      </div>

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
                <p className="text-gray-400">{steps[currentStep].subtitle}</p>
              </div>

              <Card className="card-shadow border-0 rounded-3xl bg-white">
                <CardContent className="p-6">{renderStepContent()}</CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-linear-to-t from-gray-50 via-gray-50 to-transparent">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={nextStep}
            disabled={isSaving}
            size="lg"
            className="w-full h-14 text-lg bg-[#FFB800] hover:bg-[#E5A600] text-white font-semibold rounded-2xl btn-primary-glow disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Guardando...
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                Finalizar
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
