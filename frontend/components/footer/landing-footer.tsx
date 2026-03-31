import Link from "next/link";
import { Activity } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="relative border-t border-border/50 px-4 py-14 md:px-6 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="premium-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Activity className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold tracking-tight">CronPing</p>
              <p className="text-sm text-muted-foreground">Reliable URL Monitoring &amp; Cron Scheduling</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Keep backend services awake, monitor uptime, and centralize ping logs with a focused SaaS-style dashboard.
          </p>
          <div className="premium-surface inline-flex rounded-full px-4 py-2 text-sm text-muted-foreground">
            Author: <span className="ml-1 font-medium text-foreground">Shubham Yadav</span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:justify-items-end">
          <div className="space-y-3 md:min-w-[10rem]">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Links</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link href="/dashboard" className="block transition-colors hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/login" className="block transition-colors hover:text-foreground">
                Docs
              </Link>
              <span className="block cursor-not-allowed opacity-70">GitHub (add repo link later)</span>
            </div>
          </div>
          <div className="space-y-3 md:min-w-[12rem]">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Project</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link href="https://cron.shubhamyadav.me" className="block transition-colors hover:text-foreground">
                cron.shubhamyadav.me
              </Link>
              <span className="block">Professional uptime dashboard</span>
              <span className="block">© 2026 CronPing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
