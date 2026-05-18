import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { InsightCard } from '@/components/cards/InsightCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { getRecommendationSummary } from '@/lib/data';
import RekomendasiClient from './RekomendasiClient';

export default function RekomendasiPage() {
  const recommendations = getRecommendationSummary();

  if (!recommendations || recommendations.length === 0) {
    return <EmptyState title="Rekomendasi Kebijakan Belum Tersedia" />;
  }

  return (
    <div className="flex flex-col gap-8 py-2">
      <PageHeader
        eyebrow="Decision Support System"
        title="Rekomendasi Kebijakan Berbasis Data & Model"
        description="Rumusan strategi kebijakan pangan, program penyeimbang harga, dan prioritas intervensi regional berdasarkan hasil pengamatan model."
      />

      {/* Komponen Interaktif Client-side dengan filter dinamis */}
      <RekomendasiClient recommendations={recommendations} />

      {/* Insight Card Laporan Naratif */}
      <section className="w-full">
        <InsightCard
          title="Sinkronisasi Program Stabilisasi Harga Pangan"
          category="Strategi Nasional"
          date="2026-05-18"
        >
          <p>
            Implementasi strategi penyeimbangan harga pangan harus terintegrasi secara dinamis (dynamic pricing support). Gerakan Pangan Murah (GPM) yang diselenggarakan oleh Badan Pangan Nasional bersama BULOG terbukti efektif sebagai penahan jangka pendek (shock absorber) ketika terjadi lonjakan harga musiman.
          </p>
          <p>
            Namun, untuk kestabilan jangka panjang, mutlak diperlukan program Fasilitasi Distribusi Pangan (FDP) guna memotong rantai pasok logistik yang terlalu panjang antara petani produsen dengan konsumen perkotaan. Pemanfaatan data segmentasi wilayah (K-Means) membantu mengarahkan alokasi anggaran subsidi transportasi pangan secara presisi pada koridor perdagangan antar-daerah yang paling bergejolak.
          </p>
        </InsightCard>
      </section>
    </div>
  );
}
