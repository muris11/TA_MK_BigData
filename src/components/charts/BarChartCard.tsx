'use client';

import React from 'react';
import { Card } from '../ui/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { formatRupiah } from '@/lib/formatter';

interface BarChartCardProps {
  title: string;
  description?: string;
  data: any[];
  xKey: string;
  yKey: string;
  yLabel?: string;
  layout?: "horizontal" | "vertical";
  height?: number;
  barColor?: string;
}

export function BarChartCard({
  title,
  description,
  data,
  xKey,
  yKey,
  yLabel = "Harga",
  layout = "horizontal",
  height = 350,
  barColor = "#10b981"
}: BarChartCardProps) {
  const isVertical = layout === "vertical";

  // Warna-warni bar yang indah untuk grafik
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#64748b'];

  return (
    <Card className="flex flex-col gap-4 bg-white hoverEffect w-full">
      <div className="flex flex-col gap-1 shrink-0">
        <h3 className="text-base font-bold tracking-tight text-slate-900">{title}</h3>
        {description && <p className="text-xs font-semibold text-slate-500 leading-none">{description}</p>}
      </div>

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout={layout}
            margin={{ top: 10, right: 10, left: isVertical ? 30 : 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={isVertical} horizontal={!isVertical} />
            {isVertical ? (
              <>
                <XAxis
                  type="number"
                  stroke="#64748b"
                  fontSize={11}
                  fontWeight="semibold"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => formatRupiah(val).replace('Rp', 'Rp ')}
                  dy={5}
                />
                <YAxis
                  type="category"
                  dataKey={xKey}
                  stroke="#64748b"
                  fontSize={10}
                  fontWeight="bold"
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey={xKey}
                  stroke="#64748b"
                  fontSize={10}
                  fontWeight="bold"
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  fontWeight="semibold"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => formatRupiah(val).replace('Rp', 'Rp ')}
                  dx={-5}
                />
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontFamily: 'inherit',
                fontSize: '12px',
                fontWeight: '600'
              }}
              formatter={(value) => [formatRupiah(Number(value)), yLabel]}
              labelStyle={{ fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}
            />
            <Bar
              dataKey={yKey}
              name={yLabel}
              radius={isVertical ? [0, 8, 8, 0] : [8, 8, 0, 0]}
              maxBarSize={40}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
