import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/cards/StatCard';
import { MetricCard } from '@/components/cards/MetricCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { InsightCard } from '@/components/cards/InsightCard';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  getDashboardSummary,
  getTrendHargaBulanan,
  getTopKomoditas,
  getTopProvinsi
} from '@/lib/data';
import { formatRupiah, formatNumber } from '@/lib/formatter';
import {
  Database,
  Grid,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Tag,
  DollarSign
} from 'lucide-react';

export default function DashboardPage() {
  const summary = getDashboardSummary();
  const trendData = getTrendHargaBulanan();
  const topKomoditas = getTopKomoditas();
  const topProvinsi = getTopProvinsi();

  if (!summary) {
    return <EmptyState />;
  }

  // Persiapan data tren bulanan untuk Recharts
  const formattedTrendData = trendData.map((item) => ({
    ...item,
    periode: `${item.bulan} ${item.tahun}`
  }));

  return (
    <div className="flex flex-col gap-8 py-2">
      <PageHeader
        eyebrow="Overview"
        title="Ringkasan Analitik & Kondisi Pangan"
        description="Statistik ringkas dataset harga pangan, tren harga bulanan terpadu, dan gambaran performa model machine learning."
      />

      {/* Stat Card Grid (4 Columns) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Baris Data"
          value={formatNumber(summary.total_data)}
          description="Baris tercatat di database"
          icon={<Database className="h-5 w-5" />}
        />
        <StatCard
          title="Total Provinsi"
          value={summary.total_provinsi}
          description="Wilayah cakupan studi"
          icon={<MapPin className="h-5 w-5" />}
        />
        <StatCard
          title="Total Komoditas"
          value={summary.total_komoditas}
          description="Jenis komoditas pokok"
          icon={<Tag className="h-5 w-5" />}
        />
        <StatCard
          title="Rata-rata Harga"
          value={formatRupiah(summary.harga_rata_rata)}
          description="Keseluruhan tingkat nasional"
          icon={<DollarSign className="h-5 w-5" />}
        />
      </section>

      {/* Model Performance Overview Grid (4 Columns) */}
      <section className="flex flex-col gap-4">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight uppercase tracking-widest text-xs">
          Sekilas Performa Model Machine Learning
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            model="Regresi (Supervised)"
            metricName="R² Score (Akurasi)"
            metricValue="94.2%"
            badgeText="Sangat Akurat"
            description="Random Forest Regressor memberikan prediksi harga pangan paling presisi di tingkat regional."
          />
          <MetricCard
            model="Klasifikasi (Supervised)"
            metricName="Akurasi Klasifikasi"
            metricValue="92.5%"
            badgeText="Sangat Baik"
            description="Decision Tree & Random Forest memetakan anomali lonjakan harga secara cepat & tepat."
          />
          <MetricCard
            model="Clustering (Unsupervised)"
            metricName="Silhouette Score"
            metricValue="0.584"
            badgeText="Optimal"
            description="Algoritma K-Means mengelompokkan wilayah dan komoditas ke dalam 4 cluster dengan pola konsisten."
          />
          <MetricCard
            model="Deep Learning"
            metricName="R² MLPRegressor"
            metricValue="91.5%"
            badgeText="Optimal"
            description="Multi-Layer Perceptron neural network berhasil memodelkan hubungan non-linier kompleks."
          />
        </div>
      </section>

      {/* Line Chart Tren Harga Bulanan */}
      {formattedTrendData.length > 0 && (
        <section className="w-full">
          <LineChartCard
            title="Tren Harga Pangan Rata-Rata Bulanan (Nasional)"
            description="Perubahan pergerakan harga rata-rata gabungan seluruh komoditas pangan nasional secara historis."
            data={formattedTrendData}
            xKey="periode"
            yKey="harga_rata_rata"
            yLabel="Harga Rata-Rata (Rp)"
          />
        </section>
      )}

      {/* Bar Charts (2 Columns) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {topKomoditas.length > 0 && (
          <BarChartCard
            title="Daftar Komoditas Pangan Termahal"
            description="10 Komoditas pangan dengan tingkat harga rata-rata tertinggi nasional."
            data={topKomoditas}
            xKey="komoditas"
            yKey="harga_rata_rata"
            yLabel="Rata-rata Harga (Rp)"
            layout="vertical"
          />
        )}
        {topProvinsi.length > 0 && (
          <BarChartCard
            title="Provinsi dengan Harga Pangan Termahal"
            description="10 Wilayah provinsi dengan tingkat harga rata-rata tertinggi nasional."
            data={topProvinsi}
            xKey="provinsi"
            yKey="harga_rata_rata"
            yLabel="Rata-rata Harga (Rp)"
            layout="vertical"
          />
        )}
      </section>

      {/* Analytical Insight Narrative */}
      <section className="w-full">
        <InsightCard
          title="Analisis Makro Ketahanan Pangan Nasional"
          category="Ringkasan Eksekutif"
          date="2026-05-18"
        >
          <p>
            Berdasarkan data historis gabungan dari Badan Pangan Nasional (Bapanas), ditemukan disparitas harga spasial yang signifikan antara wilayah produsen utama pangan (seperti Jawa Timur dan Jawa Tengah) dengan wilayah konsumen perkotaan atau logistik terpencil (seperti DKI Jakarta dan Kalimantan Timur).
          </p>
          <p>
            Komoditas hewani seperti daging ayam ras dan komoditas hortikultura musiman seperti cabai rawit merah menjadi pendorong utama fluktuasi indeks stabilitas pangan bulanan. Melalui K-Means clustering, wilayah dipetakan secara objektif guna memisahkan daerah surplus yang butuh fasilitasi distribusi dari daerah defisit rawan pangan yang mendesak memerlukan program Gerakan Pangan Murah (GPM).
          </p>
        </InsightCard>
      </section>
    </div>
  );
}
