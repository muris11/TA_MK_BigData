'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { predictStatus } from '@/lib/api';
import { StatusPredictionPayload, StatusPredictionResponse } from '@/lib/types';
import { RefreshCw, ShieldCheck, ShieldAlert } from 'lucide-react';

interface AnomalyPredictionFormProps {
  encoders: any;
}

export function AnomalyPredictionForm({ encoders }: AnomalyPredictionFormProps) {
  const [formData, setFormData] = useState({
    tahun: 2026,
    bulan_angka: 5,
    komoditas_encoded: 7,
    provinsi_encoded: 7,
    harga: 33718,
    harga_sebelumnya: 34449,
    rata_rata_3_bulan: 34726,
    volatilitas_3_bulan: 1170,
    perubahan_harga: -730,
    persentase_kenaikan: -2.12,
    indeks: 0.0
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusPredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const komoditasOptions = Object.entries(encoders?.komoditas || {}).map(([key, val]) => ({
    label: key,
    value: Number(val)
  }));

  const provinsiOptions = Object.entries(encoders?.provinsi || {}).map(([key, val]) => ({
    label: key,
    value: Number(val)
  }));

  const bulanOptions = [
    { label: 'Januari', value: 1 },
    { label: 'Februari', value: 2 },
    { label: 'Maret', value: 3 },
    { label: 'April', value: 4 },
    { label: 'Mei', value: 5 },
    { label: 'Juni', value: 6 },
    { label: 'Juli', value: 7 },
    { label: 'Agustus', value: 8 },
    { label: 'September', value: 9 },
    { label: 'Oktober', value: 10 },
    { label: 'November', value: 11 },
    { label: 'Desember', value: 12 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'komoditas_encoded' || name === 'provinsi_encoded' || name === 'bulan_angka' || name === 'tahun'
        ? Number(value)
        : parseFloat(value) || 0
    }));
  };

  const handlePresetData = () => {
    setFormData({
      tahun: 2026,
      bulan_angka: 5,
      komoditas_encoded: 7,
      provinsi_encoded: 7,
      harga: 33718.83,
      harga_sebelumnya: 34449.43,
      rata_rata_3_bulan: 34726.26,
      volatilitas_3_bulan: 1170.65,
      perubahan_harga: -730.60,
      persentase_kenaikan: -2.12,
      indeks: 0.0
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    const month_index = (formData.tahun - 2000) * 12 + formData.bulan_angka;

    const payload: StatusPredictionPayload = {
      ...formData,
      month_index,
      jenis_harga_encoded: 0,
      level_wilayah_encoded: 0
    };

    try {
      const response = await predictStatus(payload);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Gagal terhubung ke API Vercel Python Function.');
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
              Parameter Klasifikasi Status
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
            <Select
              label="Komoditas Pangan"
              name="komoditas_encoded"
              value={formData.komoditas_encoded}
              onChange={handleInputChange}
              options={komoditasOptions}
            />
            <Select
              label="Provinsi Wilayah"
              name="provinsi_encoded"
              value={formData.provinsi_encoded}
              onChange={handleInputChange}
              options={provinsiOptions}
            />
            <Input
              label="Tahun Klasifikasi"
              type="number"
              name="tahun"
              value={formData.tahun}
              onChange={handleInputChange}
              min={2020}
              max={2035}
            />
            <Select
              label="Bulan Klasifikasi"
              name="bulan_angka"
              value={formData.bulan_angka}
              onChange={handleInputChange}
              options={bulanOptions}
            />
          </div>

          <span className="h-px bg-slate-100 my-1" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Harga Pangan Saat Ini (Rp)"
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Harga Bulan Sebelumnya (Rp)"
              type="number"
              name="harga_sebelumnya"
              value={formData.harga_sebelumnya}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Rata-rata Harga 3 Bulan (Rp)"
              type="number"
              name="rata_rata_3_bulan"
              value={formData.rata_rata_3_bulan}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Volatilitas Harga 3 Bulan"
              type="number"
              name="volatilitas_3_bulan"
              value={formData.volatilitas_3_bulan}
              onChange={handleInputChange}
              step="0.01"
              min={0}
            />
            <Input
              label="Perubahan Harga (Rp)"
              type="number"
              name="perubahan_harga"
              value={formData.perubahan_harga}
              onChange={handleInputChange}
              step="0.01"
            />
            <Input
              label="Persentase Kenaikan (%)"
              type="number"
              name="persentase_kenaikan"
              value={formData.persentase_kenaikan}
              onChange={handleInputChange}
              step="0.01"
            />
            <Input
              label="Indeks Tambahan"
              type="number"
              name="indeks"
              value={formData.indeks}
              onChange={handleInputChange}
              step="0.01"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            loading={loading}
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            Jalankan Model Klasifikasi (.pkl)
          </Button>
        </Card>
      </form>

      {/* Result Card */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {error && (
          <Alert variant="error" title="Klasifikasi Gagal">
            {error}
          </Alert>
        )}

        {result ? (
          <Card className={`text-white flex flex-col gap-6 border-0 shadow-lg relative overflow-hidden ${
            result.status_prediksi === 'Alert'
              ? 'bg-red-950'
              : result.status_prediksi === 'Warning'
              ? 'bg-amber-950'
              : 'bg-emerald-950'
          }`}>
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <ShieldAlert className="h-48 w-48" />
            </div>

            <div className="flex flex-col gap-1.5 shrink-0 z-10">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest leading-none ${
                result.status_prediksi === 'Alert'
                  ? 'text-red-400'
                  : result.status_prediksi === 'Warning'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}>
                Hasil Model Klasifikasi Supervised
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white/95">
                Kondisi Stabilitas Harga
              </h3>
            </div>

            <div className="flex flex-col gap-1.5 z-10">
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                Status Klasifikasi Terprediksi
              </span>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
                {result.status_prediksi}
              </span>
            </div>

            <div className="flex flex-col gap-4 z-10 border-t border-white/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/75 font-bold">Confidence Score:</span>
                <span className="text-sm font-extrabold text-white">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>

              <div className="flex flex-col gap-1 bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] text-white/80 font-extrabold uppercase tracking-wider">
                  Rekomendasi Kebijakan Resmi:
                </span>
                <p className="text-xs font-semibold text-white/90 leading-relaxed">
                  {result.rekomendasi}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">
                  Tindakan Lanjutan Yang Disarankan:
                </span>
                <ul className="text-xs font-semibold text-white/90 space-y-1.5 leading-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-white/60">•</span>
                    <span>Laporkan hasil analisis ke Tim Satgas Pangan daerah setempat.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/60">•</span>
                    <span>Sinkronisasikan data distribusi dengan sistem gudang BULOG regional.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center text-center p-8 border border-slate-200 bg-white h-[450px] gap-4">
            <div className="rounded-full bg-slate-50 p-4 text-slate-400">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <div className="flex flex-col gap-1 max-w-xs">
              <h4 className="text-base font-bold text-slate-800">Menunggu Input</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Silakan isi data parameter pangan saat ini di sebelah kiri dan klik tombol klasifikasi untuk memproses model machine learning.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
