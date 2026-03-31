"use client";

import { motion } from "framer-motion";
import { AlarmClockOff, CloudOff, EyeOff, ServerCrash } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
	{
		icon: AlarmClockOff,
		title: "Cron drifts quietly",
		description:
			"Single-node cron setups fail silently when hosts restart, schedules drift, or jobs overlap with no visibility.",
	},
	{
		icon: CloudOff,
		title: "Cloud apps go cold",
		description:
			"Free-tier platforms and small worker deployments sleep aggressively, so a missed ping often means a missed wake-up.",
	},
	{
		icon: EyeOff,
		title: "No audit trail",
		description:
			"A plain cron entry tells you that something should have happened, not whether the request succeeded or how long it took.",
	},
	{
		icon: ServerCrash,
		title: "Retries become guesswork",
		description:
			"Without centralized logs and status history, incident response turns into SSH sessions and scattered dashboard checks.",
	},
];

export function ProblemSection() {
	return (
		<SectionShell id="problem" tone="dark">
			<div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
				<div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
					<SectionHeading
						eyebrow="Problem statement"
						title="Cron jobs fail in ways that are easy to miss and painful to debug"
						description="Teams rarely need another timer. They need confidence that scheduled HTTP work ran on time, hit the right endpoint, and produced an observable result."
						align="left"
					/>
					<div className="premium-surface rounded-3xl bg-background/55 p-6">
						<p className="text-sm uppercase tracking-[0.18em] text-primary">
							Why this matters
						</p>
						<p className="mt-3 text-lg font-medium leading-8 text-foreground/92">
							If the schedule, worker, or target API breaks, the blast radius is
							bigger than one missed request.
						</p>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					{problems.map(
						({ icon: Icon, title, description }, index) => (
							<motion.div
								key={title}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									duration: 0.4,
									ease: "easeOut",
									delay: index * 0.06,
								}}
							>
								<Card className="premium-surface h-full bg-card/72">
									<CardContent className="space-y-5 p-6">
										<div className="premium-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
											<Icon className="h-6 w-6" />
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
