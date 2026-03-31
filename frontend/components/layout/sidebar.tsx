"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LayoutDashboard, Logs } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
	{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/jobs", label: "Jobs", icon: Activity },
	{ href: "/logs", label: "Logs", icon: Logs },
];

export function Sidebar({
	mobile = false,
	onNavigate,
}: {
	mobile?: boolean;
	onNavigate?: () => void;
}) {
	const pathname = usePathname();

	return (
		<aside
			className={cn(
				"flex h-full flex-col justify-between",
				mobile ? "w-full" : "w-72 border-r border-border/60 bg-card/70"
			)}
		>
			<div className="space-y-8 p-6">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-soft">
							<Activity className="h-5 w-5" />
						</div>
						<div>
							<p className="text-xs uppercase tracking-[0.24em] text-primary">
								Monitoring
							</p>
							<h2 className="text-xl font-semibold">CronPing</h2>
						</div>
					</div>
					<p className="text-sm text-muted-foreground">
						Keep uptime visible with a calm, modern control panel.
					</p>
				</div>

				<nav className="space-y-1.5">
					{items.map((item) => {
						const Icon = item.icon;
						const active =
							item.href === "/dashboard"
								? pathname === "/dashboard"
								: pathname.startsWith(item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={onNavigate}
								className={cn(
									"flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
									active
										? "bg-primary text-primary-foreground shadow-soft"
										: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
								)}
							>
								<Icon className="h-4 w-4" />
								{item.label}
							</Link>
						);
					})}
				</nav>
			</div>

			<div className="p-6 pt-0">
				<div className="rounded-3xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground">
					Create monitors, pause noisy jobs, and drill into logs without leaving
					one screen.
				</div>
			</div>
		</aside>
	);
}
