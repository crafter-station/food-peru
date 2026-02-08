"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  Baby,
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
  X,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import DashboardShell from "../components/DashboardShell";
import { Button } from "@/components/ui/button";
import {
  getDepartmentLabel,
  getCookingTimeLabel,
  getShoppingPlaceLabel,
  getRestrictionLabel,
  CHILD_AGE_GROUPS,
} from "@/lib/preferences-constants";
import { saveOnboardingData, getUserPreferences } from "@/app/actions/onboarding";
import type { OnboardingData } from "@/app/actions/onboarding";
import {
  HouseholdSizePicker,
  ChildrenPicker,
  CookingTimePicker,
  BudgetPicker,
  ShoppingPlacePicker,
  RestrictionsPicker,
  DepartmentPicker,
} from "@/components/preferences/PreferenceEditors";
import type { ChildGroup } from "@/components/preferences/PreferenceEditors";

type UserPreferencesRow = NonNullable<Awaited<ReturnType<typeof getUserPreferences>>>;

type PreferencesForProfile = {
  householdSize: number;
  children: ChildGroup[];
  cookingTime: string;
  weeklyBudget: number;
  shoppingPlaces: string[];
  restrictions: string[];
  departamento: string;
};

const DEFAULT_PREFERENCES: PreferencesForProfile = {
  householdSize: 4,
  children: [],
  cookingTime: "normal",
  weeklyBudget: 200,
  shoppingPlaces: ["mercado"],
  restrictions: [],
  departamento: "lima",
};

function preferencesFromDb(row: UserPreferencesRow): PreferencesForProfile {
  return {
    householdSize: row.householdSize,
    children: (row.children ?? []) as ChildGroup[],
    cookingTime: row.cookingTime,
    weeklyBudget: row.weeklyBudget,
    shoppingPlaces: (row.shoppingPlaces ?? []) as string[],
    restrictions: (row.restrictions ?? []) as string[],
    departamento: row.departamento,
  };
}

function formatChildrenSummary(children: ChildGroup[]): string {
  if (children.length === 0) return "No hay niños";
  const parts = children
    .filter((c) => c.count > 0)
    .map((c) => {
      const group = CHILD_AGE_GROUPS.find((g) => g.id === c.ageGroup);
      return `${c.count} ${group?.label ?? c.ageGroup}`;
    });
  return parts.length > 0 ? parts.join(", ") : "No hay niños";
}

/* ──── Sección dentro del modal ──── */
function EditSection({
  icon: Icon,
  title,
  children,
}: Readonly<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#FFF8E1] flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#FFB800]" />
        </div>
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ──── Setting Item (lectura) ──── */
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
      type="button"
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

/* ──── Menu Item ──── */
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
      type="button"
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

/* ═══════════════════════════════════════════════════
   Componente principal
   ═══════════════════════════════════════════════════ */

export default function PerfilClient({
  userName,
  userEmail,
  userImage,
  initialPreferences,
}: Readonly<{
  userName: string;
  userEmail: string;
  userImage?: string;
  initialPreferences: UserPreferencesRow | null;
}>) {
  const { signOut } = useClerk();
  const [preferences, setPreferences] = useState<PreferencesForProfile>(() =>
    initialPreferences ? preferencesFromDb(initialPreferences) : { ...DEFAULT_PREFERENCES },
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<PreferencesForProfile>({ ...preferences });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPreferences) {
      setPreferences(preferencesFromDb(initialPreferences));
    }
  }, [initialPreferences]);

  /* ESC para cerrar */
  useEffect(() => {
    if (!showEditModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowEditModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showEditModal]);

  const openEditModal = useCallback(() => {
    setEditForm({ ...preferences });
    setError(null);
    setShowEditModal(true);
  }, [preferences]);

  const handleSavePreferences = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const data: OnboardingData = {
        householdSize: editForm.householdSize,
        children: editForm.children,
        cookingTime: editForm.cookingTime,
        weeklyBudget: editForm.weeklyBudget,
        shoppingPlace: editForm.shoppingPlaces,
        restrictions: editForm.restrictions,
        departamento: editForm.departamento,
      };
      await saveOnboardingData(data);
      setPreferences({ ...editForm });
      setShowEditModal(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }, [editForm]);

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
              <Image
                src={userImage}
                alt={userName}
                width={64}
                height={64}
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
            <button type="button" className="p-2 hover:bg-accent-yellow/50 rounded-xl transition-colors">
              <Edit3 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-card-border">
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
          </div> */}
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
          <div className="p-4 border-b border-card-border flex items-center justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">Preferencias de cocina</h3>
              <p className="text-sm text-muted-foreground">Ajusta estos datos para mejores sugerencias</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={openEditModal}>
              Editar
            </Button>
          </div>

          <div className="divide-y divide-card-border">
            <SettingItem
              icon={Users}
              label="Tamaño del hogar"
              value={`${preferences.householdSize} personas`}
              onClick={openEditModal}
            />
            <SettingItem
              icon={Baby}
              label="Niños en casa"
              value={formatChildrenSummary(preferences.children)}
              onClick={openEditModal}
            />
            <SettingItem
              icon={Clock}
              label="Tiempo para cocinar"
              value={getCookingTimeLabel(preferences.cookingTime)}
              onClick={openEditModal}
            />
            <SettingItem
              icon={Wallet}
              label="Presupuesto semanal"
              value={`S/ ${preferences.weeklyBudget}`}
              onClick={openEditModal}
            />
            <SettingItem
              icon={ShoppingCart}
              label="Lugares de compra"
              value={
                preferences.shoppingPlaces.length > 0
                  ? preferences.shoppingPlaces.map(getShoppingPlaceLabel).join(", ")
                  : "—"
              }
              onClick={openEditModal}
            />
            <SettingItem
              icon={AlertCircle}
              label="Restricciones alimentarias"
              value={
                preferences.restrictions.length > 0
                  ? preferences.restrictions.map(getRestrictionLabel).join(", ")
                  : "Ninguna"
              }
              onClick={openEditModal}
            />
            <SettingItem
              icon={MapPin}
              label="Departamento"
              value={getDepartmentLabel(preferences.departamento)}
              onClick={openEditModal}
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

        <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
          <div className="p-2">
            <MenuItem icon={LogOut} label="Cerrar sesión" onClick={handleSignOut} variant="danger" />
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Misky v1.0.0</p>
          <p className="mt-1">
            Datos de recetas por <span className="font-medium text-foreground">CENAN / INS Perú</span>
          </p>
        </div>
      </div>

      {/* ════════ Modal Editar Preferencias ════════ */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-preferences-title"
          onClick={(e) => e.target === e.currentTarget && setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-lg max-h-[92vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <h2 id="edit-preferences-title" className="text-lg font-bold text-gray-800">
                Editar preferencias
              </h2>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 p-5 space-y-8">
              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{error}</p>
              )}

              <EditSection icon={Users} title="Tamaño del hogar">
                <HouseholdSizePicker
                  value={editForm.householdSize}
                  onChange={(v) => setEditForm((prev) => ({ ...prev, householdSize: v }))}
                />
              </EditSection>

              <EditSection icon={Baby} title="Niños en casa">
                <ChildrenPicker
                  value={editForm.children}
                  onChange={(v) => setEditForm((prev) => ({ ...prev, children: v }))}
                />
              </EditSection>

              <EditSection icon={Clock} title="Tiempo para cocinar">
                <CookingTimePicker
                  value={editForm.cookingTime}
                  onChange={(v) => setEditForm((prev) => ({ ...prev, cookingTime: v }))}
                />
              </EditSection>

              <EditSection icon={Wallet} title="Presupuesto semanal">
                <BudgetPicker
                  value={editForm.weeklyBudget}
                  onChange={(v) => setEditForm((prev) => ({ ...prev, weeklyBudget: v }))}
                />
              </EditSection>

              <EditSection icon={ShoppingCart} title="Lugares de compra">
                <ShoppingPlacePicker
                  value={editForm.shoppingPlaces}
                  onChange={(v) => setEditForm((prev) => ({ ...prev, shoppingPlaces: v }))}
                />
              </EditSection>

              <EditSection icon={AlertCircle} title="Restricciones alimentarias">
                <RestrictionsPicker
                  value={editForm.restrictions}
                  onChange={(v) => setEditForm((prev) => ({ ...prev, restrictions: v }))}
                />
              </EditSection>

              <EditSection icon={MapPin} title="Departamento">
                <DepartmentPicker
                  value={editForm.departamento}
                  onChange={(v) => setEditForm((prev) => ({ ...prev, departamento: v }))}
                />
              </EditSection>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 shrink-0">
              <Button
                type="button"
                onClick={handleSavePreferences}
                disabled={saving}
                className="w-full h-12 text-base bg-[#FFB800] hover:bg-[#E5A600] text-white font-semibold rounded-2xl"
              >
                {saving ? "Guardando…" : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
