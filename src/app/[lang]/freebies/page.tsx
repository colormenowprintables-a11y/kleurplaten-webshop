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
      title: 'Freebies & Gratis Printbare Kleurplaten (A4 PDF) | ColorMeNow',
      description: 'Download 100% gratis printable freebies! Schattige dieren, mandala’s, dinos en sprookjes in haarscherp A4 PDF-formaat voor thuis en in de klas.',
    };
  } else if (lang === 'de') {
    return {
      title: 'Freebies & Kostenlose Malvorlagen (A4 PDF) | ColorMeNow',
      description: 'Laden Sie 100% kostenlose Ausmalbilder und Printable Freebies herunter! Hochauflösende A4 PDF Malvorlagen für Kinder und Erwachsene.',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Freebies & Coloriages Gratuits à Imprimer (PDF A4) | ColorMeNow',
      description: 'Téléchargez des coloriages gratuits et freebies imprimables en PDF A4 haute résolution pour enfants et adultes!',
    };
  }
  return {
    title: 'Printable Freebies & Free Coloring Pages (A4 PDF) | ColorMeNow',
    description: 'Download 100% free printable freebies & coloring sheets! High-resolution A4 PDFs featuring cute animals, mandalas, dinosaurs, and fairytales.',
  };
}

export default async function FreebiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const freebiesList = [
    {
      id: 'freebie-forest-animals',
      title: isNl ? '🎁 Freebie Pack: Schattige Bosdieren' : isDe ? '🎁 Freebie Pack: Süße Waldtiere' : isFr ? '🎁 Pack Freebie: Animaux de la Forêt' : '🎁 Freebie Pack: Cute Forest Animals',
      category: isNl ? 'Dieren' : 'Animals',
      desc: isNl ? '3 Haarscherpe A4 proefkleurplaten met eekhoorns, uiltjes en vosjes.' : '3 High-res A4 sample coloring sheets with squirrels, owls and foxes.',
      img: '/covers/50_cute_animals_cover.png',
      slug: 'cute-animals-fantasy',
    },
    {
      id: 'freebie-mandalas',
      title: isNl ? '🎁 Freebie Pack: Rustgevende Mandala’s' : isDe ? '🎁 Freebie Pack: Entspannende Mandalas' : isFr ? '🎁 Pack Freebie: Mandalas Zen' : '🎁 Freebie Pack: Relaxing Mandalas',
      category: isNl ? 'Mindfulness' : 'Mandalas',
      desc: isNl ? 'Gedetailleerde mandala patronen voor ontspanning en stressverlichting.' : 'Detailed mandala patterns for mindfulness and stress-relief.',
      img: '/covers/50_relaxing_mandalas_cover.png',
      slug: 'mandalas-patterns',
    },
    {
      id: 'freebie-dino-world',
      title: isNl ? '🎁 Freebie Pack: Dinosaurus & Ruimte' : isDe ? '🎁 Freebie Pack: Dinos & Weltraum' : isFr ? '🎁 Pack Freebie: Dinos & Espace' : '🎁 Freebie Pack: Dinos & Space',
      category: isNl ? 'Avontuur' : 'Adventure',
      desc: isNl ? 'T-Rex, Triceratops en stoere ruimteraketten om in te kleuren.' : 'T-Rex, Triceratops, and cool space rockets ready to color.',
      img: '/covers/dino_monster_trucks_cover.png',
      slug: 'kids-adventures',
    },
    {
      id: 'freebie-cozy-cottage',
      title: isNl ? '🎁 Freebie Pack: Gezellig Droomhuisje' : isDe ? '🎁 Freebie Pack: Gemütliches Haus' : isFr ? '🎁 Pack Freebie: Maison Douillette' : '🎁 Freebie Pack: Cozy Cottage Life',
      category: isNl ? 'Gezellig' : 'Cozy Life',
      desc: isNl ? 'Sfeervolle huisjes, bloementuinen en knusse leeshoekjes.' : 'Charming cottages, flower gardens, and cozy reading nooks.',
      img: '/covers/50_cozy_cottages_cover.png',
      slug: 'cozy-life-cottagecore',
    },
  ];

  return (
    <>
      <div
        className="page-hero"
        style={{
          padding: '3.5rem 0 2.5rem',
          background: 'linear-gradient(180deg, #F0FDF4 0%, var(--background) 100%)',
          borderBottomColor: '#BBF7D0',
        }}
      >
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[
                {
                  label: isNl ? 'Printable Freebies' : isDe ? 'Kostenlose Freebies' : isFr ? 'Freebies Gratuits' : 'Printable Freebies',
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
              background: 'rgba(22, 163, 74, 0.12)',
              color: '#16A34A',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
            }}
          >
            🎁 {isNl ? '100% GRATIS PRINTABLE FREEBIES' : isDe ? '100% KOSTENLOSE FREEBIES' : isFr ? '100% FREEBIES GRATUITS' : '100% FREE PRINTABLE FREEBIES'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isNl
              ? 'Exclusieve Printable Freebies & Proefkleurplaten'
              : isDe
              ? 'Exklusive Printable Freebies & Gratis Malvorlagen'
              : isFr
              ? 'Freebies Imprimables Exclusifs & Coloriages Gratuits'
              : 'Exclusive Printable Freebies & Sample Coloring Sheets'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isNl
              ? 'Welkom op de Freebies pagina! Download direct onze meest populaire proef-kleurplaten in A4 PDF-formaat. Perfect voor gezellige middagen of in de klas.'
              : isDe
              ? 'Willkommen auf unserer Freebie-Seite! Laden Sie unsere beliebtesten Ausmalbilder kostenlos als A4 PDF herunter.'
              : isFr
              ? 'Bienvenue sur la page des Freebies! Téléchargez gratuitement nos coloriages PDF A4 les plus populaires.'
              : 'Welcome to our Freebies hub! Download our top printable sample coloring packs in instant A4 PDF format for home and classroom activities.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isNl ? 'Gesponsorde Aanbevelingen' : 'Sponsored Recommendations'} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginTop: '2rem',
          }}
        >
          {freebiesList.map((item) => (
            <div
              key={item.id}
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
              <div style={{ position: 'relative', height: '220px', background: '#F8FAFC' }}>
                <SafeImage
                  src={item.img}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#16A34A',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                  }}
                >
                  {isNl ? '100% GRATIS' : '100% FREE'}
                </span>
              </div>

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <Link
                    href={`/${lang}/${item.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                    }}
                  >
                    <span>📥</span>
                    <span>{isNl ? 'Bekijk & Download Freebie' : 'View & Download Freebie'}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Banner to Complete Books (€1.99) */}
        <div
          style={{
            marginTop: '3.5rem',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(79, 70, 229, 0.3)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            🎨 {isNl ? 'STUNT DEALS — KIES UIT 198+ THEMA-BOEKEN' : 'SPECIAL DEAL — CHOOSE FROM 198+ THEME BOOKS'}
          </span>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '1rem 0 0.5rem' }}>
            {isNl ? 'Wil je Complete Kleurboeken Van 35 tot 68 Pagina’s?' : 'Want Full 35 to 68 Page Theme Coloring Books?'}
          </h2>

          <p style={{ color: '#E0E7FF', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            {isNl
              ? 'Pak 1 compleet thema-kleurboek voor slechts € 1,99 of kies een 3-Boeken Bundel voor € 4,49 (€ 1,50 per boek)!'
              : 'Get 1 full theme coloring book for just €1.99 or pick the 3-Book Theme Bundle for €4.49 (€1.50/book)!'}
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

        {/* Affiliate Recommendations */}
        <AffiliateSection lang={lang} />

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
