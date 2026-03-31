import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
	{ href: "#problem", label: "Problem" },
	{ href: "#solution", label: "Solution" },
	{ href: "#dashboard-preview", label: "Dashboard" },
	{ href: "#architecture", label: "Architecture" },
	{ href: "#features", label: "Features" },
];

export function LandingNavbar() {
	return (
		<header className="sticky top-0 z-30 border-b border-border/40 bg-background/60 backdrop-blur-2xl">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
				<div className="premium-surface flex w-full items-center justify-between rounded-full px-3 py-2.5 md:px-4">
					<Link href="/" className="flex items-center gap-3 pr-4">
						<div className="premium-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
							<Activity className="h-5 w-5" />
						</div>
						<div>
							<p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary/90">
								cron.shubhamyadav.me
							</p>
							<p className="text-lg font-semibold tracking-tight">
								CronPing
							</p>
						</div>
					</Link>

					<nav className="hidden items-center gap-2 rounded-full border border-border/50 bg-background/55 px-2 py-1 md:flex">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-accent/70 hover:text-foreground"
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-2 sm:gap-3">
						<ThemeToggle />
						<Button
							variant="ghost"
							asChild
							className="hidden rounded-full border border-transparent px-4 sm:inline-flex"
						>
							<Link href="/dashboard">View Dashboard</Link>
						</Button>
						<Button asChild className="rounded-full px-5 shadow-[0_16px_40px_-20px_hsl(var(--primary)/0.8)]">
							<Link href="/login">
								Get Started
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
