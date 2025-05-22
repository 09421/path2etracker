import "./globals.css";
import { CombatantProvider } from "./lib/useCombatants";

export const metadata = {
  title: "PF2E Tracker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CombatantProvider>{children}</CombatantProvider>
      </body>
    </html>
  );
}