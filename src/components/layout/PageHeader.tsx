import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div className="flex flex-col gap-1.5 max-w-3xl">
        {eyebrow && (
          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest leading-none">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
          {title}
        </h1>
        {description && (
          <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-0.5">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
