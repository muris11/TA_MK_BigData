'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { formatRupiah, formatPercentage } from '@/lib/formatter';
import { RecommendationSummaryItem } from '@/lib/types';
import {
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Activity,
  TrendingDown,
  Info,
  MapPin,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface RekomendasiClientProps {
  recommendations: RecommendationSummaryItem[];
}

export default function RekomendasiClient({ recommendations }: RekomendasiClientProps) {
  // 1. Ekstrak daftar unik provinsi dan komoditas dari data
  const uniqueProvinsi = useMemo(() => {
    const list = recommendations.map(item => item.provinsi);
    return Array.from(new Set(list)).sort();
  }, [recommendations]);

  const uniqueKomoditas = useMemo(() => {
    const list = recommendations.map(item => item.komoditas);
    return Array.from(new Set(list)).sort();
  }, [recommendations]);

  // 2. State untuk filter aktif
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>(uniqueProvinsi[0] || '');
  const [selectedKomoditas, setSelectedKomoditas] = useState<string>(uniqueKomoditas[0] || '');

  // Options untuk dropdown
  const provinsiOptions = useMemo(() => {
    return uniqueProvinsi.map(prov => ({ label: prov, value: prov }));
  }, [uniqueProvinsi]);

  const komoditasOptions = useMemo(() => {
    return uniqueKomoditas.map(kom => ({ label: kom, value: kom }));
  }, [uniqueKomoditas]);

  // 3. Cari data aktif berdasarkan filter terpilih
  const activeData = useMemo(() => {
    return recommendations.find(
      item => item.provinsi === selectedProvinsi && item.komoditas === selectedKomoditas
    ) || null;
  }, [recommendations, selectedProvinsi, selectedKomoditas]);

  // 4. Cari benchmarking: data regional lain yang berada dalam cluster yang sama
  const benchmarkingData = useMemo(() => {
    if (!activeData) return [];
    return recommendations.filter(
      item =>
        item.cluster === activeData.cluster &&
        !(item.provinsi === activeData.provinsi && item.komoditas === activeData.komoditas)
    );
  }, [recommendations, activeData]);

  // Helper untuk memetakan style visual cluster
  const getClusterStyling = (label: string) => {
    const l = label.toLowerCase();
    if (l === 'waspada' || l === 'prioritas' || l === 'prioritas intervensi') {
      return {
        variant: 'danger' as const,
        colorClass: 'text-red-600',
        bgClass: 'bg-red-50 border-red-200',
        cardBg: 'bg-red-50/30',
        icon: AlertTriangle,
        badgeText: 'Tingkat Kerawanan Tinggi / Intervensi Segera'
      };
    }
    if (l === 'sedang' || l === 'fluktuatif' || l === 'normal') {
      return {
        variant: 'warning' as const,
        colorClass: 'text-amber-500',
        bgClass: 'bg-amber-50 border-amber-200',
        cardBg: 'bg-amber-50/30',
        icon: Activity,
        badgeText: 'Tingkat Kerawanan Sedang / Pemantauan Rutin'
      };
    }
    return {
      variant: 'success' as const,
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50 border-emerald-200',
      cardBg: 'bg-emerald-50/30',
      icon: ShieldCheck,
      badgeText: 'Kondisi Aman / Stabil & Mandiri'
    };
  };

  const styling = activeData ? getClusterStyling(activeData.label_cluster) : null;
  const StatusIcon = styling?.icon || Info;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Panel Filter Interaktif */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-col gap-1.5 min-w-[200px] shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 uppercase tracking-widest">
              <MapPin className="h-3.5 w-3.5" />
              Saring Wilayah & Komoditas
            </span>
            <h4 className="text-sm font-bold text-slate-800 leading-none">
              Pilih Parameter Analisis
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Select
              label="Pilih Provinsi"
              options={provinsiOptions}
              value={selectedProvinsi}
              onChange={(e) => setSelectedProvinsi(e.target.value)}
            />
            <Select
              label="Pilih Komoditas"
              options={komoditasOptions}
              value={selectedKomoditas}
              onChange={(e) => setSelectedKomoditas(e.target.value)}
            />
          </div>
        </div>
      </section>

      {activeData && styling ? (
        <>
          {/* Bagian Statistik Utama & Status Ringkasan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">

            {/* Sisi Kiri: Profil Kerawanan Harga Komoditas */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Card className="flex flex-col gap-6 bg-white border border-slate-200 h-full justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                        Profil Klaster Kerawanan Wilayah
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {activeData.komoditas} di {activeData.provinsi}
                      </h3>
                    </div>
                    <Badge variant={styling.variant}>
                      {activeData.label_cluster}
                    </Badge>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Interpretasi Status
                    </span>
                    <div className="flex items-start gap-2.5">
                      <div className={`rounded-full p-1 shrink-0 ${styling.bgClass}`}>
                        <StatusIcon className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                        Kombinasi komoditas <strong>{activeData.komoditas}</strong> di provinsi <strong>{activeData.provinsi}</strong> dipetakan secara matematis ke dalam <strong>Cluster {activeData.cluster} ({activeData.label_cluster})</strong>. {styling.badgeText}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrik Grid Ringkas */}
                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Rerata Harga
                    </span>
                    <span className="text-sm md:text-base font-extrabold text-slate-900 font-mono">
                      {formatRupiah(activeData.rata_rata_harga)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-x border-slate-100 px-4">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Volatilitas (Std)
                    </span>
                    <span className="text-sm md:text-base font-extrabold text-slate-900 font-mono">
                      {formatRupiah(activeData.standar_deviasi_harga)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Laju Kenaikan
                    </span>
                    <span className={`text-sm md:text-base font-extrabold font-mono flex items-center gap-0.5 ${
                      activeData.rata_rata_kenaikan > 0.5 ? 'text-red-600' : 'text-emerald-600'
                    }`}>
                      {activeData.rata_rata_kenaikan > 0 ? (
                        <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 shrink-0" />
                      )}
                      {formatPercentage(activeData.rata_rata_kenaikan)}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sisi Kanan: Kartu Rekomendasi Kebijakan Dinamis */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Card className={`text-slate-900 border flex flex-col gap-5 shadow-sm justify-between h-full relative overflow-hidden ${styling.bgClass}`}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`rounded-lg p-1.5 bg-white shadow-xs`}>
                      <FileText className={`h-4.5 w-4.5 ${styling.colorClass}`} />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${styling.colorClass}`}>
                      Rekomendasi Kebijakan Utama
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-950 leading-snug tracking-tight">
                    Program Intervensi & Manajemen Harga Strategis
                  </h4>

                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    {activeData.rekomendasi_kebijakan}
                  </p>
                </div>

                <div className="bg-white/60 border border-slate-100 rounded-xl p-3 flex items-start gap-2 mt-2">
                  <HelpCircle className={`h-4 w-4 shrink-0 mt-0.5 ${styling.colorClass}`} />
                  <p className="text-[10px] font-semibold text-slate-500 leading-relaxed">
                    Rekomendasi ini didasarkan pada tingkat volatilitas harga jangka pendek serta kesenjangan deviasi harga wilayah terhadap rata-rata nasional.
                  </p>
                </div>
              </Card>
            </div>

          </div>

          {/* Bagian Perbandingan Regional Benchmarking */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
                Benchmarking Regional: Anggota Cluster yang Sama
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Daftar provinsi dan komoditas lain yang memiliki profil kestabilan harga serupa dalam <strong>Cluster {activeData.cluster}</strong> sebagai rujukan kolaborasi regional.
              </p>
            </div>

            <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-extrabold">Provinsi</th>
                    <th className="px-6 py-4 font-extrabold">Komoditas</th>
                    <th className="px-6 py-4 font-extrabold text-right">Rata-rata Harga</th>
                    <th className="px-6 py-4 font-extrabold text-right">Volatilitas (Std. Dev)</th>
                    <th className="px-6 py-4 font-extrabold text-right">Laju Kenaikan</th>
                    <th className="px-6 py-4 font-extrabold text-center">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {benchmarkingData.length > 0 ? (
                    benchmarkingData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 text-slate-900 font-bold">
                          {row.provinsi}
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-semibold">
                          {row.komoditas}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-slate-900">
                          {formatRupiah(row.rata_rata_harga)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-slate-500">
                          {formatRupiah(row.standar_deviasi_harga)}
                        </td>
                        <td className={`px-6 py-4 text-right font-mono ${
                          row.rata_rata_kenaikan > 0.5 ? 'text-red-600' : 'text-emerald-600'
                        }`}>
                          {formatPercentage(row.rata_rata_kenaikan)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProvinsi(row.provinsi);
                              setSelectedKomoditas(row.komoditas);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 hover:text-emerald-700 transition"
                          >
                            Tinjau
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-semibold">
                        Tidak ada wilayah/komoditas lain dalam klaster ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <Card className="flex flex-col items-center justify-center text-center p-12 border border-slate-200 bg-white h-[300px] gap-4">
          <div className="rounded-full bg-slate-50 p-4 text-slate-400">
            <Info className="h-8 w-8" />
          </div>
          <div className="flex flex-col gap-1 max-w-xs">
            <h4 className="text-base font-bold text-slate-800">Data Tidak Ditemukan</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kombinasi provinsi dan komoditas terpilih tidak memiliki catatan rekomendasi kebijakan. Silakan pilih kombinasi parameter lain.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
