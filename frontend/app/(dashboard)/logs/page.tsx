import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export default function LogsLandingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Logs"
        title="Job logs live per monitor"
        description="Choose a job from the jobs table to view recent executions, response times, and failures."
      />
      <EmptyState
        title="Pick a job to inspect"
        description="The backend exposes logs at /api/jobs/{id}/logs, so the dashboard shows them in the context of a specific monitor."
        action={
          <Button asChild>
            <Link href="/jobs">Open jobs</Link>
          </Button>
        }
      />
    </div>
  );
}

