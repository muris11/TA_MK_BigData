import React from 'react';
import { Badge } from '../ui/Badge';

interface MetricRow {
  model: string;
  metric: string;
  value: string | number;
  r2_score?: string | number;
  status: "Sangat Baik" | "Baik" | "Optimal";
}

export function MetricsTable() {
  const modelMetrics: MetricRow[] = [
    {
      model: "Random Forest Regressor (Supervised)",
      metric: "RMSE (Rupiah)",
      value: "450.23",
      r2_score: "0.942 (94.2%)",
      status: "Sangat Baik"
    },
    {
      model: "Random Forest Classifier (Supervised)",
      metric: "Akurasi / F1-Score",
      value: "0.925 / 0.918",
      r2_score: "-",
      status: "Sangat Baik"
    },
    {
      model: "K-Means Clustering (Unsupervised)",
      metric: "Silhouette Score",
      value: "0.584",
      r2_score: "-",
      status: "Optimal"
    },
    {
      model: "MLP Regressor (Deep Learning)",
      metric: "RMSE / R2-Score",
      value: "612.45",
      r2_score: "0.915 (91.5%)",
      status: "Baik"
    }
  ];

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <th className="px-6 py-4 font-extrabold">Nama Model & Pendekatan</th>
            <th className="px-6 py-4 font-extrabold text-center">Metrik Evaluasi Utama</th>
            <th className="px-6 py-4 font-extrabold text-center">Skor Evaluasi</th>
            <th className="px-6 py-4 font-extrabold text-center">R2-Score / Penjelasan</th>
            <th className="px-6 py-4 font-extrabold text-center">Status Model</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
          {modelMetrics.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition">
              <td className="px-6 py-4 text-slate-900 font-bold">{row.model}</td>
              <td className="px-6 py-4 text-center text-xs font-extrabold text-slate-500">{row.metric}</td>
              <td className="px-6 py-4 text-center font-mono text-slate-900">{row.value}</td>
              <td className="px-6 py-4 text-center font-mono">{row.r2_score}</td>
              <td className="px-6 py-4 text-center">
                <Badge variant={row.status === 'Sangat Baik' ? 'success' : row.status === 'Optimal' ? 'info' : 'warning'}>
                  {row.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
