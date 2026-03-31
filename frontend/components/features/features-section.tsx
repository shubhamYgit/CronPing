"use client";

import { motion } from "framer-motion";
import { Activity, Boxes, Clock3, Database, GlobeLock, LayoutDashboard, ServerCog, ShieldCheck, Workflow } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
	{
		icon: Clock3,
		title: "Reliable Scheduling",
		description: "Automatically trigger HTTP requests at configurable intervals using a distributed worker system.",
	},
	{
		icon: Activity,
		title: "Live Monitoring",
		description: "Track response times, status codes, and execution logs from your monitored endpoints.",
	},
	{
		icon: Boxes,
		title: "Developer Friendly",
		description: "Simple REST API, Redis-powered job queue, and scalable architecture.",
	},
];

const useCases = [
	{
		title: "Keeping Render Services Awake",
		description: "Prevent free-tier deployments from sleeping.",
		icon: GlobeLock,
	},
	{
		title: "API Monitoring",
		description: "Continuously verify that critical services respond correctly.",
		icon: ShieldCheck,
	},
	{
		title: "Cron Job Replacement",
		description: "Trigger webhooks and automate backend workflows.",
		icon: Workflow,
	},
];

const stack = [
	{
		icon: ServerCog,
		title: "Spring Boot",
		description: "Used for the scheduler and REST API services responsible for managing monitors, exposing application endpoints, and dispatching due jobs into the execution pipeline.",
	},
	{
		icon: Workflow,
		title: "Redis",
		description: "Acts as a distributed job queue so worker nodes can consume scheduled tasks efficiently without CPU-intensive polling loops.",
	},
	{
		icon: Database,
		title: "PostgreSQL",
		description: "Stores execution logs, response times, monitor metadata, and historical metrics that power reporting and troubleshooting views.",
	},
	{
		icon: Activity,
		title: "Worker Nodes",
		description: "Distributed worker processes execute HTTP checks, collect status and latency results, and report each run back into persistent storage.",
	},
	{
		icon: LayoutDashboard,
		title: "Next.js",
		description: "Provides the frontend dashboard used to visualize monitors, recent failures, uptime health, and execution history in a fast UI.",
	},
	{
		icon: Boxes,
		title: "Docker",
		description: "Enables containerized deployment so scheduler and worker services can be packaged consistently and scaled across environments.",
	},
];

const fadeUp = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function FeaturesSection() {
	return (
		<>
			<SectionShell id="features" tone="elevated">
				<div className="space-y-10 md:space-y-12">
					<SectionHeading
						eyebrow="Features"
						title="Focused product capabilities instead of a grab-bag of marketing claims"
						description="CronPing gives backend teams a clean control surface for scheduling pings, tracking outcomes, and keeping important endpoints visible over time."
					/>
					<div className="grid gap-5 md:grid-cols-3">
						{features.map(({ icon: Icon, title, description }, index) => (
							<motion.div
								key={title}
								variants={fadeUp}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.25 }}
								transition={{ delay: index * 0.08 }}
								className="h-full"
							>
								<Card className="premium-surface relative h-full overflow-hidden bg-card/70">
									<div className="premium-glow absolute inset-x-0 top-0 h-24 opacity-80" />
									<CardHeader className="relative flex h-full flex-col gap-5 p-6">
										<div className="premium-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
											<Icon className="h-6 w-6" />
										</div>
										<div className="space-y-2">
											<CardTitle className="text-xl tracking-tight">{title}</CardTitle>
											<CardDescription className="text-sm leading-7">{description}</CardDescription>
										</div>
									</CardHeader>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</SectionShell>

			<SectionShell id="use-cases" tone="elevated">
				<div className="space-y-10 md:space-y-12">
					<SectionHeading
						eyebrow="Use cases"
						title="Practical jobs that engineers already try to solve with shell scripts and scattered cron entries"
						description="Whether you are keeping free-tier apps awake or replacing ad-hoc scheduled requests, CronPing keeps recurring HTTP work observable."
					/>
					<div className="grid gap-5 md:grid-cols-3">
						{useCases.map(({ icon: Icon, title, description }, index) => (
							<motion.div
								key={title}
								variants={fadeUp}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.25 }}
								transition={{ delay: index * 0.08 }}
								className="h-full"
							>
								<Card className="premium-surface h-full overflow-hidden bg-card/70">
									<CardHeader className="relative flex h-full flex-col gap-5 p-6">
										<div className="premium-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
											<Icon className="h-6 w-6" />
										</div>
										<div className="space-y-2">
											<CardTitle className="text-xl tracking-tight">{title}</CardTitle>
											<CardDescription className="text-sm leading-7">{description}</CardDescription>
										</div>
									</CardHeader>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</SectionShell>

			<SectionShell id="tech-stack" tone="gradient">
				<div className="space-y-10 md:space-y-12">
					<SectionHeading
						eyebrow="Tech stack"
						title="Every part of the stack exists for an architectural reason"
						description="CronPing is built from components that each serve a clear responsibility in scheduling, executing, storing, and visualizing distributed HTTP monitoring work."
					/>
					<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
						{stack.map(({ icon: Icon, title, description }, index) => (
							<motion.div
								key={title}
								variants={fadeUp}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.2 }}
								transition={{ delay: index * 0.06 }}
								className="h-full"
							>
								<Card className="premium-surface relative h-full overflow-hidden bg-card/72">
									<div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_75%)]" />
									<CardHeader className="relative flex h-full flex-col gap-5 p-6">
										<div className="flex items-center justify-between gap-4">
											<div className="premium-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
												<Icon className="h-6 w-6" />
											</div>
											<span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
												Architecture role
											</span>
										</div>
										<div className="space-y-2">
											<CardTitle className="text-xl tracking-tight">{title}</CardTitle>
											<CardDescription className="text-sm leading-7">{description}</CardDescription>
										</div>
									</CardHeader>
									<CardContent className="pt-0 pb-6">
										<div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</SectionShell>
		</>
	);
}
