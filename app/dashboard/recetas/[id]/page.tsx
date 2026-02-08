import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getRecetaById } from "@/app/actions/recetas";
import RecetaDetailClient from "./RecetaDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecetaById(Number(id));
  if (!recipe) return { title: "Receta | Misky" };
  return {
    title: `${recipe.name} | Recetas | Misky`,
    description: recipe.ingredientsText
      ? recipe.ingredientsText.slice(0, 150) + "..."
      : `Receta: ${recipe.name}`,
  };
}

export default async function RecetaDetailPage({ params }: Props) {
  const { id } = await params;
  const recipeId = Number(id);
  if (Number.isNaN(recipeId)) notFound();

  const recipe = await getRecetaById(recipeId);
  if (!recipe) notFound();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-card-border bg-card/50 sticky top-0 z-10">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
          <Link
            href="/dashboard/recetas"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a recetas
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <RecetaDetailClient recipe={recipe} />
      </main>
    </div>
  );
}
