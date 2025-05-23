
"use client";

import { useCombatants } from "../lib/useCombatants";

export function Turnorder() {
    const { nextTurn } = useCombatants();

    return (
            <div className="flex justify-end mb-4">
        <button
            onClick={nextTurn}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Next Turn
        </button>
        </div>
    )
}
