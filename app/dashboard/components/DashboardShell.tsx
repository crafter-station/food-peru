"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Leaf,
  Search,
  ShoppingCart,
  Calendar,
  User,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", icon: Home, href: "/dashboard" },
  { id: "recetas", label: "Recetas", icon: Search, href: "/dashboard/recetas" },
  { id: "compras", label: "Compras", icon: ShoppingCart, href: "/dashboard/compras" },
  { id: "plan", label: "Plan", icon: Calendar, href: "/dashboard/plan" },
  { id: "perfil", label: "Perfil", icon: User, href: "/dashboard/perfil" },
];

// Desktop Sidebar
function DesktopSidebar({ currentPath }: Readonly<{ currentPath: string }>) {
  const getActiveItem = () => {
    if (currentPath === "/dashboard") return "inicio";
    const segment = currentPath.split("/")[2];
    return segment || "inicio";
  };

  const activeItem = getActiveItem();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-card-border h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-card-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">Misky</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-primary-light text-primary font-semibold"
                      : "text-muted-foreground hover:bg-accent-yellow/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-card-border">
        <Link
          href="/dashboard/perfil"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-yellow/30 hover:bg-accent-yellow/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">Mi cuenta</p>
            <p className="text-xs text-muted-foreground">Configuración</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}

// Bottom Navigation (Mobile)
function BottomNavigation({ currentPath }: Readonly<{ currentPath: string }>) {
  const getActiveItem = () => {
    if (currentPath === "/dashboard") return "inicio";
    const segment = currentPath.split("/")[2];
    return segment || "inicio";
  };

  const activeItem = getActiveItem();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border lg:hidden z-50">
      <div className="px-2 sm:px-4">
        <div className="flex items-center justify-around py-2 sm:py-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

// Mobile Menu Drawer
function MobileMenuDrawer({
  isOpen,
  onClose,
  userName,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}>) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-card shadow-xl">
        <div className="p-4 border-b border-card-border flex items-center justify-between">
          <span className="font-semibold text-foreground">Menú</span>
          <button onClick={onClose} className="p-2 hover:bg-accent-yellow/50 rounded-xl">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div className="p-4 border-b border-card-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-medium text-primary">{userName.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium text-foreground">{userName}</p>
              <p className="text-sm text-muted-foreground">Ver perfil</p>
            </div>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-accent-yellow/50 hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

// Mobile Header
function MobileHeader({
  userName,
  title,
  onMenuToggle,
}: Readonly<{
  userName: string;
  title: string;
  onMenuToggle: () => void;
}>) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-card-border lg:hidden">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">Misky</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">Hola, {userName}</span>
            <button
              onClick={onMenuToggle}
              className="p-2 hover:bg-accent-yellow/50 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
        <h1 className="mt-2 text-lg font-semibold text-foreground">{title}</h1>
      </div>
    </header>
  );
}

// Desktop Header
function DesktopHeader({
  userName,
  title,
  subtitle,
}: Readonly<{
  userName: string;
  title: string;
  subtitle?: string;
}>) {
  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-6 border-b border-card-border bg-card/50">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Hola, {userName}</span>
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">{userName.charAt(0)}</span>
        </div>
      </div>
    </header>
  );
}

// Main Shell Component
export default function DashboardShell({
  children,
  userName,
  title,
  subtitle,
}: Readonly<{
  children: React.ReactNode;
  userName: string;
  title: string;
  subtitle?: string;
}>) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <DesktopSidebar currentPath={pathname} />

      <div className="flex-1 flex flex-col min-h-screen">
        <MobileHeader
          userName={userName}
          title={title}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />
        <DesktopHeader userName={userName} title={title} subtitle={subtitle} />

        <main className="flex-1 pb-24 lg:pb-8">{children}</main>
      </div>

      <BottomNavigation currentPath={pathname} />
      <MobileMenuDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        userName={userName}
      />
    </div>
  );
}
