export const formatRupiah = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue);
};

export const formatNumber = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return '0';
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 2
  }).format(numericValue);
};

export const formatPercentage = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return '0%';
  const prefix = numericValue > 0 ? '+' : '';
  return `${prefix}${numericValue.toFixed(2)}%`;
};
