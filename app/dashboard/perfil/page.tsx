import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import PerfilClient from "./PerfilClient";

export const metadata: Metadata = {
  title: "Mi Perfil | Pachamesa",
  description: "Configura tu perfil y preferencias.",
};

export default async function PerfilPage() {
  const user = await currentUser();

  return (
    <PerfilClient
      userName={user?.firstName || "Usuario"}
      userEmail={user?.emailAddresses[0]?.emailAddress || ""}
      userImage={user?.imageUrl}
    />
  );
}
