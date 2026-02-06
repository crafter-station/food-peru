import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import RecetasClient from "./RecetasClient";

export const metadata: Metadata = {
  title: "Recetas | Pachamesa",
  description: "Explora más de 500 recetas peruanas saludables.",
};

export default async function RecetasPage() {
  const user = await currentUser();
  return <RecetasClient userName={user?.firstName || "Usuario"} />;
}
