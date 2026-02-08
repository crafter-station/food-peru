import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { getUserPreferences } from "@/app/actions/onboarding";
import PerfilClient from "./PerfilClient";

export const metadata: Metadata = {
  title: "Mi Perfil | Misky",
  description: "Configura tu perfil y preferencias.",
};

export default async function PerfilPage() {
  const user = await currentUser();
  const preferences = await getUserPreferences();

  return (
    <PerfilClient
      userName={user?.firstName || "Usuario"}
      userEmail={user?.emailAddresses[0]?.emailAddress || ""}
      userImage={user?.imageUrl}
      initialPreferences={preferences}
    />
  );
}
