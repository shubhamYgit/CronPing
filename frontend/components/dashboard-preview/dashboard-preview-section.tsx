"use client";

import { motion } from "framer-motion";
import { Activity, Clock3, Gauge, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
	{ label: "Active jobs", value: "24", icon: Activity },
	{ label: "Success rate", value: "99.3%", icon: ShieldCheck },
	{ label: "Avg latency", value: "182ms", icon: Clock3 },
	{ label: "Total pings", value: "18.2k", icon: Gauge },
];

const tableRows = [
	{ url: "/health", interval: "5 min", status: "Healthy", latency: "184ms", nextRun: "in 03:24" },
	{ url: "/cron/webhook", interval: "10 min", status: "Paused", latency: "--", nextRun: "Paused" },
	{ url: "/payments/status", interval: "1 min", status: "Healthy", latency: "128ms", nextRun: "in 00:46" },
];

function StatusPill({ status }: { status: string }) {
	const healthy = status === "Healthy";

	return (
		<span
			className={
				healthy
					? "premium-surface inline-flex w-fit rounded-full border-success/15 bg-success/12 px-3 py-1 text-xs font-medium text-success"
					: "premium-surface inline-flex w-fit rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
			}
		>
			{status}
		</span>
	);
}

export function DashboardPreviewSection() {
	return (
		<SectionShell id="dashboard-preview">
			<div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-12">
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.45, ease: "easeOut" }}
					className="space-y-6 lg:sticky lg:top-24"
				>
					<SectionHeading
						eyebrow="Dashboard preview"
						title="One control surface for scheduled jobs, health signals, and execution history"
						description="The dashboard keeps job status, intervals, response times, and logs in one place so developers can inspect recurring HTTP work without hopping between tools."
						align="left"
					/>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="premium-surface rounded-3xl bg-card/72 p-5">
							<p className="text-sm text-muted-foreground">What you can manage</p>
							<p className="mt-2 text-lg font-semibold leading-7">Jobs, intervals, status, logs</p>
						</div>
						<div className="premium-surface rounded-3xl bg-card/72 p-5">
							<p className="text-sm text-muted-foreground">What you can observe</p>
							<p className="mt-2 text-lg font-semibold leading-7">Latency, status codes, uptime</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 18 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
				>
					<Card className="premium-surface premium-glow relative overflow-hidden border-border/70 bg-card/72">
						<div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,transparent_62%,hsl(var(--primary)/0.04))]" />
						<CardHeader className="relative border-b border-border/50 bg-background/35 p-6 md:p-7">
							<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
								<div className="space-y-1">
									<CardTitle className="text-2xl tracking-tight">Monitoring overview</CardTitle>
									<CardDescription className="text-sm md:text-base">Representative job activity and recent outcomes from a CronPing workspace.</CardDescription>
								</div>
								<div className="premium-surface w-fit rounded-full bg-background/60 px-3 py-1 text-sm text-muted-foreground">
									Dashboard UI
								</div>
							</div>
						</CardHeader>
						<CardContent className="relative space-y-6 p-6 md:p-7">
							<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
								{metrics.map(({ icon: Icon, label, value }) => (
									<div key={label} className="premium-surface rounded-3xl bg-background/55 p-5">
										<div className="flex items-start justify-between gap-3">
											<p className="max-w-[8rem] text-sm leading-6 text-muted-foreground">{label}</p>
											<div className="premium-ring flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
												<Icon className="h-4 w-4 shrink-0" />
											</div>
										</div>
										<p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p>
									</div>
								))}
							</div>

							<div className="overflow-hidden rounded-3xl border border-border/60 bg-background/60">
								<div className="overflow-x-auto">
									<div className="min-w-[720px]">
										<div className="grid grid-cols-[1.8fr_0.8fr_0.9fr_0.8fr] gap-4 border-b border-border/60 px-5 py-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
											<span>Job</span>
											<span>Interval</span>
											<span>Status</span>
											<span>Next run</span>
										</div>
										<div className="divide-y divide-border/60">
											{tableRows.map((row) => (
												<div key={row.url} className="grid grid-cols-[1.8fr_0.8fr_0.9fr_0.8fr] items-center gap-4 px-5 py-5 text-sm">
													<div className="space-y-1">
														<p className="break-all font-medium leading-6">https://api.example.com{row.url}</p>
														<p className="text-xs text-muted-foreground">Last response {row.latency}</p>
													</div>
													<span className="text-muted-foreground">{row.interval}</span>
													<StatusPill status={row.status} />
													<span className="text-muted-foreground">{row.nextRun}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</SectionShell>
	);
}
