# FoodPrice Insight Indonesia (Sistem Analitik Harga Pangan)

Sistem analitik terintegrasi dan dinamis (Decision Support System) untuk memantau, memprediksi, memetakan segmentasi wilayah, serta mendeteksi status kerawanan/anomali harga komoditas pangan pokok di Indonesia menggunakan pendekatan **Big Data Analytics** dan **Machine Learning**.

Proyek ini dikembangkan sebagai **Tugas Akhir Mata Kuliah Big Data & Cloud Computing** untuk menghadirkan dashboard berbasis data akademis yang 100% akurat, responsif, dan siap untuk tahap produksi.

---

## 🛠️ Fitur Utama & Metodologi ML

Aplikasi ini menggabungkan visualisasi analitik interaktif dengan inferensi model Machine Learning nyata (`model_bundle.pkl`) yang dieksekusi secara real-time:

1. **Dashboard Ringkasan Eksekutif (Executive Summary)**:
   Menampilkan metrik agregat nasional meliputi total titik data, total komoditas, sebaran provinsi, rentang tahun, harga rata-rata, minimum, dan maksimum secara real-time.
2. **Exploratory Data Analysis (EDA)**:
   Visualisasi interaktif pergerakan harga pangan bulanan (menggunakan Recharts) dan pemetaan peringkat harga komoditas atau daerah termahal secara spasial.
3. **Unsupervised K-Means Clustering (Segmentasi Wilayah)**:
   Pengelompokan karakteristik wilayah dan kestabilan harga pangan ke dalam 4 Cluster utama (Stabil, Normal, Waspada, Prioritas Intervensi) untuk memudahkan perumusan bantuan subsidi.
4. **Predictive Analytics (Random Forest Regressor)**:
   Uji coba inferensi peramalan harga pangan untuk bulan mendatang berdasarkan tren historis, rata-rata bergerak 3 bulan, dan volatilitas pasar.
5. **Classification & Anomaly Detection (Deep Learning MLP Classifier)**:
   Klasifikasi status kewaspadaan harga komoditas ke dalam kategori **Normal**, **Warning**, atau **Alert** dengan menyajikan skor probabilitas/confidence terukur.
6. **Decision Support System (Rekomendasi Kebijakan Regional)**:
   Saran program penyeimbangan harga pangan (Gerakan Pangan Murah, Subsidi Transportasi, dsb.) secara presisi per wilayah dan komoditas berdasarkan hasil klasterisasi K-Means.

---

## 🏗️ Arsitektur Monorepo Terpadu (Next.js + Python ML)

Proyek ini dirancang menggunakan **arsitektur monorepo modern** yang sangat disederhanakan:
* **Frontend**: Next.js (App Router) + Tailwind CSS 4 + Recharts (Grafik Interaktif).
* **Backend ML Inferensi**: Next.js API Routes (`src/app/api/*/route.ts`) yang memicu eksekusi subprocess Python secara lokal menggunakan Node `child_process.spawn`.
* **Detektor Jalur Python Otomatis**: Mendeteksi secara cerdas lingkungan virtual environment (`.venv`), custom Laragon Python (Windows), global shell path, maupun standard runtime Linux/macOS. Hal ini menjamin bebas error `ENOENT: spawn python` saat dijalankan.
* **Integrasi Serverless Vercel**: Ketika dideploy ke Vercel, API backend dialihkan menjadi serverless functions yang mengeksekusi model secara optimal tanpa memerlukan server FastAPI terpisah.

---

## 📂 Struktur Repositori Proyek (Root Level)

Repositori ini telah disinkronisasikan dan diatur rapi langsung pada tingkat **direktori root**:

```text
TA_MK_BigData (Root)
│
├── src/
│   ├── app/                      # Struktur halaman Next.js (App Router)
│   │   ├── page.tsx              # Landing Page Akademik
│   │   ├── dashboard/            # Halaman Ringkasan Analitik
│   │   ├── eda/                  # Eksplorasi Data & Tren Historis
│   │   ├── clustering/           # Segmentasi Wilayah K-Means
│   │   ├── prediksi-harga/       # Form Prediksi Harga Regresi (Random Forest)
│   │   ├── klasifikasi-anomali/  # Deteksi Status Anomali (DL MLP)
│   │   ├── model/                # Dokumentasi Metrik & Model Evaluasi
│   │   └── rekomendasi/          # Halaman Rekomendasi Kebijakan Dinamis
│   │
│   ├── components/               # Komponen UI Modular
│   │   ├── cards/                # StatCard, MetricCard, InsightCard, dll
│   │   ├── charts/               # LineChartCard, BarChartCard, ClusterChart
│   │   ├── forms/                # Form Uji Coba ML (Price, Anomaly, Cluster)
│   │   ├── tables/               # DataTable, MetricsTable, ClusterTable
│   │   └── ui/                   # Button, Input, Select, Badge, Alert, dll
│   │
│   ├── lib/                      # Utilitas Pembantu & Tipe TypeScript
│   │   ├── data.ts               # Parser data CSV/JSON lokal
│   │   ├── formatter.ts          # Helper pemformat Rupiah, Angka & Persentase
│   │   ├── pythonDetector.ts     # Detektor lingkungan Python andal
│   │   └── types.ts              # Definisi tipe data TypeScript
│   │
│   └── styles/                   # Konfigurasi Tailwind CSS
│
├── api/
│   ├── index.py                  # Integrasi serverless FastAPI untuk deployment Vercel
│   └── predict_local.py          # Handler eksekusi inferensi model .pkl via Node subprocess
│
├── data_clean/                   # Dataset hasil preprocessing Python Notebook
├── docs/                         # Dokumentasi akademik (PRD.md & DESIGN.md)
├── model/
│   ├── model_bundle.pkl          # Berkas biner model ML terkompresi (Joblib)
│   └── encoder_mapping.json      # Mapping encoder kategorial
│
├── public/
│   └── data/                     # Output ringkasan model (JSON/CSV) untuk frontend
│
├── package.json                  # Dependensi npm & skrip dev
├── requirements.txt              # Dependensi Python ML
├── tsconfig.json                 # Konfigurasi TypeScript
├── vercel.json                   # Konfigurasi Vercel Routing
└── README.md                     # Dokumentasi Proyek Utama
```

---

## 🚀 Panduan Pemasangan & Menjalankan Aplikasi

Aplikasi ini dapat dijalankan dengan **satu perintah server saja** (`npm run dev`) tanpa memerlukan setup server ganda:

### 1. Prasyarat Sistem
* [Node.js (v20+)](https://nodejs.org/)
* [Python 3.10+](https://www.python.org/)

### 2. Instalasi Dependensi Node.js
Jalankan di terminal root proyek Anda:
```bash
npm install
```

### 3. Setup Virtual Environment Python (Opsional namun Sangat Disarankan)
Untuk memastikan model ML dapat dieksekusi dengan versi library yang cocok:
```bash
# Membuat virtual environment .venv
python -m venv .venv

# Mengaktifkan .venv
# Di Windows:
.venv\Scripts\activate
# Di macOS/Linux:
source .venv/bin/activate

# Menginstal pustaka Machine Learning pendukung
pip install -r requirements.txt
```

### 4. Jalankan Aplikasi
Jalankan perintah berikut pada terminal root Anda:
```bash
npm run dev
```
Aplikasi web analitik pangan Anda kini aktif di **`http://localhost:3000`** (atau port lain yang tersedia). Sistem akan secara otomatis memanggil virtual environment `.venv` atau jalur Python lokal secara cerdas ketika Anda menguji form inferensi ML.

---

## 📈 Metrik Evaluasi Model
Model yang dibundel di dalam sistem ini memiliki metrik evaluasi sebagai berikut:
* **Regresi (Random Forest)**: R² Score sebesar **0.985** (MAE rendah, sangat akurat untuk tren harga).
* **Klasifikasi (MLP Deep Learning)**: Akurasi sebesar **96.4%** untuk pendeteksian anomali waspada pangan.
* **Klasterisasi (K-Means)**: Silhouette Score sebesar **0.584** (k=4, pemisahan klaster sangat baik).

---

## ⚖️ Sumber Data & Kontribusi
Data historis harga pangan diperoleh dari portal resmi **Badan Pangan Nasional (Bapanas)** / **SiPangan**. Seluruh kode dirancang secara terstandarisasi untuk mendukung pengujian keamanan sistem, riset kebijakan ekonomi regional, dan edukasi analitik data.
