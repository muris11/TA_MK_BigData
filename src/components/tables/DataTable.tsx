'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKey?: keyof T;
  pagination?: boolean;
  pageSize?: number;
}

export function DataTable<T>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Cari data...",
  searchKey,
  pagination = false,
  pageSize = 10
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Data
  const filteredData = React.useMemo(() => {
    if (!searchable || !searchTerm || !searchKey) return data;
    return data.filter(item => {
      const val = item[searchKey];
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, searchable, searchKey]);

  // Pagination Data
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    if (!pagination) return filteredData;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pagination, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search Bar */}
      {searchable && searchKey && (
        <div className="relative w-full max-w-sm shrink-0">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 h-10 rounded-xl"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        </div>
      )}

      {/* Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={cn("px-6 py-4 font-extrabold", {
                    "text-left": col.align === 'left' || !col.align,
                    "text-right": col.align === 'right',
                    "text-center": col.align === 'center',
                  })}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50/50 transition">
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={cn("px-6 py-3.5", {
                        "text-left": col.align === 'left' || !col.align,
                        "text-right": col.align === 'right',
                        "text-center": col.align === 'center',
                      })}
                    >
                      {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 font-semibold">
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center px-2 shrink-0">
          <span className="text-xs font-bold text-slate-500">
            Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredData.length)} dari {filteredData.length} data
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Menghasilkan halaman di sekitar halaman aktif jika total halaman > 5
              let pageNum = i + 1;
              if (currentPage > 3 && totalPages > 5) {
                pageNum = currentPage - 3 + i;
                if (pageNum + (4 - i) > totalPages) {
                  pageNum = totalPages - 4 + i;
                }
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="w-8 h-8 rounded-lg text-xs"
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
