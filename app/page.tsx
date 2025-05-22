import { CombatantList } from "./components/CombatantList"
import { AddCombatantForm } from "./components/AddCombatantForm";
import { ThemeToggle } from "./theme/theme-provider";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      <ThemeToggle />
      <div className="max-w-3xl mx-auto space-y-6 dark:bg-gray-800"  >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">PF2E Initiative & Health Tracker</h1>
        <AddCombatantForm />
        <CombatantList />
      </div>
    </main>
  );
}