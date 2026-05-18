# DESIGN.md

# Design Specification

## 1. Nama Desain

**FoodPrice Insight Indonesia**  
Dashboard analitik harga pangan Indonesia berbasis Big Data, Machine Learning, dan Deep Learning.

---

## 2. Design Goal

Desain harus terlihat modern, akademik, profesional, ringan, dan mudah dipresentasikan. Aplikasi harus mampu menjelaskan pipeline data dari dataset sampai rekomendasi kebijakan secara visual.

Prioritas desain:

1. Mudah dipahami oleh dosen/penguji.
2. Cocok untuk demo tugas akhir.
3. Responsive di desktop, tablet, dan mobile.
4. Tampilan dashboard rapi dan data-driven.
5. Visual tidak berlebihan.
6. Fokus pada kejelasan grafik, tabel, dan interpretasi.

---

## 3. Design Principles

### 3.1 Clarity First

Setiap halaman harus langsung menjelaskan konteks. Judul, subtitle, metric card, dan insight harus jelas.

### 3.2 Data Before Decoration

Dekorasi tidak boleh mengganggu data. Grafik, angka, status, dan rekomendasi menjadi fokus utama.

### 3.3 Responsive by Default

Semua layout dibuat mobile-first. Desktop memperluas grid, bukan membuat layout yang berbeda total.

### 3.4 Government Analytics Feel

Karena topiknya harga pangan dan kebijakan, visual harus terasa kredibel, bersih, dan resmi.

### 3.5 Presentation Ready

Setiap halaman harus bisa dijadikan bahan presentasi tanpa perlu penjelasan terlalu panjang.

---

## 4. Visual Direction

### 4.1 Style

- Modern analytics dashboard
- Clean government data platform
- Soft card UI
- Subtle gradient
- Minimal shadow
- Rounded large corners
- Dense enough for data, but not crowded

### 4.2 Mood

- Kredibel
- Stabil
- Akademik
- Profesional
- Optimis
- Informatif

### 4.3 Visual Keyword

```text
clean, analytical, governmental, responsive, modern, accessible, data-driven
```

---

## 5. Color System

### 5.1 Primary Palette

| Token | Color | Usage |
|---|---|---|
| `--color-primary-50` | `#ecfdf5` | Background soft |
| `--color-primary-100` | `#d1fae5` | Badge background |
| `--color-primary-500` | `#10b981` | Accent |
| `--color-primary-600` | `#059669` | Button primary |
| `--color-primary-700` | `#047857` | Button hover |
| `--color-primary-900` | `#064e3b` | Heading accent |

### 5.2 Neutral Palette

| Token | Color | Usage |
|---|---|---|
| `--color-slate-50` | `#f8fafc` | Page background |
| `--color-slate-100` | `#f1f5f9` | Card subtle background |
| `--color-slate-200` | `#e2e8f0` | Border |
| `--color-slate-500` | `#64748b` | Secondary text |
| `--color-slate-700` | `#334155` | Body text |
| `--color-slate-900` | `#0f172a` | Heading |
| `--color-white` | `#ffffff` | Card background |

### 5.3 Status Colors

| Status | Color | Usage |
|---|---|---|
| Normal | `#10b981` | Aman/stabil |
| Warning | `#f59e0b` | Waspada |
| Alert | `#ef4444` | Rawan/intervensi |
| Info | `#3b82f6` | Informasi |
| Neutral | `#64748b` | Tidak diketahui |

### 5.4 Cluster Colors

| Cluster | Color | Meaning |
|---|---|---|
| Cluster 0 | Emerald | Stabil |
| Cluster 1 | Blue | Sedang |
| Cluster 2 | Amber | Fluktuatif |
| Cluster 3 | Red | Prioritas intervensi |

Catatan: warna cluster harus selalu didampingi label teks, bukan hanya warna.

---

## 6. Typography

### 6.1 Font

Gunakan font default modern dari Next.js, disarankan:

- `Geist Sans` untuk teks utama
- `Geist Mono` untuk angka, model, dan kode

### 6.2 Type Scale

| Element | Desktop | Mobile | Weight |
|---|---:|---:|---:|
| Hero title | 56px | 36px | 800 |
| Page title | 36px | 28px | 800 |
| Section title | 24px | 20px | 700 |
| Card title | 16px | 15px | 600 |
| Body | 16px | 15px | 400 |
| Small text | 14px | 13px | 400 |
| Metric value | 32px | 26px | 800 |
| Table text | 14px | 13px | 400 |

### 6.3 Text Style

- Heading memakai tracking sedikit ketat.
- Body memakai line-height minimal 1.6.
- Angka metrik harus besar dan mudah terlihat.
- Label form harus jelas dan tidak terlalu kecil.

---

## 7. Spacing System

Gunakan skala Tailwind:

| Token | Size | Usage |
|---|---:|---|
| `2` | 8px | Small gap |
| `3` | 12px | Form inner gap |
| `4` | 16px | Default gap |
| `6` | 24px | Card padding |
| `8` | 32px | Section gap |
| `10` | 40px | Large block gap |
| `12` | 48px | Page section gap |
| `16` | 64px | Hero spacing |

---

## 8. Radius and Shadow

### 8.1 Radius

| Element | Radius |
|---|---:|
| Small badge | `rounded-full` |
| Input | `rounded-xl` |
| Button | `rounded-xl` |
| Card | `rounded-2xl` |
| Main dashboard panel | `rounded-3xl` |

### 8.2 Shadow

Gunakan shadow lembut:

```text
shadow-sm for normal card
shadow-md for elevated card
no heavy shadow
```

Card utama:

```css
border border-slate-200 bg-white shadow-sm
```

---

## 9. Layout System

### 9.1 Global Layout

Desktop:

```text
Sidebar kiri 280px
Topbar kanan
Content area fluid
Max width 1440px
```

Tablet:

```text
Sidebar collapse
Content 2 column grid
```

Mobile:

```text
Topbar fixed
Drawer navigation
Cards 1 column
Tables horizontal scroll
```

### 9.2 Page Padding

```text
Mobile: px-4 py-6
Tablet: px-6 py-8
Desktop: px-8 py-10
Large: px-10 py-12
```

### 9.3 Content Width

```text
Landing: max-w-7xl
Dashboard: max-w-7xl
Forms: max-w-5xl
Docs pages: max-w-4xl
```

---

## 10. Breakpoints

Gunakan breakpoint default Tailwind:

| Breakpoint | Layout |
|---|---|
| `<640px` | Mobile single column |
| `sm` | Mobile wide |
| `md` | Tablet 2 column |
| `lg` | Desktop sidebar |
| `xl` | Wide dashboard |
| `2xl` | Presentation view |

---

## 11. Navigation Design

### 11.1 Sidebar Desktop

Lebar: 280px  
Background: white  
Border kanan: slate-200  
Logo di atas  
Menu group:

```text
Overview
- Dashboard
- EDA
- Clustering

Machine Learning
- Prediksi Harga
- Klasifikasi Anomali
- Model

Decision Support
- Rekomendasi
- Dataset
```

### 11.2 Mobile Navigation

- Topbar dengan hamburger.
- Drawer slide dari kiri.
- Overlay gelap transparan.
- Menu item besar agar mudah disentuh.

### 11.3 Active State

Active menu:

```text
bg-emerald-50
text-emerald-700
border-emerald-200
```

Inactive menu:

```text
text-slate-600
hover:bg-slate-50
```

---

## 12. Page Design Specification

## 12.1 Landing Page

### Objective

Mengenalkan proyek, manfaat, metode, dan CTA ke dashboard.

### Layout

```text
Hero section
Methodology cards
Feature overview
Model pipeline
CTA section
Footer
```

### Hero Content

Title:

```text
Dashboard Analitik Harga Pangan Indonesia
```

Subtitle:

```text
Sistem web untuk menganalisis tren harga pangan, segmentasi wilayah, prediksi harga, klasifikasi anomali, dan rekomendasi kebijakan berbasis Big Data Analytics.
```

CTA:

```text
Buka Dashboard
Lihat Dataset
```

### Visual

- Hero card dengan gradient emerald-slate.
- Mini stat cards.
- Pipeline visual horizontal.

---

## 12.2 Dashboard Page

### Objective

Menampilkan ringkasan semua hasil analisis.

### Layout

```text
PageHeader
StatCard grid 4 columns
ModelMetric grid 4 columns
Trend chart full width
Top komoditas + Top provinsi grid 2 columns
Insight panel
```

### Cards

1. Total data
2. Total komoditas
3. Total provinsi
4. Harga rata-rata
5. Model regresi terbaik
6. Akurasi klasifikasi
7. Silhouette score
8. Deep learning R2/RMSE

### Chart

- Line chart tren harga bulanan.
- Bar chart top komoditas.
- Bar chart top provinsi.

---

## 12.3 EDA Page

### Objective

Menampilkan analisis eksploratif data.

### Layout

```text
PageHeader
FilterPanel
Statistic summary
Trend chart
Distribution chart
Top commodities table
Top provinces table
Missing value summary
Insight notes
```

### Filter

- Komoditas
- Provinsi
- Tahun
- Bulan

### Insight Box

Contoh copy:

```text
Komoditas dengan harga rata-rata tertinggi menunjukkan kebutuhan monitoring lebih lanjut terutama jika fluktuasinya tinggi.
```

---

## 12.4 Clustering Page

### Objective

Menjelaskan segmentasi wilayah/komoditas dengan K-Means.

### Layout

```text
PageHeader
Cluster metric cards
Cluster interpretation cards
Cluster chart
Cluster table
Policy insight
```

### Cluster Card Format

```text
Cluster 0
Karakteristik: harga stabil
Jumlah data: 123
Rekomendasi: monitoring rutin
```

### Badge

- Cluster 0: Stabil
- Cluster 1: Sedang
- Cluster 2: Fluktuatif
- Cluster 3: Prioritas

---

## 12.5 Prediksi Harga Page

### Objective

Memberikan form prediksi harga pangan.

### Layout

```text
PageHeader
Two-column layout:
- Left: Form input
- Right: Result card + explanation
Bottom: sample input + model info
```

### Form Fields

- Tahun
- Bulan
- Komoditas
- Provinsi
- Harga sebelumnya
- Rata-rata 3 bulan
- Perubahan harga

### Result Card

Menampilkan:

- Prediksi harga besar.
- Kategori harga.
- Interpretasi.
- Rekomendasi.

### State

- Default: belum ada prediksi.
- Loading: tombol disabled dan spinner.
- Success: result card muncul.
- Error: alert merah.

---

## 12.6 Klasifikasi Anomali Page

### Objective

Memprediksi status harga/anomali.

### Layout

```text
PageHeader
Form
Status result card
Confidence meter
Recommendation card
```

### Status Result

| Status | UI |
|---|---|
| Normal | Green card |
| Warning | Amber card |
| Alert | Red card |

---

## 12.7 Rekomendasi Page

### Objective

Menampilkan rekomendasi kebijakan berbasis data.

### Layout

```text
PageHeader
Priority cards
Recommendation table
Policy narrative
Action checklist
```

### Recommendation Categories

1. Monitoring harga.
2. Gerakan Pangan Murah.
3. Fasilitasi Distribusi Pangan.
4. Penguatan stok.
5. Evaluasi rantai pasok.

---

## 12.8 Dataset Page

### Objective

Menjelaskan sumber dataset dan proses preprocessing.

### Layout

```text
PageHeader
Dataset source cards
Data pipeline timeline
Column dictionary
Limitations panel
```

### Pipeline Timeline

```text
Raw CSV
→ Cleaning
→ Feature Engineering
→ Modeling
→ Export PKL
→ Dashboard Web
```

---

## 12.9 Model Page

### Objective

Menjelaskan semua model yang digunakan.

### Layout

```text
PageHeader
Model cards
Metrics table
Feature columns table
Model bundle structure
Technical notes
```

---

## 13. Component Specification

## 13.1 AppShell

Wrapper utama aplikasi.

Props:

```ts
type AppShellProps = {
  children: React.ReactNode;
};
```

Behavior:

- Desktop menampilkan sidebar.
- Mobile menampilkan topbar dan drawer.

---

## 13.2 PageHeader

Props:

```ts
type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};
```

Usage:

- Semua halaman utama.

---

## 13.3 StatCard

Props:

```ts
type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  trend?: string;
  icon?: React.ReactNode;
};
```

Visual:

- White card.
- Border slate.
- Icon circle emerald.

---

## 13.4 MetricCard

Props:

```ts
type MetricCardProps = {
  model: string;
  metricName: string;
  metricValue: string | number;
  status?: "good" | "medium" | "low";
};
```

---

## 13.5 ChartCard

Props:

```ts
type ChartCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};
```

Visual:

- Header atas.
- Chart responsive container.
- Footer insight optional.

---

## 13.6 DataTable

Props:

```ts
type DataTableProps<T> = {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    align?: "left" | "right" | "center";
  }[];
  searchable?: boolean;
  pagination?: boolean;
};
```

Behavior:

- Horizontal scroll di mobile.
- Search optional.
- Pagination optional.

---

## 13.7 PricePredictionForm

Fields:

- tahun
- bulan_angka
- komoditas_encoded
- provinsi_encoded
- harga_sebelumnya
- rata_rata_3_bulan
- perubahan_harga

State:

- form
- loading
- result
- error

---

## 13.8 AnomalyPredictionForm

Fields:

- tahun
- bulan_angka
- komoditas_encoded
- provinsi_encoded
- harga_sebelumnya
- rata_rata_3_bulan
- perubahan_harga
- persentase_kenaikan

---

## 13.9 RecommendationCard

Props:

```ts
type RecommendationCardProps = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  source?: string;
};
```

---

## 14. Chart Design

### 14.1 Line Chart

Usage:

- Tren harga bulanan.

Design:

- Smooth line.
- Dot kecil.
- Tooltip jelas.
- X axis bulan/tahun.
- Y axis format rupiah.

### 14.2 Bar Chart

Usage:

- Top komoditas.
- Top provinsi.

Design:

- Horizontal bar untuk label panjang.
- Tooltip rupiah.

### 14.3 Pie/Donut Chart

Usage:

- Distribusi status harga.
- Distribusi cluster.

Design:

- Donut preferred.
- Legend di bawah.

### 14.4 Cluster Chart

Usage:

- Visual cluster.

Design:

- Scatter chart jika data PCA tersedia.
- Jika tidak ada PCA, tampilkan bar summary per cluster.

---

## 15. Form Design

### 15.1 Input Style

```text
height: 44px
rounded-xl
border-slate-200
focus:border-emerald-500
focus:ring-emerald-100
```

### 15.2 Select Style

Gunakan select native dulu agar ringan.

### 15.3 Button Style

Primary:

```text
bg-emerald-600
hover:bg-emerald-700
text-white
rounded-xl
font-semibold
```

Secondary:

```text
bg-white
border-slate-200
text-slate-700
hover:bg-slate-50
```

Disabled:

```text
opacity-60
cursor-not-allowed
```

---

## 16. State Design

### 16.1 Loading

- Skeleton untuk cards.
- Spinner untuk form submit.
- Chart skeleton berbentuk rectangle.

### 16.2 Error

Error card:

```text
bg-red-50
border-red-200
text-red-700
```

### 16.3 Empty

Empty card:

```text
bg-slate-50
border-dashed
text-slate-500
```

Text:

```text
Data belum tersedia. Jalankan notebook export model terlebih dahulu.
```

---

## 17. Motion Design

Gunakan animasi ringan saja.

### Recommended

- Fade in page section.
- Hover lift kecil pada card.
- Drawer slide mobile.
- Result card fade in setelah prediksi.

### Avoid

- Animasi berlebihan.
- Parallax berat.
- Grafik yang bergerak terus-menerus.

Durasi:

```text
150ms for hover
250ms for drawer
300ms for page section
```

---

## 18. Accessibility

### Requirements

- Form input harus punya label.
- Button harus punya focus-visible state.
- Warna status harus punya teks pendamping.
- Chart harus punya summary teks.
- Sidebar dapat digunakan dengan keyboard.
- Hindari teks abu-abu terlalu muda.

### Focus Ring

```text
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-emerald-500
focus-visible:ring-offset-2
```

---

## 19. Responsive Behavior

### Dashboard Cards

```text
Mobile: 1 column
Tablet: 2 columns
Desktop: 4 columns
```

### Charts

```text
Mobile: full width, height 260px
Desktop: height 360px
```

### Forms

```text
Mobile: 1 column
Desktop: 2 columns
```

### Tables

```text
Mobile: horizontal scroll
Desktop: normal table
```

### Sidebar

```text
Mobile: drawer
Desktop: fixed left sidebar
```

---

## 20. Tailwind CSS 4 Setup

`app/globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

Jika memakai custom token tambahan, simpan di:

```text
styles/tokens.css
```

Lalu import di `globals.css`.

---

## 21. Suggested Utility Classes

### Page Container

```tsx
<main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10">
  <div className="mx-auto max-w-7xl">
    {children}
  </div>
</main>
```

### Card

```tsx
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  {children}
</div>
```

### Primary Button

```tsx
<button className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-60">
  Prediksi
</button>
```

### Badge

```tsx
<span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
  Normal
</span>
```

---

## 22. File and Component Naming

### Naming Rules

- Component PascalCase.
- Utility camelCase.
- Route lowercase with dash.
- Data file lowercase with underscore.

Examples:

```text
PricePredictionForm.tsx
AnomalyPredictionForm.tsx
recommendation_summary.csv
prediksi-harga/page.tsx
```

---

## 23. TypeScript Types

File:

```text
lib/types.ts
```

Suggested types:

```ts
export type DashboardSummary = {
  total_data: number;
  total_komoditas: number;
  total_provinsi: number;
  tahun_awal: number;
  tahun_akhir: number;
  harga_rata_rata: number;
  harga_minimum: number;
  harga_maksimum: number;
};

export type ModelMetrics = {
  regression?: {
    best_model: string;
    mae: number;
    mse: number;
    rmse: number;
    r2_score: number;
  };
  classification?: {
    best_model: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
  };
  clustering?: {
    model: string;
    n_clusters: number;
    silhouette_score: number;
  };
};

export type PricePredictionPayload = {
  tahun: number;
  bulan_angka: number;
  komoditas_encoded: number;
  provinsi_encoded: number;
  harga_sebelumnya: number;
  rata_rata_3_bulan: number;
  perubahan_harga: number;
};

export type PricePredictionResponse = {
  status: string;
  prediksi_harga: number;
  kategori: string;
  interpretasi: string;
  satuan: string;
};
```

---

## 24. Copywriting Guidelines

### Tone

- Formal tapi mudah dipahami.
- Tidak terlalu teknis di halaman publik.
- Teknis detail ditempatkan di halaman Model/Dataset.

### Contoh Microcopy

Button:

```text
Prediksi Harga
Klasifikasi Status
Lihat Rekomendasi
Unduh Ringkasan
```

Empty state:

```text
Data belum tersedia
Jalankan notebook export model untuk menghasilkan file dashboard.
```

Error:

```text
Prediksi gagal diproses
Pastikan model_bundle.pkl tersedia dan input sudah sesuai.
```

---

## 25. Page-Level Wireframe

### Dashboard

```text
[Sidebar] [Topbar]

[Page Header]

[Stat Card] [Stat Card] [Stat Card] [Stat Card]

[Line Chart: Tren Harga Bulanan]

[Bar Chart: Top Komoditas] [Bar Chart: Top Provinsi]

[Model Metrics] [Policy Insight]
```

### Prediksi Harga

```text
[Page Header]

[Form Input]      [Result Card]
[Form Input]      [Interpretation]
[Submit Button]   [Recommendation]

[Model Info]
```

### Clustering

```text
[Page Header]

[Cluster 0] [Cluster 1] [Cluster 2] [Cluster 3]

[Cluster Chart]

[Cluster Table]

[Policy Recommendation]
```

---

## 26. Recommended Folder Structure

```text
harga-pangan-vercel/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── dashboard/page.tsx
│   ├── eda/page.tsx
│   ├── clustering/page.tsx
│   ├── prediksi-harga/page.tsx
│   ├── klasifikasi-anomali/page.tsx
│   ├── rekomendasi/page.tsx
│   ├── dataset/page.tsx
│   └── model/page.tsx
│
├── api/
│   └── index.py
│
├── components/
│   ├── layout/
│   ├── cards/
│   ├── charts/
│   ├── forms/
│   ├── tables/
│   ├── ui/
│   └── sections/
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
├── model/
│   ├── model_bundle.pkl
│   ├── model_metadata.json
│   └── encoder_mapping.json
│
├── public/
│   └── data/
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
└── README.md
```

---

## 27. Implementation Notes

### Server Components

Gunakan server component untuk:

- Dashboard static summary.
- Dataset documentation.
- Model documentation.
- EDA page yang hanya membaca file statis.

### Client Components

Gunakan client component untuk:

- Form prediksi harga.
- Form klasifikasi anomali.
- Chart interaktif Recharts.
- Mobile drawer.
- Search/filter table.

---

## 28. Deployment Design Notes

Karena aplikasi menggunakan `.pkl`, desain teknis mengikuti pola:

```text
Next.js pages/components
+
Vercel Python Function api/index.py
+
model/model_bundle.pkl
```

Hal-hal yang perlu diperhatikan:

1. Model tidak boleh terlalu besar.
2. Dependency Python harus minimal.
3. File data mentah besar jangan ikut deploy.
4. Gunakan `.vercelignore`.
5. Dashboard baca file ringkasan, bukan data mentah besar.

---

## 29. `.vercelignore` Recommendation

```text
.ipynb_checkpoints
notebook/
data_raw/
data_clean/
output/grafik/
output/laporan/
*.ipynb
*.zip
*.png
*.jpg
*.jpeg
*.pdf
```

Jangan ignore:

```text
model/model_bundle.pkl
model/model_metadata.json
model/encoder_mapping.json
public/data/
```

---

## 30. Visual QA Checklist

Sebelum submit:

1. Mobile layout tidak overflow.
2. Sidebar aktif sesuai route.
3. Semua card punya spacing konsisten.
4. Chart tidak terpotong di mobile.
5. Tabel bisa scroll horizontal.
6. Form punya label jelas.
7. Loading state tampil saat prediksi.
8. Error state tampil jika API gagal.
9. Warna status tidak membingungkan.
10. Semua halaman punya heading dan deskripsi.

---

## 31. Final Design Acceptance

Desain dianggap selesai jika:

- Terlihat profesional saat dipresentasikan.
- Semua halaman utama konsisten.
- Dashboard mudah dibaca.
- Prediksi mudah digunakan.
- Rekomendasi kebijakan mudah dipahami.
- Responsive di mobile, tablet, desktop.
- Tidak ada elemen visual yang berlebihan.
- Kuat secara akademik dan teknis.

---

## 32. Technical References

- Next.js official documentation: https://nextjs.org/
- Tailwind CSS official documentation: https://tailwindcss.com/
- Vercel Python Runtime: https://vercel.com/docs/functions/runtimes/python
- Vercel FastAPI guide: https://vercel.com/docs/frameworks/backend/fastapi
- Vercel Function limits: https://vercel.com/docs/functions/limitations
