'use client';

import { useState, useEffect } from 'react';
import { getRotatingAffiliateProduct, AffiliateProduct } from '@/data/affiliateData';

export default function StickyBottomAd({ lang = 'nl' }: { isEn?: boolean; lang?: string }) {
  const [dismissed, setDismissed] = useState(false);
  const [product, setProduct] = useState<AffiliateProduct | null>(null);

  useEffect(() => {
    // Pick daily rotating affiliate product for sticky bar
    setProduct(getRotatingAffiliateProduct(7));
  }, []);

  if (dismissed || !product) return null;

  const isNl = lang === 'nl';
  const title = product.title[lang as keyof typeof product.title] || product.title.en;
  const buyUrl = isNl ? product.urlNl : product.urlEn;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99,
        width: 'calc(100% - 24px)',
        maxWidth: '680px',
        background: '#1E1B4B',
        borderRadius: '9999px',
        padding: '0.6rem 1.25rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        color: '#FFFFFF',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
      role="complementary"
      aria-label="Sponsored Recommendation"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflow: 'hidden' }}>
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{product.icon}</span>
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              background: '#FF9900',
              color: '#111111',
              padding: '0.15rem 0.45rem',
              borderRadius: '9999px',
              marginRight: '0.4rem',
            }}
          >
            TIP
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>
            {title}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '9999px',
            background: '#FF9900',
            color: '#111111',
            fontWeight: 900,
            fontSize: '0.78rem',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(255, 153, 0, 0.4)',
          }}
        >
          🛒 {isNl ? 'Bekijk' : 'View'}
        </a>

        <button
          onClick={() => setDismissed(true)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            fontSize: '1rem',
            cursor: 'pointer',
            padding: '0.2rem 0.4rem',
            lineHeight: 1,
          }}
          aria-label="Close ad"
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
