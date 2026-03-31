"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getToken } from "@/lib/auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isMarketingRoute = pathname === "/";
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isMarketingRoute) {
      setCheckedAuth(true);
      return;
    }

    const token = getToken();

    if (!token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    setCheckedAuth(true);
  }, [isMarketingRoute, pathname, router]);

  if (isMarketingRoute) {
    return <>{children}</>;
  }

  if (!checkedAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-4 rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[18rem_1fr]">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex min-h-screen flex-col">
        <Navbar onOpenSidebar={() => setMobileOpen(true)} />
        <main className="surface-grid flex-1 p-4 md:p-6">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 animate-fade-in">{children}</div>
        </main>
      </div>
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent className="left-0 top-0 h-full max-w-xs translate-x-0 translate-y-0 rounded-none border-r border-border p-0">
          <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
