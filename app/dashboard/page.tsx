import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import DashboardHomeClient from "./DashboardHomeClient";

export const metadata: Metadata = {
  title: "Mi Plan | PlatoSano",
  description: "Tu planificador de comidas personalizado.",
};

export default async function DashboardPage() {
  const user = await currentUser();
  return <DashboardHomeClient userName={user?.firstName || "Usuario"} />;
}
