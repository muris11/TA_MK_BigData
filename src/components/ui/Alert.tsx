import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "error" | "info";
  title?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, children, ...props }, ref) => {
    const Icon = {
      success: CheckCircle,
      warning: AlertTriangle,
      error: AlertCircle,
      info: Info
    }[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-xl border p-4 flex gap-3",
          {
            "bg-emerald-50 border-emerald-200 text-emerald-800": variant === "success",
            "bg-amber-50 border-amber-200 text-amber-900": variant === "warning",
            "bg-red-50 border-red-200 text-red-800": variant === "error",
            "bg-blue-50 border-blue-200 text-blue-800": variant === "info",
          },
          className
        )}
        {...props}
      >
        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          {title && <h5 className="font-bold leading-none tracking-tight">{title}</h5>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert };
