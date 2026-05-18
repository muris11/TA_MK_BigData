import React from 'react';
import { Badge } from '../ui/Badge';
import { getClusterSummary } from '@/lib/data';
import { formatRupiah, formatNumber } from '@/lib/formatter';

export function ClusterTable() {
  const clusterData = getClusterSummary();

  const getClusterVariant = (label: string) => {
    const l = label.toLowerCase();
    if (l === 'waspada' || l === 'prioritas') return 'danger';
    if (l === 'fluktuatif' || l === 'sedang') return 'warning';
    if (l === 'stabil') return 'success';
    return 'info';
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <th className="px-6 py-4 font-extrabold text-center">Cluster</th>
            <th className="px-6 py-4 font-extrabold">Label Karakteristik</th>
            <th className="px-6 py-4 font-extrabold text-right">Rata-rata Harga</th>
            <th className="px-6 py-4 font-extrabold text-right">Rata-rata Fluktuasi</th>
            <th className="px-6 py-4 font-extrabold text-right">Rata-rata Kenaikan (%)</th>
            <th className="px-6 py-4 font-extrabold text-center">Skor Risiko (1-10)</th>
            <th className="px-6 py-4 font-extrabold text-center">Jumlah Sampel Data</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
          {clusterData && clusterData.length > 0 ? (
            clusterData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-4 text-center">
                  <Badge variant={getClusterVariant(row.label_cluster)}>
                    Cluster {row.cluster}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-slate-900 font-bold">
                  {row.label_cluster}
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-900">
                  {formatRupiah(row.rata_rata_harga)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-900">
                  {formatRupiah(row.rata_rata_fluktuasi)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-slate-900">
                  {row.rata_rata_kenaikan.toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-center font-mono">
                  <Badge variant={row.skor_risiko >= 6 ? 'danger' : row.skor_risiko >= 4 ? 'warning' : 'success'}>
                    {row.skor_risiko} / 10
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center font-mono">{formatNumber(row.jumlah_data)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-slate-400 font-semibold">
                Data Ringkasan Cluster Belum Tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
