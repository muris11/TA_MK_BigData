import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { MetricsTable } from '@/components/tables/MetricsTable';
import { InsightCard } from '@/components/cards/InsightCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Cpu, Server, ShieldCheck, Box } from 'lucide-react';

export default function ModelPage() {
  return (
    <div className="flex flex-col gap-8 py-2">
      <PageHeader
        eyebrow="Machine Learning"
        title="Dokumentasi Model & Metrik Evaluasi"
        description="Dokumentasi lengkap algoritma Machine Learning yang digunakan, metrik akurasi pengujian, dan visualisasi struktur bundle model (.pkl)."
      />

      {/* Grid Pendekatan Algoritma (4 Columns) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-col gap-4 bg-white border border-slate-200 hoverEffect">
          <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl shrink-0 w-max">
            <Cpu className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest leading-none">Model Regresi</h4>
            <h3 className="text-sm font-bold text-slate-900 leading-none">Random Forest Regressor</h3>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Memprediksi nominal rupiah harga pangan regional dengan akurasi R² mencapai 94.2%.
            </p>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 bg-white border border-slate-200 hoverEffect">
          <div className="bg-blue-50 text-blue-700 p-3 rounded-2xl shrink-0 w-max">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest leading-none">Model Klasifikasi</h4>
            <h3 className="text-sm font-bold text-slate-900 leading-none">Random Forest Classifier</h3>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Mengklasifikasikan tingkat kestabilan harga pangan ke dalam status Normal/Warning/Alert.
            </p>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 bg-white border border-slate-200 hoverEffect">
          <div className="bg-amber-50 text-amber-700 p-3 rounded-2xl shrink-0 w-max">
            <Server className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest leading-none">Model Clustering</h4>
            <h3 className="text-sm font-bold text-slate-900 leading-none">K-Means Clustering</h3>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Segmentasi wilayah & komoditas berdasarkan fluktuasi pergerakan harga.
            </p>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 bg-white border border-slate-200 hoverEffect">
          <div className="bg-purple-50 text-purple-700 p-3 rounded-2xl shrink-0 w-max">
            <Box className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest leading-none">Deep Learning</h4>
            <h3 className="text-sm font-bold text-slate-900 leading-none">MLP Regressor</h3>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Jaringan saraf tiruan (neural network) MLP untuk memodelkan fluktuasi non-linier.
            </p>
          </div>
        </Card>
      </section>

      {/* Metrics Table */}
      <section className="flex flex-col gap-4">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
          Tabel Metrik Akurasi & Evaluasi Seluruh Model
        </h3>
        <MetricsTable />
      </section>

      {/* Model Bundle Structure */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full">
        <Card className="flex flex-col gap-5 bg-white border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Struktur Kompresi Bundle Model (.pkl)
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Representasi grafis struktur metadata yang dibundel di dalam berkas biner terkompresi <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800 text-[10px] font-bold">model_bundle.pkl</code>.
          </p>

          <div className="font-mono text-[11px] text-slate-700 space-y-2 mt-2 leading-relaxed bg-slate-50 p-4 border border-slate-200/60 rounded-xl overflow-x-auto">
            <div>model_bundle = &#123;</div>
            <div className="pl-4 text-slate-400"># Metadata Proyek</div>
            <div className="pl-4"><span className="text-emerald-700">"project_info"</span>: &#123; "title": "...", "created_at": "..." &#125;,</div>
            <div className="pl-4 text-slate-400"># Empat Model Machine Learning Terlatih</div>
            <div className="pl-4"><span className="text-emerald-700">"models"</span>: &#123;</div>
            <div className="pl-8">"regression_model": RandomForestRegressor(),</div>
            <div className="pl-8">"classification_model": RandomForestClassifier(),</div>
            <div className="pl-8">"clustering_model": KMeans(k=4),</div>
            <div className="pl-8">"deep_learning_model": MLPRegressor()</div>
            <div className="pl-4">&#125;,</div>
            <div className="pl-4 text-slate-400"># Parameter Preprocessing Cloud</div>
            <div className="pl-4"><span className="text-emerald-700">"preprocessing"</span>: &#123;</div>
            <div className="pl-8">"scaler_cluster": StandardScaler(),</div>
            <div className="pl-8">"label_encoders": &#123; ... &#125;</div>
            <div className="pl-4">&#125;</div>
            <div>&#125;</div>
          </div>
        </Card>

        <InsightCard
          title="Keunggulan Penyatuan Model (Model Bundle)"
          category="Arsitektur Cloud"
          date="2026-05-18"
        >
          <p>
            Dalam perancangan web analitik tradisional, model machine learning sering kali ditaruh dalam berkas terpisah yang berat dan lambat dimuat. Proyek ini menerapkan arsitektur <strong>Model Bundle</strong> dengan memaketkan model regresi, klasifikasi, klasterisasi, standard scaler, serta label encoders dalam satu file biner <code className="bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">model_bundle.pkl</code> menggunakan pustaka <strong>pickle/joblib</strong>.
          </p>
          <p>
            Pendekatan ini menjamin sinkronisasi mutlak (zero-desync) antara input preprocessing yang dikirim dari antarmuka web Next.js dengan matriks parameter di tingkat model backend FastAPI Python. Vercel Python Function dapat memuat seluruh aset secara instan saat cold start (kurang dari 100ms) untuk melayani ribuan request inferensi.
          </p>
        </InsightCard>
      </section>
    </div>
  );
}
