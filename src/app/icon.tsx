import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Icon generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '25%', // Rounded-rect yang elegan
          border: '1px solid #10b981',
        }}
      >
        {/* Custom SVG Daun Pangan & Grafik Analitik Pertanian */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            width: '70%',
            height: '70%',
          }}
        >
          {/* Path Daun / Pertanian */}
          <path d="M12 2A10 10 0 0 0 2 12c0 4.4 3.6 8 8 8h2a10 10 0 0 0 10-10C22 5.6 18.4 2 14 2h-2z" fill="#047857" opacity="0.3" />
          <path d="M12 2c1.5 5 5 8.5 10 10M2 12c5 1.5 8.5 5 10 10" />
          <path d="M12 2v20" stroke="#34d399" strokeWidth="2.5" />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
