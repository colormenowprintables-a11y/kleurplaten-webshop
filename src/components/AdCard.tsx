'use client';

import { useEffect, useRef, useState } from 'react';
import { getRotatingAffiliateProduct, AffiliateProduct } from '@/data/affiliateData';

interface AdCardProps {
  index?: number;
  lang?: string;
  slotId?: string;
}

export default function AdCard({ index = 0, lang = 'nl', slotId = '6437272564' }: AdCardProps) {
  const [product, setProduct] = useState<AffiliateProduct | null>(null);
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    setProduct(getRotatingAffiliateProduct(index));

    if (pushedRef.current) return;
    try {
      if (typeof window !== 'undefined') {
        const ins = adRef.current;
        if (ins && !ins.getAttribute('data-adsbygoogle-status')) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      }
    } catch (e) {
      console.warn('AdCard push notice:', e);
    }
  }, [index]);

  if (!product) {
    return (
      <div
        style={{
          background: 'var(--surface, #FFFFFF)',
          borderRadius: 'var(--radius-lg, 20px)',
          border: '1px solid var(--gray-200, #E2E8F0)',
          minHeight: '280px',
        }}
      />
    );
  }

  const isNl = lang === 'nl';
  const title = product.title[lang as keyof typeof product.title] || product.title.en;
  const description = product.description[lang as keyof typeof product.description] || product.description.en;
  const badge = product.badge[lang as keyof typeof product.badge] || product.badge.en;
  const buyUrl = isNl ? product.urlNl : product.urlEn;

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBEB 100%)',
        borderRadius: 'var(--radius-lg, 20px)',
        border: '1.5px solid #FCD34D',
        boxShadow: '0 4px 16px rgba(245, 158, 11, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.15rem',
        position: 'relative',
        height: '100%',
      }}
      aria-label="Sponsored Recommendation"
      role="complementary"
    >
      {/* Hidden/Active Google AdSense tag for Google Ads integration */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'none' }}
        data-ad-client="ca-pub-1184801748776428"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      <div>
        {/* Top Tag & Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.65rem',
          }}
        >
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: '#B45309',
              textTransform: 'uppercase',
              background: '#FEF3C7',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              border: '1px solid #FDE68A',
            }}
          >
            🛒 {isNl ? 'AANBEVOLEN TIP' : 'RECOMMENDED'}
          </span>
          <span style={{ fontSize: '1.4rem' }}>{product.icon}</span>
        </div>

        {/* Product Image Thumbnail */}
        {product.imageUrl && (
          <div
            style={{
              height: '140px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '1px solid #FDE68A',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.4rem',
            }}
          >
            <img
              src={product.imageUrl}
              alt={title}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
              loading="lazy"
            />
          </div>
        )}

        <span
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#D97706',
            marginBottom: '0.3rem',
          }}
        >
          {badge}
        </span>

        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 900,
            color: '#0F172A',
            lineHeight: 1.35,
            marginBottom: '0.35rem',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: '0.8rem',
            color: '#475569',
            lineHeight: 1.45,
            marginBottom: '0.85rem',
          }}
        >
          {description}
        </p>
      </div>

      <a
        href={buyUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          width: '100%',
          padding: '0.65rem 0.85rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #FF9900 0%, #FF8000 100%)',
          color: '#111111',
          fontWeight: 900,
          fontSize: '0.85rem',
          textDecoration: 'none',
          boxShadow: '0 3px 10px rgba(255, 153, 0, 0.35)',
          transition: 'transform 0.15s ease',
        }}
      >
        <span>🛒</span>
        <span>
          {isNl
            ? 'Bekijk op Amazon'
            : lang === 'de'
            ? 'Bei Amazon ansehen'
            : lang === 'fr'
            ? 'Voir sur Amazon'
            : 'View on Amazon'}
        </span>
      </a>
    </div>
  );
}
