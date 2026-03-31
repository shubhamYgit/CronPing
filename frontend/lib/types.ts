export type JobStatus = "ACTIVE" | "PAUSED" | "DELETED";

export interface AuthResponse {
  token: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type RegisterPayload = LoginPayload;

export interface CreateJobPayload {
  url: string;
  intervalMinutes: number;
}

export interface Job {
  id: string;
  url: string;
  intervalMinutes: number;
  status: JobStatus;
  lastRun: string | null;
  nextRun: string | null;
}

export interface JobLog {
  statusCode: number | null;
  responseTimeMs: number;
  errorMessage: string | null;
  executedAt: string;
}

export interface SystemStats {
  totalJobs: number;
  totalPings: number;
  successRate: number;
  averageLatency: number;
}

