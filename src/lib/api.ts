import {
  PricePredictionPayload,
  PricePredictionResponse,
  StatusPredictionPayload,
  StatusPredictionResponse,
  ClusterPredictionPayload,
  ClusterPredictionResponse
} from './types';

// Gunakan URL internal Vercel di production, fallback ke localhost:3000 atau 8000 untuk local run
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''; // Relative path di client side
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

export async function fetchHealth() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/health`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch health check');
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 'error', model_loaded: false };
  }
}

export async function fetchMetadata() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/metadata`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch metadata');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMetrics() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/metrics`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch metrics');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function predictPrice(payload: PricePredictionPayload): Promise<PricePredictionResponse> {
  const res = await fetch(`${getBaseUrl()}/api/predict-price`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || errData.detail || 'Gagal melakukan prediksi harga');
  }

  return await res.json();
}

export async function predictStatus(payload: StatusPredictionPayload): Promise<StatusPredictionResponse> {
  const res = await fetch(`${getBaseUrl()}/api/predict-status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || errData.detail || 'Gagal mengklasifikasikan status harga');
  }

  return await res.json();
}

export async function predictCluster(payload: ClusterPredictionPayload): Promise<ClusterPredictionResponse> {
  const res = await fetch(`${getBaseUrl()}/api/predict-cluster`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || errData.detail || 'Gagal mengklasifikasikan cluster');
  }

  return await res.json();
}
