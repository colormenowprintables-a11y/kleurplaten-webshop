'use client';

import React from 'react';
import { AFFILIATE_PRODUCTS, AffiliateProduct } from '@/data/affiliateData';

interface AffiliateSectionProps {
  lang: string;
  limit?: number;
  category?: 'paper' | 'markers' | 'pencils' | 'crafts' | 'kits';
  titleOverride?: string;
  subtitleOverride?: string;
}

export default function AffiliateSection({
  lang,
  limit,
  category,
  titleOverride,
  subtitleOverride,
}: AffiliateSectionProps) {
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  let products = category
    ? AFFILIATE_PRODUCTS.filter((p) => p.category === category)
    : AFFILIATE_PRODUCTS;

  if (limit && limit > 0) {
    products = products.slice(0, limit);
  }

  const defaultTitle = isNl
    ? 'Aanbevolen Kleurspullen & Printpapier'
    : isDe
    ? 'Empfohlene Malutensilien & Papier'
    : isFr
    ? 'Matériel de Coloriage & Papier Recommandé'
    : 'Recommended Coloring Supplies & Paper';

  const defaultSubtitle = isNl
    ? 'Haal het beste uit je kleurplaten met professioneel 160g papier, alcoholstiften en breekvaste kleurpotloden.'
    : isDe
    ? 'Holen Sie das Beste aus Ihren Ausmalbildern mit 160g Papier, Alkoholmarkern und Farbstiften heraus.'
    : isFr
    ? 'Obtenez le meilleur rendu avec du papier 160g, des marqueurs à alcool et des crayons professionnels.'
    : 'Get the absolute best results from your printable coloring pages with 160g paper, alcohol markers, and artist pencils.';

  return (
    <section
      style={{
        padding: '2.5rem 0',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
      aria-label="Recommended Coloring Tools"
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(245, 158, 11, 0.12)',
            color: '#D97706',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.65rem',
          }}
        >
          🛒 {isNl ? 'GEVERIFIEERDE MATERIAALTIPS' : 'VERIFIED COLORING TOOLS'}
        </span>

        <h2
          style={{
            fontSize: '1.85rem',
            fontWeight: 900,
            color: 'var(--text-main, #0F172A)',
            margin: '0 0 0.5rem',
          }}
        >
          {titleOverride || defaultTitle}
        </h2>

        <p
          style={{
            fontSize: '1.02rem',
            color: 'var(--text-sub, #475569)',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          {subtitleOverride || defaultSubtitle}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {products.map((product) => {
          const title =
            product.title[lang as keyof typeof product.title] || product.title.en;
          const description =
            product.description[lang as keyof typeof product.description] ||
            product.description.en;
          const badge =
            product.badge[lang as keyof typeof product.badge] || product.badge.en;
          const buyUrl = isNl ? product.urlNl : product.urlEn;

          return (
            <div
              key={product.id}
              style={{
                background: 'var(--surface, #FFFFFF)',
                borderRadius: '20px',
                border: '1.5px solid var(--gray-200, #E2E8F0)',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      background: '#FEF3C7',
                      color: '#92400E',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {badge}
                  </span>
                  <span style={{ fontSize: '1.4rem' }}>{product.icon}</span>
                </div>

                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '0.4rem',
                    lineHeight: 1.35,
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#64748B',
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
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
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.7rem 1rem',
                  borderRadius: '12px',
                  background: '#FF9900', // Amazon orange
                  color: '#111111',
                  fontWeight: 900,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: '0 3px 8px rgba(255, 153, 0, 0.3)',
                  transition: 'background 0.2s ease',
                }}
              >
                <span>🛒</span>
                <span>
                  {isNl
                    ? 'Bekijk op Amazon'
                    : isDe
                    ? 'Bei Amazon ansehen'
                    : isFr
                    ? 'Voir sur Amazon'
                    : 'View on Amazon'}
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
