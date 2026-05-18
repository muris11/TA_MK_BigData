import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '@/lib/utils';
import { TrendingUp, Calendar } from 'lucide-react';

interface InsightCardProps {
  title: string;
  category?: string;
  date?: string;
  children: React.ReactNode;
  className?: string;
}

export function InsightCard({ title, category, date, children, className }: InsightCardProps) {
  return (
    <Card className={cn("bg-emerald-950 text-white flex flex-col gap-4 border-0 shadow-lg", className)}>
      <div className="flex items-center justify-between gap-3 shrink-0">
        <span className="text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest leading-none flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          Naratif Analisis
        </span>
        {category && (
          <Badge className="bg-emerald-900/50 text-emerald-300 border-emerald-800 ring-0">
            {category}
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold tracking-tight text-emerald-100">
          {title}
        </h3>
        <div className="text-sm font-semibold text-emerald-200/90 leading-relaxed space-y-2">
          {children}
        </div>
      </div>

      {date && (
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold shrink-0 mt-2 border-t border-emerald-900/40 pt-3">
          <Calendar className="h-3.5 w-3.5" />
          Diperbarui: {date}
        </div>
      )}
    </Card>
  );
}
