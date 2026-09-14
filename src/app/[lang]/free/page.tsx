import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import SafeImage from '@/components/SafeImage';
import AffiliateSection from '@/components/AffiliateSection';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === 'nl') {
    return {
      title: '100% Gratis Kleurplaten Printen (Dieren, Dino, Mandala, Ruimte) | ColorMeNow',
      description: 'Download en print 100% gratis kleurplaten voor kinderen en volwassenen! Schattige dieren, dinosaurussen, mandala’s, voertuigen en sprookjes.',
    };
  } else if (lang === 'de') {
    return {
      title: '100% Kostenlose Ausmalbilder zum Ausdrucken (Tiere, Dinos, Mandalas) | ColorMeNow',
      description: 'Kostenlose Malvorlagen für Kinder und Erwachsene in hoher Auflösung herunterladen und ausdrucken!',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Coloriages 100% Gratuits à Imprimer (Animaux, Dinos, Mandalas) | ColorMeNow',
      description: 'Téléchargez et imprimez des coloriages gratuits en haute qualité pour enfants et adultes!',
    };
  }
  return {
    title: '100% Free Printable Coloring Pages (Animals, Dinos, Mandalas, Space) | ColorMeNow',
    description: 'Download and print 100% free high-resolution coloring pages for kids and adults! Cute animals, dinosaurs, mandalas, vehicles, and fairytales.',
  };
}

export default async function FreeColoringPagesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const freeSamples = [
    { title: isNl ? 'Schattige Bosdieren' : 'Cute Forest Friends', category: isNl ? 'Dieren' : 'Animals', img: '/covers/50_cute_animals_cover.png', slug: 'cute-animals-fantasy' },
    { title: isNl ? 'Ontspannende Mandala' : 'Relaxing Mandala Pattern', category: isNl ? 'Mindfulness' : 'Mandalas', img: '/covers/50_relaxing_mandalas_cover.png', slug: 'mandalas-patterns' },
    { title: isNl ? 'Dinosaurus Avontuur' : 'Jurassic Dinosaur World', category: isNl ? 'Dinos' : 'Dinosaurs', img: '/covers/dino_monster_trucks_cover.png', slug: 'kids-adventures' },
    { title: isNl ? 'Ruimteschip & Planeten' : 'Cosmic Space Explorer', category: isNl ? 'Ruimte' : 'Space', img: '/covers/astro_adventure_cover.png', slug: 'kids-adventures' },
    { title: isNl ? 'Sprookjes Eenhoorn' : 'Magical Fairytale Unicorn', category: isNl ? 'Sprookjes' : 'Fairytales', img: '/covers/celestial_dreams_cover.png', slug: 'fantasy-fairytales' },
    { title: isNl ? 'Monster Truck & Snelle Wielen' : 'Monster Truck & Big Wheels', category: isNl ? 'Voertuigen' : 'Vehicles', img: '/covers/50_monster_trucks_cover.png', slug: 'kids-adventures' },
    { title: isNl ? 'Gezellig Huisje & Tuin' : 'Cozy Cottage Retreat', category: isNl ? 'Gezellig' : 'Cozy Life', img: '/covers/50_cozy_cottages_cover.png', slug: 'cozy-life-cottagecore' },
    { title: isNl ? 'Kawaii Snoepjes & Donut' : 'Kawaii Sweets & Treats', category: isNl ? 'Snoepjes' : 'Sweets', img: '/covers/50_kawaii_sweets_cover.png', slug: 'kawaii-food-sweets' },
  ];

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #EFF6FF 0%, var(--background) 100%)', borderBottomColor: '#BFDBFE' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isNl ? 'Gratis Kleurplaten' : isDe ? 'Kostenlose Malvorlagen' : isFr ? 'Coloriages Gratuits' : 'Free Coloring Pages' }]}
              lang={lang}
            />
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(37, 99, 235, 0.12)',
            color: '#2563EB',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            🎁 {isNl ? '100% GRATIS PROEFKLEURPLATEN' : isDe ? '100% KOSTENLOSE MALVORLAGEN' : isFr ? '100% COLORIAGES GRATUITS' : '100% FREE PRINTABLE SAMPLES'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isNl ? 'Gratis Printbare Kleurplaten' : isDe ? 'Kostenlose Malvorlagen zum Ausdrucken' : isFr ? 'Coloriages Gratuits à Imprimer' : 'Free Printable Coloring Pages'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isNl
              ? 'Download en print direct gratis proefkleurplaten in A4 PDF-formaat! Wil je complete kleurboeken van 35+ pagina’s? Bekijk onze populaire boekbundels vanaf slechts € 1,99.'
              : isDe
              ? 'Laden Sie kostenlose Malvorlagen im A4 PDF-Format herunter! Entdecken Sie auch unsere vollständigen Malbücher ab nur 1,99 €.'
              : isFr
              ? 'Téléchargez gratuitement des coloriages PDF A4! Découvrez nos livres complets à partir de 1,99 € seulement.'
              : 'Download and print instant free sample coloring pages in A4 PDF format! Want full 35+ page coloring books? Check out our popular bundles starting at just €1.99.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isNl ? 'Gesponsorde Partners' : 'Sponsored Partners'} />

        {/* Free Samples Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
          marginBottom: '3.5rem',
        }}>
          {freeSamples.map((sample, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid var(--gray-200)',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ position: 'relative', height: '200px', background: '#F8FAFC' }}>
                <SafeImage
                  src={sample.img}
                  alt={sample.title}
                  width={300}
                  height={200}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#22C55E',
                  color: '#FFFFFF',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                }}>
                  {isNl ? '100% GRATIS' : '100% FREE'}
                </span>
              </div>

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                    {sample.category}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginTop: '0.3rem', marginBottom: '0.75rem' }}>
                    {sample.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <Link
                    href={`/${lang}/${sample.slug}`}
                    className="btn-primary"
                    style={{ textAlign: 'center', width: '100%', padding: '0.65rem 1rem', fontSize: '0.88rem', fontWeight: 800 }}
                  >
                    ⬇️ {isNl ? 'Print Gratis A4 PDF' : 'Print Free A4 PDF'}
                  </Link>

                  <Link
                    href={`/${lang}/${sample.slug}`}
                    style={{
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      color: '#64748B',
                      fontWeight: 700,
                      textDecoration: 'underline',
                      marginTop: '0.2rem',
                    }}
                  >
                    {isNl ? 'Bekijk compleet kleurboek (€ 1,99)' : 'View full coloring book (€1.99)'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Affiliate Supplies & Paper */}
        <AffiliateSection lang={lang} />

        {/* Upgrade Banner to €1.99 Books */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(30, 27, 75, 0.25)',
          marginBottom: '3rem',
        }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '9999px',
            padding: '0.25rem 0.85rem',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            🔥 {isNl ? 'STUNT-AANBIEDING — SLECHTS € 1,99 PER BOEK' : 'SPECIAL STUNT DEAL — ONLY €1.99 PER BOOK'}
          </span>

          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#FFFFFF', margin: '1rem 0 0.5rem' }}>
            {isNl ? 'Wil Je Complete Kleurboeken Van 35+ Pagina’s?' : 'Want Full 35+ Page Coloring Books?'}
          </h2>

          <p style={{ color: '#C7D2FE', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            {isNl
              ? 'Kies uit 198 exclusieve thema-kleurboeken. Pak 1 boek voor € 1,99 of kies de 3-Boeken Bundel voor slechts € 4,49 (€ 1,50 per boek)!'
              : 'Choose from 198 exclusive theme coloring books. Get 1 book for €1.99 or pick the 3-Book Bundle for only €4.49 (€1.50/book)!'}
          </p>

          <Link
            href={`/${lang}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.9rem 2.25rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF3B30 100%)',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
            }}
          >
            <span>📚</span>
            <span>{isNl ? 'Bekijk Alle 198 Kleurboeken (€ 1,99)' : 'Browse All 198 Coloring Books (€1.99)'}</span>
          </Link>
        </div>

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
