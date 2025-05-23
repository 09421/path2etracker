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
  const { combatants, setCombatants, damage, heal, removeCombatant } = useCombatants();

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

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={combatants.map(c => c.name)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {combatants.map((c) => (
            <SortableCombatant
              key={c.id}
              combatant={c}
              damage={damage}
              heal={heal}
              removeCombatant={removeCombatant}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
