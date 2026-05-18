import React from 'react';
import Link from 'next/link';
import { Database, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title = "Data belum tersedia",
  description = "Silakan jalankan notebook export model terlebih dahulu, lalu pindahkan file output ke folder public/data dan model.",
  actionLabel = "Lihat Panduan Dataset",
  actionHref = "/dataset"
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50 gap-4">
      <div className="rounded-full bg-slate-100 p-4 text-slate-500">
        <Database className="h-10 w-10 animate-pulse" />
      </div>
      <div className="flex flex-col gap-1 max-w-md">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
      {actionHref && (
        <Link href={actionHref} passHref>
          <Button variant="outline" size="sm">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
