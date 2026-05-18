import fs from 'fs';
import path from 'path';
import {
  DashboardSummary,
  TrendHarga,
  TopKomoditas,
  TopProvinsi,
  ClusterSummaryItem,
  RecommendationSummaryItem
} from './types';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

// Helper untuk membaca file JSON secara aman
function readJsonFile<T>(filename: string): T | null {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading JSON file ${filename}:`, error);
    return null;
  }
}

// Helper untuk membaca file CSV dan memparsing secara sederhana
function readCsvFile<T>(filename: string, parser: (row: string[]) => T): T[] {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length <= 1) return []; // Hanya header saja atau kosong

    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      // Menangani case jika ada koma di dalam string bertanda kutip ganda
      const cols: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          cols.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      cols.push(current.trim().replace(/^"|"$/g, ''));
      return parser(cols);
    });
  } catch (error) {
    console.error(`Error reading CSV file ${filename}:`, error);
    return [];
  }
}

export function getDashboardSummary(): DashboardSummary | null {
  return readJsonFile<DashboardSummary>('dashboard_summary.json');
}

export function getTrendHargaBulanan(): TrendHarga[] {
  // Coba cari berkas JSON terlebih dahulu agar cepat
  const jsonTrend = readJsonFile<TrendHarga[]>('trend_harga_bulanan.json');
  if (jsonTrend) return jsonTrend;

  // Fallback ke CSV
  return readCsvFile<TrendHarga>('trend_harga_bulanan.csv', (cols) => ({
    tahun: parseInt(cols[0]) || 0,
    bulan: cols[1] || '',
    bulan_angka: parseInt(cols[2]) || 0,
    harga_rata_rata: parseFloat(cols[3]) || 0,
  }));
}

export function getTopKomoditas(): TopKomoditas[] {
  const jsonTop = readJsonFile<TopKomoditas[]>('top_komoditas.json');
  if (jsonTop) return jsonTop;

  return readCsvFile<TopKomoditas>('top_komoditas.csv', (cols) => ({
    komoditas: cols[0] || '',
    harga_rata_rata: parseFloat(cols[1]) || 0,
  }));
}

export function getTopProvinsi(): TopProvinsi[] {
  const jsonTop = readJsonFile<TopProvinsi[]>('top_provinsi.json');
  if (jsonTop) return jsonTop;

  return readCsvFile<TopProvinsi>('top_provinsi.csv', (cols) => ({
    provinsi: cols[0] || '',
    harga_rata_rata: parseFloat(cols[1]) || 0,
  }));
}

export function getClusterSummary(): ClusterSummaryItem[] {
  const jsonSummary = readJsonFile<ClusterSummaryItem[]>('cluster_summary.json');
  if (jsonSummary) return jsonSummary;

  return readCsvFile<ClusterSummaryItem>('cluster_summary.csv', (cols) => ({
    cluster: parseInt(cols[0]) || 0,
    jumlah_data: parseInt(cols[1]) || 0,
    rata_rata_harga: parseFloat(cols[2]) || 0,
    rata_rata_fluktuasi: parseFloat(cols[3]) || 0,
    rata_rata_kenaikan: parseFloat(cols[4]) || 0,
    skor_risiko: parseInt(cols[5]) || 0,
    label_cluster: cols[6] || 'Stabil',
  }));
}

export function getRecommendationSummary(): RecommendationSummaryItem[] {
  const jsonRec = readJsonFile<RecommendationSummaryItem[]>('recommendation_summary.json');
  if (jsonRec) return jsonRec;

  return readCsvFile<RecommendationSummaryItem>('recommendation_summary.csv', (cols) => ({
    provinsi: cols[0] || '',
    komoditas: cols[1] || '',
    jenis_harga: cols[2] || '',
    level_wilayah: cols[3] || '',
    cluster: parseInt(cols[4]) || 0,
    label_cluster: cols[5] || 'Normal',
    rata_rata_harga: parseFloat(cols[6]) || 0,
    standar_deviasi_harga: parseFloat(cols[7]) || 0,
    rata_rata_kenaikan: parseFloat(cols[8]) || 0,
    rekomendasi_kebijakan: cols[9] || '',
  }));
}

export function getEncoderMapping() {
  return readJsonFile<Record<string, Record<string, number>>>('encoder_mapping.json');
}
