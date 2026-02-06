import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import PlanClient from "./PlanClient";

export const metadata: Metadata = {
  title: "Plan Semanal | Pachamesa",
  description: "Tu planificación de comidas para la semana.",
};

export default async function PlanPage() {
  const user = await currentUser();
  return <PlanClient userName={user?.firstName || "Usuario"} />;
}
