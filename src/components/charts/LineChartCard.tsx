'use client';

import React from 'react';
import { Card } from '../ui/Card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { formatRupiah } from '@/lib/formatter';

interface LineChartCardProps {
  title: string;
  description?: string;
  data: any[];
  xKey: string;
  yKey: string;
  yLabel?: string;
  height?: number;
}

export function LineChartCard({
  title,
  description,
  data,
  xKey,
  yKey,
  yLabel = "Harga (Rp)",
  height = 350
}: LineChartCardProps) {
  return (
    <Card className="flex flex-col gap-4 bg-white hoverEffect w-full">
      <div className="flex flex-col gap-1 shrink-0">
        <h3 className="text-base font-bold tracking-tight text-slate-900">{title}</h3>
        {description && <p className="text-xs font-semibold text-slate-500 leading-none">{description}</p>}
      </div>

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#64748b"
              fontSize={11}
              fontWeight="semibold"
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
            <Line
              type="monotone"
              dataKey={yKey}
              name={yLabel}
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#047857' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
