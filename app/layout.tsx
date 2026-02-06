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
  title: "Pachamesa | De la tierra a tu mesa - Recetas peruanas saludables",
  description:
    "Planifica las comidas de tu familia con recetas nutritivas y economicas del Instituto Nacional de Salud (CENAN). Ahorra tiempo, dinero y come mejor.",
  keywords: [
    "planificador de comidas",
    "recetas peruanas",
    "nutricion familiar",
    "CENAN",
    "INS Peru",
    "comida saludable",
    "menu semanal",
    "recetas economicas",
    "Pachamesa",
    "comida peruana",
    "alimentacion saludable",
  ],
  authors: [{ name: "Pachamesa" }],
  openGraph: {
    title: "Pachamesa | De la tierra a tu mesa - Recetas peruanas saludables",
    description:
      "Recetas nutritivas y economicas respaldadas por el Instituto Nacional de Salud del Peru. Planifica las comidas de tu familia.",
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
