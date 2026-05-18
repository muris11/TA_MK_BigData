import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string | number;
    type: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, description, trend, icon, className }: StatCardProps) {
  return (
    <Card className={cn("flex items-start justify-between gap-4 bg-white hoverEffect", className)}>
      <div className="flex flex-col gap-2 min-w-0">
        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider truncate">
          {title}
        </span>
        <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
          {value}
        </span>

        {/* Trend & Description */}
        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ring-inset",
                {
                  "bg-emerald-50 text-emerald-700 ring-emerald-600/25": trend.type === 'up',
                  "bg-red-50 text-red-700 ring-red-600/25": trend.type === 'down',
                  "bg-slate-50 text-slate-600 ring-slate-500/10": trend.type === 'neutral'
                }
              )}
            >
              {trend.type === 'up' ? (
                <TrendingUp className="h-3 w-3 shrink-0" />
              ) : trend.type === 'down' ? (
                <TrendingDown className="h-3 w-3 shrink-0" />
              ) : (
                <Minus className="h-3 w-3 shrink-0" />
              )}
              {trend.value}
            </span>
          )}
          {description && (
            <span className="text-[11px] font-semibold text-slate-500 leading-none">
              {description}
            </span>
          )}
        </div>
      </div>

      {icon && (
        <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl shrink-0">
          {icon}
        </div>
      )}
    </Card>
  );
}
