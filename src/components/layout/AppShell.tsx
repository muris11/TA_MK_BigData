'use client';

import React, { useState, useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { Topbar } from './Topbar';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Mencegah scroll pada body ketika mobile menu terbuka
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Topbar di level DOM tertinggi agar fixed top handal di semua halaman & browser */}
      <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

      {/* Sidebar Desktop (Tetap di kiri) */}
      <div className="hidden lg:block lg:w-[280px] shrink-0 h-screen sticky top-0">
        <AppSidebar />
      </div>

      {/* Mobile Drawer Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-slate-900/40 z-50 transition-opacity duration-300 lg:hidden",
          isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileSidebarOpen(false)}
      >
        {/* Sidebar Container */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-[280px] bg-white transition-transform duration-300 transform z-60 flex flex-col",
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tombol Tutup Sidebar */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
          <AppSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-grow p-4 md:p-8 pt-20 md:pt-24">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
