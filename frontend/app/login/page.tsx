import { Suspense } from "react";

import { AuthForm } from "@/components/auth/auth-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="absolute inset-0 -z-10 surface-grid opacity-60" />
      <div className="w-full max-w-5xl rounded-[2rem] border border-border/60 bg-background/70 p-4 shadow-soft backdrop-blur-xl md:grid md:grid-cols-[1.1fr_0.9fr] md:p-6">
        <div className="hidden flex-col justify-between rounded-[1.5rem] bg-primary/8 p-8 md:flex">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Modern monitoring</p>
            <h1 className="text-4xl font-semibold leading-tight">A calm SaaS dashboard for uptime checks and cron visibility.</h1>
            <p className="max-w-md text-base text-muted-foreground">
              Track jobs, monitor response times, and scan execution history with the polished frontend your backend deserves.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-background/75 p-5">
              <p className="text-sm text-muted-foreground">Responsive layout</p>
              <p className="mt-2 text-2xl font-semibold">Sidebar + cards</p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-background/75 p-5">
              <p className="text-sm text-muted-foreground">Built for APIs</p>
              <p className="mt-2 text-2xl font-semibold">Axios + JWT</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-2 md:p-8">
          <Suspense fallback={<Skeleton className="h-[560px] w-full max-w-md rounded-[1.75rem]" />}>
            <AuthForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
