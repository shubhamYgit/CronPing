export function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatMetric(value: number, suffix = "") {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)}${suffix}`;
}

export function formatLatency(value: number) {
  return `${formatMetric(value)} ms`;
}

export function isSuccessStatus(statusCode: number | null) {
  return typeof statusCode === "number" && statusCode >= 200 && statusCode < 400;
}

