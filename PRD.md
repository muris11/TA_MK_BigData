# PRD.md

# Product Requirements Document

## 1. Identitas Produk

**Nama produk:** Sistem Analitik Harga Pangan Indonesia  
**Nama singkat:** FoodPrice Insight Indonesia  
**Jenis produk:** Web dashboard analitik, prediksi, dan rekomendasi kebijakan  
**Platform:** Web responsive  
**Framework utama:** Next.js latest dengan App Router  
**Styling:** Tailwind CSS 4  
**Deployment target:** Vercel  
**Runtime backend:** Vercel Python Function/FastAPI dalam satu project Vercel  
**Model utama:** `model_bundle.pkl` dari notebook machine learning  
**Domain studi kasus:** Harga pangan Indonesia berbasis data Badan Pangan Nasional/SiPangan

---

## 2. Ringkasan Produk

Produk ini adalah aplikasi web berbasis Next.js yang menampilkan analisis harga pangan Indonesia secara lengkap. Aplikasi memvisualisasikan data hasil EDA, segmentasi wilayah/komoditas menggunakan clustering, prediksi harga pangan menggunakan model regresi, klasifikasi status/anomali harga menggunakan supervised learning, serta rekomendasi kebijakan berdasarkan hasil analitik.

Aplikasi ini dibuat sebagai implementasi tugas akhir untuk menyatukan materi:

- Big Data
- Cloud Computing
- Exploratory Data Analysis
- Data Mining Unsupervised
- Data Mining Supervised
- Regresi Linear
- Machine Learning
- Deep Learning
- Rekomendasi kebijakan berbasis data

Produk tidak hanya menampilkan dashboard statis, tetapi juga menyediakan fitur prediksi melalui API Python yang membaca file `model_bundle.pkl` hasil training dari notebook.

---

## 3. Latar Belakang

Harga pangan di Indonesia dapat berubah karena faktor distribusi, musim, permintaan, pasokan, wilayah, dan kebijakan stabilisasi. Perubahan harga yang tinggi dapat berdampak langsung pada daya beli masyarakat, inflasi, dan ketahanan pangan.

Data harga pangan yang tersedia dari sumber resmi seperti Badan Pangan Nasional/SiPangan dapat diolah menjadi informasi bernilai melalui Big Data Analytics dan Machine Learning. Oleh karena itu, diperlukan sistem web yang mampu:

1. Menyajikan ringkasan kondisi harga pangan.
2. Menampilkan tren harga berdasarkan komoditas dan wilayah.
3. Mengelompokkan wilayah/komoditas berdasarkan pola harga.
4. Memprediksi harga pangan berdasarkan fitur historis.
5. Mengklasifikasikan status harga/anomali.
6. Memberikan rekomendasi kebijakan berbasis hasil model.

---

## 4. Tujuan Produk

Tujuan utama produk adalah membuat dashboard analitik harga pangan Indonesia yang lengkap, interaktif, responsive, dan siap dipresentasikan sebagai hasil tugas akhir.

Tujuan detail:

1. Menampilkan hasil EDA harga pangan Indonesia.
2. Menampilkan metrik model regresi, klasifikasi, clustering, dan deep learning.
3. Menyediakan form prediksi harga pangan berbasis model `.pkl`.
4. Menyediakan form klasifikasi status/anomali harga.
5. Menampilkan hasil segmentasi K-Means.
6. Menampilkan rekomendasi kebijakan berdasarkan cluster, status harga, dan tren harga.
7. Menyediakan dokumentasi dataset, model, dan pipeline analitik.
8. Dapat dideploy di Vercel sebagai satu project.

---

## 5. Non-Goals

Hal yang tidak termasuk scope awal:

1. Tidak membangun sistem login multi-user.
2. Tidak menyediakan dashboard real-time langsung dari API Bapanas.
3. Tidak melakukan training model di aplikasi web.
4. Tidak mengizinkan upload dataset dari pengguna umum.
5. Tidak membuat database produksi seperti PostgreSQL pada fase awal.
6. Tidak membuat admin panel penuh.
7. Tidak melakukan inferensi deep learning besar berbasis GPU.

Model training tetap dilakukan di notebook. Aplikasi web hanya membaca model dan hasil export.

---

## 6. Target Pengguna

### 6.1 Mahasiswa/Pengembang

Membutuhkan aplikasi untuk menunjukkan hasil tugas akhir dan menjelaskan tahapan Big Data Analytics dari dataset sampai model.

### 6.2 Dosen/Penguji

Membutuhkan tampilan yang jelas untuk melihat apakah semua materi diterapkan, termasuk EDA, clustering, supervised learning, regresi, dan deep learning.

### 6.3 Pengambil Kebijakan Simulatif

Membutuhkan insight sederhana tentang wilayah/komoditas yang perlu perhatian dan rekomendasi kebijakan harga pangan.

---

## 7. Persona Pengguna

### Persona 1: Mahasiswa Presenter

- Ingin membuka web saat demo.
- Ingin menjelaskan alur dari dataset ke model.
- Ingin menunjukkan dashboard, prediksi, dan rekomendasi.
- Membutuhkan UI yang rapi dan mudah dipahami.

### Persona 2: Dosen Penguji

- Ingin melihat relevansi dengan materi kuliah.
- Ingin memastikan model benar-benar digunakan.
- Ingin melihat metrik model.
- Ingin melihat kesimpulan dan rekomendasi.

### Persona 3: Analis Kebijakan

- Ingin melihat wilayah/komoditas rawan.
- Ingin melihat status harga.
- Ingin melihat rekomendasi intervensi.

---

## 8. Problem Statement

Data harga pangan sulit dipahami jika hanya tersedia dalam bentuk CSV mentah. Pengguna membutuhkan dashboard yang dapat merangkum data, menampilkan pola, membuat prediksi, mengelompokkan wilayah/komoditas, dan menghasilkan rekomendasi kebijakan secara mudah.

---

## 9. Value Proposition

Aplikasi memberikan nilai utama berikut:

1. Mengubah dataset harga pangan menjadi dashboard yang mudah dipahami.
2. Menggabungkan EDA, ML, dan rekomendasi kebijakan dalam satu web.
3. Mendukung demo tugas akhir dengan visualisasi lengkap.
4. Menggunakan model `.pkl` hasil notebook sehingga proses machine learning dapat dibuktikan.
5. Bisa dihosting di Vercel sebagai satu project.

---

## 10. Judul Proyek Akademik

**Penerapan Big Data Analytics pada Data Harga Pangan Indonesia Menggunakan EDA, Clustering, Regresi, Supervised Learning, dan Deep Learning**

Judul tampilan dashboard dapat dibuat lebih pendek:

**Dashboard Analitik Harga Pangan Indonesia**

---

## 11. Data dan Model

### 11.1 Input dari Notebook

Aplikasi membutuhkan hasil export dari notebook berikut:

```text
model/model_bundle.pkl
model/model_metadata.json
model/encoder_mapping.json
public/data/dashboard_summary.json
public/data/metrics.json
public/data/trend_harga_bulanan.csv
public/data/top_komoditas.csv
public/data/top_provinsi.csv
public/data/cluster_summary.csv
public/data/recommendation_summary.csv
public/data/regression_metrics.csv
public/data/classification_metrics.csv
public/data/api_contract.json
```

### 11.2 Struktur `model_bundle.pkl`

```python
model_bundle = {
    "project_info": {
        "title": "Penerapan Big Data Analytics pada Data Harga Pangan Indonesia",
        "subtitle": "EDA, Clustering, Regresi, Supervised Learning, dan Deep Learning",
        "dataset_source": "Badan Pangan Nasional / SiPangan",
        "created_at": "YYYY-MM-DD HH:mm:ss",
        "target_deployment": "Next.js + Vercel Python Function"
    },
    "models": {
        "regression_model": regression_model,
        "classification_model": classification_model,
        "clustering_model": kmeans_model,
        "deep_learning_model": deep_learning_model
    },
    "preprocessing": {
        "feature_columns_regression": [...],
        "feature_columns_classification": [...],
        "feature_columns_clustering": [...],
        "scaler_cluster": scaler_cluster,
        "label_encoders": {...}
    },
    "metrics": {
        "regression": {...},
        "classification": {...},
        "clustering": {...},
        "deep_learning": {...}
    },
    "recommendation_rules": {...},
    "sample_input": {...}
}
```

### 11.3 Sumber Dataset

Dataset berasal dari:

- Badan Pangan Nasional
- SiPangan
- Dataset hasil preprocessing notebook

---

## 12. Fitur Utama

### 12.1 Landing Page

Menjelaskan proyek secara singkat.

Fitur:

- Hero section dengan judul proyek.
- Ringkasan metode.
- CTA ke dashboard.
- Ringkasan manfaat.
- Statistik singkat.
- Penjelasan pipeline: dataset, EDA, model, rekomendasi.

Acceptance criteria:

- User memahami tujuan sistem dalam kurang dari 30 detik.
- CTA menuju dashboard jelas.
- Tampilan responsive di mobile.

---

### 12.2 Dashboard Utama

Menampilkan ringkasan kondisi data dan model.

Konten:

- Total data.
- Total komoditas.
- Total provinsi.
- Rentang tahun.
- Harga rata-rata.
- Harga minimum dan maksimum.
- Metrik model regresi.
- Metrik model klasifikasi.
- Metrik clustering.
- Ringkasan rekomendasi.

Komponen:

- `StatCard`
- `MetricCard`
- `ChartCard`
- `InsightPanel`
- `RecommendationCard`

Acceptance criteria:

- Dashboard dapat dibuka tanpa input user.
- Data ringkasan diambil dari JSON/CSV export notebook.
- Jika data tidak ada, tampil empty state.

---

### 12.3 Halaman EDA

Menampilkan eksplorasi data harga pangan.

Konten:

- Tren harga rata-rata bulanan.
- Top 10 komoditas dengan harga rata-rata tertinggi.
- Top 10 provinsi dengan harga rata-rata tertinggi.
- Statistik deskriptif.
- Missing value summary.
- Duplikasi data summary.
- Distribusi harga.
- Insight naratif.

Acceptance criteria:

- Minimal ada 3 grafik.
- Ada tabel ringkasan.
- Ada narasi interpretasi.

---

### 12.4 Halaman Clustering

Menampilkan hasil K-Means.

Konten:

- Jumlah cluster.
- Silhouette score.
- Ringkasan tiap cluster.
- Tabel provinsi/komoditas per cluster.
- Interpretasi cluster.
- Rekomendasi per cluster.

Fitur tambahan:

- Filter cluster.
- Search provinsi/komoditas.
- Badge warna cluster.

Acceptance criteria:

- User dapat melihat arti setiap cluster.
- User dapat mengetahui cluster rawan.

---

### 12.5 Halaman Prediksi Harga

Form untuk memprediksi harga pangan menggunakan model regresi dari `.pkl`.

Input:

- Tahun
- Bulan
- Komoditas
- Provinsi
- Harga sebelumnya
- Rata-rata harga 3 bulan
- Perubahan harga

Output:

- Prediksi harga
- Kategori harga
- Interpretasi
- Rekomendasi singkat

Acceptance criteria:

- Form validasi angka berjalan.
- API `/api/predict-price` mengembalikan hasil.
- Loading dan error state tersedia.

---

### 12.6 Halaman Klasifikasi Anomali

Form untuk memprediksi status harga.

Input:

- Tahun
- Bulan
- Komoditas
- Provinsi
- Harga
- Harga sebelumnya
- Perubahan harga
- Persentase kenaikan

Output:

- Status prediksi
- Confidence jika tersedia
- Rekomendasi kebijakan

Acceptance criteria:

- Model klasifikasi berjalan dari `.pkl`.
- Output status mudah dipahami.

---

### 12.7 Halaman Rekomendasi Kebijakan

Menampilkan rekomendasi berdasarkan cluster, status, dan tren.

Konten:

- Rekomendasi umum.
- Wilayah prioritas.
- Komoditas prioritas.
- Saran Gerakan Pangan Murah.
- Saran Fasilitasi Distribusi Pangan.
- Narasi kebijakan untuk laporan.

Acceptance criteria:

- Rekomendasi tidak hanya teks generik.
- Rekomendasi terkait hasil data/model.

---

### 12.8 Halaman Dataset

Menjelaskan dataset dan pipeline.

Konten:

- Daftar dataset.
- Sumber data.
- Kolom utama.
- Tahapan cleaning.
- Tahapan feature engineering.
- Struktur model bundle.
- Limitasi data.

Acceptance criteria:

- Penguji dapat memahami asal data dan proses preprocessing.

---

### 12.9 Halaman Model

Menjelaskan model yang digunakan.

Konten:

- K-Means Clustering.
- Linear Regression/Random Forest Regressor.
- Decision Tree/Random Forest Classifier.
- MLPRegressor sebagai deep learning sederhana.
- Metrik evaluasi.
- Alasan pemilihan model.

Acceptance criteria:

- Semua materi ML terlihat diterapkan.

---

## 13. API Requirements

Aplikasi menggunakan Python Function/FastAPI di dalam project Vercel.

### 13.1 Endpoint Health

```http
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "model_loaded": true,
  "available_models": ["regression_model", "classification_model", "clustering_model"]
}
```

---

### 13.2 Endpoint Metadata

```http
GET /api/metadata
```

Response:

```json
{
  "status": "success",
  "data": {
    "title": "Penerapan Big Data Analytics pada Data Harga Pangan Indonesia",
    "dataset_source": "Badan Pangan Nasional / SiPangan"
  }
}
```

---

### 13.3 Endpoint Metrics

```http
GET /api/metrics
```

Response:

```json
{
  "status": "success",
  "data": {
    "regression": {
      "best_model": "RandomForestRegressor",
      "rmse": 0,
      "r2_score": 0
    },
    "classification": {
      "best_model": "RandomForestClassifier",
      "accuracy": 0,
      "f1_score": 0
    },
    "clustering": {
      "n_clusters": 4,
      "silhouette_score": 0
    }
  }
}
```

---

### 13.4 Endpoint Prediksi Harga

```http
POST /api/predict-price
```

Request:

```json
{
  "tahun": 2026,
  "bulan_angka": 5,
  "komoditas_encoded": 0,
  "provinsi_encoded": 0,
  "harga_sebelumnya": 15000,
  "rata_rata_3_bulan": 14500,
  "perubahan_harga": 500
}
```

Response:

```json
{
  "status": "success",
  "prediksi_harga": 15500,
  "kategori": "Normal",
  "interpretasi": "Harga diprediksi berada pada kategori normal.",
  "satuan": "Rupiah"
}
```

---

### 13.5 Endpoint Klasifikasi Status

```http
POST /api/predict-status
```

Request:

```json
{
  "tahun": 2026,
  "bulan_angka": 5,
  "komoditas_encoded": 0,
  "provinsi_encoded": 0,
  "harga_sebelumnya": 15000,
  "rata_rata_3_bulan": 14500,
  "perubahan_harga": 500,
  "persentase_kenaikan": 3.4
}
```

Response:

```json
{
  "status": "success",
  "status_prediksi": "Normal",
  "confidence": 0.91,
  "rekomendasi": "Harga relatif aman, cukup dilakukan monitoring rutin."
}
```

---

### 13.6 Endpoint Prediksi Cluster

```http
POST /api/predict-cluster
```

Request:

```json
{
  "rata_rata_harga": 15000,
  "harga_maksimum": 18000,
  "harga_minimum": 13000,
  "standar_deviasi_harga": 1200,
  "rata_rata_kenaikan": 2.5
}
```

Response:

```json
{
  "status": "success",
  "cluster": 2,
  "interpretasi": "Cluster harga tinggi atau fluktuatif, perlu perhatian."
}
```

---

### 13.7 Endpoint Rekomendasi

```http
GET /api/recommendation
```

Response:

```json
{
  "status": "success",
  "rules": {},
  "summary": "Rekomendasi kebijakan dibuat berdasarkan hasil EDA, clustering, prediksi harga, dan klasifikasi anomali."
}
```

---

## 14. Functional Requirements

### FR-001 Dashboard Summary

Aplikasi harus menampilkan statistik utama dari `dashboard_summary.json`.

Priority: High

---

### FR-002 Model Metrics

Aplikasi harus menampilkan metrik model dari endpoint `/api/metrics`.

Priority: High

---

### FR-003 Prediksi Harga

Aplikasi harus menyediakan form prediksi harga dan memanggil endpoint `/api/predict-price`.

Priority: High

---

### FR-004 Klasifikasi Anomali

Aplikasi harus menyediakan form klasifikasi status/anomali harga dan memanggil endpoint `/api/predict-status`.

Priority: High

---

### FR-005 Clustering Summary

Aplikasi harus menampilkan ringkasan cluster dari file `cluster_summary.csv`.

Priority: High

---

### FR-006 Rekomendasi Kebijakan

Aplikasi harus menampilkan rekomendasi dari file `recommendation_summary.csv` dan endpoint `/api/recommendation`.

Priority: High

---

### FR-007 Dataset Documentation

Aplikasi harus menampilkan dokumentasi dataset dan pipeline preprocessing.

Priority: Medium

---

### FR-008 Responsive Layout

Aplikasi harus optimal di desktop, tablet, dan mobile.

Priority: High

---

### FR-009 Error Handling

Aplikasi harus menampilkan pesan error jika API gagal, model tidak ditemukan, atau input tidak valid.

Priority: High

---

### FR-010 Empty State

Aplikasi harus menampilkan empty state jika data CSV/JSON belum tersedia.

Priority: Medium

---

## 15. Non-Functional Requirements

### 15.1 Performance

- First content harus ringan.
- Data chart besar harus dibatasi atau dipaginasi.
- CSV yang besar tidak boleh diparse semua di client jika tidak perlu.
- Gunakan server component untuk load data statis.
- Gunakan client component hanya untuk form dan chart interaktif.

### 15.2 Responsiveness

- Mobile first.
- Layout dashboard berubah dari 4 kolom ke 1 kolom di mobile.
- Sidebar menjadi mobile drawer.
- Tabel memiliki horizontal scroll.

### 15.3 Maintainability

- Komponen dipisahkan berdasarkan domain.
- API helper terpusat di `lib/api.ts`.
- Formatter angka/rupiah terpusat di `lib/formatter.ts`.
- Konstanta route di `lib/navigation.ts`.

### 15.4 Security

- File `.pkl` hanya berasal dari notebook sendiri.
- Jangan menerima upload `.pkl` dari user.
- Validasi semua input API.
- Batasi payload request.
- Jangan expose path internal model.

### 15.5 Accessibility

- Semua form punya label.
- Warna cluster tidak menjadi satu-satunya indikator.
- Chart punya deskripsi teks.
- Button punya focus state.
- Kontras teks minimal cukup untuk dibaca.

---

## 16. Struktur Folder Final

```text
harga-pangan-vercel/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── eda/
│   │   └── page.tsx
│   │
│   ├── clustering/
│   │   └── page.tsx
│   │
│   ├── prediksi-harga/
│   │   └── page.tsx
│   │
│   ├── klasifikasi-anomali/
│   │   └── page.tsx
│   │
│   ├── rekomendasi/
│   │   └── page.tsx
│   │
│   ├── dataset/
│   │   └── page.tsx
│   │
│   ├── model/
│   │   └── page.tsx
│   │
│   └── not-found.tsx
│
├── api/
│   └── index.py
│
├── model/
│   ├── model_bundle.pkl
│   ├── model_metadata.json
│   └── encoder_mapping.json
│
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── data/
│       ├── dashboard_summary.json
│       ├── metrics.json
│       ├── trend_harga_bulanan.csv
│       ├── top_komoditas.csv
│       ├── top_provinsi.csv
│       ├── cluster_summary.csv
│       ├── recommendation_summary.csv
│       ├── regression_metrics.csv
│       ├── classification_metrics.csv
│       └── api_contract.json
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── MobileNav.tsx
│   │   └── PageHeader.tsx
│   │
│   ├── cards/
│   │   ├── StatCard.tsx
│   │   ├── MetricCard.tsx
│   │   ├── InsightCard.tsx
│   │   └── RecommendationCard.tsx
│   │
│   ├── charts/
│   │   ├── LineChartCard.tsx
│   │   ├── BarChartCard.tsx
│   │   ├── AreaChartCard.tsx
│   │   ├── PieChartCard.tsx
│   │   └── ClusterChart.tsx
│   │
│   ├── forms/
│   │   ├── PricePredictionForm.tsx
│   │   ├── AnomalyPredictionForm.tsx
│   │   └── ClusterPredictionForm.tsx
│   │
│   ├── tables/
│   │   ├── DataTable.tsx
│   │   ├── MetricsTable.tsx
│   │   └── ClusterTable.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Skeleton.tsx
│   │   ├── EmptyState.tsx
│   │   └── Alert.tsx
│   │
│   └── sections/
│       ├── HeroSection.tsx
│       ├── MethodologySection.tsx
│       ├── DashboardOverview.tsx
│       ├── ModelOverview.tsx
│       └── PolicyRecommendationSection.tsx
│
├── lib/
│   ├── api.ts
│   ├── data.ts
│   ├── csv.ts
│   ├── formatter.ts
│   ├── navigation.ts
│   ├── constants.ts
│   ├── types.ts
│   └── utils.ts
│
├── styles/
│   └── tokens.css
│
├── docs/
│   ├── PRD.md
│   └── DESIGN.md
│
├── requirements.txt
├── .python-version
├── .vercelignore
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── README.md
```

---

## 17. Tech Stack

### Frontend

- Next.js latest
- React
- TypeScript
- Tailwind CSS 4
- Recharts
- Lucide React
- Framer Motion optional
- clsx
- tailwind-merge

### Backend API dalam Vercel

- Python 3.12
- FastAPI
- pydantic
- pandas
- numpy
- scikit-learn
- joblib

### Deployment

- Vercel
- Vercel Python Runtime
- Vercel Functions

---

## 18. Package yang Dibutuhkan

### Node.js

```bash
npm install recharts lucide-react framer-motion clsx tailwind-merge papaparse
```

### Python

`requirements.txt`:

```txt
fastapi==0.117.1
pydantic
pandas
numpy
scikit-learn
joblib
```

`.python-version`:

```txt
3.12
```

---

## 19. Page Routing

| Route | Nama Halaman | Tujuan |
|---|---|---|
| `/` | Landing Page | Mengenalkan produk |
| `/dashboard` | Dashboard | Ringkasan data dan model |
| `/eda` | EDA | Visualisasi eksplorasi data |
| `/clustering` | Clustering | Segmentasi wilayah/komoditas |
| `/prediksi-harga` | Prediksi Harga | Form prediksi harga |
| `/klasifikasi-anomali` | Klasifikasi Anomali | Form prediksi status harga |
| `/rekomendasi` | Rekomendasi | Saran kebijakan |
| `/dataset` | Dataset | Dokumentasi dataset |
| `/model` | Model | Dokumentasi machine learning |

---

## 20. User Flow

### Flow 1: Melihat Dashboard

```text
Landing Page
→ Klik Lihat Dashboard
→ Dashboard
→ Lihat statistik utama
→ Buka EDA/Clustering/Prediksi
```

### Flow 2: Prediksi Harga

```text
Dashboard
→ Prediksi Harga
→ Isi form
→ Klik Prediksi
→ API membaca model_bundle.pkl
→ Tampilkan prediksi harga + interpretasi
```

### Flow 3: Klasifikasi Anomali

```text
Dashboard
→ Klasifikasi Anomali
→ Isi form
→ Klik Klasifikasi
→ API membaca classification_model
→ Tampilkan status + rekomendasi
```

### Flow 4: Presentasi Tugas Akhir

```text
Landing Page
→ Dataset
→ EDA
→ Clustering
→ Model
→ Prediksi Harga
→ Klasifikasi Anomali
→ Rekomendasi
```

---

## 21. Data Validation Rules

### Prediksi Harga

- Tahun wajib angka 2020 sampai 2035.
- Bulan wajib 1 sampai 12.
- Harga sebelumnya tidak boleh negatif.
- Rata-rata 3 bulan tidak boleh negatif.
- Perubahan harga boleh negatif.

### Klasifikasi Anomali

- Persentase kenaikan boleh negatif.
- Harga tidak boleh negatif.
- Komoditas dan provinsi wajib dipilih.

### Clustering

- Rata-rata harga tidak boleh negatif.
- Harga maksimum harus lebih besar atau sama dengan harga minimum.
- Standar deviasi tidak boleh negatif.

---

## 22. Error Handling

| Kondisi | Tampilan |
|---|---|
| API gagal | Alert merah dengan pesan singkat |
| Model tidak ditemukan | Alert: model belum tersedia |
| Input invalid | Error di bawah field |
| Data dashboard kosong | Empty state dengan instruksi upload/export data |
| Prediksi terlalu lama | Loading state dan timeout message |
| Endpoint 500 | Pesan bahwa backend Python gagal membaca model |

---

## 23. Loading State

Setiap halaman harus punya loading state:

- Skeleton card.
- Skeleton chart.
- Spinner pada tombol prediksi.
- Disabled submit button saat loading.

---

## 24. Empty State

Jika file data belum tersedia:

Judul:

```text
Data belum tersedia
```

Deskripsi:

```text
Jalankan notebook export model terlebih dahulu, lalu pindahkan file output ke folder public/data dan model.
```

CTA:

```text
Lihat panduan dataset
```

---

## 25. Acceptance Criteria Global

Produk dianggap selesai jika:

1. Semua route utama dapat dibuka.
2. Dashboard menampilkan data summary.
3. Model metrics muncul.
4. Form prediksi harga berhasil memanggil API.
5. Form klasifikasi berhasil memanggil API.
6. Halaman clustering menampilkan cluster summary.
7. Halaman rekomendasi menampilkan tabel/daftar kebijakan.
8. UI responsive di mobile.
9. Build Next.js berhasil.
10. Deploy Vercel berhasil.
11. File `.pkl` berhasil dibaca oleh Python Function.

---

## 26. Deployment Requirements

### File wajib sebelum deploy

```text
model/model_bundle.pkl
model/model_metadata.json
model/encoder_mapping.json
public/data/dashboard_summary.json
public/data/metrics.json
api/index.py
requirements.txt
.python-version
```

### Command lokal

```bash
npm run dev
```

Untuk test Python API lokal:

```bash
uvicorn api.index:app --reload --port 8000
```

Untuk Vercel:

```bash
vercel dev
vercel deploy
```

---

## 27. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| File `.pkl` terlalu besar | Deploy gagal | Kurangi model, hapus file tidak perlu, gunakan `.vercelignore` |
| Dependency Python terlalu besar | Deploy lambat/gagal | Pakai dependency minimal |
| Nama fitur tidak sama | Prediksi error | Simpan `feature_columns` di bundle |
| Encoder tidak tersedia | Dropdown tidak sinkron | Export `encoder_mapping.json` |
| Data CSV kosong | Dashboard kosong | Sediakan empty state |
| API cold start | Prediksi agak lambat | Tampilkan loading state |

---

## 28. Roadmap Pengembangan

### Phase 1: MVP

- Landing page.
- Dashboard.
- EDA.
- Prediksi harga.
- Klasifikasi anomali.
- Python API membaca `.pkl`.

### Phase 2: Full Dashboard

- Clustering lengkap.
- Rekomendasi kebijakan.
- Dataset documentation.
- Model documentation.
- Export screenshot/report.

### Phase 3: Enhancement

- Filter interaktif komoditas/provinsi.
- Download hasil prediksi.
- Mode presentasi.
- Integrasi dataset online.
- Admin upload dataset.

---

## 29. Definition of Done

Project selesai jika:

- Build berhasil tanpa TypeScript error.
- `model_bundle.pkl` berhasil diload.
- Semua endpoint API mengembalikan response valid.
- Semua halaman responsive.
- Semua data output notebook tampil di web.
- Dokumentasi `README.md`, `PRD.md`, dan `DESIGN.md` tersedia.
- Web dapat dipresentasikan sebagai tugas akhir.

---

## 30. Referensi Teknis

- Next.js official documentation: https://nextjs.org/
- Tailwind CSS official documentation: https://tailwindcss.com/
- Vercel Python Runtime: https://vercel.com/docs/functions/runtimes/python
- Vercel FastAPI guide: https://vercel.com/docs/frameworks/backend/fastapi
- Vercel Functions limitations: https://vercel.com/docs/functions/limitations
