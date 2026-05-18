import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '@/lib/utils';
import { Cpu } from 'lucide-react';

interface MetricCardProps {
  model: string;
  metricName: string;
  metricValue: string | number;
  description?: string;
  badgeText?: string;
  status?: "good" | "medium" | "low";
}

export function MetricCard({ model, metricName, metricValue, description, badgeText, status = "good" }: MetricCardProps) {
  return (
    <Card className="flex flex-col gap-4 border border-slate-200 bg-white hoverEffect">
      <div className="flex items-center justify-between gap-3 shrink-0">
        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-none flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-emerald-600" />
          {model}
        </span>
        {badgeText && (
          <Badge variant={status === 'good' ? 'success' : status === 'medium' ? 'warning' : 'danger'}>
            {badgeText}
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {metricName}
        </span>
        <span className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
          {metricValue}
        </span>
      </div>

      {description && (
        <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-1">
          {description}
        </p>
      )}
    </Card>
  );
}
