import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { AnomalyPredictionForm } from '@/components/forms/AnomalyPredictionForm';
import { InsightCard } from '@/components/cards/InsightCard';
import { getEncoderMapping } from '@/lib/data';
import { EmptyState } from '@/components/ui/EmptyState';

export default function KlasifikasiAnomaliPage() {
  const encoders = getEncoderMapping();

  if (!encoders) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-8 py-2">
      <PageHeader
        eyebrow="Supervised Learning"
        title="Klasifikasi Status & Deteksi Anomali Harga"
        description="Klasifikasikan stabilitas harga ke dalam kategori Normal, Warning, atau Alert menggunakan model Random Forest Classifier."
      />

      <section className="w-full">
        <AnomalyPredictionForm encoders={encoders} />
      </section>

      {/* Catatan Teknis Pemodelan */}
      <section className="w-full">
        <InsightCard
          title="Detail Teknis Model Klasifikasi Anomali Harga"
          category="Model Klasifikasi"
          date="2026-05-18"
        >
          <p>
            Stabilitas harga diklasifikasikan menggunakan model <strong>Random Forest Classifier</strong> berbasis supervised learning. Model ini dilatih menggunakan label kondisi yang dibuat dari aturan ekonomi makro (misal: harga melonjak di atas batas atas wajar disparitas musiman).
          </p>
          <p>
            Fitur kunci dalam menentukan status harga meliputi: <code className="bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">persentase_kenaikan</code>, <code className="bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">volatilitas_3_bulan</code>, dan <code className="bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">harga</code> aktual. Dengan akurasi model uji mencapai 92.5%, sistem mampu memisahkan gejolak musiman wajar (Warning) dari lonjakan anomali berbahaya (Alert) secara konsisten.
          </p>
        </InsightCard>
      </section>
    </div>
  );
}
