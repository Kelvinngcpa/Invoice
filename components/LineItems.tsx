"use client";

import { LineItem } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
  currency: string;
}

export default function LineItems({ items, onChange, currency }: Props) {
  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        rate: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      onChange(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-12 gap-2 text-sm font-medium text-slate-500 px-1">
        <div className="col-span-6">Description</div>
        <div className="col-span-2">Qty</div>
        <div className="col-span-2">Rate</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
          <input
            className="col-span-6 px-3 py-2 border rounded-lg text-sm"
            placeholder="Item description"
            value={item.description}
            onChange={(e) => updateItem(item.id, "description", e.target.value)}
          />
          <input
            type="number"
            className="col-span-2 px-3 py-2 border rounded-lg text-sm"
            value={item.quantity}
            min={0}
            onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
          />
          <input
            type="number"
            className="col-span-2 px-3 py-2 border rounded-lg text-sm"
            value={item.rate}
            min={0}
            onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
          />
          <div className="col-span-1 text-right text-sm font-medium">
            {(item.quantity * item.rate).toFixed(2)}
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="col-span-1 flex justify-end text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mt-2"
      >
        <Plus size={16} />
        Add Item
      </button>
    </div>
  );
}
