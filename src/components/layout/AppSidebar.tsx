'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Landmark } from 'lucide-react';

interface AppSidebarProps {
  onCloseMobile?: () => void;
}

export function AppSidebar({ onCloseMobile }: AppSidebarProps) {
  const pathname = usePathname();

  // Kelompokkan menu navigasi
  const groups = ['Overview', 'Machine Learning', 'Decision Support'] as const;

  return (
    <aside className="w-full h-full bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-100 shrink-0">
        <div className="bg-emerald-100 text-emerald-700 p-2 rounded-xl">
          <Landmark className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-slate-900 tracking-tight text-base leading-none">
            FoodPrice Insight
          </span>
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">
            Indonesia
          </span>
        </div>
      </div>

      {/* Navigasi List */}
      <div className="flex-1 px-4 py-6 space-y-6">
        {groups.map((group) => {
          const items = navigationItems.filter((item) => item.group === group);
          return (
            <div key={group} className="space-y-2">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3">
                {group === 'Overview' ? 'Ringkasan & EDA' : group === 'Machine Learning' ? 'Pemodelan ML' : 'Dukungan Keputusan'}
              </h4>
              <nav className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                        isActive
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-600" : "text-slate-400")} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 text-center">
        <p className="text-[10px] font-semibold text-slate-500">
          Tugas Akhir Big Data Analytics
        </p>
        <p className="text-[9px] text-slate-400 mt-0.5">
          © 2026 FoodPrice Insight
        </p>
      </div>
    </aside>
  );
}
