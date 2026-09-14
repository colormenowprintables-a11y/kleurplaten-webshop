import Link from'next/link';
import styles from'./Footer.module.css';

export default function Footer({ lang }: { lang: string }) {
  const isEn = lang ==='en';

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href={`/${lang}`} className={styles.logo}>
              <div className={styles.logoBadge}>🎨</div>
              <span className={styles.logoText}>Color<span className={styles.logoAccent}>MeNow</span><span style={{ fontSize: '0.85rem', opacity: 0.65, fontWeight: 700, marginLeft: '2px' }}>.shop</span></span>
            </Link>
            <p className={styles.brandDesc}>
              {isEn 
                ?'Your premier destination for high-quality, printable coloring books and pages. Spark creativity today!':'Jouw bestemming voor printbare kleurboeken en kleurplaten van topkwaliteit. Stimuleer creativiteit vandaag!'}
            </p>
            <div className={styles.langPill}>
              {isEn ? '🌍 Available in 4 Languages: EN, NL, DE, FR' : '🌍 Beschikbaar in 4 talen: NL, EN, DE, FR'}
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ?'Popular Hubs':'Populaire Categorieën'}</span>
              <Link href={`/${lang}/special-deals-promo-packs`} className={styles.link}>Gothic Kawaii Carnival</Link>
              <Link href={`/${lang}/anime-manga`} className={styles.link}>Cozy Cottages & Cabins</Link>
              <Link href={`/${lang}/gaming-virtual-worlds`} className={styles.link}>{isEn ?'Cute Animals':'Schattige Dieren'}</Link>
              <Link href={`/${lang}/superheroes-comic-universes`} className={styles.link}>{isEn ?'Kawaii Sweets':'Kawaii Sweets'}</Link>
              <Link href={`/${lang}/kids-tv-shows`} className={styles.link}>{isEn ?'Monster Trucks':'Monster Trucks'}</Link>
              <Link href={`/${lang}/animals-wildlife`} className={styles.link}>{isEn ?'Relaxing Mandalas':'Ontspannende Mandala’s'}</Link>
              <Link href={`/${lang}/art-aesthetic`} className={styles.link}>{isEn ?'Art Nouveau Floral':'Art Nouveau Bloemen'}</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ?'Quick Links':'Snelle Links'}</span>
              <Link href={`/${lang}`} className={styles.link}>{isEn ?'Home':'Home'}</Link>
              <Link href={`/${lang}/free`} className={styles.link}>{isEn ? '100% Free Samples' : '100% Gratis Kleurplaten'}</Link>
              <Link href={`/${lang}/search`} className={styles.link}>{isEn ?'Search All Pages':'Alle Kleurplaten Zoeken'}</Link>
              <Link href={`/${lang}/favorites`} className={styles.link}>{isEn ?'My Favorites':'Mijn Favorieten'}</Link>
              <Link href={`/${lang}/how-to-draw`} className={styles.link}>{isEn ?'How to Draw (Tutorials)':'Leren Tekenen (Stappenplan)'}</Link>
              <Link href={`/${lang}/school`} className={styles.link}>{isEn ?'School & Worksheets':'School & Werkbladen'}</Link>
              <Link href={`/${lang}/calendars`} className={styles.link}>{isEn ?'2026 Coloring Calendars':'2026 Kleurkalenders'}</Link>
              <Link href={`/${lang}/kdp`} className={styles.link}>{isEn ? 'Amazon Paperbacks' : 'Amazon KDP Boeken'}</Link>
              <Link href={`/${lang}/blog`} className={styles.link}>{isEn ?'Coloring Guides':'Kleurplaten Tips & Blog'}</Link>
              <Link href={`/${lang}/about`} className={styles.link}>{isEn ?'About Us':'Over Ons'}</Link>
              <Link href={`/${lang}/contact`} className={styles.link}>Contact</Link>
              <Link href={`/${lang}/contest`} className={styles.link}>{isEn ?'Monthly Contest':'Maandelijkse Wedstrijd'}</Link>
              <Link href={`/${lang}/request`} className={styles.link}>{isEn ?'Request a Page':'Kleurplaat Aanvragen'}</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ?'Legal & Info':'Legaal & Info'}</span>
              <Link href={`/${lang}/privacy-policy`} className={styles.link}>Privacy Policy</Link>
              <Link href={`/${lang}/terms-of-service`} className={styles.link}>Terms of Service</Link>
              <Link href={`/${lang}/ip-policy`} className={styles.link}>IP & Takedown Policy</Link>
              <Link href={`/${lang}/licensing`} className={styles.link}>{isEn ?'Licensing':'Licentie'}</Link>
            </div>
          </div>
        </div>

        {/* Digital Studio & Craftsmanship Notice */}
        <div style={{
          marginTop:'2rem',
          padding:'1rem 1.25rem',
          background:'rgba(255, 255, 255, 0.05)',
          borderRadius:'var(--radius)',
          fontSize:'0.825rem',
          color:'rgba(253, 246, 233, 0.75)',
          lineHeight:'1.6',
          border:'1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <strong>{isEn ? '✨ Digital Studio & Quality Craftsmanship:' : '✨ Digitale Tekenstudio & Zuivere Lijnkunst:'}</strong>{' '}
          {isEn
            ? 'All coloring pages on ColorMeNow are created using modern digital illustration technology, hand-calibrated for 300 DPI high-contrast line clarity, and provided for your personal coloring enjoyment.'
            : 'Alle kleurplaten op ColorMeNow zijn ontworpen met moderne digitale illustratietechnologie, handmatig geoptimaliseerd voor haarscherpe 300 DPI drukwerkkwaliteit en beschikbaar voor jouw persoonlijke kleurplezier.'}
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} ColorMeNow.shop. {isEn ?'All rights reserved.':'Alle rechten voorbehouden.'}</p>
          <p>{isEn ?'Made for creative minds everywhere.':'Gemaakt voor creatievelingen overal.'}</p>
        </div>
      </div>
    </footer>
  );
}