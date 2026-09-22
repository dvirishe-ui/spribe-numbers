import { Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AppHeader } from "@/components/promo/AppHeader";
import { ParticipationProvider } from "@/lib/participation";
import { ThemeProvider, useTheme } from "@/lib/theme";

function AppToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      toastOptions={{
        style: {
          background: "var(--color-surface-raised)",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-border)",
        },
      }}
    />
  );
}

export function RootLayout() {
  return (
    <ThemeProvider>
      <ParticipationProvider>
        <div className="flex min-h-screen flex-col">
          <AppHeader />
          <div className="flex-1">
            <Outlet />
          </div>
          <footer className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground lg:px-8">
            Part of the SPRIBE Partner Support ecosystem —{" "}
            <a
              href="https://support.spribe.co/"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              support.spribe.co
            </a>
          </footer>
          <AppToaster />
        </div>
      </ParticipationProvider>
    </ThemeProvider>
  );
}
