"use client";

import { useState } from "react";
import {
  Check,
  Plus,
  Trash2,
  ShoppingCart,
  Share2,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import DashboardShell from "../components/DashboardShell";

// Types
interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  category: string;
  isChecked: boolean;
  estimatedPrice?: number;
}

// Mock data
const MOCK_SHOPPING_LIST: ShoppingItem[] = [
  // Carnes
  { id: "1", name: "Pechuga de pollo", amount: "1", unit: "kg", category: "Carnes", isChecked: false, estimatedPrice: 15.0 },
  { id: "2", name: "Lomo de res", amount: "500", unit: "g", category: "Carnes", isChecked: true, estimatedPrice: 25.0 },
  // Verduras
  { id: "3", name: "Cebolla roja", amount: "4", unit: "unidades", category: "Verduras", isChecked: false, estimatedPrice: 3.0 },
  { id: "4", name: "Tomate", amount: "6", unit: "unidades", category: "Verduras", isChecked: false, estimatedPrice: 4.0 },
  { id: "5", name: "Ají amarillo", amount: "8", unit: "unidades", category: "Verduras", isChecked: true, estimatedPrice: 2.0 },
  { id: "6", name: "Papa amarilla", amount: "1", unit: "kg", category: "Verduras", isChecked: false, estimatedPrice: 5.0 },
  { id: "7", name: "Culantro", amount: "2", unit: "atados", category: "Verduras", isChecked: false, estimatedPrice: 2.0 },
  // Abarrotes
  { id: "8", name: "Arroz", amount: "2", unit: "kg", category: "Abarrotes", isChecked: false, estimatedPrice: 8.0 },
  { id: "9", name: "Aceite vegetal", amount: "1", unit: "litro", category: "Abarrotes", isChecked: true, estimatedPrice: 10.0 },
  { id: "10", name: "Sillao", amount: "1", unit: "botella", category: "Abarrotes", isChecked: false, estimatedPrice: 5.0 },
  // Lácteos
  { id: "11", name: "Leche evaporada", amount: "2", unit: "tarros", category: "Lácteos", isChecked: false, estimatedPrice: 6.0 },
  { id: "12", name: "Queso parmesano", amount: "100", unit: "g", category: "Lácteos", isChecked: false, estimatedPrice: 8.0 },
  // Otros
  { id: "13", name: "Huevos", amount: "1", unit: "docena", category: "Otros", isChecked: false, estimatedPrice: 8.0 },
  { id: "14", name: "Pan de molde", amount: "1", unit: "bolsa", category: "Otros", isChecked: true, estimatedPrice: 5.0 },
];

const CATEGORIES = ["Carnes", "Verduras", "Abarrotes", "Lácteos", "Otros"];

const CATEGORY_EMOJIS: Record<string, string> = {
  Carnes: "🥩",
  Verduras: "🥬",
  Abarrotes: "🛒",
  Lácteos: "🥛",
  Otros: "📦",
};

// Componente: Item de la lista
function ShoppingItemRow({
  item,
  onToggle,
  onDelete,
}: Readonly<{
  item: ShoppingItem;
  onToggle: () => void;
  onDelete: () => void;
}>) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
        item.isChecked ? "bg-accent-green/30" : "bg-card hover:bg-accent-yellow/20"
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
          item.isChecked
            ? "bg-success text-white"
            : "border-2 border-card-border hover:border-success"
        }`}
      >
        {item.isChecked && <Check className="w-4 h-4" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-medium ${item.isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}>
          {item.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {item.amount} {item.unit}
        </p>
      </div>

      {item.estimatedPrice && (
        <span className={`text-sm font-medium ${item.isChecked ? "text-muted-foreground" : "text-primary"}`}>
          S/ {item.estimatedPrice.toFixed(2)}
        </span>
      )}

      <button
        onClick={onDelete}
        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// Componente: Categoría colapsable
function CategorySection({
  category,
  items,
  onToggleItem,
  onDeleteItem,
}: Readonly<{
  category: string;
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}>) {
  const [isExpanded, setIsExpanded] = useState(true);
  const checkedCount = items.filter((i) => i.isChecked).length;
  const totalPrice = items.reduce((sum, i) => sum + (i.estimatedPrice || 0), 0);

  return (
    <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-accent-yellow/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{CATEGORY_EMOJIS[category]}</span>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{category}</h3>
            <p className="text-sm text-muted-foreground">
              {checkedCount}/{items.length} completados • S/ {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Items */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          {items.map((item) => (
            <ShoppingItemRow
              key={item.id}
              item={item}
              onToggle={() => onToggleItem(item.id)}
              onDelete={() => onDeleteItem(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main Component
export default function ComprasClient({ userName }: Readonly<{ userName: string }>) {
  const [shoppingList, setShoppingList] = useState(MOCK_SHOPPING_LIST);
  const [newItemName, setNewItemName] = useState("");

  const handleToggleItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      amount: "1",
      unit: "unidad",
      category: "Otros",
      isChecked: false,
    };
    setShoppingList((prev) => [...prev, newItem]);
    setNewItemName("");
  };

  const groupedItems = CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = shoppingList.filter((item) => item.category === category);
      return acc;
    },
    {} as Record<string, ShoppingItem[]>
  );

  const totalItems = shoppingList.length;
  const checkedItems = shoppingList.filter((i) => i.isChecked).length;
  const totalPrice = shoppingList.reduce((sum, i) => sum + (i.estimatedPrice || 0), 0);
  const remainingPrice = shoppingList
    .filter((i) => !i.isChecked)
    .reduce((sum, i) => sum + (i.estimatedPrice || 0), 0);

  return (
    <DashboardShell userName={userName} title="Lista de Compras" subtitle="Ingredientes para tu plan semanal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-card rounded-xl border border-card-border p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{totalItems}</p>
            <p className="text-xs text-muted-foreground">Items totales</p>
          </div>
          <div className="bg-card rounded-xl border border-card-border p-4 text-center">
            <p className="text-2xl font-bold text-success">{checkedItems}</p>
            <p className="text-xs text-muted-foreground">Completados</p>
          </div>
          <div className="bg-card rounded-xl border border-card-border p-4 text-center">
            <p className="text-2xl font-bold text-primary">S/ {totalPrice.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">Total estimado</p>
          </div>
          <div className="bg-card rounded-xl border border-card-border p-4 text-center">
            <p className="text-2xl font-bold text-secondary">S/ {remainingPrice.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">Por comprar</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-card rounded-xl border border-card-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progreso de compras</span>
            <span className="text-sm text-muted-foreground">
              {checkedItems}/{totalItems}
            </span>
          </div>
          <div className="h-3 bg-card-border rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all duration-300"
              style={{ width: `${(checkedItems / totalItems) * 100}%` }}
            />
          </div>
        </div>

        {/* Add Item */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Agregar item..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            className="flex-1 h-12 px-4 rounded-xl border border-card-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddItem}
            className="h-12 px-6 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {CATEGORIES.map((category) => {
            const items = groupedItems[category];
            if (items.length === 0) return null;
            return (
              <CategorySection
                key={category}
                category={category}
                items={items}
                onToggleItem={handleToggleItem}
                onDeleteItem={handleDeleteItem}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {shoppingList.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🛒</span>
            <h3 className="text-xl font-bold text-foreground mb-2">Lista vacía</h3>
            <p className="text-muted-foreground mb-4">
              Planifica tus comidas y generaremos tu lista de compras automáticamente.
            </p>
            <a
              href="/dashboard/plan"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-colors"
            >
              Ir al Plan Semanal
            </a>
          </div>
        )}

        {/* Actions */}
        {shoppingList.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-3 border-2 border-card-border text-foreground font-medium rounded-xl flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
              <Share2 className="w-5 h-5" />
              Compartir lista
            </button>
            <button className="flex-1 py-3 border-2 border-card-border text-foreground font-medium rounded-xl flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
              <Download className="w-5 h-5" />
              Descargar PDF
            </button>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
