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

export type RegressionMetrics = {
  best_model: string;
  mae: number;
  mse: number;
  rmse: number;
  r2_score: number;
};

export type ClassificationMetrics = {
  best_model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
};

export type ClusteringMetrics = {
  model: string;
  n_clusters: number;
  silhouette_score: number;
};

export type ModelMetrics = {
  regression?: RegressionMetrics;
  classification?: ClassificationMetrics;
  clustering?: ClusteringMetrics;
};

export type TrendHarga = {
  tahun: number;
  bulan: string;
  bulan_angka: number;
  harga_rata_rata: number;
  [key: string]: any;
};

export type TopKomoditas = {
  komoditas: string;
  harga_rata_rata: number;
};

export type TopProvinsi = {
  provinsi: string;
  harga_rata_rata: number;
};

export type ClusterSummaryItem = {
  cluster: number;
  jumlah_data: number;
  rata_rata_harga: number;
  rata_rata_fluktuasi: number;
  rata_rata_kenaikan: number;
  skor_risiko: number;
  label_cluster: string;
};

export type RecommendationSummaryItem = {
  provinsi: string;
  komoditas: string;
  jenis_harga: string;
  level_wilayah: string;
  cluster: number;
  label_cluster: string;
  rata_rata_harga: number;
  standar_deviasi_harga: number;
  rata_rata_kenaikan: number;
  rekomendasi_kebijakan: string;
};

export type PricePredictionPayload = {
  tahun: number;
  bulan_angka: number;
  month_index: number;
  komoditas_encoded: number;
  provinsi_encoded: number;
  jenis_harga_encoded: number;
  level_wilayah_encoded: number;
  harga_sebelumnya: number;
  rata_rata_3_bulan: number;
  volatilitas_3_bulan: number;
  perubahan_harga: number;
  persentase_kenaikan: number;
};

export type PricePredictionResponse = {
  status: string;
  prediksi_harga: number;
  kategori: "Normal" | "Warning" | "Alert";
  interpretasi: string;
  satuan: string;
};

export type StatusPredictionPayload = {
  tahun: number;
  bulan_angka: number;
  month_index: number;
  komoditas_encoded: number;
  provinsi_encoded: number;
  jenis_harga_encoded: number;
  level_wilayah_encoded: number;
  harga: number;
  harga_sebelumnya: number;
  rata_rata_3_bulan: number;
  volatilitas_3_bulan: number;
  perubahan_harga: number;
  persentase_kenaikan: number;
  indeks: number;
};

export type StatusPredictionResponse = {
  status: string;
  status_prediksi: "Normal" | "Warning" | "Alert";
  confidence: number;
  rekomendasi: string;
};

export type ClusterPredictionPayload = {
  rata_rata_harga: number;
  harga_median: number;
  harga_maksimum: number;
  harga_minimum: number;
  standar_deviasi_harga: number;
  rata_rata_kenaikan: number;
  volatilitas_rata_rata: number;
};

export type ClusterPredictionResponse = {
  status: string;
  cluster: number;
  interpretasi: string;
  rekomendasi: string;
};
