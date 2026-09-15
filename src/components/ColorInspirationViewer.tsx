'use client';

import React, { useState } from 'react';
import SafeImage from './SafeImage';
import FavoriteButton from './FavoriteButton';

interface ColorInspirationViewerProps {
  pageImage: string;
  coloredImage?: string;
  title: string;
  slug: string;
  url: string;
  isEn: boolean;
}

export default function ColorInspirationViewer({
  pageImage,
  coloredImage,
  title,
  slug,
  url,
  isEn,
}: ColorInspirationViewerProps) {
  const [activeTab, setActiveTab] = useState<'bw' | 'colored'>('bw');

  const currentImg = activeTab === 'colored' && coloredImage ? coloredImage : pageImage;

  return (
    <div
      style={{
        position: 'relative',
        background: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid var(--gray-200)',
        padding: '1.75rem',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      }}
    >
      {/* Top Toggle Bar if colored image exists */}
      {coloredImage && (
        <div
          style={{
            display: 'inline-flex',
            background: '#F1F5F9',
            padding: '0.28rem',
            borderRadius: '9999px',
            marginBottom: '1.25rem',
            gap: '0.35rem',
            border: '1px solid #E2E8F0',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('bw')}
            style={{
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.83rem',
              cursor: 'pointer',
              background: activeTab === 'bw' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'bw' ? '#0F172A' : '#64748B',
              boxShadow: activeTab === 'bw' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            ✏️ {isEn ? 'Printable Line Art (B&W)' : 'Printbare Kleurplaat (Zwart-Wit)'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('colored')}
            style={{
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.83rem',
              cursor: 'pointer',
              background: activeTab === 'colored' ? 'linear-gradient(135deg, #FF6B35 0%, #FF3B30 100%)' : 'transparent',
              color: activeTab === 'colored' ? '#FFFFFF' : '#64748B',
              boxShadow: activeTab === 'colored' ? '0 4px 12px rgba(255, 107, 53, 0.3)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            🎨 {isEn ? 'Color Inspiration Sample' : 'Gekleurd Voorbeeld'}
          </button>
        </div>
      )}

      <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
        <SafeImage
          src={currentImg}
          alt={title}
          width={800}
          height={800}
          loading="eager"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '16px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
          }}
        />

        {activeTab === 'colored' && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.88)',
              color: '#FFFFFF',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              backdropFilter: 'blur(6px)',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            💡 {isEn ? 'Coloring Inspiration Sample' : 'Kleur-Inspiratie Voorbeeld'}
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', top: '22px', right: '22px' }}>
        <FavoriteButton
          item={{
            id: slug,
            slug,
            title,
            preview: pageImage,
            url,
          }}
        />
      </div>
    </div>
  );
}
