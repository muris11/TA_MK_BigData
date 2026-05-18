# FoodPrice Insight Indonesia

Dashboard analitik terintegrasi untuk menganalisis, memprediksi, dan mengklasifikasikan stabilitas harga pangan pokok di Indonesia menggunakan pendekatan Big Data Analytics dan Machine Learning.

Aplikasi ini dibangun menggunakan **Next.js (latest dengan App Router)** untuk frontend, dan **FastAPI (Python 3.12)** untuk backend API inferensi yang membaca file bundle model (`model_bundle.pkl`).

---

## 🛠️ Tech Stack

### Frontend (Next.js)
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS 4
* **Visualisasi:** Recharts (Grafik tren waktu, bar termahal, cluster chart)
* **Ikon:** Lucide React
* **Parser:** PapaParse (untuk parsing data CSV hasil ekspor notebook)

### Backend API (FastAPI)
* **Language:** Python 3.10+
* **Framework:** FastAPI
* **ML Libraries:** Scikit-Learn, Pandas, NumPy, Joblib/Pickle
* **Server:** Uvicorn

---

## 📂 Struktur Folder Proyek

```text
harga-pangan-vercel/
│
├── src/
│   ├── app/                    # Routing halaman Next.js App Router
│   │   ├── layout.tsx          # Main Root Layout
│   │   ├── page.tsx            # Landing Page
│   │   ├── dashboard/          # Halaman Ringkasan Analitik
│   │   ├── eda/                # Eksplorasi Data & Statistik Deskriptif
│   │   ├── clustering/         # Segmentasi Wilayah K-Means
│   │   ├── prediksi-harga/     # Form Prediksi Harga Regresi
│   │   ├── klasifikasi-anomali/# Form Klasifikasi Status Anomali
│   │   ├── model/              # Dokumentasi Metrik & Model
│   │   └── rekomendasi/        # Strategi Kebijakan Pangan
│   │
│   ├── components/             # Komponen UI Modular
│   │   ├── cards/              # StatCard, MetricCard, InsightCard, dll
│   │   ├── charts/             # LineChart, BarChart, ClusterChart
│   │   ├── forms/              # Form Input Inferensi ML (.pkl)
│   │   ├── tables/             # DataTable, MetricsTable, ClusterTable
│   │   ├── ui/                 # Button, Input, Select, Badge, dll
│   │   └── layout/             # AppShell, AppSidebar, Topbar
│   │
│   ├── lib/                    # Helper & API utility TypeScript
│   │   ├── api.ts              # Fetcher ke FastAPI Python
│   │   ├── data.ts             # Parser data CSV lokal
│   │   └── formatter.ts        # Helper Angka & Rupiah
│   │
│   └── styles/
│
├── api/
│   └── index.py                # FastAPI Backend untuk Vercel Python Function
│
├── model/
│   ├── model_bundle.pkl        # Berkas biner model ML terkompresi
│   ├── model_metadata.json     # Metadata model
│   └── encoder_mapping.json    # Map integer-to-string kategorial
│
├── public/
│   └── data/                   # Data CSV hasil export notebook
│
├── requirements.txt            # Dependensi Python
├── .python-version             # Versi Python Vercel
├── .vercelignore               # Berkas yang diabaikan saat deploy
└── README.md
```

---

## 🚀 Cara Menjalankan di Lokal (Local Development)

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
* [Node.js v20+](https://nodejs.org/)
* [Python 3.10+](https://www.python.org/)

---

### 2. Menjalankan Backend Python (FastAPI)
Buka terminal baru di root folder `harga-pangan-vercel`:

```bash
# Buat virtual environment (opsional tapi disarankan)
python -m venv .venv

# Aktifkan virtual environment
# Pada Windows:
.venv\Scripts\activate
# Pada macOS/Linux:
source .venv/bin/activate

# Instal dependensi Python
pip install -r requirements.txt

# Jalankan server FastAPI menggunakan Uvicorn
python api/index.py
```
API sekarang aktif di `http://127.0.0.1:8000`. Anda dapat mengakses dokumentasi interaktif Swagger di `http://127.0.0.1:8000/docs`.

---

### 3. Menjalankan Frontend Next.js
Buka terminal lain di root folder `harga-pangan-vercel` (pastikan terminal di luar `.venv` jika ingin aman):

```bash
# Instal dependensi npm
npm install

# Jalankan Next.js dalam mode development
npm run dev
```
Aplikasi web kini dapat diakses di `http://localhost:3000`.

---

## ☁️ Cara Deploy ke Vercel (Deployment)

Proyek ini telah dikonfigurasi untuk langsung dapat dideploy sebagai satu project terpadu (monorepo frontend & backend) di **Vercel** menggunakan **Vercel Python Runtime**:

1. Instal Vercel CLI jika belum ada:
   ```bash
   npm install -g vercel
   ```
2. Jalankan perintah deploy di folder root:
   ```bash
   vercel
   ```
3. Ikuti langkah yang muncul di terminal (pilih *Yes* untuk membuat project baru). Vercel akan otomatis mengenali folder `api/` sebagai serverless Python functions dan merutecan request `/api/*` langsung ke FastAPI Python secara transparan.

---

## ⚖️ Lisensi & Referensi Akademik
Aplikasi ini dibuat sebagai implementasi Tugas Akhir Mata Kuliah Big Data Analytics, Cloud Computing, dan Machine Learning terapan. Data berasal dari portal resmi **Badan Pangan Nasional (Bapanas) / SiPangan**.
