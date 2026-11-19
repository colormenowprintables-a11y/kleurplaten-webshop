import React from 'react';
import Link from 'next/link';

export default function SeasonalEventBanner({ isEn, lang }: { isEn: boolean; lang: string }) {
  const month = new Date().getMonth(); // 0 = Jan, 8 = Sep, 9 = Oct, 10 = Nov, 11 = Dec

  let seasonalData = {
    emoji: '🍂',
    tag: isEn ? 'Autumn & Back to School' : 'Herfst & Terug naar School',
    title: isEn ? 'Cozy Autumn & Classroom Coloring Pages' : 'Gezellige Herfst- & Schoolkleurplaten',
    desc: isEn ? 'Explore leaves, pumpkins, and creative school themes!' : 'Ontdek vallende blaadjes, pompoenen en vrolijke schoolplaten!',
    href: `/${lang}/cozy-life-cottagecore/cozy-cottages`,
    bg: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)',
  };

  if (month === 10 || month === 11 || month === 0) {
    // November/December/January - Winter, Christmas & Holiday Magic
    seasonalData = {
      emoji: '🎄',
      tag: isEn ? '🎄 Holiday Season & Christmas Magic' : '🎄 Sinterklaas, Kerst & Feestdagen Special',
      title: isEn ? 'Magical Christmas, Gingerbread Houses & Cozy Winter Coloring' : 'Magische Kerst, Peperkoekhuisjes & Gezellige Winter Kleurboeken',
      desc: isEn ? 'Festive gingerbread cottages, cute snowy animals, sweet holiday treats & winter wonders in instant print-ready A4 PDF!' : 'Warme peperkoekhuisjes, schattige winterdieren, zoete feestdagen & gezelligheid in printklare A4 PDF!',
      href: `/${lang}/cozy-life-cottagecore/cozy-cottages`,
      bg: 'linear-gradient(135deg, #064E3B 0%, #065F46 30%, #991B1B 75%, #7F1D1D 100%)',
    };
  } else if (month === 9) {
    // October - Halloween
    seasonalData = {
      emoji: '🎃',
      tag: isEn ? '🎃 Halloween Spooky Night Special' : '🎃 Halloween & Spookjes Special',
      title: isEn ? 'Gothic Cuties, Spooky Skulls & Halloween Magic' : 'Gothic Cuties, Griezelige Schedels & Spookjes',
      desc: isEn ? 'Witches, dark carnivals, cute pumpkins & haunted skull realms in instant A4 PDF!' : 'Heksen, donkere kermissen, pompoenen en magische schedels in A4 PDF!',
      href: `/${lang}/gothic-spooky-cute/gothic-skulls`,
      bg: 'linear-gradient(135deg, #1A072E 0%, #4C1D95 50%, #EA580C 100%)',
    };
  } else if (month >= 2 && month <= 4) {
    // Spring & Easter
    seasonalData = {
      emoji: '🐰',
      tag: isEn ? 'Easter & Spring Bloom' : 'Pasen & Lente',
      title: isEn ? 'Easter Bunnies & Colorful Spring Blooms' : 'Vrolijke Paashaas & Lente Kleurplaten',
      desc: isEn ? 'Cute bunnies, eggs, and blooming gardens!' : 'Lieve paashazen, eieren versieren en bloeiende bloemen!',
      href: `/${lang}/cute-animals-fantasy/cute-animals`,
      bg: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
    };
  }

  const holidayPills = [
    { name: isEn ? '🎄 Gingerbread Houses' : '🎄 Peperkoekhuisjes', href: `/${lang}/cozy-life-cottagecore/cozy-cottages/all-ages/gingerbread-house-coloring-pages` },
    { name: isEn ? '❄️ Cute Snowy Animals' : '❄️ Schattige Winterdieren', href: `/${lang}/cute-animals-fantasy/cute-animals/all-ages/cute-snowy-animals-coloring-pages` },
    { name: isEn ? '💥 €1.00 Holiday Mega Pack' : '💥 €1.00 Feestdagen Mega Pack', href: `/${lang}/special-deals-promo-packs/promo-packs/all-ages/100-mega-pack` },
    { name: isEn ? '🏡 Cozy Winter Cottages' : '🏡 Warme Winter Huisjes', href: `/${lang}/cozy-life-cottagecore/cozy-cottages` },
    { name: isEn ? '🍬 50 Sweets & Treats (€0.50)' : '🍬 50 Zoete Lekkernijen (€0.50)', href: `/${lang}/special-deals-promo-packs/promo-packs/all-ages/50-kawaii-sweets` },
    { name: isEn ? '🚛 Arctic Snow Trucks' : '🚛 Arctic Sneeuwtrucks', href: `/${lang}/kids-adventures/monster-trucks/all-ages/monster-trucks-arctic-snow-rigs-coloring-pages` },
    { name: isEn ? '🎁 Free Sample Packs' : '🎁 Gratis Kleurplaten', href: `/${lang}/freebies` },
  ];

  return (
    <div
      style={{
        background: seasonalData.bg,
        borderRadius: 'var(--radius-xl, 24px)',
        padding: '2rem 2.25rem',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
        marginTop: '2.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ fontSize: '2.8rem' }}>{seasonalData.emoji}</div>
          <div>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '9999px',
                padding: '0.25rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {seasonalData.tag}
            </span>
            <h3 style={{ margin: '0.45rem 0 0.25rem', fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF' }}>
              {seasonalData.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.92)' }}>
              {seasonalData.desc}
            </p>
          </div>
        </div>

        <Link
          href={seasonalData.href}
          style={{
            padding: '0.8rem 1.6rem',
            borderRadius: '9999px',
            background: '#FFFFFF',
            color: '#0F172A',
            fontWeight: 800,
            fontSize: '0.92rem',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s ease',
          }}
        >
          {isEn ? 'Explore Collection →' : 'Bekijk Collectie →'}
        </Link>
      </div>

      {/* Quick Holiday Pills */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          flexWrap: 'wrap',
          paddingTop: '0.6rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', alignSelf: 'center' }}>
          {isEn ? 'Quick Jump:' : 'Direct naar:'}
        </span>
        {holidayPills.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
          >
            {p.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
