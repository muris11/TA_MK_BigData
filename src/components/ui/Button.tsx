import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-98 disabled:pointer-events-none disabled:opacity-60",
          {
            "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm": variant === "primary",
            "bg-slate-100 text-slate-700 hover:bg-slate-200": variant === "secondary",
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50": variant === "outline",
            "text-slate-600 hover:bg-slate-50": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 shadow-sm": variant === "danger",
          },
          {
            "rounded-lg px-3 py-1.5 text-xs": size === "sm",
            "rounded-xl px-5 py-2.5 text-sm": size === "md",
            "rounded-xl px-6 py-3.5 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
