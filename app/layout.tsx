import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlatoSano | Planifica tus comidas con recetas peruanas saludables",
  description:
    "Planifica las comidas de tu familia con recetas nutritivas y económicas del Instituto Nacional de Salud (CENAN). Ahorra tiempo, dinero y come mejor.",
  keywords: [
    "planificador de comidas",
    "recetas peruanas",
    "nutrición familiar",
    "CENAN",
    "INS Perú",
    "comida saludable",
    "menú semanal",
    "recetas económicas",
    "PlatoSano",
  ],
  authors: [{ name: "PlatoSano" }],
  openGraph: {
    title: "PlatoSano | Planifica tus comidas con recetas peruanas saludables",
    description:
      "Recetas nutritivas y económicas respaldadas por el Instituto Nacional de Salud del Perú.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
