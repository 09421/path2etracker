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
import { useMemo } from "react";
import { SortableCombatant } from "./SortableCombatant";

export function CombatantList() {
  const { combatants, setCombatants, damage, heal, removeCombatant, currentTurnIndex } = useCombatants();

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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sortedCombatants.map(c => c.name)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {sortedCombatants.map((c, index) => (
              <SortableCombatant
                key={c.id}
                combatant={c}
                damage={damage}
                heal={heal}
                removeCombatant={removeCombatant}
                isActive={index === currentTurnIndex}
              />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
