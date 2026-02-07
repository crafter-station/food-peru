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
  title: "Misky — ¿Qué comemos hoy?",
  description:
    "Misky te ayuda a planear la comida de tu familia sin complicarte. Recetas con ingredientes del mercado, porciones exactas y sin gastar de más.",
  keywords: [
    "planificador de comidas",
    "recetas peruanas",
    "qué cocinar hoy",
    "comida familiar",
    "recetas fáciles",
    "menú semanal",
    "recetas económicas",
    "Misky",
    "comida peruana",
  ],
  authors: [{ name: "Misky" }],
  openGraph: {
    title: "Misky — ¿Qué comemos hoy?",
    description:
      "Planea la comida de tu familia sin complicarte. Recetas con ingredientes del mercado, porciones exactas y sin gastar de más.",
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
