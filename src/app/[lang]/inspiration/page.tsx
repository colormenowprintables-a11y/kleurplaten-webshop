import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import SafeImage from '@/components/SafeImage';
import coloredMapping from '@/data/colored-mapping.json';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === 'nl') {
    return {
      title: 'Kleur-Inspiratie & Kunst Galerij | ColorMeNow',
      description: 'Bekijk prachtig ingekleurde voorbeelden van onze printbare kleurplaten! Laat je inspireren en download gratis A4 PDF kleurplaten.',
    };
  } else if (lang === 'de') {
    return {
      title: 'Ausmal-Inspiration & Galerie | ColorMeNow',
      description: 'Entdecken Sie wunderschön ausgemalte Beispiele unserer Malvorlagen! Lassen Sie sich inspirieren und laden Sie kostenlose A4-PDFs herunter.',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Inspiration Coloriage & Galerie d’Art | ColorMeNow',
      description: 'Découvrez de magnifiques exemples de coloriages terminés! Inspirez-vous et téléchargez gratuitement nos PDF A4.',
    };
  }
  return {
    title: 'Coloring Inspiration & Art Gallery | ColorMeNow',
    description: 'Browse beautifully colored sample artworks from our printable coloring books! Get inspired and download free high-res A4 PDFs.',
  };
}

export default async function InspirationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const mappedList = coloredMapping.mappedList || [];
  const slugMap = coloredMapping.slugMap as Record<string, any>;
  const slugKeys = Object.keys(slugMap);

  return (
    <>
      <div
        className="page-hero"
        style={{
          padding: '3.5rem 0 2.5rem',
          background: 'linear-gradient(180deg, #EEF2FF 0%, var(--background) 100%)',
          borderBottomColor: '#C7D2FE',
        }}
      >
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isNl ? 'Kleur-Inspiratie Galerij' : isDe ? 'Ausmal-Inspiration' : isFr ? 'Galerie Inspiration' : 'Inspiration Gallery' }]}
              lang={lang}
            />
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#4F46E5',
              padding: '0.3rem 0.85rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
            }}
          >
            🎨 {isNl ? '200+ GEKLEURDE KUNSTWERKEN & VOORBEELDEN' : '200+ COLORED ARTWORKS & SAMPLES'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isNl ? 'Kleur-Inspiratie & Kunst Galerij' : isDe ? 'Ausmal-Inspiration Galerie' : isFr ? 'Galerie d’Inspiration Coloriage' : 'Coloring Inspiration & Art Gallery'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isNl
              ? 'Laat je inspireren door prachtige ingekleurde meesterwerken! Klik op een afbeelding om direct de printbare zwart-wit kleurplaat (A4 PDF) te openen en zelf aan de slag te gaan.'
              : isDe
              ? 'Lassen Sie sich von wunderschön ausgemalten Kunstwerken inspirieren! Klicken Sie auf ein Bild, um die druckbare Schwarz-Weiß-Malvorlage zu öffnen.'
              : isFr
              ? 'Laissez-vous inspirer par de superbes coloriages terminés! Cliquez sur une image pour ouvrir le coloriage à imprimer.'
              : 'Get inspired by beautifully colored sample artworks! Click any image to instantly open and print its high-resolution B&W coloring sheet.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isNl ? 'Gesponsorde Aanbeveling' : 'Sponsored Recommendation'} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.75rem',
            marginTop: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          {slugKeys.map((slug, idx) => {
            const item = slugMap[slug];
            const pageUrl = `/${lang}/${item.hub || 'cute-animals-fantasy'}/${item.theme || 'general'}/all-ages/${slug}`;

            return (
              <div
                key={slug}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid var(--gray-200)',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div style={{ position: 'relative', height: '240px', background: '#F8FAFC' }}>
                  <SafeImage
                    src={item.coloredImage}
                    alt={item.title}
                    width={300}
                    height={240}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    🎨 {isNl ? 'Inspiratie Voorbeeld' : 'Coloring Sample'}
                  </span>
                </div>

                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem', lineHeight: 1.35 }}>
                    {item.title}
                  </h3>

                  <Link
                    href={pageUrl}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      padding: '0.7rem 1rem',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #FF6B35 0%, #FF3B30 100%)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(255, 107, 53, 0.3)',
                    }}
                  >
                    <span>✏️</span>
                    <span>{isNl ? 'Print Zwart-Wit Versie →' : 'Print B&W Version →'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
