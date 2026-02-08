import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { getRecetaById, getRecetas } from "@/app/actions/recetas";
import RecetasClient from "./RecetasClient";

export const metadata: Metadata = {
  title: "Recetas | Misky",
  description: "Explora recetas peruanas saludables.",
};

export default async function RecetasPage() {
  const user = await currentUser();
  const initialRecetas = await getRecetas();
  return (
    <RecetasClient
      userName={user?.firstName || "Usuario"}
      initialRecetas={initialRecetas}
      getRecetaById={getRecetaById}
    />
  );
}
