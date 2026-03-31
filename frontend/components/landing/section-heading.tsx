import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "center"
          ? "mx-auto max-w-4xl text-center"
          : "max-w-3xl text-left"
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-primary/90 sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
        {title}
      </h2>
      <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  );
}
