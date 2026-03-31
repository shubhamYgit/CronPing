"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, ServerCog, TerminalSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.12,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const architectureHighlights = [
	{ icon: Database, label: "Redis-backed queue orchestration" },
	{ icon: ServerCog, label: "Worker nodes execute HTTP checks" },
	{ icon: TerminalSquare, label: "Execution logs stay queryable" },
];

const flowSteps = [
	{ label: "Register endpoint", detail: "Define a URL and interval from the dashboard for repeatable checks." },
	{ label: "Scheduler dispatches work", detail: "Due jobs are pushed into a shared queue instead of relying on one local cron process." },
	{ label: "Workers execute requests", detail: "Each run captures status code, latency, and timing context for later inspection." },
	{ label: "Results remain visible", detail: "Teams can review health signals and execution history without digging through server logs." },
];

export function HeroSection() {
	return (
		<section className="relative isolate overflow-hidden px-4 pb-18 pt-14 md:px-6 md:pb-24 md:pt-22 xl:pb-28">
			<div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)/0.94))]" />
			<div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_46%)]" />
			<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
			<div className="mx-auto grid w-full max-w-7xl gap-12 xl:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.96fr)] xl:items-start xl:gap-14">
				<motion.div className="space-y-9 pt-2 xl:space-y-10 xl:pt-5" variants={container} initial="hidden" animate="show">
					<motion.div
						variants={item}
						className="premium-surface inline-flex max-w-fit flex-wrap items-center gap-2 rounded-full px-4 py-2.5 text-sm text-muted-foreground"
					>
						<CheckCircle2 className="h-4 w-4 text-success" />
						<span>Distributed scheduling, queue-backed execution, observable HTTP checks</span>
					</motion.div>

					<motion.div variants={item} className="max-w-3xl space-y-5 md:space-y-6">
						<p className="text-sm font-semibold uppercase tracking-[0.34em] text-primary/90">Hero</p>
						<h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-tight sm:text-6xl xl:text-[5rem]">
							Cron jobs break. <span className="premium-text">CronPing doesn&apos;t.</span>
						</h1>
						<p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-8">
							A developer-focused control plane for distributed HTTP monitoring and cron scheduling, built to keep scheduled requests reliable,
							inspectable, and easy to operate.
						</p>
					</motion.div>

					<motion.div variants={item} className="flex flex-col gap-3 pt-1 sm:flex-row">
						<Button asChild size="lg" className="group rounded-full px-6 shadow-[0_18px_44px_-22px_hsl(var(--primary)/0.9)]">
							<Link href="/login">
								Get Started
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg" className="rounded-full border-border/70 bg-background/70 px-6">
							<Link href="/dashboard">View Dashboard</Link>
						</Button>
					</motion.div>

					<motion.div variants={item} className="grid gap-3 sm:grid-cols-3">
						{architectureHighlights.map(({ icon: Icon, label }) => (
							<Card key={label} className="premium-surface bg-background/55">
								<CardContent className="flex h-full items-start gap-3 p-4">
									<div className="premium-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
										<Icon className="h-5 w-5" />
									</div>
									<p className="text-sm font-medium leading-6 text-foreground/92">{label}</p>
								</CardContent>
							</Card>
						))}
					</motion.div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}>
					<Card className="premium-surface premium-glow relative overflow-hidden border-border/70 bg-card/72">
						<div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_70%)]" />
						<div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,transparent_62%,hsl(var(--primary)/0.05))]" />
						<CardContent className="relative space-y-8 p-6 md:p-8">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
								<div className="max-w-lg">
									<p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">Hero visual</p>
									<h2 className="mt-2 text-2xl font-semibold tracking-tight">From schedule creation to observable execution</h2>
								</div>
								<div className="premium-surface w-fit rounded-full border-success/25 bg-success/10 px-3 py-1 text-sm font-medium text-success">
									Operational path
								</div>
							</div>

							<div className="grid gap-4">
								{flowSteps.map((step, index) => (
									<motion.div
										key={step.label}
										initial={{ opacity: 0, x: 24 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.35, delay: 0.18 + index * 0.08 }}
										className="flex items-start gap-3"
									>
										<div className="premium-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/80 text-sm font-semibold text-primary">
											{index + 1}
										</div>
										<div className="premium-surface min-h-[96px] flex-1 rounded-3xl bg-background/55 p-4 md:p-5">
											<div className="flex flex-wrap items-center justify-between gap-2">
												<p className="text-base font-semibold">{step.label}</p>
												<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Stage 0{index + 1}</p>
											</div>
											<p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{step.detail}</p>
										</div>
									</motion.div>
								))}
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}
