import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
          {
            "bg-emerald-50 text-emerald-700 ring-emerald-600/20": variant === "success",
            "bg-amber-50 text-amber-800 ring-amber-600/20": variant === "warning",
            "bg-red-50 text-red-700 ring-red-600/20": variant === "danger",
            "bg-blue-50 text-blue-700 ring-blue-600/20": variant === "info",
            "bg-slate-50 text-slate-600 ring-slate-500/10": variant === "neutral",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
