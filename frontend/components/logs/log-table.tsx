import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime, formatLatency, isSuccessStatus } from "@/lib/format";
import type { JobLog } from "@/lib/types";

export function LogTable({ logs }: { logs: JobLog[] }) {
  if (!logs.length) {
    return <EmptyState title="No logs yet" description="As soon as the monitor runs, execution history will show up here." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status Code</TableHead>
          <TableHead>Response Time</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log, index) => {
          const success = isSuccessStatus(log.statusCode);
          return (
            <TableRow key={`${log.executedAt}-${index}`}>
              <TableCell>
                <div className="space-y-2">
                  <Badge variant={success ? "success" : "destructive"}>{log.statusCode ?? "ERR"}</Badge>
                  {log.errorMessage ? <p className="text-xs text-muted-foreground">{log.errorMessage}</p> : null}
                </div>
              </TableCell>
              <TableCell className={success ? "text-success" : "text-destructive"}>{formatLatency(log.responseTimeMs)}</TableCell>
              <TableCell>{formatDateTime(log.executedAt)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

