import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col gap-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-3 w-full" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 w-1/3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-full" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-[280px] md:h-[360px] w-full" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 p-3 border-b border-slate-200">
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="p-4 flex flex-col gap-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
}
