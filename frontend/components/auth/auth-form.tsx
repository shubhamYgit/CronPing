"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity, LoaderCircle } from "lucide-react";

import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getErrorMessage, login, register } from "@/lib/api";
import { saveSession } from "@/lib/auth";

const demoCredentials = {
  email: "demo@cronping.local",
  password: "DemoPass123!",
};

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState(demoCredentials);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = mode === "login" ? await login(form) : await register(form);
      saveSession(response.token, response.email);
      router.replace(next);
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome to CronPing</CardTitle>
            <CardDescription>Sign in to manage monitors, jobs, and response logs.</CardDescription>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted/60 p-1">
          <Button type="button" variant={mode === "login" ? "default" : "ghost"} onClick={() => setMode("login")}>
            Login
          </Button>
          <Button
            type="button"
            variant={mode === "register" ? "default" : "ghost"}
            onClick={() => setMode("register")}
          >
            Register
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <ErrorState title="Authentication failed" description={error} /> : null}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <div className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground">
          Demo-ready credentials: <span className="font-medium text-foreground">{demoCredentials.email}</span> /{" "}
          <span className="font-medium text-foreground">{demoCredentials.password}</span>
        </div>
      </CardContent>
    </Card>
  );
}
