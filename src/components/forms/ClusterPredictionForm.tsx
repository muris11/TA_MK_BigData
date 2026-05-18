'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { predictCluster } from '@/lib/api';
import { ClusterPredictionPayload, ClusterPredictionResponse } from '@/lib/types';
import { RefreshCw, Grid } from 'lucide-react';

export function ClusterPredictionForm() {
  const [formData, setFormData] = useState({
    rata_rata_harga: 31702,
    harga_median: 31938,
    harga_maksimum: 36010,
    harga_minimum: 27195,
    standar_deviasi_harga: 2154,
    rata_rata_kenaikan: 0.36,
    volatilitas_rata_rata: 1309
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClusterPredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handlePresetData = () => {
    setFormData({
      rata_rata_harga: 31702.47,
      harga_median: 31938.55,
      harga_maksimum: 36010.52,
      harga_minimum: 27195.18,
      standar_deviasi_harga: 2154.29,
      rata_rata_kenaikan: 0.36,
      volatilitas_rata_rata: 1309.00
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    const payload: ClusterPredictionPayload = formData;

    try {
      const response = await predictCluster(payload);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Gagal memproses prediksi cluster.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Form Input */}
      <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-6">
        <Card className="flex flex-col gap-5 bg-white border border-slate-200">
          <div className="flex justify-between items-center shrink-0">
            <h3 className="text-base font-bold text-slate-900 leading-none">
              Parameter Cluster Komoditas/Wilayah
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePresetData}
              className="flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Gunakan Preset
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Rata-rata Harga (Rp)"
              type="number"
              name="rata_rata_harga"
              value={formData.rata_rata_harga}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Harga Median (Rp)"
              type="number"
              name="harga_median"
              value={formData.harga_median}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Harga Maksimum (Rp)"
              type="number"
              name="harga_maksimum"
              value={formData.harga_maksimum}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Harga Minimum (Rp)"
              type="number"
              name="harga_minimum"
              value={formData.harga_minimum}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Standar Deviasi Harga"
              type="number"
              name="standar_deviasi_harga"
              value={formData.standar_deviasi_harga}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Rata-rata Kenaikan"
              type="number"
              name="rata_rata_kenaikan"
              value={formData.rata_rata_kenaikan}
              onChange={handleInputChange}
              step="0.01"
            />
            <Input
              label="Volatilitas Rata-rata"
              type="number"
              name="volatilitas_rata_rata"
              value={formData.volatilitas_rata_rata}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            loading={loading}
          >
            <Grid className="h-4 w-4 mr-2" />
            Petakan Cluster Unsupervised (K-Means)
          </Button>
        </Card>
      </form>

      {/* Result Card */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {error && (
          <Alert variant="error" title="Clustering Gagal">
            {error}
          </Alert>
        )}

        {result ? (
          <Card className="bg-slate-900 text-white flex flex-col gap-6 border-0 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Grid className="h-48 w-48" />
            </div>

            <div className="flex flex-col gap-1.5 shrink-0 z-10">
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest leading-none">
                Segmentasi Wilayah & Komoditas
              </span>
              <h3 className="text-xl font-bold tracking-tight text-slate-100">
                Peta Klasterisasi Terdeteksi
              </h3>
            </div>

            <div className="flex flex-col gap-1.5 z-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Hasil Segmentasi K-Means
              </span>
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
                  Cluster {result.cluster}
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ring-inset ${
                  result.cluster === 3
                    ? 'bg-red-950 text-red-300 ring-red-500/30'
                    : result.cluster === 2
                    ? 'bg-amber-950 text-amber-300 ring-amber-500/30'
                    : result.cluster === 1
                    ? 'bg-blue-950 text-blue-300 ring-blue-500/30'
                    : 'bg-emerald-950 text-emerald-300 ring-emerald-500/30'
                }`}>
                  {result.cluster === 3 ? 'Prioritas' : result.cluster === 2 ? 'Fluktuatif' : result.cluster === 1 ? 'Sedang' : 'Stabil'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 z-10 border-t border-slate-800 pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-bold">Karakteristik Cluster:</span>
                <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                  {result.interpretasi}
                </p>
              </div>

              <div className="flex flex-col gap-1 bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] text-emerald-400 font-extrabold uppercase tracking-wider">
                  Rekomendasi Kebijakan Cluster:
                </span>
                <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                  {result.rekomendasi}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center text-center p-8 border border-slate-200 bg-white h-[450px] gap-4">
            <div className="rounded-full bg-slate-50 p-4 text-slate-400">
              <Grid className="h-8 w-8" />
            </div>
            <div className="flex flex-col gap-1 max-w-xs">
              <h4 className="text-base font-bold text-slate-800">Menunggu Input</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Silakan isi data statistik pergerakan harga komoditas/wilayah di sebelah kiri dan klik tombol segmentasi untuk memproses model unsupervised learning.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
