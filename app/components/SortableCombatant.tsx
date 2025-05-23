"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Combatant } from "@/types/Combatant";
import type { CombatantActions } from "../lib/useCombatants";
import { useState } from "react";

interface Props extends CombatantActions{
    combatant: Combatant
}

export function SortableCombatant({ combatant, damage, heal, removeCombatant }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: combatant.name,
  });

    const [hpChange, setHpChange] = useState<string>("");

    const applyChange = () => {
        const amount = parseInt(hpChange, 10);
        if (!isNaN(amount)) {
            if (amount < 0) damage(combatant.id, Math.abs(amount));
            else if (amount > 0) heal(combatant.id, amount);
        }
        setHpChange(""); // clear after applying
    };

    const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between"
        >
            <div {...attributes} {...listeners} className="cursor-grab">
                ⠿ {/* Drag icon or name */}
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{combatant.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">Initiative: {combatant.initiative}</p>
                <p className="text-gray-700 dark:text-gray-300">
                    HP: {combatant.currentHP} / {combatant.maxHP}
                </p>
            </div>
            <div className="flex gap-2">
                {/* <button
                    onClick={(e) =>{e.stopPropagation(); damage(combatant.id)}}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    -
                </button>
                <button
                    onClick={(e) => {e.stopPropagation(); heal(combatant.id)}}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                >
                    +
                </button> */}
                <button
                    onClick={(e) => {e.stopPropagation(); removeCombatant(combatant.id)}}
                    className="bg-gray-300 dark:bg-gray-700 dark:text-white px-2 py-1 rounded"
                >
                    ✕
                </button>
            </div>

            <div>
                <input
                    type="number"
                    value={hpChange}
                    onChange={(e) => setHpChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyChange()}
                    className="w-20 px-2 py-1 border rounded"
                    placeholder="+/- HP"
                    />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        applyChange();
                    }}
                className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                    Apply
                </button>                
            </div>
        </div>
    );
}
