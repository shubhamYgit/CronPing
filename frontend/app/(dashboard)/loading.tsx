import { MetricsSkeleton } from "@/components/dashboard/metrics-skeleton";
import { TableSkeleton } from "@/components/jobs/table-skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <MetricsSkeleton />
      <TableSkeleton rows={4} />
    </div>
  );
}

