import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { PricePredictionForm } from '@/components/forms/PricePredictionForm';
import { InsightCard } from '@/components/cards/InsightCard';
import { getEncoderMapping } from '@/lib/data';
import { EmptyState } from '@/components/ui/EmptyState';

export default function PrediksiHargaPage() {
  const encoders = getEncoderMapping();

  if (!encoders) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-8 py-2">
      <PageHeader
        eyebrow="Supervised Learning"
        title="Prediksi Harga Pangan Pokok"
        description="Gunakan model regresi Random Forest Regressor dari file bundle (.pkl) untuk memprediksi nominal harga pangan regional."
      />

      <section className="w-full">
        <PricePredictionForm encoders={encoders} />
      </section>

      {/* Catatan Teknis Pemodelan */}
      <section className="w-full">
        <InsightCard
          title="Detail Teknis Model Regresi Prediksi Harga"
          category="Model Regresi"
          date="2026-05-18"
        >
          <p>
            Prediksi harga pangan dihitung menggunakan model <strong>Random Forest Regressor</strong> yang telah dilatih pada dataset historis berukuran besar. Model ini dipilih karena keunggulannya dalam menangani interaksi non-linier antar fitur (seperti interaksi musiman bulan dengan pola logistik provinsi) tanpa mengalami overfitting yang berlebihan.
          </p>
          <p>
            Fitur input yang berkontribusi paling tinggi terhadap akurasi model (feature importances) meliputi: <code className="bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">harga_sebelumnya</code>, <code className="bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">rata_rata_3_bulan</code>, dan <code className="bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">komoditas_encoded</code>. Evaluasi pengujian menghasilkan skor R² sebesar 0.942, menandakan model mampu menjelaskan 94.2% variansi harga pangan secara historis.
          </p>
        </InsightCard>
      </section>
    </div>
  );
}
