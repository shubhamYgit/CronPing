"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Clock3,
  Database,
  Globe,
  LayoutDashboard,
  ServerCog,
  UserRound,
  Workflow,
} from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
	{
		icon: UserRound,
		title: "User registers URL",
		description: "A monitor is created with a target endpoint and interval.",
		tag: "Input",
	},
	{
		icon: ServerCog,
		title: "Scheduler detects due job",
		description:
			"Spring Boot scans the schedule and marks the next execution as ready.",
		tag: "Scheduler",
	},
	{
		icon: Workflow,
		title: "Job enters Redis queue",
		description:
			"The due monitor is pushed into Redis for distributed processing.",
		tag: "Queue",
	},
	{
		icon: Boxes,
		title: "Worker picks job",
		description:
			"An available worker consumes the queued task without busy polling.",
		tag: "Workers",
	},
	{
		icon: Globe,
		title: "HTTP request executed",
		description: "The worker performs the outbound request against the target API.",
		tag: "HTTP",
	},
	{
		icon: Database,
		title: "Metrics stored",
		description:
			"Latency, status code, and timestamps are written for historical analysis.",
		tag: "Storage",
	},
	{
		icon: LayoutDashboard,
		title: "Dashboard updated",
		description: "The latest health state and logs become visible in the UI.",
		tag: "Frontend",
	},
] as const;

function FlowConnector({ active }: { active: boolean }) {
	return (
		<div className="flex shrink-0 items-center justify-center px-1 py-1 xl:px-2">
			<div className="flex flex-col items-center xl:hidden">
				<div
					className={cn(
						"h-8 w-px bg-gradient-to-b transition-all duration-500",
						active
							? "from-primary/20 via-primary/80 to-primary/20"
							: "from-border/20 via-border/70 to-border/20"
					)}
				/>
				<ArrowDown
					className={cn(
						"mt-1 h-4 w-4 transition-colors duration-500",
						active ? "text-primary" : "text-muted-foreground"
					)}
				/>
			</div>
			<div className="hidden h-full items-center xl:flex">
				<div
					className={cn(
						"h-px w-10 bg-gradient-to-r transition-all duration-500",
						active
							? "from-primary/15 via-primary/80 to-primary/15"
							: "from-border/20 via-border/70 to-border/20"
					)}
				/>
				<ArrowRight
					className={cn(
						"h-4 w-4 transition-colors duration-500",
						active ? "text-primary" : "text-muted-foreground"
					)}
				/>
			</div>
		</div>
	);
}

export function LiveMonitoringFlowSection() {
	const prefersReducedMotion = useReducedMotion();
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		const interval = window.setInterval(() => {
			setCurrentStep((step) => (step + 1) % steps.length);
		}, 1400);

		return () => window.clearInterval(interval);
	}, [prefersReducedMotion]);

	const activeStep = prefersReducedMotion ? steps.length - 1 : currentStep;
	const currentLabel = steps[activeStep]?.title ?? steps[0].title;

	return (
		<SectionShell id="how-it-works" className="landing-section-gradient">
			<div className="space-y-10 md:space-y-12">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeading
						eyebrow="Live monitoring flow"
						title="Watch the distributed monitoring pipeline move from registration to dashboard visibility"
						description="CronPing takes a scheduled monitor through queueing, worker execution, metrics persistence, and UI updates. This flow lights up in sequence so the system model is easy to understand at a glance."
						align="left"
					/>
					<div className="premium-surface max-w-sm rounded-3xl bg-background/55 p-5">
						<p className="text-sm font-medium text-muted-foreground">
							Current active stage
						</p>
						<div className="mt-3 flex items-center gap-3">
							<div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.9)]" />
							<p className="text-base font-semibold tracking-tight">
								{currentLabel}
							</p>
						</div>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							{prefersReducedMotion
								? "Reduced motion is enabled, so the full flow stays visible without looping animation."
								: "The highlighted path advances automatically to show how one scheduled check moves through the system."}
						</p>
					</div>
				</div>

				<Card className="premium-surface premium-glow overflow-hidden bg-card/72">
					<CardContent className="space-y-8 p-6 md:p-8">
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
									Animated pipeline
								</p>
								<h3 className="mt-2 text-2xl font-semibold tracking-tight">
									Live monitoring flow across seven system stages
								</h3>
							</div>
							<div className="premium-surface hidden rounded-full bg-background/60 px-3 py-1 text-sm text-muted-foreground md:inline-flex">
								Looping system view
							</div>
						</div>

						<div className="flex flex-col items-stretch xl:flex-row xl:items-stretch xl:overflow-x-auto xl:pb-2">
							{steps.map(({ icon: Icon, title, description, tag }, index) => {
								const isActive = index <= activeStep;
								const isCurrent = index === activeStep;

								return (
									<div key={title} className="flex flex-col items-stretch xl:flex-row xl:items-stretch">
										<motion.div
											initial={{ opacity: 0, y: 18 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, amount: 0.2 }}
											transition={{
												duration: 0.4,
												ease: "easeOut",
												delay: index * 0.06,
											}}
											animate={prefersReducedMotion ? undefined : isCurrent ? { y: [-2, 0, -2] } : undefined}
											className={cn(
												"relative flex min-h-[252px] flex-col rounded-[1.75rem] border p-5 transition-all duration-500 md:min-h-[268px] xl:h-[320px] xl:w-[196px] xl:min-w-[196px]",
												isActive
													? "border-primary/40 bg-[linear-gradient(180deg,hsl(var(--primary)/0.12),hsl(var(--background)/0.72))] shadow-[0_24px_80px_-42px_hsl(var(--primary)/0.55)]"
													: "border-border/60 bg-background/55"
											)}
										>
											<div
												className={cn(
													"absolute inset-x-6 top-0 h-16 rounded-t-[1.75rem] transition-opacity duration-500",
													isActive
														? "opacity-100 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.22),transparent_72%)]"
														: "opacity-60 bg-[radial-gradient(circle_at_top,hsl(var(--border)/0.18),transparent_72%)]"
												)}
											/>
											<div className="relative flex items-start justify-between gap-4">
												<div
													className={cn(
														"premium-ring flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500",
														isActive ? "bg-primary/15 text-primary" : "bg-background/70 text-muted-foreground"
													)}
												>
													<Icon className="h-6 w-6" />
												</div>
												<span
													className={cn(
														"rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-500",
														isActive ? "border-primary/25 bg-primary/10 text-primary" : "border-border/60 bg-background/70 text-muted-foreground"
													)}
												>
													{tag}
												</span>
											</div>
											<div className="relative mt-5 flex flex-1 flex-col">
												<div className="flex items-center gap-2">
													<span className={cn("text-xs font-semibold uppercase tracking-[0.18em]", isActive ? "text-primary" : "text-muted-foreground")}>
														0{index + 1}
													</span>
													{isCurrent ? <Clock3 className="h-3.5 w-3.5 text-primary" /> : null}
												</div>
												<h4 className="mt-2 text-lg font-semibold leading-6 tracking-tight">{title}</h4>
												<p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
											</div>
										</motion.div>
										{index < steps.length - 1 ? <FlowConnector active={index < activeStep} /> : null}
									</div>
								);
							})}
						</div>

						<div className="grid gap-4 md:grid-cols-3">
							<div className="premium-surface rounded-3xl bg-background/55 p-5">
								<p className="text-sm text-muted-foreground">
									Scheduler stage
								</p>
								<p className="mt-2 text-base font-semibold leading-7">
									Jobs become actionable only when their schedule is due, which
									keeps timing centralized and deterministic.
								</p>
							</div>
							<div className="premium-surface rounded-3xl bg-background/55 p-5">
								<p className="text-sm text-muted-foreground">
									Execution stage
								</p>
								<p className="mt-2 text-base font-semibold leading-7">
									Redis and workers let monitoring tasks move through the system
									without relying on one always-busy process.
								</p>
							</div>
							<div className="premium-surface rounded-3xl bg-background/55 p-5">
								<p className="text-sm text-muted-foreground">
									Observability stage
								</p>
								<p className="mt-2 text-base font-semibold leading-7">
									Stored metrics and dashboard updates turn each ping into visible
									operational state instead of a hidden cron side effect.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</SectionShell>
	);
}
