import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { InsightCard } from '@/components/cards/InsightCard';
import { Database, Filter, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DatasetPage() {
  const dataColumns = [
    { name: "tahun", desc: "Tahun pencatatan harga pangan.", type: "Numerik (Integer)" },
    { name: "bulan", desc: "Nama bulan pencatatan harga.", type: "Kategori (String)" },
    { name: "komoditas", desc: "Nama komoditas pangan pokok (misal: Beras Medium, Cabai Rawit Merah).", type: "Kategori (String)" },
    { name: "provinsi", desc: "Wilayah administratif tingkat provinsi (cakupan 8 wilayah studi).", type: "Kategori (String)" },
    { name: "harga", desc: "Nominal harga eceran rata-rata bulanan konsumen (Rupiah/Kg).", type: "Numerik (Float)" },
    { name: "harga_sebelumnya", desc: "Nilai harga eceran pada satu bulan sebelumnya.", type: "Numerik (Float) - Fitur Lag-1" },
    { name: "rata_rata_3_bulan", desc: "Rata-rata bergerak harga pangan selama 3 bulan terakhir.", type: "Numerik (Float) - Fitur Moving Average" },
    { name: "volatilitas_3_bulan", desc: "Standar deviasi pergerakan harga selama 3 bulan terakhir.", type: "Numerik (Float) - Fitur Risiko" },
    { name: "perubahan_harga", desc: "Selisih perubahan nominal harga dari bulan sebelumnya.", type: "Numerik (Float)" },
    { name: "persentase_kenaikan", desc: "Rasio persentase kenaikan harga dibanding bulan sebelumnya.", type: "Numerik (Float)" }
  ];

  return (
    <div className="flex flex-col gap-8 py-2">
      <PageHeader
        eyebrow="Decision Support"
        title="Dokumentasi Dataset & Pipeline Preprocessing"
        description="Rincian lengkap asal dataset harga pangan, skema kamus data (data dictionary), serta langkah-langkah preprocessing cloud computing."
      />

      {/* Dataset Sources Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="flex flex-col gap-4 bg-white border border-slate-200">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl shrink-0">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-none">Sumber Dataset Asli</h3>
          </div>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Data primer diperoleh secara resmi melalui portal <strong>Badan Pangan Nasional (Bapanas)</strong> dan sistem pemantauan harga pangan nasional <strong>SiPangan</strong>.
          </p>
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-2 font-bold text-xs text-slate-700">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
              <span>Rentang Waktu Data</span>
              <span className="text-emerald-700">2020 - 2026 (Historis)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Entri Awal</span>
              <span>18.540 Rekaman Baris</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 bg-white border border-slate-200">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-blue-50 text-blue-700 p-2.5 rounded-xl shrink-0">
              <Filter className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-none">Cakupan Wilayah & Komoditas</h3>
          </div>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Dataset dibatasi pada komoditas pangan strategis yang paling berdampak langsung pada inflasi nasional di 8 provinsi utama.
          </p>
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-2 font-bold text-xs text-slate-700">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
              <span>Komoditas Pokok</span>
              <span>Beras, Bawang, Cabai, Daging Ayam, Minyak, Telur</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Provinsi Fokus</span>
              <span>DKI Jakarta, Jabar, Jateng, Jatim, Sumut, Sulsel, Kaltim, Banten</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Preprocessing Pipeline (Timeline Visual) */}
      <section className="flex flex-col gap-6 w-full">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
          Pipeline Tahapan Pengolahan Data (Preprocessing)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center gap-2.5 shadow-xs">
            <span className="h-7 w-7 rounded-full bg-slate-100 font-extrabold text-xs flex items-center justify-center text-slate-600">1</span>
            <h4 className="text-xs font-bold text-slate-900 leading-none">Data Cleaning</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Penghapusan nilai kosong, outlier tak logis, & baris duplikat.</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center gap-2.5 shadow-xs">
            <span className="h-7 w-7 rounded-full bg-slate-100 font-extrabold text-xs flex items-center justify-center text-slate-600">2</span>
            <h4 className="text-xs font-bold text-slate-900 leading-none">Feature Engineering</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Ekstraksi fitur time-lag (t-1), moving average 3 bulan, & volatilitas.</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center gap-2.5 shadow-xs">
            <span className="h-7 w-7 rounded-full bg-slate-100 font-extrabold text-xs flex items-center justify-center text-slate-600">3</span>
            <h4 className="text-xs font-bold text-slate-900 leading-none">Label Encoding</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Transformasi fitur kategori ke numerik agar terbaca model ML.</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center gap-2.5 shadow-xs">
            <span className="h-7 w-7 rounded-full bg-slate-100 font-extrabold text-xs flex items-center justify-center text-slate-600">4</span>
            <h4 className="text-xs font-bold text-slate-900 leading-none">Model Training</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Pelatihan model regresi, klasifikasi, & klasterisasi di notebook.</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center gap-2.5 shadow-xs">
            <span className="h-7 w-7 rounded-full bg-emerald-100 font-extrabold text-xs flex items-center justify-center text-emerald-700">5</span>
            <h4 className="text-xs font-bold text-emerald-950 leading-none">Export Bundle</h4>
            <p className="text-[10px] text-emerald-600/90 font-semibold leading-relaxed">Ekspor model dan preprocessing scaler ke file model_bundle.pkl.</p>
          </div>
        </div>
      </section>

      {/* Kamus Data (Data Dictionary) */}
      <section className="flex flex-col gap-4 w-full">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
          Kamus Data Fitur (Data Dictionary)
        </h3>
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-extrabold">Nama Fitur (Column)</th>
                <th className="px-6 py-4 font-extrabold">Tipe Data & Rekayasa</th>
                <th className="px-6 py-4 font-extrabold">Deskripsi Arti Fitur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {dataColumns.map((col, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-3.5 font-mono text-slate-900 font-bold">{col.name}</td>
                  <td className="px-6 py-3.5 text-xs text-emerald-700">
                    <span className="bg-emerald-50 rounded-full px-2.5 py-0.5 border border-emerald-100">{col.type}</span>
                  </td>
                  <td className="px-6 py-3.5 text-xs text-slate-500 font-semibold leading-relaxed">{col.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Narasi Teknis Pipeline */}
      <section className="w-full">
        <InsightCard
          title="Optimalisasi Preprocessing Cloud Computing"
          category="Teknis Preprocessing"
          date="2026-05-18"
        >
          <p>
            Dalam arsitektur cloud computing, rekayasa fitur (feature engineering) sengaja dilakukan secara terpusat pada tahap awal di notebook menggunakan pustaka <strong>Pandas</strong> dan <strong>Scikit-Learn</strong>. Penambahan fitur lag-1 (harga bulan sebelumnya) dan moving average 3 bulan sangat krusial dalam memperkecil nilai error model regresi.
          </p>
          <p>
            Label encoders disimpan secara rapi dalam struktur berkas JSON <code className="bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">encoder_mapping.json</code>. Ketika client mengirimkan nama komoditas (misal: "Beras Medium") ke API, API akan langsung memetakan nama tersebut ke kode angka integer (misal: "1") agar kompatibel dengan input matriks numpy model Random Forest.
          </p>
        </InsightCard>
      </section>
    </div>
  );
}
