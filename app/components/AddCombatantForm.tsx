"use client";
import { useState } from "react";
import { useCombatants } from "../lib/useCombatants";
import { v4 as uuidv4 } from "uuid";

export function AddCombatantForm() {
  const { addCombatant } = useCombatants();
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState(0);
  const [maxHP, setMaxHP] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCombatant({
      id: uuidv4(),
      name,
      initiative,
      maxHP,
      currentHP: maxHP,
    });
    setName("");
    setInitiative(0);
    setMaxHP(10);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Initiative"
          value={initiative}
          onChange={(e) => setInitiative(parseInt(e.target.value))}
          className="w-24 border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Max HP"
          value={maxHP}
          onChange={(e) => setMaxHP(parseInt(e.target.value))}
          className="w-24 border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
    </form>
  );
}
