import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Landmark,
  TrendingUp,
  ShieldCheck,
  Grid,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function LandingPage() {
  const steps = [
    {
      title: "Exploratory Data Analysis",
      desc: "Eksplorasi data historis harga pangan dari Bapanas untuk menemukan pola musiman dan disparitas spasial.",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Unsupervised Clustering",
      desc: "Segmentasi wilayah dan komoditas pangan menggunakan algoritma K-Means untuk pemetaan daerah rentan.",
      icon: Grid,
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "Predictive & Classification ML",
      desc: "Penerapan Regresi Linier, Random Forest, dan Deep Learning MLP untuk prediksi harga & klasifikasi status anomali.",
      icon: ShieldCheck,
      color: "text-amber-600 bg-amber-50"
    }
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-12 py-2 sm:py-4">
      {/* Hero Section */}
      <section className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl relative overflow-hidden flex flex-col gap-6">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Landmark className="h-64 w-64" />
        </div>

        <div className="flex flex-col gap-2 max-w-3xl z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-800 px-3 py-1 text-[10px] sm:text-xs font-bold leading-none w-max">
            <BookOpen className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
            Tugas Akhir Big Data & Cloud Computing
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-50 leading-tight">
            Dashboard Analitik Harga Pangan Indonesia
          </h1>
          <p className="text-emerald-200/90 text-xs sm:text-base md:text-lg leading-relaxed mt-2 font-semibold">
            Sistem analitik terpadu berbasis Machine Learning (supervised & unsupervised) untuk memprediksi harga, memetakan stabilitas pangan, serta merumuskan rekomendasi kebijakan pangan nasional secara akurat.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 z-10 shrink-0 mt-2">
          <Link href="/dashboard" passHref>
            <Button variant="primary" size="lg" className="w-full sm:w-auto text-sm">
              Buka Dashboard Analitik
              <ChevronRight className="h-4 w-4 ml-1 shrink-0" />
            </Button>
          </Link>
          <Link href="/dataset" passHref>
            <Button className="bg-emerald-900 text-emerald-100 hover:bg-emerald-850 w-full sm:w-auto font-semibold text-sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Dokumentasi Preprocessing
            </Button>
          </Link>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Metodologi Proyek Akademik
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Pipeline pengolahan big data dari ekstraksi hingga inferensi model machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card key={idx} className="flex flex-col gap-4 bg-white border border-slate-200 hoverEffect p-5 sm:p-6">
                <div className={`${step.color} rounded-2xl p-3 shrink-0 w-max`}>
                  <Icon className="h-5 sm:h-6 w-5 sm:w-6" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Highlights / Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-4">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-snug">
            Mengapa FoodPrice Insight Indonesia?
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Data harga pangan mentah dari Badan Pangan Nasional (Bapanas/SiPangan) diekstraksi, dibersihkan melalui pipeline preprocessing cloud computing, dan dimodelkan secara matematis. Aplikasi ini menyajikan visualisasi analitis terpadu yang membantu pengambil kebijakan mengidentifikasi lonjakan anomali harga sebelum menjadi krisis sosial-ekonomi.
          </p>

          {/* Quick Stats Grid Responsif */}
          <div className="grid grid-cols-3 gap-2 xs:gap-4 sm:gap-6 mt-2 font-bold text-slate-700">
            <div className="flex flex-col min-w-0">
              <span className="text-base xs:text-lg sm:text-2xl font-extrabold text-emerald-600 truncate">8 Komoditas</span>
              <span className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 leading-none">Komoditas Pokok</span>
            </div>
            <div className="flex flex-col min-w-0 border-l border-slate-200 pl-2 xs:pl-4 sm:pl-6">
              <span className="text-base xs:text-lg sm:text-2xl font-extrabold text-emerald-600 truncate">8 Provinsi</span>
              <span className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 leading-none">Wilayah Studi</span>
            </div>
            <div className="flex flex-col min-w-0 border-l border-slate-200 pl-2 xs:pl-4 sm:pl-6">
              <span className="text-base xs:text-lg sm:text-2xl font-extrabold text-emerald-600 truncate">94.2% R²</span>
              <span className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 leading-none">Akurasi Regresi</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/60 flex flex-col gap-4">
          <h4 className="text-[10px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-widest leading-none">
            Penjelasan Teknis Bundle Model (.pkl)
          </h4>
          <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
            Sistem web Next.js ini mengintegrasikan fungsi serverless Python (FastAPI) yang membaca file representasi terkompresi <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800 text-[10px] font-bold">model_bundle.pkl</code> secara asinkron. File bundle menyimpan model regresi terbaik, klasifikasi, klasterisasi, serta label encoders sehingga input form dari client langsung dipetakan secara real-time.
          </p>
          <Link href="/model" passHref>
            <Button variant="outline" size="sm" className="w-max text-xs font-semibold">
              Lihat Metrik & Detail Model
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
