import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import ComprasClient from "./ComprasClient";

export const metadata: Metadata = {
  title: "Lista de Compras | Misky",
  description: "Tu lista de compras para la semana.",
};

export default async function ComprasPage() {
  const user = await currentUser();
  return <ComprasClient userName={user?.firstName || "Usuario"} />;
}
