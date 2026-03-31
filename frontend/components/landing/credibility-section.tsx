"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle2, Clock3, Percent, Radar } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { formatLatency, formatMetric } from "@/lib/format";
import type { SystemStats } from "@/lib/types";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function CredibilitySection({
  stats,
  statsMode,
  statsError,
}: {
  stats: SystemStats;
  statsMode: "loading" | "live" | "demo";
  statsError: string | null;
}) {
  const isLoading = statsMode === "loading";
  const isLive = statsMode === "live";
  const isDemo = statsMode === "demo";

  const metrics = [
    {
      icon: Activity,
      label: "Active monitors",
      value: isLoading ? "—" : formatMetric(stats.totalJobs),
      detail: "Configured jobs across the platform",
    },
    {
      icon: Radar,
      label: "HTTP checks run",
      value: isLoading ? "—" : formatMetric(stats.totalPings),
      detail: "Distributed executions recorded so far",
    },
    {
      icon: Percent,
      label: "Success rate",
      value: isLoading ? "—" : `${formatMetric(stats.successRate)}%`,
      detail: "Healthy responses across observed runs",
    },
    {
      icon: Clock3,
      label: "Average latency",
      value: isLoading ? "—" : formatLatency(stats.averageLatency),
      detail: "Mean response time from execution logs",
    },
  ];

  return (
    <SectionShell id="metrics" tone="elevated" className="pt-10 md:pt-16">
      <div className="space-y-8 md:space-y-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Metrics & credibility"
            title={
              isLive
                ? "Live telemetry from the CronPing control plane"
                : "The kind of telemetry engineers expect before they trust a scheduler"
            }
            description="CronPing surfaces throughput, success rate, and latency so the product reads like an actual monitoring system instead of a vague landing-page mockup."
            align="left"
          />
          <p className="max-w-md text-sm leading-6 text-muted-foreground lg:text-right">
            {isLoading
              ? "Loading platform metrics…"
              : isLive
                ? "Live data is being pulled from the system stats endpoint."
                : "Demo metrics are shown while the API is offline, so the frontend stays reviewable."}
          </p>
        </div>

        {isDemo ? (
          <Alert className="border-primary/20 bg-primary/5 text-foreground">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <AlertTitle>Frontend demo mode</AlertTitle>
                <AlertDescription>
                  Live stats will slot in automatically once the backend is reachable{statsError ? ` (${statsError})` : ""}.
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ icon: Icon, label, value, detail }, index) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="premium-surface h-full bg-background/60">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{label}</p>
                      {isDemo ? (
                        <p className="text-xs uppercase tracking-[0.16em] text-primary/80">
                          Preview
                        </p>
                      ) : null}
                    </div>
                    <div className="premium-ring flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold tracking-tight sm:text-[2rem]">
                      {value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

