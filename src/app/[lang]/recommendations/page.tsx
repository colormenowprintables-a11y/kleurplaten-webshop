import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import SafeImage from '@/components/SafeImage';
import { AFFILIATE_PRODUCTS, AffiliateProduct } from '@/data/affiliateData';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === 'nl') {
    return {
      title: 'Aanbevolen Kleurspullen, Papier & Stiften | ColorMeNow',
      description: 'Ontdek de beste kleurspullen voor thuis en in de klas! Zwaar 160g A4 papier, alcoholstiften, Faber-Castell potloden en creatieve knutselsets.',
    };
  } else if (lang === 'de') {
    return {
      title: 'Empfohlene Malutensilien, Papier & Stifte | ColorMeNow',
      description: 'Entdecken Sie die besten Malutensilien: Schweres 160g A4-Papier, Alkohol-Marker, Faber-Castell Farbstifte und kreative Mal-Sets.',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Matériel de Coloriage Recommandé, Papier & Feutres | ColorMeNow',
      description: 'Découvrez les meilleurs outils de coloriage: papier A4 épais 160g, feutres à alcool, crayons Faber-Castell et kits créatifs.',
    };
  }
  return {
    title: 'Recommended Coloring Supplies, Paper & Markers | ColorMeNow',
    description: 'Discover the best coloring supplies for home and classroom! Premium 160g heavy A4 paper, alcohol brush markers, Faber-Castell pencils, and craft kits.',
  };
}

export default async function RecommendationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const categories = [
    { key: 'paper', title: isNl ? '📄 Beste Papier voor Printen' : isDe ? '📄 Bestes Druckerpapier' : isFr ? '📄 Meilleur Papier' : '📄 Best Paper for Printing' },
    { key: 'markers', title: isNl ? '🎨 Viltstiften & Alcohol Markers' : isDe ? '🎨 Filzstifte & Marker' : isFr ? '🎨 Marqueurs & Feutres' : '🎨 Markers & Alcohol Pens' },
    { key: 'pencils', title: isNl ? '✏️ Premium Kleurpotloden' : isDe ? '✏️ Premium Buntstifte' : isFr ? '✏️ Crayons de Couleur' : '✏️ Premium Pencils' },
    { key: 'crafts', title: isNl ? '🧶 Inkleurbare Kleding & Textiles' : isDe ? '🧶 Ausmalbare Textilien' : isFr ? '🧶 Textiles à Colorier' : '🧶 Coloring Textiles & Gifts' },
    { key: 'kits', title: isNl ? '🎁 Knutselsets voor Kinderen' : isDe ? '🎁 Bastel-Sets für Kinder' : isFr ? '🎁 Kits Créatifs Enfant' : '🎁 Craft Kits & Art Sets' },
  ];

  return (
    <>
      <div
        className="page-hero"
        style={{
          padding: '3.5rem 0 2.5rem',
          background: 'linear-gradient(180deg, #FFFBEB 0%, var(--background) 100%)',
          borderBottomColor: '#FDE68A',
        }}
      >
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[
                {
                  label: isNl ? 'Aanbevolen Kleurspullen' : isDe ? 'Empfohlene Utensilien' : isFr ? 'Matériel Recommandé' : 'Recommended Supplies',
                },
              ]}
              lang={lang}
            />
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(217, 119, 6, 0.12)',
              color: '#D97706',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
            }}
          >
            ⭐ {isNl ? 'GETEST & GOEDGEKEURD DOOR KLEURDERS' : isDe ? 'GEPRÜFT & EMPFOHLEN' : isFr ? 'TESTÉ & RECOMMANDÉ' : 'TESTED & APPROVED COLORING SUPPLIES'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isNl
              ? 'Aanbevolen Kleurspullen & Materialen'
              : isDe
              ? 'Empfohlene Malutensilien & Materialien'
              : isFr
              ? 'Matériel de Coloriage Recommandé'
              : 'Recommended Coloring Supplies & Tools'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isNl
              ? 'Wil je het beste resultaat bij het printen en inkleuren? Wij hebben de fijnste papiersoorten, viltstiften, alcoholmarkers en kleurpotloden voor je geselecteerd.'
              : isDe
              ? 'Die besten Materialien für perfekte Malergebnisse: Hochwertiges Papier, Marker und Farbstifte.'
              : isFr
              ? 'Les meilleurs outils pour réussir vos coloriages: papiers épais, feutres et crayons de qualité.'
              : 'Want the best results when printing and coloring? We have tested and handpicked the finest paper, brush markers, and colored pencils.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isNl ? 'Gesponsorde Producten' : 'Sponsored Products'} />

        {categories.map((cat) => {
          const catProducts = AFFILIATE_PRODUCTS.filter((p) => p.category === cat.key);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat.key} style={{ marginTop: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                  {cat.title}
                </h2>
                <div style={{ flex: 1, height: '2px', background: '#E2E8F0', borderRadius: '2px' }} />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {catProducts.map((product) => {
                  const titleStr = isNl
                    ? product.title.nl
                    : isDe
                    ? product.title.de
                    : isFr
                    ? product.title.fr
                    : product.title.en;

                  const descStr = isNl
                    ? product.description.nl
                    : isDe
                    ? product.description.de
                    : isFr
                    ? product.description.fr
                    : product.description.en;

                  const badgeStr = isNl
                    ? product.badge.nl
                    : isDe
                    ? product.badge.de
                    : isFr
                    ? product.badge.fr
                    : product.badge.en;

                  const targetUrl = isEn ? product.urlEn : product.urlNl;

                  return (
                    <div
                      key={product.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '20px',
                        border: '1px solid #E2E8F0',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                    >
                      {product.imageUrl && (
                        <div style={{ position: 'relative', height: '200px', background: '#F8FAFC' }}>
                          <SafeImage
                            src={product.imageUrl}
                            alt={titleStr}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.75rem' }}
                          />
                          <span
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              background: '#F59E0B',
                              color: '#FFFFFF',
                              fontWeight: 900,
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '9999px',
                            }}
                          >
                            {badgeStr}
                          </span>
                        </div>
                      )}

                      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.4 }}>
                            {titleStr}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '0.5rem', lineHeight: 1.5 }}>
                            {descStr}
                          </p>
                        </div>

                        <div style={{ marginTop: '1.25rem' }}>
                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              width: '100%',
                              padding: '0.75rem 1rem',
                              borderRadius: '9999px',
                              background: 'linear-gradient(135deg, #FF9900 0%, #E67E00 100%)',
                              color: '#FFFFFF',
                              fontWeight: 900,
                              fontSize: '0.9rem',
                              textDecoration: 'none',
                              boxShadow: '0 4px 12px rgba(255, 153, 0, 0.35)',
                            }}
                          >
                            <span>🛒</span>
                            <span>{isNl ? 'Bekijk op Amazon' : isDe ? 'Auf Amazon ansehen' : isFr ? 'Voir sur Amazon' : 'View on Amazon'}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
