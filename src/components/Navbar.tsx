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
        { label:'Monster Trucks Collection', href:`/${lang}/kids-adventures/monster-trucks`},
        { label:'Whimsical Animals', href:`/${lang}/cute-animals-fantasy/cute-animals`},
        { label:'Space Adventures', href:`/${lang}/kids-adventures`},
        { label:'Adorable Houses', href:`/${lang}/cozy-life-cottagecore/cozy-cottages`},
        { label:'Home Sweet Home', href:`/${lang}/cozy-life-cottagecore/cozy-cottages`},
        { label:'Tiny World', href:`/${lang}/botanical-floral-art/botanical-gardens`},
        { label:'Skull Realms', href:`/${lang}/gothic-spooky-cute/gothic-skulls`},
        { label:'Tiny Food Friends', href:`/${lang}/cozy-life-cottagecore`},
        { label:'Cuddly Cottage Collection', href:`/${lang}/cozy-life-cottagecore/cozy-cottages`},
        { label:'Inked Realms', href:`/${lang}/mindful-mandalas-patterns/mandalas`},
        { label:'Adorable Fantasy Creatures', href:`/${lang}/cute-animals-fantasy/fantasy-creatures`},
        { label:'Food & Snacks', href:`/${lang}/cozy-life-cottagecore`},
      ],
    },
    {
      label: isEn ?'Popular':'Populair',
      children: [
        { label:'Monster Trucks', href:`/${lang}/kids-adventures/monster-trucks`},
        { label:'Whimsical Animals', href:`/${lang}/cute-animals-fantasy/cute-animals`},
        { label:'Space Adventures', href:`/${lang}/kids-adventures`},
        { label:'Cuddly Cottages', href:`/${lang}/cozy-life-cottagecore/cozy-cottages`},
        { label:'Tiny Food Friends', href:`/${lang}/cozy-life-cottagecore`},
        { label:'Skull & Gothic Realms', href:`/${lang}/gothic-spooky-cute/gothic-skulls`},
        { label:'Mindful Mandalas', href:`/${lang}/mindful-mandalas-patterns/mandalas`},
        { label:'Botanical Art', href:`/${lang}/botanical-floral-art/botanical-gardens`},
      ],
    },
    { label: isEn ? 'Search' : 'Zoeken', icon: '🔍', href: `/${lang}/search` },
    { label: isEn ? 'Freebies' : 'Freebies', icon: '🎁', href: `/${lang}/freebies` },
    { label: isEn ? 'Recommended Tools' : 'Aanbevolen Spullen', icon: '🛒', href: `/${lang}/recommendations` },
    { label: isEn ? 'Free Samples' : 'Gratis Kleurplaten', icon: '🖼️', href: `/${lang}/free` },
    { label: isEn ? 'School & Math' : 'School & Rekenen', icon: '🎓', href: `/${lang}/school` },
    { label: isEn ? 'Calendars' : 'Kalenders', icon: '📅', href: `/${lang}/calendars` },
    { label: isEn ? 'Amazon Paperbacks' : 'Amazon Boeken', icon: '📦', href: `/${lang}/kdp` },
    { label: isEn ? 'How to Draw' : 'Leren Tekenen', icon: '✏️', href: `/${lang}/how-to-draw` },
    { label: isEn ? 'Blog & Tips' : 'Tips & Blog', icon: '💡', href: `/${lang}/blog` },
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
          <Link href={`/${lang}`} className={styles.logo}>
            <div className={styles.logoBadge}>🎨</div>
            <span className={styles.logoText}>Color<span className={styles.logoAccent}>MeNow</span><span style={{ fontSize: '0.85rem', opacity: 0.65, fontWeight: 700, marginLeft: '2px' }}>.shop</span></span>
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
            aria-label={isEn ? 'Open print basket' : 'Open printmandje'}
            className={`${styles.bundleBtn} ${totalSelected > 0 ? styles.bundleBtnActive : ''}`}
          >
            <span className={styles.basketIconEmoji} aria-hidden="true">🧺</span>
            <span className={styles.bundleBtnText}>{isEn ? 'Print Basket' : 'Printmandje'}</span>
            <span className={`${styles.bundleBadge} ${totalSelected > 0 ? styles.bundleBadgeActive : ''}`}>
              {totalSelected}
            </span>
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
              <span>🧺</span>
              <span>{isEn ? 'Open Print Basket' : 'Printmandje Openen'}</span>
              <span style={{ background: '#FF3B30', color: '#FFF', borderRadius: '9999px', padding: '0.1rem 0.5rem', fontSize: '0.75rem', fontWeight: 900 }}>
                {totalSelected}
              </span>
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