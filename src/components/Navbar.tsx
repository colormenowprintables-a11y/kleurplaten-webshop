'use client';

import Link from'next/link';
import { usePathname } from'next/navigation';
import { useState, useRef, useEffect } from'react';
import HeaderSearchBar from'./HeaderSearchBar';
import BookletDrawer from'./BookletDrawer';
import { useColoringBook } from'@/context/ColoringBookContext';
import { setGoogleTranslateLang, getActiveTranslateLang } from './GoogleTranslator';
import styles from'./Navbar.module.css';

interface NavItem {
  label: string;
  icon?: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<string>(lang);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const { totalSelected } = useColoringBook();

  const isEn = lang === 'en';
  const isNl = lang === 'nl';
  const isHomepage = pathname === `/${lang}` || pathname === `/${lang}/` || pathname === '/' || !pathname;

  useEffect(() => {
    const currentGoogle = getActiveTranslateLang();
    if (currentGoogle) {
      setActiveLang(currentGoogle);
    } else {
      setActiveLang(lang);
    }
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLangLink = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/').filter(Boolean);
    if (['en', 'nl', 'de', 'fr'].includes(segments[0])) {
      segments[0] = targetLang;
    } else {
      segments.unshift(targetLang);
    }
    return `/${segments.join('/')}`;
  };

  const navItems: NavItem[] = [
    {
      label: isEn ?'Categories':'Categorieën',
      children: [
        { label:'Monster Trucks Collection', href:`/${lang}/special-deals-promo-packs`},
        { label:'Whimsical Animals', href:`/${lang}/cute-animals-fantasy`},
        { label:'Space Adventures', href:`/${lang}/kids-adventures`},
        { label:'Adorable Houses', href:`/${lang}/cozy-life-cottagecore`},
        { label:'Home Sweet Home', href:`/${lang}/cozy-life-cottagecore`},
        { label:'Tiny World', href:`/${lang}/botanical-floral-art`},
        { label:'Skull Realms', href:`/${lang}/gothic-spooky-cute`},
        { label:'Tiny Food Friends', href:`/${lang}/special-deals-promo-packs`},
        { label:'Cuddly Cottage Collection', href:`/${lang}/cozy-life-cottagecore`},
        { label:'Inked Realms', href:`/${lang}/mindful-mandalas-patterns`},
        { label:'Adorable Fantasy Creatures', href:`/${lang}/cute-animals-fantasy`},
        { label:'Food & Snacks', href:`/${lang}/special-deals-promo-packs`},
      ],
    },
    {
      label: isEn ?'Popular':'Populair',
      children: [
        { label:'Monster Trucks', href:`/${lang}/special-deals-promo-packs`},
        { label:'Whimsical Animals', href:`/${lang}/cute-animals-fantasy`},
        { label:'Space Adventures', href:`/${lang}/kids-adventures`},
        { label:'Cuddly Cottages', href:`/${lang}/cozy-life-cottagecore`},
        { label:'Tiny Food Friends', href:`/${lang}/special-deals-promo-packs`},
        { label:'Skull & Gothic Realms', href:`/${lang}/gothic-spooky-cute`},
        { label:'Mindful Mandalas', href:`/${lang}/mindful-mandalas-patterns`},
        { label:'Botanical Art', href:`/${lang}/botanical-floral-art`},
      ],
    },
    { label: isEn ?'Search':'Zoeken', icon: '🔍', href:`/${lang}/search`},
    { label: isEn ?'Favorites':'Favorieten', icon: '❤️', href:`/${lang}/favorites`},
    { label: isEn ?'How to Draw':'Leren Tekenen', icon: '✏️', href:`/${lang}/how-to-draw`},
    { label: isEn ?'School & Math':'School & Rekenen', icon: '🎓', href:`/${lang}/school`},
    { label: isEn ?'Calendars':'Kalenders', icon: '📅', href:`/${lang}/calendars`},
    { label: isEn ?'Blog & Tips':'Tips & Blog', icon: '💡', href:`/${lang}/blog`},
    {
      label: isEn ?'About':'Over',
      children: [
        { label: isEn ?'About Us':'Over Ons', href:`/${lang}/about`},
        { label:'Contact', href:`/${lang}/contact`},
        { label: isEn ?'Contest':'Wedstrijd', href:`/${lang}/contest`},
        { label: isEn ?'Request a Page':'Pagina Aanvragen', href:`/${lang}/request`},
        { label: isEn ?'Licensing':'Licentie', href:`/${lang}/licensing`},
        { label: isEn ?'Privacy & Terms':'Privacy & Voorwaarden', href:`/${lang}/privacy-policy`},
      ],
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key ==='Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarInner} ref={navRef}>
        <div className={styles.logoSection}>
          <Link href={`/${lang}`} className={styles.logo} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/colormenow-logo.png" alt="ColorMeNow Logo" style={{ height: '60px', maxHeight: '70px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))' }} />
          </Link>

          
        </div>

        {/* Desktop Navigation Links */}
        <nav className={styles.navMenu} aria-label="Main Navigation">
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openDropdown === item.label;

            if (hasChildren) {
              return (
                <div key={item.label} className={styles.dropdownWrapper}>
                  <button
                    type="button"className={`${styles.navLink} ${styles.dropdownTrigger} ${isOpen ? styles.active :''}`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <span className={styles.arrow} aria-hidden="true">▾</span>
                  </button>
                  {isOpen && (
                    <div className={styles.dropdownMenu}>
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.dropdownItem}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href ||`/${lang}`}
                className={styles.navLink}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Language Switcher, Bundle Basket & Mobile Controls */}
        <div className={styles.headerRight}>
          {/* Quick Mobile Search Button */}
          <Link
            href={`/${lang}/search`}
            className={styles.mobileSearchBtn}
            aria-label={isEn ? 'Search coloring pages' : 'Zoek kleurplaten'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>

          {/* Bundle Basket Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label={isEn ? 'Open coloring bundle' : 'Open kleurboek bundel'}
            className={`${styles.bundleBtn} ${totalSelected > 0 ? styles.bundleBtnActive : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
              <path d="M6 6h10"/>
              <path d="M6 10h10"/>
            </svg>
            <span className={styles.bundleBtnText}>{isEn ? '📚 Book Maker' : '📚 Kleurboek Maker'}</span>
            {totalSelected > 0 && (
              <span className={styles.bundleBadge}>
                {totalSelected}
              </span>
            )}
          </button>

          <div className={styles.langSwitcher}>
            <Link
              href={getLangLink('en')}
              onClick={() => {
                setGoogleTranslateLang('en');
                setActiveLang('en');
              }}
              className={`${styles.langBtn} ${activeLang === 'en' ? styles.langActive : ''}`}
              aria-label="Switch to English"
            >
              EN
            </Link>
            <span className={styles.langDivider}>/</span>
            <Link
              href={getLangLink('nl')}
              onClick={() => {
                setGoogleTranslateLang('nl');
                setActiveLang('nl');
              }}
              className={`${styles.langBtn} ${activeLang === 'nl' ? styles.langActive : ''}`}
              aria-label="Schakel naar Nederlands"
            >
              NL
            </Link>
            <span className={styles.langDivider}>/</span>
            <Link
              href={getLangLink('de')}
              onClick={() => {
                setGoogleTranslateLang('de');
                setActiveLang('de');
              }}
              className={`${styles.langBtn} ${activeLang === 'de' || lang === 'de' ? styles.langActive : ''}`}
              aria-label="Auf Deutsch ansehen"
              title="Auf Deutsch ansehen"
            >
              DE
            </Link>
            <span className={styles.langDivider}>/</span>
            <Link
              href={getLangLink('fr')}
              onClick={() => {
                setGoogleTranslateLang('fr');
                setActiveLang('fr');
              }}
              className={`${styles.langBtn} ${activeLang === 'fr' || lang === 'fr' ? styles.langActive : ''}`}
              aria-label="Voir en français"
              title="Voir en français"
            >
              FR
            </Link>
          </div>

          <button
            type="button"
            className={styles.hamburgerBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </div>

      {/* Slide-over Bundle Basket Drawer */}
      <BookletDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lang={lang}
      />

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileSearchWrapper}>
            <HeaderSearchBar lang={lang} />
          </div>

          {/* Quick Action: Kleurboek Maker */}
          <div style={{ padding: '0.5rem 1rem 0.75rem' }}>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setDrawerOpen(true);
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                fontSize: '0.92rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
              }}
            >
              <span>📚</span>
              <span>{isEn ? 'Open Coloring Book Maker' : 'Kleurboek Maker Openen'}</span>
              {totalSelected > 0 && (
                <span style={{ background: '#FF4B72', color: '#FFF', borderRadius: '9999px', padding: '0.1rem 0.5rem', fontSize: '0.75rem' }}>
                  {totalSelected}
                </span>
              )}
            </button>
          </div>

          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <div key={item.label} className={styles.mobileGroup}>
                {item.children ? (
                  <>
                    <div className={styles.mobileGroupTitle}>{item.label}</div>
                    <div className={styles.mobileSubList}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href ||`/${lang}`}
                    className={styles.mobileMainLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.icon && <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>}
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}