import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTone = "dark" | "elevated" | "gradient";

const toneClasses: Record<SectionTone, string> = {
  dark: "landing-section-dark",
  elevated: "landing-section-elevated",
  gradient: "landing-section-gradient",
};

export function SectionShell({
  id,
  className,
  children,
  tone = "dark",
  separator = true,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: SectionTone;
  separator?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden py-24 md:py-32",
        toneClasses[tone],
        className
      )}
    >
      {separator ? (
        <>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.08),transparent_75%)] opacity-70" />
        </>
      ) : null}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">{children}</div>
    </section>
  );
}
