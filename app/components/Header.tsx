"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-card-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-foreground">Pachamesa</span>
            <span className="hidden text-[10px] font-medium text-primary sm:block">
              De la tierra a tu mesa
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#como-funciona"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Como funciona
          </a>
          <a
            href="#recetas"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Recetas
          </a>
          <a
            href="#confianza"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Respaldo
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <Link
              href="/login"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Iniciar sesion
            </Link>
            <Link
              href="/registro"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-all hover:bg-primary-hover"
            >
              Comenzar
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Mi panel
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
