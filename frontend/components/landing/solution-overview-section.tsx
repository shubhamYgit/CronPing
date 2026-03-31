"use client";

import { motion } from "framer-motion";
import { BarChart3, CalendarClock, Waypoints } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
	{
		icon: CalendarClock,
		title: "Schedule centrally",
		description:
			"Define monitors with explicit intervals and let CronPing own the timing instead of depending on one machine or one process manager.",
	},
	{
		icon: Waypoints,
		title: "Execute through workers",
		description:
			"Queue-backed worker nodes perform the actual HTTP checks, which makes scaling and failure isolation more realistic.",
	},
	{
		icon: BarChart3,
		title: "Inspect every run",
		description:
			"Response codes, latency, and execution history stay attached to each monitor so teams can trace what happened quickly.",
	},
];

export function SolutionOverviewSection() {
	return (
		<SectionShell id="solution" tone="gradient">
			<div className="space-y-10 md:space-y-12">
				<div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:items-end">
					<SectionHeading
						eyebrow="Solution overview"
						title="CronPing turns scheduled HTTP work into an observable product surface"
						description="Instead of wiring cron, curl, logs, and uptime checks together by hand, CronPing packages scheduling, dispatch, and monitoring into one control plane."
						align="left"
					/>
					<div className="premium-surface rounded-[2rem] bg-card/72 p-6 md:p-7">
						<p className="text-sm uppercase tracking-[0.2em] text-primary">
							What changes
						</p>
						<p className="mt-3 text-base leading-8 text-muted-foreground sm:text-lg">
							Jobs are registered once, executed through a distributed path, and
							surfaced in a dashboard designed for developers who care about
							runtime behavior.
						</p>
					</div>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					{pillars.map(
						({ icon: Icon, title, description }, index) => (
							<motion.div
								key={title}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									duration: 0.4,
									ease: "easeOut",
									delay: index * 0.08,
								}}
							>
								<Card className="premium-surface h-full bg-background/60">
									<CardContent className="space-y-5 p-6">
										<div className="flex items-center justify-between gap-4">
											<div className="premium-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
												<Icon className="h-6 w-6" />
											</div>
											<span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
												0{index + 1}
											</span>
										</div>
										<div className="space-y-2">
											<h3 className="text-xl font-semibold tracking-tight">
												{title}
											</h3>
											<p className="text-sm leading-7 text-muted-foreground">
												{description}
											</p>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						)
					)}
				</div>
			</div>
		</SectionShell>
	);
}

