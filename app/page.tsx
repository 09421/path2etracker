import { CombatantList } from "./components/CombatantList"
import { AddCombatantForm } from "./components/AddCombatantForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">PF2E Initiative & Health Tracker</h1>
        <AddCombatantForm />
        <CombatantList />
      </div>
    </main>
  );
}