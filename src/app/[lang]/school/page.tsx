import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import AdCard from '@/components/AdCard';
import NewsletterBox from '@/components/NewsletterBox';
import SchoolWorksheetCard from '@/components/SchoolWorksheetCard';
import { SCHOOL_WORKSHEETS_DATA } from '@/data/schoolData';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === 'nl') {
    return {
      title: '100% Gratis Educatieve Werkbladen (Rekenen, Schrijven, Woorden) | ColorMeNow',
      description: 'Download 100+ gratis printbare educatieve werkbladen voor peuters, kleuters, basisscholen en leerkrachten! Oefen met tellen, sommen maken, letters schrijven A-Z en woordenschat.',
    };
  } else if (lang === 'de') {
    return {
      title: '100% Kostenlose Lernblätter (Mathe, Schreiben, Wörter) | ColorMeNow',
      description: 'Laden Sie 100+ kostenlose ausdruckbare Lernblätter für Kindergarten, Grundschule und Lehrer herunter! Mathe, ABC Schreiben und Wortschatz.',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Fiches Éducatives 100% Gratuites (Maths, Écriture, Mots) | ColorMeNow',
      description: 'Téléchargez 100+ fiches éducatives gratuites à imprimer pour la maternelle, l’école primaire et les enseignants!',
    };
  }
  return {
    title: '100% Free Educational Worksheets (Math, Letters, Spelling) | ColorMeNow',
    description: 'Download 100+ free printable educational coloring worksheets for kids, parents, and teachers! Math counting, letter tracing A-Z, handwriting practice, and bilingual vocabulary.',
  };
}

export default async function SchoolHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const mathWorksheets = SCHOOL_WORKSHEETS_DATA.filter(w => w.subject === 'math');
  const writingWorksheets = SCHOOL_WORKSHEETS_DATA.filter(w => w.subject === 'writing');
  const langWorksheets = SCHOOL_WORKSHEETS_DATA.filter(w => w.subject === 'language');

  const heroBadge = isNl ? '🎁 100% GRATIS EDUCATEVE LEERHUB VOOR SCHOLEN & GEZINNEN' : isDe ? '🎁 100% KOSTENLOSE LERN-HUB FÜR SCHULEN & FAMILIEN' : isFr ? '🎁 HUB ÉDUCATIF 100% GRATUIT POUR ÉCOLES & FAMILLES' : '🎁 100% FREE EDUCATIONAL HUB FOR SCHOOLS & FAMILIES';
  const heroTitle = isNl ? 'Gratis Educatieve Werkbladen (Rekenen, Schrijven & Taal)' : isDe ? 'Kostenlose Lernblätter (Mathe, Schreiben & Alphabet)' : isFr ? 'Fiches Éducatives Gratuites (Maths, Écriture & Langue)' : 'Free Educational Worksheets (Math, Letters & Handwriting)';
  const heroDesc = isNl
    ? '100% gratis printbare educatieve werkbladen voor peuters, kleuters, basisscholen, ouders en leerkrachten! Oefen met tellen, sommen maken, letters schrijven A t/m Z en woordjes leren.'
    : isDe
    ? '100% kostenlose ausdruckbare Lernblätter für Kindergarten, Grundschule, Eltern und Lehrer! Üben Sie Mathe, ABC-Schreiben und Wortschatz.'
    : isFr
    ? '100% gratuit fiches éducatives à imprimer pour la maternelle, l’école primaire, les parents et les enseignants!'
    : '100% free printable educational worksheets for preschool, kindergarten, elementary schools, parents, and teachers! Practice math counting, letter tracing A to Z, and bilingual vocabulary.';

  const categories = [
    {
      id: 'math',
      title: isNl ? '🧮 Rekenen & Cijfers' : isDe ? '🧮 Mathe & Zahlen' : isFr ? '🧮 Maths & Chiffres' : '🧮 Math & Numbers',
      desc: isNl ? 'Cijfers 1-10, optellen, aftrekken, vormen, klokkijken en breuken' : isDe ? 'Zahlen 1-10, Addition, Subtraktion, Formen, Uhrzeit und Brüche' : isFr ? 'Chiffres 1-10, addition, soustraction, formes, heure et fractions' : 'Numbers 1-10, addition, subtraction, shapes, telling time, and fractions',
      items: mathWorksheets,
      badge: isNl ? '35 Gratis Rekenbladen' : isDe ? '35 Kostenlose Matheblätter' : isFr ? '35 Fiches de Maths Gratuites' : '35 Free Math Sheets'
    },
    {
      id: 'writing',
      title: isNl ? '🔤 Letters Schrijven & Alfabet A-Z' : isDe ? '🔤 Alphabet & Schreiben A-Z' : isFr ? '🔤 Écriture & Alphabet A-Z' : '🔤 Handwriting & Alphabet A-Z',
      desc: isNl ? 'Alfabet A t/m Z overtrekken, schrijfregels, klinkers en motoriek' : isDe ? 'Alphabet A bis Z nachspuren, Schreiblinien, Vokale und Feinmotorik' : isFr ? 'Tracer l’alphabet A à Z, lignes d’écriture, voyelles et motricité' : 'Alphabet A to Z letter tracing, stroke guides, handwriting lines, and phonics',
      items: writingWorksheets,
      badge: isNl ? '35 Gratis Schrijfbladen' : isDe ? '35 Kostenlose Schreibblätter' : isFr ? '35 Fiches d’Écriture Gratuites' : '35 Free Writing Sheets'
    },
    {
      id: 'language',
      title: isNl ? '📖 Woordenschat & Spellen (Tweetalig)' : isDe ? '📖 Wortschatz & Rechtschreibung' : isFr ? '📖 Vocabulaire & Orthographe' : '📖 Vocabulary & Spelling (Bilingual NL/EN)',
      desc: isNl ? "Kleuren, emoties, seizoenen, rijmwoorden, woordzoekers en diploma's" : isDe ? 'Farben, Gefühle, Jahreszeiten, Reimwörter und Wortsuchrätsel' : isFr ? 'Couleurs, émotions, saisons, mots rimés et mots mêlés' : 'Colors, emotions, body parts, 4 seasons, animals, rhyming words, and word searches',
      items: langWorksheets,
      badge: isNl ? '30 Gratis Taalbladen' : isDe ? '30 Kostenlose Sprachblätter' : isFr ? '30 Fiches de Langue Gratuites' : '30 Free Language Sheets'
    }
  ];

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #FEF3C7 0%, var(--background) 100%)', borderBottomColor: '#FDE68A' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isNl ? 'School & Educatie' : isDe ? 'Schule & Bildung' : isFr ? 'École & Éducation' : 'School & Education' }]}
              lang={lang}
            />
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(217, 119, 6, 0.15)',
            color: '#B45309',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            {heroBadge}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {heroTitle}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {heroDesc}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        {categories.map((cat, catIdx) => (
          <React.Fragment key={cat.id}>
            <section style={{ marginBottom: '4rem' }}>
              <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <div>
                  <span className="badge" style={{ background: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}>
                    {cat.badge}
                  </span>
                  <h2 className="title-h2" style={{ marginTop: '0.5rem' }}>{cat.title}</h2>
                  <p style={{ color: '#64748B', marginTop: '0.25rem', fontSize: '0.95rem' }}>{cat.desc}</p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '1.5rem',
              }}>
                {cat.items.map((sheet, idx) => (
                  <React.Fragment key={sheet.slug}>
                    {idx === 5 && <AdCard key={'ad-school-' + cat.id} />}
                    <SchoolWorksheetCard sheet={sheet} isEn={isEn} />
                  </React.Fragment>
                ))}
              </div>
            </section>

            {catIdx < categories.length - 1 && (
              <div style={{ margin: '3rem 0' }}>
                <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
              </div>
            )}
          </React.Fragment>
        ))}

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
