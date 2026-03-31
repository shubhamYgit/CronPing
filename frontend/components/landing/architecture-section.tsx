"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  Globe,
  LayoutDashboard,
  ServerCog,
  UserRound,
  Waves,
  Workflow,
} from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { SectionShell } from "@/components/landing/section-shell";
import { Card, CardContent } from "@/components/ui/card";

const pipeline = [
  {
    icon: UserRound,
    title: "User",
    detail: "Creates URL monitors, chooses intervals, and reviews uptime behavior.",
    tag: "Operator",
  },
  {
    icon: ServerCog,
    title: "Scheduler Service (Spring Boot)",
    detail: "Spring Boot scans for due jobs and pushes ready work onto Redis.",
    tag: "Spring Boot",
  },
  {
    icon: Workflow,
    title: "Redis Job Queue",
    detail: "Buffers scheduled work so jobs can be consumed asynchronously.",
    tag: "Redis",
  },
  {
    icon: Waves,
    title: "Worker Nodes",
    detail: "Consume jobs from Redis and execute outbound HTTP requests.",
    tag: "Workers",
  },
  {
    icon: Globe,
    title: "HTTP Target Endpoints",
    detail: "Receive pings, webhooks, and health checks, then return response data.",
    tag: "External APIs",
  },
  {
    icon: Database,
    title: "PostgreSQL Metrics Storage",
    detail: "Stores latency, response status, and execution history for each run.",
    tag: "PostgreSQL",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard UI",
    detail: "Visualizes jobs, logs, response times, and monitor health in one place.",
    tag: "Next.js",
  },
];

function Connection() {
  return (
    <div className="relative flex w-14 shrink-0 items-center justify-center md:w-16 xl:w-20">
      <div className="h-px w-full bg-gradient-to-r from-primary/15 via-primary/55 to-primary/15" />
      <div className="absolute h-2.5 w-2.5 rounded-full bg-primary/80 blur-[6px]" />
      <ArrowRight className="absolute right-[-2px] h-4 w-4 text-primary/70" />
    </div>
  );
}

export function ArchitectureSection() {
  return (
    <SectionShell id="architecture" tone="dark">
      <div className="space-y-10 md:space-y-12">
        <SectionHeading
          eyebrow="System architecture"
          title="A distributed pipeline from schedule creation to stored monitoring data"
          description="CronPing works like a real distributed system: the scheduler finds due work, Redis queues it, workers execute the requests, PostgreSQL stores the results, and the dashboard surfaces everything back to the user."
        />

        <Card className="premium-surface premium-glow overflow-hidden bg-card/72">
          <CardContent className="space-y-8 p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  Distributed execution path
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  User → Scheduler → Queue → Workers → Targets → Storage → Dashboard
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-right">
                The flow stays horizontal for readability, and it scrolls cleanly on smaller screens without breaking the diagram.
              </p>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-[1380px] items-stretch gap-0 pr-2">
                {pipeline.map(({ icon: Icon, title, detail, tag }, index) => (
                  <div key={title} className="flex items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
                      className="premium-surface relative flex w-[220px] shrink-0 flex-col rounded-[1.8rem] bg-background/60 p-5"
                    >
                      <div className="absolute inset-x-6 top-0 h-16 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_75%)]" />
                      <div className="relative flex items-start justify-between gap-3">
                        <div className="premium-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {tag}
                        </span>
                      </div>
                      <div className="relative mt-5 space-y-2">
                        <h4 className="text-lg font-semibold leading-6 tracking-tight">
                          {title}
                        </h4>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {detail}
                        </p>
                      </div>
                    </motion.div>
                    {index < pipeline.length - 1 ? <Connection /> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="premium-surface rounded-3xl bg-background/55 p-5">
                <p className="text-sm text-muted-foreground">Scheduling model</p>
                <p className="mt-2 text-base font-semibold leading-7">
                  Due jobs are discovered centrally before being handed off to the queue.
                </p>
              </div>
              <div className="premium-surface rounded-3xl bg-background/55 p-5">
                <p className="text-sm text-muted-foreground">Execution model</p>
                <p className="mt-2 text-base font-semibold leading-7">
                  Worker nodes consume jobs independently, which keeps request execution scalable.
                </p>
              </div>
              <div className="premium-surface rounded-3xl bg-background/55 p-5">
                <p className="text-sm text-muted-foreground">Observability model</p>
                <p className="mt-2 text-base font-semibold leading-7">
                  Metrics storage and the dashboard turn every run into inspectable operational history.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}
