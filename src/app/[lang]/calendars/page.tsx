import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import PrintableCalendarGrid from '@/components/PrintableCalendarGrid';
import { getCalendarYear } from '@/data/calendarData';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === 'nl') {
    return {
      title: 'Printbare 2026 & 2027 Kleurkalenders (10 Thema Uitgaven, 12 Maanden PDF) | ColorMeNow',
      description: 'Download en print onze 10 complete 12-maanden jaarkalenders voor 2026 en 2027! Met schattige dieren, dinosaurussen, ruimte, mandala’s, sprookjes en handige maandvakken.',
    };
  } else if (lang === 'de') {
    return {
      title: 'Ausdruckbare 2026 & 2027 Mal-Kalender (10 Themen-Editionen, 12 Monate PDF) | ColorMeNow',
      description: 'Laden Sie unsere 10 vollständigen 12-Monats-Mal-Kalender für 2026 und 2027 herunter und drucken Sie sie aus!',
    };
  } else if (lang === 'fr') {
    return {
      title: 'Calendriers de Coloriage Imprimables 2026 & 2027 (10 Éditions Thématiques, 12 Mois PDF) | ColorMeNow',
      description: 'Téléchargez et imprimez nos 10 calendriers de coloriage complets de 12 mois pour 2026 et 2027!',
    };
  }
  return {
    title: 'Printable 2026 & 2027 Coloring Calendars (10 Theme Editions, 12-Month PDF) | ColorMeNow',
    description: 'Download and print our 10 complete 12-month printable coloring calendars for 2026 and 2027! Includes cute animals, dinosaurs, space, mandalas, fairytales and monthly planning grids.',
  };
}

export default async function CalendarsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';
  const calendarData = getCalendarYear(2026);

  const heroTitle = isNl ? 'Printbare Kleurkalenders & Planners' : isDe ? 'Ausdruckbare Mal-Kalender & Planer' : isFr ? 'Calendriers de Coloriage Imprimables' : 'Printable Coloring Calendars & Planners';
  const heroBadge = isNl ? '10 Complete Thema Uitgaven (2026 & 2027)' : isDe ? '10 Vollständige Themen-Editionen (2026 & 2027)' : isFr ? '10 Éditions Thématiques Complètes (2026 & 2027)' : '10 Full Theme Editions (2026 & 2027)';
  const heroDesc = isNl
    ? 'Blijf het hele jaar door georganiseerd met onze 10 complete 12-maanden kleurkalenders! Kies hieronder je favoriete thema en print het hele jaar in 1 klik uit.'
    : isDe
    ? 'Bleiben Sie das ganze Jahr über organisiert mit unseren 10 vollständigen 12-Monats-Mal-Kalendern!'
    : isFr
    ? 'Restez organisé toute l’année avec nos 10 calendriers de coloriage complets de 12 mois!'
    : 'Stay organized all year round with our 10 full 12-month printable coloring calendars! Choose your favorite theme below and print the full year in 1 click.';

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #F0FDF4 0%, var(--background) 100%)', borderBottomColor: '#BBF7D0' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isNl ? 'Kleurkalenders' : isDe ? 'Mal-Kalender' : isFr ? 'Calendriers' : 'Coloring Calendars' }]}
              lang={lang}
            />
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(22, 163, 74, 0.15)',
            color: '#16A34A',
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

        <PrintableCalendarGrid
          themes={calendarData.themes}
          months={calendarData.months}
          year={2026}
          isEn={isEn}
          lang={lang}
        />

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </> 
  );
}