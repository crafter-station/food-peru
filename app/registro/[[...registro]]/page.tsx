import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crear cuenta | PlatoSano",
  description:
    "Regístrate en PlatoSano para planificar tus comidas con recetas peruanas saludables.",
};

export default function RegistroPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-card-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg">
              <span role="img" aria-label="PlatoSano logo">
                🍲
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">PlatoSano</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border border-card-border",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary:
                  "bg-primary hover:bg-primary-hover text-white",
                footerActionLink: "text-primary hover:text-primary-hover",
              },
              variables: {
                colorPrimary: "#E5A93D",
                colorBackground: "#FFFFFF",
                colorText: "#2D2A26",
                colorTextSecondary: "#6B6B6B",
                borderRadius: "0.75rem",
              },
            }}
            forceRedirectUrl="/onboarding"
            signInUrl="/login"
          />

          {/* Back to home */}
          <p className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
