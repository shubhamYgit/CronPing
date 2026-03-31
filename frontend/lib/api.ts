import axios from "axios";

import { getToken } from "@/lib/auth";
import type {
  AuthResponse,
  CreateJobPayload,
  Job,
  JobLog,
  LoginPayload,
  RegisterPayload,
  SystemStats,
} from "@/lib/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      (typeof error.response?.data === "string" && error.response.data) ||
      (error.response?.data as { message?: string } | undefined)?.message ||
      error.message ||
      "Request failed"
    );
  }

  return error instanceof Error ? error.message : "Something went wrong";
}

export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<AuthResponse>("/api/auth/register", payload);
  return data;
}

export async function getStats() {
  const { data } = await api.get<SystemStats>("/api/system/stats");
  return data;
}

export async function getJobs() {
  const { data } = await api.get<Job[]>("/api/jobs");
  return data;
}

export async function createJob(payload: CreateJobPayload) {
  const { data } = await api.post<Job>("/api/jobs", payload);
  return data;
}

export async function pauseJob(jobId: string) {
  const { data } = await api.patch<Job>(`/api/jobs/${jobId}/pause`);
  return data;
}

export async function deleteJob(jobId: string) {
  await api.delete(`/api/jobs/${jobId}`);
}

export async function getLogs(jobId: string) {
  const { data } = await api.get<JobLog[]>(`/api/jobs/${jobId}/logs`);
  return data;
}

