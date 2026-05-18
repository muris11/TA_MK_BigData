import {
  LayoutDashboard,
  AreaChart,
  Grid,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  Database,
  Cpu
} from 'lucide-react';

export type NavItem = {
  name: string;
  href: string;
  icon: any;
  group: 'Overview' | 'Machine Learning' | 'Decision Support';
};

export const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    group: 'Overview'
  },
  {
    name: 'EDA (Eksplorasi Data)',
    href: '/eda',
    icon: AreaChart,
    group: 'Overview'
  },
  {
    name: 'Clustering',
    href: '/clustering',
    icon: Grid,
    group: 'Overview'
  },
  {
    name: 'Prediksi Harga',
    href: '/prediksi-harga',
    icon: TrendingUp,
    group: 'Machine Learning'
  },
  {
    name: 'Klasifikasi Anomali',
    href: '/klasifikasi-anomali',
    icon: ShieldAlert,
    group: 'Machine Learning'
  },
  {
    name: 'Model & Metrik',
    href: '/model',
    icon: Cpu,
    group: 'Machine Learning'
  },
  {
    name: 'Rekomendasi Kebijakan',
    href: '/rekomendasi',
    icon: AlertTriangle,
    group: 'Decision Support'
  },
  {
    name: 'Dataset & Preprocessing',
    href: '/dataset',
    icon: Database,
    group: 'Decision Support'
  }
];
