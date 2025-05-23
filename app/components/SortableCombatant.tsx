"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Combatant } from "@/types/Combatant";

interface Props {
  combatant: Combatant;
  damage: (id: string) => void;
  heal: (id: string) => void;
  removeCombatant: (id: string) => void;
}

export function SortableCombatant({ combatant, damage, heal, removeCombatant }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: combatant.name,
  });

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
                <button
                    onClick={(e) =>{e.stopPropagation; damage(combatant.id)}}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    -
                </button>
                <button
                    onClick={() => heal(combatant.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                >
                    +
                </button>
                <button
                    onClick={() => removeCombatant(combatant.id)}
                    className="bg-gray-300 dark:bg-gray-700 dark:text-white px-2 py-1 rounded"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
