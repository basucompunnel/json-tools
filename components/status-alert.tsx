import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface StatusAlertProps {
  variant: "success" | "error";
  message: string;
  minWidth?: string;
}

export function StatusAlert({ variant, message, minWidth = "min-w-md" }: StatusAlertProps) {
  const isSuccess = variant === "success";

  return (
    <Alert
      variant={isSuccess ? "default" : "destructive"}
      className={`rounded-none flex-row items-center gap-2 py-1.5 px-3 h-9 w-auto ${minWidth} ${
        isSuccess
          ? "border-green-500 text-green-600 dark:border-green-500 dark:text-green-400"
          : ""
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0" />
      )}
      <AlertDescription className="m-0">{message}</AlertDescription>
    </Alert>
  );
}
