"use client";

import { useState } from "react";
import { LoaderCircle, Plus } from "lucide-react";

import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createJob, getErrorMessage } from "@/lib/api";

export function CreateJobModal({ onCreated }: { onCreated: () => Promise<void> | void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState("https://example.com");
  const [intervalMinutes, setIntervalMinutes] = useState(10);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createJob({ url, intervalMinutes });
      await onCreated();
      setOpen(false);
      setUrl("https://example.com");
      setIntervalMinutes(10);
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add URL Monitor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new URL monitor</DialogTitle>
          <DialogDescription>Point CronPing at a public endpoint and choose how often it should run.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error ? <ErrorState title="Could not create job" description={error} /> : null}
          <div className="space-y-2">
            <label htmlFor="monitor-url" className="text-sm font-medium">
              URL
            </label>
            <Input
              id="monitor-url"
              type="url"
              placeholder="https://status.yourapp.com/health"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="monitor-interval" className="text-sm font-medium">
              Interval minutes
            </label>
            <Input
              id="monitor-interval"
              type="number"
              min={1}
              max={1440}
              value={intervalMinutes}
              onChange={(event) => setIntervalMinutes(Number(event.target.value))}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              Create monitor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

