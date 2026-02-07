"use client";

import { useState } from "react";
import {
  User,
  Users,
  MapPin,
  Wallet,
  Clock,
  ShoppingCart,
  AlertCircle,
  ChevronRight,
  LogOut,
  Settings,
  Bell,
  HelpCircle,
  Star,
  Edit3,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import DashboardShell from "../components/DashboardShell";

// Types
interface UserPreferences {
  householdSize: number;
  cookingTime: string;
  weeklyBudget: number;
  shoppingPlaces: string[];
  restrictions: string[];
  departamento: string;
}

// Mock data - esto vendría de la base de datos
const MOCK_PREFERENCES: UserPreferences = {
  householdSize: 4,
  cookingTime: "normal",
  weeklyBudget: 200,
  shoppingPlaces: ["mercado", "supermercado"],
  restrictions: ["ninguna"],
  departamento: "lima",
};

const COOKING_TIME_LABELS: Record<string, string> = {
  quick: "Poco tiempo (15-20 min)",
  normal: "Normal (30-45 min)",
  relaxed: "Con calma (1 hora+)",
  varies: "Depende del día",
};

const SHOPPING_LABELS: Record<string, string> = {
  mercado: "Mercado",
  supermercado: "Supermercado",
  bodega: "Bodega",
  feria: "Feria",
};

const RESTRICTION_LABELS: Record<string, string> = {
  ninguna: "Sin restricciones",
  diabetes: "Diabetes",
  hipertension: "Hipertensión",
  gluten: "Sin gluten",
  lactosa: "Sin lactosa",
  vegetariano: "Vegetariano",
  vegano: "Vegano",
  mariscos: "Sin mariscos",
};

const DEPARTAMENTO_LABELS: Record<string, string> = {
  lima: "Lima",
  arequipa: "Arequipa",
  cusco: "Cusco",
  piura: "Piura",
  "la-libertad": "La Libertad",
};

// Componente: Setting Item
function SettingItem({
  icon: Icon,
  label,
  value,
  onClick,
}: Readonly<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onClick?: () => void;
}>) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 hover:bg-accent-yellow/20 rounded-xl transition-colors"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}

// Componente: Menu Item
function MenuItem({
  icon: Icon,
  label,
  onClick,
  variant = "default",
}: Readonly<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}>) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors ${
        variant === "danger"
          ? "hover:bg-red-50 text-red-500"
          : "hover:bg-accent-yellow/20 text-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left font-medium">{label}</span>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}

// Main Component
export default function PerfilClient({
  userName,
  userEmail,
  userImage,
}: Readonly<{
  userName: string;
  userEmail: string;
  userImage?: string;
}>) {
  const { signOut } = useClerk();
  const [preferences] = useState<UserPreferences>(MOCK_PREFERENCES);

  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <DashboardShell userName={userName} title="Mi Perfil" subtitle="Configura tu cuenta y preferencias">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* User Card */}
        <div className="bg-card rounded-2xl border border-card-border p-6">
          <div className="flex items-center gap-4">
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{userName.charAt(0)}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground">{userName}</h2>
              <p className="text-sm text-muted-foreground truncate">{userEmail}</p>
            </div>
            <button className="p-2 hover:bg-accent-yellow/50 rounded-xl transition-colors">
              <Edit3 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-card-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Recetas guardadas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">28</p>
              <p className="text-xs text-muted-foreground">Días planificados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">S/ 420</p>
              <p className="text-xs text-muted-foreground">Ahorro estimado</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
          <div className="p-4 border-b border-card-border">
            <h3 className="font-semibold text-foreground">Preferencias de cocina</h3>
            <p className="text-sm text-muted-foreground">
              Ajusta estos datos para mejores sugerencias
            </p>
          </div>

          <div className="divide-y divide-card-border">
            <SettingItem
              icon={Users}
              label="Tamaño del hogar"
              value={`${preferences.householdSize} personas`}
            />
            <SettingItem
              icon={Clock}
              label="Tiempo para cocinar"
              value={COOKING_TIME_LABELS[preferences.cookingTime]}
            />
            <SettingItem
              icon={Wallet}
              label="Presupuesto semanal"
              value={`S/ ${preferences.weeklyBudget}`}
            />
            <SettingItem
              icon={ShoppingCart}
              label="Lugares de compra"
              value={preferences.shoppingPlaces.map((p) => SHOPPING_LABELS[p]).join(", ")}
            />
            <SettingItem
              icon={AlertCircle}
              label="Restricciones alimentarias"
              value={preferences.restrictions.map((r) => RESTRICTION_LABELS[r]).join(", ")}
            />
            <SettingItem
              icon={MapPin}
              label="Departamento"
              value={DEPARTAMENTO_LABELS[preferences.departamento] || preferences.departamento}
            />
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
          <div className="p-4 border-b border-card-border">
            <h3 className="font-semibold text-foreground">Configuración</h3>
          </div>

          <div className="p-2">
            <MenuItem icon={Bell} label="Notificaciones" />
            <MenuItem icon={Settings} label="Ajustes de la app" />
            <MenuItem icon={HelpCircle} label="Ayuda y soporte" />
            <MenuItem icon={Star} label="Calificar la app" />
          </div>
        </div>

        {/* Sign Out */}
        <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
          <div className="p-2">
            <MenuItem icon={LogOut} label="Cerrar sesión" onClick={handleSignOut} variant="danger" />
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Misky v1.0.0</p>
          <p className="mt-1">
            Datos de recetas por{" "}
            <span className="font-medium text-foreground">CENAN / INS Perú</span>
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
