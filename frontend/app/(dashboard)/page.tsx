"use client";

import { useEffect, useState } from "react";

import { DashboardPreviewSection } from "@/components/dashboard-preview/dashboard-preview-section";
import { LandingFooter } from "@/components/footer/landing-footer";
import { FeaturesSection } from "@/components/features/features-section";
import { HeroSection } from "@/components/hero/hero-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { CredibilitySection } from "@/components/landing/credibility-section";
import { LiveMonitoringFlowSection } from "@/components/landing/live-monitoring-flow-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionOverviewSection } from "@/components/landing/solution-overview-section";
import { LandingNavbar } from "@/components/navbar/landing-navbar";
import { getErrorMessage, getStats } from "@/lib/api";
import type { SystemStats } from "@/lib/types";

const demoStats: SystemStats = {
  totalJobs: 128,
  totalPings: 18432,
  successRate: 99.94,
  averageLatency: 182,
};

type HeroStatsMode = "loading" | "live" | "demo";

export default function LandingPage() {
  const [stats, setStats] = useState<SystemStats>(demoStats);
  const [statsMode, setStatsMode] = useState<HeroStatsMode>("loading");
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        setStatsMode("loading");
        setStatsError(null);

        const liveStats = await getStats();

        if (!isMounted) {
          return;
        }

        setStats(liveStats);
        setStatsMode("live");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setStats(demoStats);
        setStatsMode("demo");
        setStatsError(getErrorMessage(error));
      }
    }

    void loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 -z-20 bg-background" />
      <div className="absolute inset-0 -z-10 surface-grid opacity-[0.24]" />
      <div className="absolute left-[-10rem] top-[-6rem] -z-10 h-[26rem] w-[26rem] rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-[-8rem] top-[18rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-accent/70 blur-3xl dark:bg-primary/10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_52%)]" />
      <LandingNavbar />
      <main className="relative pb-10 md:pb-16">
        <HeroSection />
        <CredibilitySection stats={stats} statsMode={statsMode} statsError={statsError} />
        <ProblemSection />
        <SolutionOverviewSection />
        <DashboardPreviewSection />
        <ArchitectureSection />
        <LiveMonitoringFlowSection />
        <FeaturesSection />
      </main>
      <LandingFooter />
    </div>
  );
}
