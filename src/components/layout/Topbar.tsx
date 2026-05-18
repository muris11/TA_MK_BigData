'use client';

import React from 'react';
import { Menu, Info, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md fixed top-0 right-0 left-0 lg:left-[280px] z-30 flex items-center justify-between px-6">
      {/* Tombol Hamburger di Mobile */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Title Ringkas */}
        <div className="hidden sm:flex flex-col">
          <h2 className="text-sm font-bold text-slate-800 leading-none">
            FoodPrice Insight Indonesia
          </h2>
          <span className="text-[10px] text-slate-500 font-semibold mt-1">
            Analisis Data Terpadu & Prediksi Harga Pangan Nasional
          </span>
        </div>
      </div>

      {/* Aksi Kanan */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800"
          title="Tentang Proyek"
        >
          <Info className="h-4 w-4" />
        </Button>
        <span className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-2 pl-1">
          <div className="h-7 w-7 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold flex items-center justify-center">
            TA
          </div>
          <span className="text-xs font-bold text-slate-700 hidden md:inline-block">
            Presenter Mahasiswa
          </span>
        </div>
      </div>
    </header>
  );
}
