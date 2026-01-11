import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'radial-gradient(1200px 600px at 20% 0%, rgba(47,129,247,0.35) 0%, rgba(13,17,23,0.9) 55%, rgba(13,17,23,1) 100%)',
          padding: 64,
          color: '#f0f6fc',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(240,246,252,0.06)',
              border: '1px solid rgba(240,246,252,0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            px
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.92 }}>Pixaloom</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            Websites that convert
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.35, opacity: 0.86, maxWidth: 980 }}>
            Fast, accessible, SEO-ready — shipped with clean engineering.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['SEO', 'Performance', 'Lead-gen'].map((t) => (
              <div
                key={t}
                style={{
                  padding: '10px 14px',
                  borderRadius: 999,
                  background: 'rgba(240,246,252,0.06)',
                  border: '1px solid rgba(240,246,252,0.12)',
                  fontSize: 18,
                  opacity: 0.9,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 18, opacity: 0.7 }}>pixaloom.co.za</div>
        </div>
      </div>
    ),
    size
  );
}
