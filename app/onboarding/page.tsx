import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Onboarding from "@/app/components/Onboarding";

export const metadata: Metadata = {
  title: "Configura tu perfil | PlatoSano",
  description:
    "Cuéntanos sobre tu familia para personalizar tus recetas y menús.",
};

export default async function OnboardingPage() {
  const { userId } = await auth();

  // Si no está autenticado, redirigir al registro
  if (!userId) {
    redirect("/registro");
  }

  return <Onboarding />;
}
