"use client";

import Link from "next/link";
import { PauseCircle, Trash2 } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime } from "@/lib/format";
import type { Job } from "@/lib/types";

function statusVariant(status: Job["status"]) {
  if (status === "ACTIVE") return "success" as const;
  if (status === "PAUSED") return "secondary" as const;
  return "destructive" as const;
}

export function JobTable({
  jobs,
  busyJobId,
  onPause,
  onDelete,
}: {
  jobs: Job[];
  busyJobId?: string | null;
  onPause: (jobId: string) => void;
  onDelete: (jobId: string) => void;
}) {
  if (!jobs.length) {
    return <EmptyState title="No monitors yet" description="Create your first URL monitor to start collecting job runs and latency data." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>URL</TableHead>
          <TableHead>Interval</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Run</TableHead>
          <TableHead>Next Run</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => {
          const disabled = busyJobId === job.id;

          return (
            <TableRow key={job.id}>
              <TableCell>
                <div className="max-w-[280px] truncate font-medium md:max-w-[420px]">{job.url}</div>
              </TableCell>
              <TableCell>{job.intervalMinutes} min</TableCell>
              <TableCell>
                <Badge variant={statusVariant(job.status)}>{job.status}</Badge>
              </TableCell>
              <TableCell>{formatDateTime(job.lastRun)}</TableCell>
              <TableCell>{formatDateTime(job.nextRun)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPause(job.id)}
                    disabled={disabled || job.status !== "ACTIVE"}
                  >
                    <PauseCircle className="h-4 w-4" />
                    Pause
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/jobs/${job.id}`}>View Logs</Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(job.id)} disabled={disabled}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

