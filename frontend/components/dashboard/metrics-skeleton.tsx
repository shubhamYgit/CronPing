import { Skeleton } from "@/components/ui/skeleton";

export function MetricsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-soft">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-6 h-8 w-28" />
          <Skeleton className="mt-6 h-4 w-32" />
        </div>
      ))}
    </div>
  );
}

