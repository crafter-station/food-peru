"use server";

import { auth } from "@clerk/nextjs/server";
// import { db } from "@/db";
// import { userPreferences } from "@/db/schema";
// import { eq } from "drizzle-orm";

export interface OnboardingData {
  householdSize: number;
  children: { ageGroup: string; count: number }[];
  cookingTime: string;
  weeklyBudget: number;
  shoppingPlace: string[];
  restrictions: string[];
  departamento: string;
}

export async function saveOnboardingData(data: OnboardingData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  // TODO: Descomentar cuando Drizzle esté configurado
  // await db
  //   .insert(userPreferences)
  //   .values({
  //     userId,
  //     householdSize: data.householdSize,
  //     children: data.children,
  //     cookingTime: data.cookingTime,
  //     weeklyBudget: data.weeklyBudget,
  //     shoppingPlaces: data.shoppingPlace,
  //     restrictions: data.restrictions,
  //     departamento: data.departamento,
  //     onboardingCompleted: true,
  //   })
  //   .onConflictDoUpdate({
  //     target: userPreferences.userId,
  //     set: {
  //       householdSize: data.householdSize,
  //       children: data.children,
  //       cookingTime: data.cookingTime,
  //       weeklyBudget: data.weeklyBudget,
  //       shoppingPlaces: data.shoppingPlace,
  //       restrictions: data.restrictions,
  //       departamento: data.departamento,
  //       onboardingCompleted: true,
  //     },
  //   });

  // Temporalmente solo logueamos los datos
  console.log("📝 Onboarding data to save:", { userId, ...data });

  return { success: true };
}

export async function getUserPreferences() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // TODO: Descomentar cuando Drizzle esté configurado
  // const preferences = await db.query.userPreferences.findFirst({
  //   where: eq(userPreferences.userId, userId),
  // });
  //
  // return preferences;

  return null;
}

export async function checkOnboardingStatus() {
  const { userId } = await auth();

  if (!userId) {
    return { completed: false, userId: null };
  }

  // TODO: Descomentar cuando Drizzle esté configurado
  // const preferences = await db.query.userPreferences.findFirst({
  //   where: eq(userPreferences.userId, userId),
  //   columns: { onboardingCompleted: true },
  // });
  //
  // return {
  //   completed: preferences?.onboardingCompleted ?? false,
  //   userId,
  // };

  // Temporalmente siempre retorna false (onboarding no completado)
  return { completed: false, userId };
}
