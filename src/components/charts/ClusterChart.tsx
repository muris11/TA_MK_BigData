'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { formatRupiah } from '@/lib/formatter';

interface ClusterChartProps {
  title: string;
  description?: string;
  data: any[]; // [ { cluster: 0, harga_rata_rata: X, ... } ]
  height?: number;
}

export function ClusterChart({ title, description, data, height = 350 }: ClusterChartProps) {
  // Mapping Warna Cluster
  const clusterColors = {
    0: '#10b981', // Emerald - Stabil
    1: '#3b82f6', // Blue - Sedang
    2: '#f59e0b', // Amber - Fluktuatif
    3: '#ef4444'  // Red - Prioritas Intervensi
  } as const;

  const clusterLabels = {
    0: 'Cluster 0 (Stabil)',
    1: 'Cluster 1 (Sedang)',
    2: 'Cluster 2 (Fluktuatif)',
    3: 'Cluster 3 (Prioritas)'
  } as const;

  return (
    <Card className="flex flex-col gap-4 bg-white hoverEffect w-full">
      <div className="flex flex-col gap-1.5 shrink-0">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-base font-bold tracking-tight text-slate-900">{title}</h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500">
              Legenda:
            </span>
            <Badge variant="success">Stabil</Badge>
            <Badge variant="info">Sedang</Badge>
            <Badge variant="warning">Fluktuatif</Badge>
            <Badge variant="danger">Prioritas</Badge>
          </div>
        </div>
        {description && <p className="text-xs font-semibold text-slate-500 leading-relaxed">{description}</p>}
      </div>

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="cluster"
              stroke="#64748b"
              fontSize={11}
              fontWeight="bold"
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `Cluster ${val}`}
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
              formatter={(value, name) => {
                if (name === "rata_rata_harga") return [formatRupiah(Number(value)), "Rata-rata Harga"];
                if (name === "rata_rata_fluktuasi") return [formatRupiah(Number(value)), "Rata-rata Fluktuasi"];
                if (name === "rata_rata_kenaikan") return [`${Number(value).toFixed(2)}%`, "Rata-rata Kenaikan"];
                return [value, name];
              }}
              labelStyle={{ fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}
              labelFormatter={(label) => clusterLabels[Number(label) as keyof typeof clusterLabels] || `Cluster ${label}`}
            />
            <Bar
              dataKey="rata_rata_harga"
              name="rata_rata_harga"
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            >
              {data.map((entry, index) => {
                const cId = entry.cluster as keyof typeof clusterColors;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={clusterColors[cId] || '#64748b'}
                  />
                );
              })}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
