"use client";

import { useEffect, useState } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { PageHeader } from "@/components/shared/page-header";
import { CreateJobModal } from "@/components/jobs/create-job-modal";
import { JobTable } from "@/components/jobs/job-table";
import { TableSkeleton } from "@/components/jobs/table-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { deleteJob, getErrorMessage, getJobs, pauseJob } from "@/lib/api";
import type { Job } from "@/lib/types";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyJobId, setBusyJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadJobs() {
    try {
      setLoading(true);
      setError(null);
      setJobs(await getJobs());
    } catch (jobsError) {
      setError(getErrorMessage(jobsError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadJobs();
  }, []);

  async function handlePause(jobId: string) {
    try {
      setBusyJobId(jobId);
      await pauseJob(jobId);
      await loadJobs();
    } catch (pauseError) {
      setError(getErrorMessage(pauseError));
    } finally {
      setBusyJobId(null);
    }
  }

  async function handleDelete(jobId: string) {
    if (!window.confirm("Delete this job? It will be soft-deleted in the backend.")) {
      return;
    }

    try {
      setBusyJobId(jobId);
      await deleteJob(jobId);
      await loadJobs();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setBusyJobId(null);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Jobs"
        title="URL monitors"
        description="Review each monitor, pause noisy jobs, and jump into execution history when something looks off."
        action={<CreateJobModal onCreated={loadJobs} />}
      />

      {error ? <ErrorState title="Could not load jobs" description={error} /> : null}

      {loading ? (
        <TableSkeleton />
      ) : (
        <Card>
          <CardContent className="p-3 md:p-6">
            <JobTable jobs={jobs} busyJobId={busyJobId} onPause={handlePause} onDelete={handleDelete} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

