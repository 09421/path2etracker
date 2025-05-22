"use client";
import { useCombatants } from "../lib/useCombatants";

export function CombatantList() {
  const { combatants, damage, heal, removeCombatant } = useCombatants();

  return (
    <div className="space-y-4">
      {combatants.sort((a, b) => b.initiative - a.initiative).map((c) => (
        <div key={c.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">{c.name}</h2>
            <p>Initiative: {c.initiative}</p>
            <p>
              HP: {c.currentHP} / {c.maxHP}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => damage(c.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              -
            </button>
            <button onClick={() => heal(c.id)} className="bg-green-500 text-white px-2 py-1 rounded">
              +
            </button>
            <button onClick={() => removeCombatant(c.id)} className="bg-gray-300 px-2 py-1 rounded">
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}