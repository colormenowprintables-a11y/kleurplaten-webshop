import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import SafeImage from '@/components/SafeImage';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === 'nl') {
    return {
      title: 'Amazon KDP Fysieke Kleurboeken & Paperbacks | ColorMeNow',
      description: 'Bekijk en bestel onze fysieke paperback kleurboeken op Amazon KDP! Hoge kwaliteit gedrukt papier, rechtstreeks thuisbezorgd.',
    };
  } else if (lang === 'de') {
    return {
      title: 'Amazon KDP Taschenbücher & Malbücher | ColorMeNow',
      description: 'Entdecken Sie unsere gedruckten Malbücher auf Amazon KDP! Hochwertiges Papier, direkt nach Hause geliefert.',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Livres de Coloriage Papier Amazon KDP | ColorMeNow',
      description: 'Découvrez nos livres de coloriage brochés sur Amazon KDP! Papier de haute qualité, livré directement chez vous.',
    };
  }
  return {
    title: 'Amazon KDP Physical Paperback Coloring Books | ColorMeNow',
    description: 'Browse and order our official physical paperback coloring books on Amazon KDP! High-quality printed paper delivered straight to your door.',
  };
}

export default async function KdpBooksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const kdpBooks = [
    {
      title: 'Gothic Kawaii Carnival (Volume 1): 50 Unique Cute Chibi & Spooky Outlines',
      pages: '104 Pages',
      price: '$9.99 USD / € 10,69',
      amazonUrl: isNl
        ? 'https://www.amazon.nl/dp/B0H7SW2MPP?tag=colormenownl-21'
        : 'https://www.amazon.com/dp/B0H7SW2MPP?tag=colormenowpri-20',
      img: '/covers/gothic_kawaii_carnival_cover.png',
      rating: '5.0 ⭐⭐⭐⭐⭐',
      asin: 'B0H7SW2MPP',
    },
    {
      title: 'Botanical Gardens: Herb Gardens & Pots (Volume 1): 50 Vintage Herb Designs',
      pages: '104 Pages',
      price: '$9.99 USD / € 10,69',
      amazonUrl: isNl
        ? 'https://www.amazon.nl/dp/B0H7N6X145?tag=colormenownl-21'
        : 'https://www.amazon.com/dp/B0H7N6X145?tag=colormenowpri-20',
      img: '/covers/botanical_gardens_cover.png',
      rating: '5.0 ⭐⭐⭐⭐⭐',
      asin: 'B0H7N6X145',
    },
    {
      title: 'Boho Chic Lotus Dreamcatchers (Volume 1): 50 Mandala & Dreamcatcher Designs',
      pages: '104 Pages',
      price: '$9.99 USD / € 10,69',
      amazonUrl: isNl
        ? 'https://www.amazon.nl/dp/B0H75HZ2X3?tag=colormenownl-21'
        : 'https://www.amazon.com/dp/B0H75HZ2X3?tag=colormenowpri-20',
      img: '/covers/dreamcatchers_cover.png',
      rating: '4.9 ⭐⭐⭐⭐⭐',
      asin: 'B0H75HZ2X3',
    },
    {
      title: 'Art Nouveau Flower Gardens (Volume 1): Elegant Floral & Swirling Patterns',
      pages: '104 Pages',
      price: '$9.99 USD / € 10,69',
      amazonUrl: isNl
        ? 'https://www.amazon.nl/dp/B0H6XKVVGX?tag=colormenownl-21'
        : 'https://www.amazon.com/dp/B0H6XKVVGX?tag=colormenowpri-20',
      img: '/covers/flower_gardens_cover.png',
      rating: '5.0 ⭐⭐⭐⭐⭐',
      asin: 'B0H6XKVVGX',
    },
  ];

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #FFF7ED 0%, var(--background) 100%)', borderBottomColor: '#FFEDD5' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isNl ? 'Amazon Paperbacks' : isDe ? 'Amazon Taschenbücher' : isFr ? 'Livres Amazon' : 'Amazon Paperbacks' }]}
              lang={lang}
            />
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(234, 88, 12, 0.15)',
            color: '#EA580C',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            📦 {isNl ? 'FYSIEK GEDRUKTE PAPIEREN BOEKEN (AMAZON KDP)' : isDe ? 'GEDRUCKTE TASCHENBÜCHER (AMAZON KDP)' : isFr ? 'LIVRES PAPIER IMPRIMÉS (AMAZON KDP)' : 'PHYSICAL PAPERBACK BOOKS (AMAZON KDP)'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isNl ? 'Amazon KDP Fysieke Kleurboeken' : isDe ? 'Amazon KDP Gedruckte Malbücher' : isFr ? 'Livres de Coloriage Amazon KDP' : 'Amazon KDP Paperback Coloring Books'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isNl
              ? 'Prefereer je echte papieren boeken om kado te geven of heerlijk in te kleuren met potloden? Bestel onze officiële fysieke paperback edities rechtstreeks via Amazon Prime!'
              : isDe
              ? 'Bevorzugen Sie echte gedruckte Bücher? Bestellen Sie unsere offiziellen Amazon KDP Taschenbücher direkt über Amazon!'
              : isFr
              ? 'Vous préférez de vrais livres papier? Commandez nos éditions brochées directement sur Amazon!'
              : 'Prefer physical printed books to gift or color with pencils? Order our official paperback editions directly on Amazon Prime!'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isNl ? 'Gesponsorde Aanbeveling' : 'Sponsored Recommendation'} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '2rem',
          marginTop: '2rem',
          marginBottom: '3.5rem',
        }}>
          {kdpBooks.map((book, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid var(--gray-200)',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ position: 'relative', height: '260px', background: '#F8FAFC' }}>
                <SafeImage
                  src={book.img}
                  alt={book.title}
                  width={300}
                  height={260}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: '#FF9900',
                  color: '#000000',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                }}>
                  Amazon KDP Edition
                </span>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#EA580C' }}>{book.pages}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>{book.rating}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {book.title}
                  </h3>

                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#16A34A', marginBottom: '1.25rem' }}>
                    {book.price}
                  </div>
                </div>

                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    background: '#FF9900',
                    color: '#000000',
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(255, 153, 0, 0.3)',
                  }}
                >
                  <span>🛒</span>
                  <span>{isNl ? 'Bestel op Amazon' : isDe ? 'Auf Amazon Bestellen' : isFr ? 'Commander sur Amazon' : 'Order on Amazon'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
