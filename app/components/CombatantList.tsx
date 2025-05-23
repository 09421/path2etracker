"use client";

import { useCombatants } from "../lib/useCombatants";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableCombatant } from "./SortableCombatant";

export function CombatantList() {
  const { combatants, setCombatants, damage, heal, removeCombatant, currentTurnIndex, nextTurn, previousTurn } = useCombatants();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    
    if (active.id !== over.id) {
      const oldIndex = combatants.findIndex(c => c.name === active.id);
      const newIndex = combatants.findIndex(c => c.name === over.id);
      const newOrder = arrayMove(combatants, oldIndex, newIndex);
      setCombatants(newOrder); // <-- persist it in your context
    }
  };

const sortedCombatants = [...combatants].sort((a, b) => b.initiative - a.initiative);

return (
  <div>
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sortedCombatants.map(c => c.name)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {sortedCombatants.map((c, index) => (
            <div
              key={c.id}
              className={`p-4 rounded shadow flex items-center justify-between transition-all
                ${index === currentTurnIndex ? "bg-blue-100 dark:bg-blue-900" : "bg-white dark:bg-gray-800"}`}
            >
              <SortableCombatant
                key={c.id}
                combatant={c}
                damage={damage}
                heal={heal}
                removeCombatant={removeCombatant}
              />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
    <div className="flex justify-end mb-4">
      <button
        onClick={nextTurn}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next Turn
      </button>
    </div>
  </div>
);
}
