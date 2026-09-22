import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { NotificationCenter } from "./NotificationCenter";
import { LogoMark, Wordmark } from "./Logo";
import { useTheme } from "@/lib/theme";

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <LogoMark className="size-9 shadow-glow rounded-[11px]" />
          <div>
            <Wordmark className="text-sm leading-tight" />
            <p className="text-[11px] text-muted-foreground">Partner Promo Hub</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          <Link
            to="/"
            className={`rounded-md px-3 py-1.5 transition-colors ${
              pathname === "/" ? "bg-surface-raised text-foreground" : "hover:text-foreground"
            }`}
          >
            Promo Calendar
          </Link>
          <Link
            to="/promotional-assets"
            className={`rounded-md px-3 py-1.5 transition-colors ${
              pathname === "/promotional-assets" ? "bg-surface-raised text-foreground" : "hover:text-foreground"
            }`}
          >
            Promotional Assets
          </Link>
          <Link
            to="/results"
            className={`rounded-md px-3 py-1.5 transition-colors ${
              pathname === "/results" ? "bg-surface-raised text-foreground" : "hover:text-foreground"
            }`}
          >
            Results
          </Link>
          <Link
            to="/suggestions"
            className={`rounded-md px-3 py-1.5 transition-colors ${
              pathname === "/suggestions" ? "bg-surface-raised text-foreground" : "hover:text-foreground"
            }`}
          >
            Suggestions
          </Link>
          <Link
            to="/help"
            className={`rounded-md px-3 py-1.5 transition-colors ${
              pathname === "/help" ? "bg-surface-raised text-foreground" : "hover:text-foreground"
            }`}
          >
            Help &amp; Support
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <NotificationCenter />
          <div className="hidden text-right text-xs sm:block">
            <p className="font-medium">BetGalaxy BR</p>
            <p className="text-muted-foreground">Operator ID 20481</p>
          </div>
        </div>
      </div>
    </header>
  );
}
