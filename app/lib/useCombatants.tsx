"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { Combatant } from "@/types/Combatant";

function useCombatantsImpl() {
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

  const addCombatant = useCallback((c: Combatant) => setCombatants((prev) => [...prev, c]), []);
  
  const removeCombatant = useCallback((id: string) =>
    setCombatants((prev) => prev.filter((c) => c.id !== id)), []);

  const damage = useCallback((id: string, amount: number = 1) =>
    setCombatants((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, currentHP: Math.max(0, c.currentHP - amount) } : c
      )
    ), []);

  const heal = useCallback((id: string, amount: number = 1) =>
    setCombatants((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, currentHP: Math.min(c.maxHP, c.currentHP + amount) } : c
      )
    ), []);

  const nextTurn = () => 
    setCurrentTurnIndex((prev) => {
      const len = combatants.length;
      return len === 0 ? 0 : (prev + 1) % len;
    });

    const previousTurn = () =>
      setCurrentTurnIndex((prev) =>
        combatants.length === 0 ? 0 : (prev - 1 + combatants.length) % combatants.length
    )

  return { combatants, setCombatants, addCombatant, removeCombatant, damage, heal, currentTurnIndex, nextTurn, previousTurn };
}

const CombatantContext = createContext<ReturnType<typeof useCombatantsImpl> | null>(null);

export function CombatantProvider({ children }: { children: React.ReactNode }) {
  const value = useCombatantsImpl();
  return <CombatantContext.Provider value={value}>{children}</CombatantContext.Provider>;
}

export function useCombatants() {
  const context = useContext(CombatantContext);
  if (!context) 
    throw new Error("useCombatants must be used within a CombatantProvider");
  return context;
}

export type CombatantActions = Omit<ReturnType<typeof useCombatantsImpl>, "combatants" | "setCombatants" | "addCombatant" | "currentTurnIndex" | "nextTurn" | "previousTurn">;