"use client";

import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { clearSession, getStoredEmail } from "@/lib/auth";

export function Navbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const router = useRouter();
  const email = getStoredEmail();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/60 bg-background/70 px-4 py-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="md:hidden" onClick={onOpenSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-primary">SaaS Dashboard</p>
          <h1 className="text-lg font-semibold">CronPing</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="hidden items-center gap-3 rounded-full border border-border/70 bg-card/80 px-3 py-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {(email ?? "U").charAt(0).toUpperCase()}
          </div>
          <div className="max-w-[180px]">
            <p className="truncate text-sm font-medium">{email ?? "Demo User"}</p>
            <p className="text-xs text-muted-foreground">Workspace access</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            clearSession();
            router.push("/login");
          }}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}

