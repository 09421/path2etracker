"use client";
import { createContext, useContext, useState } from "react";
import { Combatant } from "@/types/Combatant";

function useCombatantsImpl() {
  const [combatants, setCombatants] = useState<Combatant[]>([]);

  const addCombatant = (c: Combatant) => setCombatants((prev) => [...prev, c]);
  const removeCombatant = (id: string) =>
    setCombatants((prev) => prev.filter((c) => c.id !== id));
  const damage = (id: string) =>
    setCombatants((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, currentHP: Math.max(0, c.currentHP - 1) } : c
      )
    );
  const heal = (id: string) =>
    setCombatants((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, currentHP: Math.min(c.maxHP, c.currentHP + 1) } : c
      )
    );

  return { combatants, addCombatant, removeCombatant, damage, heal };
}

const CombatantContext = createContext<ReturnType<typeof useCombatantsImpl> | null>(null);

export function CombatantProvider({ children }: { children: React.ReactNode }) {
  const value = useCombatantsImpl();
  return <CombatantContext.Provider value={value}>{children}</CombatantContext.Provider>;
}

export function useCombatants() {
  const context = useContext(CombatantContext);
  if (!context) throw new Error("useCombatants must be used within a CombatantProvider");
  return context;
}