import { MonitorCog } from "lucide-react";
import { useTheme, type ThemePreference } from "../../hooks/useTheme";

export function ThemeControl() {
  const { preference, setPreference } = useTheme();

  return (
    <label className="theme-control">
      <MonitorCog size={16} aria-hidden="true" />
      <span className="sr-only">Color theme</span>
      <select
        value={preference}
        onChange={(event) => setPreference(event.target.value as ThemePreference)}
        aria-label="Color theme"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
