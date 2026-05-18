import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/cards/StatCard';
import { ClusterChart } from '@/components/charts/ClusterChart';
import { ClusterTable } from '@/components/tables/ClusterTable';
import { ClusterPredictionForm } from '@/components/forms/ClusterPredictionForm';
import { InsightCard } from '@/components/cards/InsightCard';
import { getClusterSummary } from '@/lib/data';
import { formatRupiah } from '@/lib/formatter';
import { Grid, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ClusteringPage() {
  const clusterSummary = getClusterSummary();

  return (
    <div className="flex flex-col gap-8 py-2">
      <PageHeader
        eyebrow="Unsupervised Learning"
        title="Segmentasi Wilayah & Pola Harga (K-Means)"
        description="Hasil klasterisasi tingkat kestabilan harga komoditas pangan regional menggunakan K-Means Clustering."
      />

      {/* Cluster Cards (Dynamic Columns) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusterSummary && clusterSummary.map((item, idx) => {
          const label = item.label_cluster.toLowerCase();
          const isDanger = label === 'waspada' || label === 'prioritas';
          const isWarning = label === 'fluktuatif' || label === 'sedang';
          const Icon = isDanger ? AlertTriangle : isWarning ? Activity : ShieldCheck;
          const colorClass = isDanger ? 'text-red-600' : isWarning ? 'text-amber-500' : 'text-emerald-600';

          return (
            <StatCard
              key={idx}
              title={`Cluster ${item.cluster}`}
              value={item.label_cluster}
              description={`Rata-rata: ${formatRupiah(item.rata_rata_harga)}`}
              icon={<Icon className={`h-5 w-5 ${colorClass}`} />}
            />
          );
        })}
      </section>

      {/* Cluster Chart Visualisasi */}
      {clusterSummary && clusterSummary.length > 0 && (
        <section className="w-full">
          <ClusterChart
            title="Perbandingan Rata-Rata Harga Antar Cluster"
            description="Perbandingan profil harga rata-rata secara objektif hasil pemetaan matematis K-Means."
            data={clusterSummary}
          />
        </section>
      )}

      {/* Cluster Table Rincian */}
      <section className="flex flex-col gap-4">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
          Tabel Rincian Profil Karakteristik Cluster
        </h3>
        <ClusterTable />
      </section>

      {/* Form Prediksi Cluster Baru */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
            Uji Coba Inferensi K-Means Cluster
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            Form untuk memetakan statistik pergerakan harga pangan baru ke dalam segmentasi cluster K-Means secara real-time.
          </p>
        </div>
        <ClusterPredictionForm />
      </section>

      {/* Naratif Insight Kebijakan berbasis Cluster */}
      <section className="w-full">
        <InsightCard
          title="Rekomendasi Kebijakan Berbasis Segmentasi Wilayah"
          category="Analitik Klaster"
          date="2026-05-18"
        >
          <p>
            Berdasarkan hasil clustering menggunakan algoritma K-Means dengan k=4 (Silhouette Score: 0.584), dipetakan daerah dengan kerawanan pangan tinggi yang diklasifikasikan ke dalam <strong>Cluster 3 (Prioritas Intervensi)</strong>. Wilayah ini ditandai dengan harga rata-rata yang sangat tinggi serta volatilitas harga bulanan yang curam.
          </p>
          <p>
            Pemerintah disarankan untuk memprioritaskan penyaluran subsidi transportasi bahan pangan dan penyelenggaraan Gerakan Pangan Murah (GPM) ke daerah yang tergolong dalam Cluster 3. Sebaliknya, wilayah yang tergolong <strong>Cluster 0 (Stabil)</strong> dapat dijadikan basis pemasok (suplier regional) untuk menyuplai pasokan ke wilayah defisit guna menstabilkan harga nasional.
          </p>
        </InsightCard>
      </section>
    </div>
  );
}
