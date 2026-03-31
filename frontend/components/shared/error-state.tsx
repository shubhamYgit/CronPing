import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ErrorState({ title = "Request failed", description }: { title?: string; description: string }) {
  return (
    <Alert className="border-destructive/30 bg-destructive/5 text-destructive">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-4 w-4" />
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="text-destructive/90">{description}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

