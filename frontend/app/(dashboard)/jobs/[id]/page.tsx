"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { LogTable } from "@/components/logs/log-table";
import { ErrorState } from "@/components/shared/error-state";
import { PageHeader } from "@/components/shared/page-header";
import { TableSkeleton } from "@/components/jobs/table-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getErrorMessage, getLogs } from "@/lib/api";
import type { JobLog } from "@/lib/types";

export default function JobLogsPage({ params }: { params: Promise<{ id: string }> }) {
  const [jobId, setJobId] = useState<string>("");
  const [logs, setLogs] = useState<JobLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function resolveAndLoad() {
      const { id } = await params;
      setJobId(id);

      try {
        setLoading(true);
        setError(null);
        setLogs(await getLogs(id));
      } catch (logsError) {
        setError(getErrorMessage(logsError));
      } finally {
        setLoading(false);
      }
    }

    void resolveAndLoad();
  }, [params]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Logs"
        title="Execution history"
        description="Inspect the latest 50 ping attempts for this job, including status codes and latency."
        action={
          <Button asChild variant="outline">
            <Link href="/jobs">
              <ArrowLeft className="h-4 w-4" />
              Back to jobs
            </Link>
          </Button>
        }
      />

      <Card className="bg-primary/5">
        <CardContent className="p-5 text-sm text-muted-foreground">
          Viewing job ID: <span className="font-mono text-foreground">{jobId || "Loading..."}</span>
        </CardContent>
      </Card>

      {error ? <ErrorState title="Could not load job logs" description={error} /> : null}

      {loading ? (
        <TableSkeleton rows={6} />
      ) : (
        <Card>
          <CardContent className="p-3 md:p-6">
            <LogTable logs={logs} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

