"use client";

import { useEffect, useState } from "react";
import { Activity, Clock3, Percent, Radar } from "lucide-react";

import { MetricCard } from "@/components/dashboard/metric-card";
import { MetricsSkeleton } from "@/components/dashboard/metrics-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getErrorMessage, getStats } from "@/lib/api";
import { formatLatency, formatMetric } from "@/lib/format";
import type { SystemStats } from "@/lib/types";

const defaultStats: SystemStats = {
  totalJobs: 0,
  totalPings: 0,
  successRate: 0,
  averageLatency: 0,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<SystemStats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        setError(null);
        setStats(await getStats());
      } catch (statsError) {
        setError(getErrorMessage(statsError));
      } finally {
        setLoading(false);
      }
    }

    void loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Monitoring at a glance"
        description="Stay on top of health checks, throughput, and latency from one clean dashboard."
      />

      {error ? <ErrorState title="Could not load system stats" description={error} /> : null}

      {loading ? (
        <MetricsSkeleton />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Total Jobs" value={formatMetric(stats.totalJobs)} description="Configured monitors" icon={Activity} />
          <MetricCard title="Total Pings" value={formatMetric(stats.totalPings)} description="Recorded executions" icon={Radar} />
          <MetricCard title="Success Rate" value={`${formatMetric(stats.successRate)}%`} description="Healthy responses" icon={Percent} />
          <MetricCard title="Average Latency" value={formatLatency(stats.averageLatency)} description="Across all job logs" icon={Clock3} />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>What this dashboard is watching</CardTitle>
          <CardDescription>
            Every minute, the backend schedules due jobs into Redis, a worker pings the target URL, and the result lands in your job history.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
            <p className="text-sm text-muted-foreground">1. Schedule</p>
            <p className="mt-2 text-lg font-semibold">Due jobs are picked up automatically.</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
            <p className="text-sm text-muted-foreground">2. Execute</p>
            <p className="mt-2 text-lg font-semibold">URLs are pinged with timeout-aware checks.</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
            <p className="text-sm text-muted-foreground">3. Observe</p>
            <p className="mt-2 text-lg font-semibold">Logs and latency stay visible per monitor.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
