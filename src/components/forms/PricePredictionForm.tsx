'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { predictPrice } from '@/lib/api';
import { formatRupiah } from '@/lib/formatter';
import { PricePredictionPayload, PricePredictionResponse } from '@/lib/types';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface PricePredictionFormProps {
  encoders: any;
}

export function PricePredictionForm({ encoders }: PricePredictionFormProps) {
  const [formData, setFormData] = useState({
    tahun: 2026,
    bulan_angka: 5,
    komoditas_encoded: 7,
    provinsi_encoded: 7,
    harga_sebelumnya: 34449,
    rata_rata_3_bulan: 34726,
    volatilitas_3_bulan: 1170,
    perubahan_harga: -730,
    persentase_kenaikan: -2.12
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PricePredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Opsi dropdown dari encoder_mapping
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
    // Preset dari api_contract sample_input
    setFormData({
      tahun: 2026,
      bulan_angka: 5,
      komoditas_encoded: 7,
      provinsi_encoded: 7,
      harga_sebelumnya: 34449.43,
      rata_rata_3_bulan: 34726.26,
      volatilitas_3_bulan: 1170.65,
      perubahan_harga: -730.60,
      persentase_kenaikan: -2.12
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    // Hitung month_index (misal: (tahun - 1900) * 12 + bulan)
    const month_index = (formData.tahun - 2000) * 12 + formData.bulan_angka;

    const payload: PricePredictionPayload = {
      ...formData,
      month_index,
      jenis_harga_encoded: 0,
      level_wilayah_encoded: 0
    };

    try {
      const response = await predictPrice(payload);
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
              Parameter Prediksi Harga
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
              label="Tahun Prediksi"
              type="number"
              name="tahun"
              value={formData.tahun}
              onChange={handleInputChange}
              min={2020}
              max={2035}
            />
            <Select
              label="Bulan Prediksi"
              name="bulan_angka"
              value={formData.bulan_angka}
              onChange={handleInputChange}
              options={bulanOptions}
            />
          </div>

          <span className="h-px bg-slate-100 my-1" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            loading={loading}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Jalankan Model Regresi (.pkl)
          </Button>
        </Card>
      </form>

      {/* Result Card */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {error && (
          <Alert variant="error" title="Inferensi Gagal">
            {error}
          </Alert>
        )}

        {result ? (
          <Card className="bg-emerald-950 text-white flex flex-col gap-6 border-0 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <TrendingUp className="h-48 w-48" />
            </div>

            <div className="flex flex-col gap-1.5 shrink-0 z-10">
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest leading-none">
                Hasil Prediksi Model Regresi
              </span>
              <h3 className="text-xl font-bold tracking-tight text-emerald-100">
                Pangan Terprediksi
              </h3>
            </div>

            <div className="flex flex-col gap-1 z-10">
              <span className="text-xs font-bold text-emerald-300/80 uppercase tracking-wider">
                Prediksi Harga Pangan
              </span>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
                {formatRupiah(result.prediksi_harga)}
              </span>
            </div>

            <div className="flex flex-col gap-4 z-10 border-t border-emerald-900/60 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-emerald-300 font-bold">Kategori Fluktuasi:</span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-extrabold ring-1 ring-inset ${
                  result.kategori === 'Alert'
                    ? 'bg-red-950 text-red-300 ring-red-500/30'
                    : result.kategori === 'Warning'
                    ? 'bg-amber-950 text-amber-300 ring-amber-500/30'
                    : 'bg-emerald-900/50 text-emerald-300 ring-emerald-500/30'
                }`}>
                  {result.kategori}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-emerald-300 font-bold">Interpretasi Hasil:</span>
                <p className="text-sm font-semibold text-emerald-100/90 leading-relaxed">
                  {result.interpretasi}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 bg-emerald-900/40 rounded-xl p-3 border border-emerald-800/40">
                <span className="text-[11px] text-emerald-300 font-extrabold uppercase tracking-wider">
                  Rekomendasi Awal:
                </span>
                <p className="text-xs font-semibold text-emerald-100/85 leading-relaxed">
                  {result.kategori === 'Alert'
                    ? 'Segera lakukan operasi pasar atau subsidi distribusi pangan di wilayah prioritas untuk menstabilkan harga.'
                    : result.kategori === 'Warning'
                    ? 'Perlu dipantau berkala stok pasokan di distributor dan kesiapan logistik transportasi wilayah.'
                    : 'Kondisi relatif stabil. Tetap pantau dan laporkan secara rutin pergerakan stok pangan di lapangan.'}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center text-center p-8 border border-slate-200 bg-white h-[450px] gap-4">
            <div className="rounded-full bg-slate-50 p-4 text-slate-400">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div className="flex flex-col gap-1 max-w-xs">
              <h4 className="text-base font-bold text-slate-800">Menunggu Input</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Silakan isi data parameter pangan di sebelah kiri dan klik tombol prediksi untuk memproses model machine learning.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
