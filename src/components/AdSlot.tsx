'use client';

import { useEffect, useState } from 'react';
import { getRotatingAffiliateProduct, AffiliateProduct } from '@/data/affiliateData';

interface AdSlotProps {
  type?: 'banner' | 'rectangle' | 'in-feed';
  text?: string;
  slotId?: string;
  index?: number;
  lang?: string;
}

export default function AdSlot({
  type = 'banner',
  text = 'Advertisement',
  index = 0,
  lang = 'nl',
}: AdSlotProps) {
  const [product, setProduct] = useState<AffiliateProduct | null>(null);

  useEffect(() => {
    // Pick daily rotating affiliate product offset by index
    setProduct(getRotatingAffiliateProduct(index));
  }, [index]);

  if (!product) return null;

  const isNl = lang === 'nl';
  const title = product.title[lang as keyof typeof product.title] || product.title.en;
  const description = product.description[lang as keyof typeof product.description] || product.description.en;
  const badge = product.badge[lang as keyof typeof product.badge] || product.badge.en;
  const buyUrl = isNl ? product.urlNl : product.urlEn;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
        borderRadius: '20px',
        border: '1.5px solid #FCD34D',
        padding: '1.25rem 1.75rem',
        margin: '2rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        boxShadow: '0 4px 14px rgba(245, 158, 11, 0.08)',
        flexWrap: 'wrap',
      }}
      role="complementary"
      aria-label={text}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: '280px' }}>
        {/* Thumbnail Image or Icon Box */}
        {product.imageUrl ? (
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '16px',
              background: '#FFFFFF',
              border: '1px solid #FDE68A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.35rem',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              overflow: 'hidden',
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
        ) : (
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#FFFFFF',
              border: '1px solid #FDE68A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {product.icon}
          </div>
        )}

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#B45309',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                background: '#FFFFFF',
                padding: '0.15rem 0.55rem',
                borderRadius: '9999px',
                border: '1px solid #FCD34D',
              }}
            >
              🛒 {isNl ? 'GEVERIFIEERDE MATERIAALTIP' : 'VERIFIED TOOL'}
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#D97706' }}>
              {badge}
            </span>
          </div>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
            {title}
          </h4>

          <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0.2rem 0 0', lineHeight: 1.4 }}>
            {description}
          </p>
        </div>
      </div>

      <a
        href={buyUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, #FF9900 0%, #FF8000 100%)',
          color: '#111111',
          fontWeight: 900,
          fontSize: '0.9rem',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(255, 153, 0, 0.35)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
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
