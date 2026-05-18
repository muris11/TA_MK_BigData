import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '@/lib/utils';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  description: string;
  sasaran?: string;
  priority: "low" | "medium" | "high";
  keterangan?: string;
  className?: string;
}

export function RecommendationCard({ title, description, sasaran, priority, keterangan, className }: RecommendationCardProps) {
  return (
    <Card className={cn("border border-slate-200 bg-white hoverEffect flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between gap-3 shrink-0">
        {sasaran && (
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider truncate max-w-[70%]">
            Sasaran: {sasaran}
          </span>
        )}
        <Badge variant={priority === 'high' ? 'danger' : priority === 'medium' ? 'warning' : 'success'}>
          {priority === 'high' ? 'Prioritas Tinggi' : priority === 'medium' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
        </Badge>
      </div>

      <div className="flex items-start gap-3">
        <div className={cn(
          "rounded-full p-1.5 shrink-0 mt-0.5",
          {
            "bg-red-50 text-red-600": priority === 'high',
            "bg-amber-50 text-amber-600": priority === 'medium',
            "bg-emerald-50 text-emerald-600": priority === 'low',
          }
        )}>
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
            {title}
          </h4>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {keterangan && (
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500 font-semibold leading-relaxed mt-2 shrink-0">
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
          <span>{keterangan}</span>
        </div>
      )}
    </Card>
  );
}
