import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-xs",
        hoverEffect && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
