import SafeImage from'@/components/SafeImage';
import DailyColoringChallenge from'@/components/DailyColoringChallenge';
import DailyFeaturedCard from'@/components/DailyFeaturedCard';
import SeasonalEventBanner from'@/components/SeasonalEventBanner';
import NewsletterBox from'@/components/NewsletterBox';
import { getThemes, getFeaturedPages, getMainHubs, getSampleImagesForTheme } from'@/lib/api';
import ThemeCard from'@/components/ThemeCard';
import { blogPosts } from'@/data/blogs';
import styles from'./page.module.css';
import Link from'next/link';
import MotionCard from'@/components/MotionCard';
import AdSlot from'@/components/AdSlot';
import AdCard from'@/components/AdCard';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import TrendingCarousel from '@/components/TrendingCarousel';
import HeaderSearchBar from '@/components/HeaderSearchBar';
import CategoryExplorerTabs from '@/components/CategoryExplorerTabs';
import FaqSection from '@/components/FaqSection';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const title = isDe ? 'ColorMeNow | Premium Ausmalbücher & Ausmalbilder' : isFr ? 'ColorMeNow | Livres de Coloriage Premium' : isEn ? 'ColorMeNow | Premium Printable Coloring Books' : 'ColorMeNow | Exclusieve Kleurboeken & Printables';

  const description = isDe ? 'Hochwertige Ausmalbücher und 3D-Cover für Kinder und Erwachsene. Sofortiger digitaler PDF-Download.' : isFr ? 'Découvrez des livres de coloriage et couvertures 3D haute qualité pour enfants et adultes. Téléchargement PDF immédiat.' : isEn ? 'Explore high-quality printable coloring books and 3D covers for kids, toddlers, teens and adults. Instant digital PDF downloads.' : 'Ontdek hoogwaardige printbare kleurboeken en 3D covers voor kinderen, peuters, tieners en volwassenen. Direct digitaal te downloaden als PDF.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'nl': '/nl',
        'de': '/de',
        'fr': '/fr',
        'x-default': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://colormenow.shop/${lang}`,
      siteName: 'ColorMeNow',
      locale: lang === 'nl' ? 'nl_NL' : lang === 'de' ? 'de_DE' : lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.colormenow.shop/images/og-share.jpg',
          secureUrl: 'https://www.colormenow.shop/images/og-share.jpg',
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: 'ColorMeNow — Free Premium Coloring Pages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.colormenow.shop/images/og-share.jpg'],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang !== 'nl';
  const isNl = lang === 'nl';

  const allThemes = getThemes(lang);
  const mainHubs = getMainHubs(lang);
  const featuredPool = getFeaturedPages(lang, 50);
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const dailyPage = featuredPool[dayOfYear % (featuredPool.length || 1)] || featuredPool[0];
  const dailyTheme = allThemes.find(t => t.slug === dailyPage?.parentTheme);

  // Popular character theme slugs
  const characterSlugs = ['monster-trucks','whimsical-animals','space-adventures','adorable-houses','home-sweet-home','tiny-world','skull-realms','tiny-food-friends','cuddly-cottage-collection','inked-realms','adorable-fantasy-creatures','cute-gothic'];

  // Animal & nature slugs
  const animalSlugs = ['dinosaur-adventures','unicorns-pegasus','cute-puppies-dogs','cute-kittens-cats','safari-lions-big-cats','ocean-life-whales','horses-ponies','birds-of-the-world'];

  const popularCharacters = allThemes
    .filter(t => characterSlugs.some(s => t.slug.includes(s)))
    .slice(0, 12);

  const popularAnimals = allThemes
    .filter(t => animalSlugs.some(s => t.slug.includes(s)))
    .slice(0, 4);

  const featuredPages = featuredPool.slice(0, 24);

  const difficultyCards = [
    {
      slug:'kids',
      name: isEn ? 'Easy (Level 1)' : 'Makkelijk (Niveau 1)',
      badge: isEn ? 'Level 1' : 'Niveau 1',
      desc: isEn ? 'Simple shapes & fun designs for toddlers & preschoolers' : 'Eenvoudige vormen & vrolijke designs voor peuters en kleuters',
      className: styles.ageKids,
      href: `/${lang}/kids-adventures/monster-trucks/all-ages`
    },
    {
      slug:'teens',
      name: isEn ? 'Medium (Level 2)' : 'Gemiddeld (Niveau 2)',
      badge: isEn ? 'Level 2' : 'Niveau 2',
      desc: isEn ? 'Creative scenes with rich details & vibrant characters' : 'Creatieve scènes met leuke details & vrolijke dieren',
      className: styles.ageTeens,
      href: `/${lang}/cute-animals-fantasy/cute-animals/all-ages`
    },
    {
      slug:'adults',
      name: isEn ? 'Hard (Level 3)' : 'Moeilijk (Niveau 3)',
      badge: isEn ? 'Level 3' : 'Niveau 3',
      desc: isEn ? 'Intricate floral mandalas & relaxing complex line art' : 'Ingewikkelde bloemenmandalas & ontspannende lijntekeningen',
      className: styles.ageAdults,
      href: `/${lang}/mindful-mandalas-patterns/mandalas/all-ages`
    }
  ];

  const quickShortcuts = [
    { name: 'Monster Trucks Collection', icon: '🚛', href: `/${lang}/special-deals-promo-packs` },
    { name: 'Whimsical Animals', icon: '🦊', href: `/${lang}/cute-animals-fantasy` },
    { name: 'Space Adventures', icon: '🚀', href: `/${lang}/kids-adventures` },
    { name: 'Adorable Houses', icon: '🏡', href: `/${lang}/cozy-life-cottagecore` },
    { name: 'Home Sweet Home', icon: '☕', href: `/${lang}/cozy-life-cottagecore` },
    { name: 'Tiny World', icon: '🔍', href: `/${lang}/botanical-floral-art` },
    { name: 'Skull Realms', icon: '💀', href: `/${lang}/gothic-spooky-cute` },
    { name: 'Tiny Food Friends', icon: '🍕', href: `/${lang}/special-deals-promo-packs` },
    { name: 'Cuddly Cottage Collection', icon: '🐰', href: `/${lang}/cozy-life-cottagecore` },
    { name: 'Inked Realms', icon: '🎨', href: `/${lang}/mindful-mandalas-patterns` },
    { name: 'Adorable Fantasy Creatures', icon: '🦄', href: `/${lang}/cute-animals-fantasy` },
    { name: 'Food & Snacks', icon: '🧁', href: `/${lang}/special-deals-promo-packs` },
    { name: 'Whimsical Creatures', icon: '✨', href: `/${lang}/cute-animals-fantasy` },
    { name: 'Cute Gothic', icon: '🎃', href: `/${lang}/gothic-spooky-cute` },
  ];

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={`ink-blob ${styles.blobTopLeft}`} aria-hidden="true"/>
        <div className={`ink-blob ${styles.blobBottomRight}`} aria-hidden="true"/>
        <div className={styles.blobCenter} aria-hidden="true"/>

        <div className="container" style={{ maxWidth: '1200px' }}>
          {/* 1. Top Hero Intro & Live Search (Above Banner, Light & Welcoming) */}
          <div className={styles.heroHeaderWrapper}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <img
                src="/colormenow-logo.png"
                alt="ColorMeNow Big Logo"
                style={{
                  height: '140px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 20px rgba(255, 107, 74, 0.3))'
                }}
              />
            </div>
            <div className={styles.heroTopBadge}>
              <span aria-hidden="true">✨</span>
              <span>{isEn ? 'PREMIUM PRINTABLE COLORING BOOKS' : 'EXCLUSIEVE DIGITALE KLEURBOEKEN'}</span>
            </div>
            
            <h1 className={styles.heroMainTitle}>
              {isEn ? (
                <>Premium Coloring <span className={styles.heroTitleGradient}>Books & Art</span></>
              ) : (
                <>Exclusieve Kleurboeken <span className={styles.heroTitleGradient}>& 3D Covers</span></>
              )}
            </h1>
            
            <p className={styles.heroMainSubtitle}>
              {isEn ? 'High-quality printable coloring books and 3D covers for toddlers, kids, teens, and adults. Instant digital PDF downloads!' : 'Hoogwaardige printbare kleurboeken en 3D covers voor peuters, kinderen, tieners en volwassenen. Direct digitaal te downloaden als PDF!'}
            </p>

            {/* Central Hero Search Bar */}
            <div className={styles.heroSearchWrapper}>
              <HeaderSearchBar
                lang={lang}
                variant="hero"
                placeholder={isEn ? 'Search 200+ coloring books (e.g. Monster Trucks, Whimsical Animals, Space)...' : 'Zoek uit 200+ kleurboeken (bijv. Monster Trucks, Dinos, Fantasy)...'}
              />
            </div>

            {/* Feature & Trust Highlights */}
            <div className={styles.heroFeaturesBar}>
              <span className={styles.heroFeatureItem}>
                <span aria-hidden="true">⚡</span>
                {isEn ? 'Instant PDF Download' : 'Direct PDF Downloaden'}
              </span>
              <span className={styles.heroFeatureItem}>
                <span aria-hidden="true">📄</span>
                A4 / Letter Ready
              </span>
              <span className={styles.heroFeatureItem}>
                <span aria-hidden="true">🎨</span>
                {isEn ? 'Color Online Tool' : 'Online Inkleuren'}
              </span>
              <span className={styles.heroFeatureItem}>
                <span aria-hidden="true">🛡️</span>
                {isEn ? 'Instant Digital Delivery' : 'Direct Digitaal Geleverd'}
              </span>
            </div>
          </div>

          {/* 2. Full-Width Pure 16:9 3D Vault Banner (Zero text obstruction, centered carousel) */}
          <HeroCarousel
            items={allThemes
              .filter(t => t.image && !t.image.includes('default.jpg'))
              .slice(0, 16)
              .map(t => ({
                src: t.image,
                alt: t.title,
                href: `/${lang}/${t.parentHub}/${t.slug}`,
              }))}
            lang={lang}
          />

          {/* 3. Top Trending Albums & Categories Showcase Shelf (Below Banner, Light & Elegant) */}
          {/* 3. Top Trending Albums & Categories Showcase Shelf (With 3D Art Studio Banner Backdrop) */}
          <div className={styles.trendingShelf}>
            {/* 3D Creative Studio Workbench Artwork Backdrop */}
            <div className={styles.trendingBackdropWrapper} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/trending-banner.jpg"
                alt="3D Creative Craft Studio Workbench"
                className={styles.trendingBackdropImg}
              />
              <div className={styles.trendingBackdropOverlay} />
            </div>

            {/* Interactive Content Layer */}
            <div className={styles.trendingContentLayer}>
              <div className={styles.trendingHeader}>
                <div className={styles.trendingHeaderLeft}>
                  <span className={styles.trendingFireIcon} aria-hidden="true">🔥</span>
                  <div>
                    <h3 className={styles.trendingTitle}>
                      {isEn ? 'Top Trending Albums & Categories' : 'Populaire Albums & Categorieën'}
                    </h3>
                    <span className={styles.trendingSubtitle}>
                      {isEn ? 'Direct access to the most loved coloring sheets' : 'Direct naar de meest gekleurde thema’s'}
                    </span>
                  </div>
                </div>
                <Link href="#categories" className={styles.trendingBadgeBtn}>
                  <span className={styles.trendingBadgeDot} aria-hidden="true" />
                  <span>{isEn ? '130+ Themes' : "130+ Thema's"}</span>
                  <span aria-hidden="true" className={styles.trendingBadgeArrow}>→</span>
                </Link>
              </div>

              <div className={styles.trendingPillsContainer}>
                {quickShortcuts.map((pill) => (
                  <Link
                    key={pill.name}
                    href={pill.href}
                    className={styles.trendingPill}
                  >
                    <span className={styles.pillIcon} aria-hidden="true">{pill.icon}</span>
                    <span>{pill.name}</span>
                  </Link>
                ))}
              </div>

              {/* Action CTAs */}
              <div className={styles.trendingCtas}>
                <Link
                  href="#collections"
                  className="btn-primary"
                  style={{
                    padding: '0.85rem 2.2rem',
                    fontSize: '0.96rem',
                    fontWeight: 800,
                    boxShadow: '0 8px 24px rgba(255, 107, 74, 0.4)',
                  }}
                >
                  {isEn ? '✨ Explore All Collections' : '✨ Alle Collecties Bekijken'}
                </Link>
                <Link
                  href={`/${lang}/how-to-draw`}
                  className="btn-secondary"
                  style={{
                    padding: '0.85rem 2rem',
                    fontSize: '0.96rem',
                    fontWeight: 800,
                    background: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(8px)',
                    borderColor: '#CBD5E1',
                    color: '#0F172A',
                  }}
                >
                  {isEn ? '✏️ Learn How to Draw' : '✏️ Stap-voor-stap Leren Tekenen'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      

      {/* ── World-First Innovation Highlight Banner ── */}
      <section style={{ padding: '0 0 2rem 0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,74,0.1) 0%, rgba(255,246,233,0.8) 100%)',
              border: '1.5px solid rgba(255,107,74,0.3)',
              borderRadius: '24px',
              padding: '1.75rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
              boxShadow: '0 8px 30px rgba(255,107,74,0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', maxWidth: '750px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(255,107,74,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.85rem',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(255,107,74,0.15)',
                }}
              >
                ✏️
              </div>
              <div>
                <span
                  style={{
                    background: 'rgba(255,107,74,0.15)',
                    color: '#FF6B4A',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    display: 'inline-block',
                    marginBottom: '0.35rem',
                  }}
                >
                  {isEn ? 'World-First Innovation' : 'Unieke Wereldprimeur'}
                </span>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                  {isEn ? 'Spot a stray line? Circle it with our digital red pencil!' : 'Zie je een foutje of los lijntje? Omcirkel het met ons digitale potlood!'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                  {isEn
                    ? 'At ColorMeNow, every visitor can help refine our artwork. Click "Circle an issue" under any coloring page to draw right on the template with your finger or mouse!'
                    : 'Bij ColorMeNow kan iedere bezoeker meehelpen aan de strakste tekeningen ter wereld. Klik onder elke kleurplaat op ons potlood en omcirkel het probleem direct op de plaat!'}
                </p>
              </div>
            </div>

            <Link
              href={`/${lang}/special-deals-promo-packs`}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #FF6B4A 0%, #F0501F 100%)',
                padding: '0.8rem 1.6rem',
                fontSize: '0.9rem',
                fontWeight: 800,
                borderRadius: '9999px',
                boxShadow: '0 4px 14px rgba(255,107,74,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              {isEn ? '🎨 Explore Coloring Pages →' : '🎨 Bekijk Kleurplaten →'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 1: Trending Characters & Shows ── */}
      {popularCharacters.length > 0 && (
        <section className="section">
          <div className="container">
            <AdSlot type="banner"text={isEn ?'Sponsored Content':'Gesponsord'} />

            <ScrollReveal className="section-header">
              <div>
                <span className="badge">{isEn ? 'Featured Series' : 'Populaire Boekenseries'}</span>
                <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                  {isEn ? 'Popular Coloring Book Series' : 'Populaire Kleurboekenseries'}
                </h2>
              </div>
              <Link href={`/${lang}/special-deals-promo-packs`} className="btn-secondary">
                {isEn ? 'View All Series →' : 'Bekijk Alle Series →'}
              </Link>
            </ScrollReveal>

            <div className="grid-4">
              {popularCharacters.map((theme, i) => {
                const sampleImages = getSampleImagesForTheme(lang, theme.parentHub, theme.slug, theme.image, 3);
                return (
                  <React.Fragment key={theme.slug}>
                    {i === 5 && <AdCard key="char-ad-card" />}
                    <ScrollReveal delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                      <ThemeCard
                        lang={lang}
                        hubSlug={theme.parentHub}
                        themeSlug={theme.slug}
                        title={theme.title}
                        description={theme.description}
                        images={sampleImages}
                        pageCount={theme.pageCount}
                      />
                    </ScrollReveal>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>
      )}

      

      {/* ── Section 2: Interactive Category Explorer (Tabbed) ── */}
      <section id="categories" className="section-light" style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{allThemes.length} {isEn ?'Albums Available':'Albums Beschikbaar'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?'Explore by Category':'Blader op Categorie'}
              </h2>
            </div>
            <Link href={`/${lang}/search`} className="btn-secondary">
              {isEn ?'Full Search & Filters →':'Uitgebreid Zoeken & Filteren →'}
            </Link>
          </ScrollReveal>

          <CategoryExplorerTabs
            lang={lang}
            hubs={mainHubs}
            themes={allThemes}
          />
        </div>
      </section>

      {/* ── Section 3: Browse by Difficulty ── */}
      <section className="section">
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{isEn ?'Choose Difficulty':'Kies Moeilijkheidsgraad'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?'Browse by Difficulty Level':'Blader op Moeilijkheidsgraad'}
              </h2>
            </div>
          </ScrollReveal>

          <div className={styles.ageGrid}>
            {difficultyCards.map((age, i) => (
              <ScrollReveal key={age.name} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                <Link
                  href={age.href}
                  className={`${styles.ageCard} ${age.className}`}
                >
                  <div className={styles.ageEmoji}>{age.badge}</div>
                  <h3 className={styles.ageName}>{age.name}</h3>
                  <p className={styles.ageDesc}>{age.desc}</p>
                  <div className={styles.ageCta}>{isEn ?'Explore →':'Ontdek →'}</div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Cute Animals & Nature Showcase ── */}
      {popularAnimals.length > 0 && (
        <section className="section-light">
          <div className="container">
            <ScrollReveal className="section-header">
              <div>
                <span className="badge">{isEn ?'Fauna & Nature':'Dierenrijk'}</span>
                <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                  {isEn ?'Animals & Wildlife':'Dieren & Natuur'}
                </h2>
              </div>
              <Link href={`/${lang}/animals-wildlife`} className="btn-secondary">
                {isEn ?'All Animal Pages →':'Alle Dierenplaten →'}
              </Link>
            </ScrollReveal>

            <div className="grid-4">
              {popularAnimals.map((theme, i) => {
                const sampleImages = getSampleImagesForTheme(lang, theme.parentHub, theme.slug, theme.image, 3);
                return (
                  <ScrollReveal key={theme.slug} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                    <ThemeCard
                      lang={lang}
                      hubSlug={theme.parentHub}
                      themeSlug={theme.slug}
                      title={theme.title}
                      description={theme.description}
                      images={sampleImages}
                      pageCount={theme.pageCount}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 5: Recently Added Coloring Pages ── */}
      <section className="section">
        <div className="container">
          <AdSlot type="banner"text={isEn ?'Sponsored Content':'Gesponsord'} />

          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{isEn ?'Fresh Additions':'Nieuwste Kleurplaten'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?'Recently Added Line Art':'Recente Kleurplaten'}
              </h2>
            </div>
          </ScrollReveal>

          {Array.from({ length: Math.ceil(featuredPages.length / 12) }).map((_, chunkIndex) => {
            const chunk = featuredPages.slice(chunkIndex * 12, chunkIndex * 12 + 12);
            const showAdBar = chunkIndex < Math.ceil(featuredPages.length / 12) - 1;

            const gridItems: React.ReactNode[] = [];
            chunk.forEach((page, idx) => {
              if (idx === 5) {
                gridItems.push(<AdCard key={`hp-ad-card-${chunkIndex}`} />);
              }
              gridItems.push(
                <ScrollReveal key={page.slug} delay={(idx % 4) as 0 | 1 | 2 | 3 | 4}>
                  <MotionCard page={page} lang={lang} isEn={isEn} />
                </ScrollReveal>
              );
            });

            return (
              <React.Fragment key={chunkIndex}>
                <div className="grid-4" style={{ marginBottom: showAdBar ? '2.5rem' : 0 }}>
                  {gridItems}
                </div>
                {showAdBar && (
                  <div style={{ margin: '2.5rem 0' }}>
                    <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* ── Section 6: Guides & Articles ── */}
      <section className="section-light">
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{isEn ?'Educational Guides':'Tips & Lesideën'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?'Latest Guides & Parenting Tips':'Laatste Tips voor Ouders & Onderwijs'}
              </h2>
            </div>
            <Link href={`/${lang}/blog`} className="btn-secondary">
              {isEn ?'View All Guides →':'Bekijk Alle Tips →'}
            </Link>
          </ScrollReveal>

          <div className="grid-3">
            {(blogPosts[lang ==='nl'?'nl':'en'] || blogPosts.en).map(post => (
              <ScrollReveal key={post.slug}>
                <Link href={`/${lang}/blog/${post.slug}`} className="card">
                  <div className="card-img-wrapper"style={{ aspectRatio:'16/9', position:'relative'}}>
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="card-img"style={{ width:'100%', height:'100%', objectFit:'cover'}}
                    />
                  </div>
                  <div className="card-body">
                    <span style={{ fontSize:'0.72rem', fontWeight: 800, color:'var(--primary)', textTransform:'uppercase', display:'block', marginBottom:'0.4rem'}}>
                      {post.category}
                    </span>
                    <h3 className="card-title"style={{ fontSize:'1.1rem', lineHeight: 1.4, marginBottom:'0.5rem'}}>
                      {post.title}
                    </h3>
                    <p className="card-desc"style={{ display:'-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Why ColorMeNow ── */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyInner}>
            <ScrollReveal>
              <span className="badge"style={{ background:'rgba(79, 70, 229, 0.08)', color:'var(--color-primary)', borderColor:'rgba(79, 70, 229, 0.2)'}}>
                {isEn ?'Why ColorMeNow?':'Waarom ColorMeNow?'}
              </span>
              <h2 className="title-h2"style={{ marginTop:'0.75rem', marginBottom:'1.25rem'}}>
                {isEn ? 'The Best Premium Printable Coloring Books' : 'De Beste Exclusieve Kleurboeken'}
              </h2>
              <p className={styles.whyLead}>
                {isEn
                  ? 'ColorMeNow is your premier destination for high-quality printable coloring books and 3D covers. Designed for all ages, every collection is formatted in crystal-clear vector line art ready for instant digital download.'
                  : 'ColorMeNow is de plek voor hoogwaardige digitale kleurboeken en 3D covers. Ontworpen voor alle leeftijden en haarscherp geformatteerd om direct digitaal te downloaden en af te drukken.'}
              </p>
              <p className={styles.whyLead} style={{ marginBottom: 0 }}>
                {isEn
                  ? 'Whether you are a parent, a teacher, or an adult unwinding with intricate mandalas — explore 200+ high-definition PDF coloring books ready to print.'
                  : 'Of je nu een ouder bent, een leerkracht, of een liefhebber van ontspannende mandala\'s — ontdek meer dan 200+ hoge resolutie PDF-kleurboeken klaar om af te drukken.'}
              </p>
            </ScrollReveal>

            <div>
              {[
                { number:'01', title: isEn ? 'Instant PDF Book Delivery' : 'Directe Digitale Levering', desc: isEn ? 'High-resolution PDF coloring books & 3D covers delivered instantly.' : 'Hoge resolutie PDF-kleurboeken en 3D covers direct geleverd op je apparaat.'},
                { number:'02', title: isEn ?'Print-Optimized':'Optimaal Af te Drukken', desc: isEn ?'Clean crisp line art formatted for standard A4 and Letter paper.':'Scherpe lijnen geformatteerd voor A4 en Letter papier.'},
                { number:'03', title: isEn ?'Curated by Age':'Gesorteerd op Leeftijd', desc: isEn ?'Tailored difficulty levels for toddlers, kids, teens & adults.':'Aangepaste moeilijkheidsgraden voor peuters, kinderen & volwassenen.'},
                { number:'04', title: isEn ?'Interactive Pencil QA (World First!)':'Interactief Potlood (Wereldprimeur!)', desc: isEn ?'Spot an error? Circle it with our digital red pencil right on the drawing and we refine it!':'Zie je een foutje? Omcirkel het met ons digitale potlood direct op de tekening en we herstellen het!'},
                { number:'05', title: isEn ?'Multilingual (EN, NL, DE, FR)':'4 Talen Beschikbaar', desc: isEn ?'Native localized experience in English, Dutch, German and French.':'Volledig beschikbaar in het Nederlands, Engels, Duits en Frans.'},
              ].map((f, i) => (
                <ScrollReveal key={f.title} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>{f.number}</div>
                    <div>
                      <h3 className={styles.featureTitle}>{f.title}</h3>
                      <p className={styles.featureDesc}>{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8: FAQ & SEO Knowledge Base ── */}
      <FaqSection isEn={isEn} />

      <div className="container"style={{ padding:'2rem 0'}}>
        <AdSlot type="banner"text={isEn ?'Sponsored Content':'Gesponsord'} />
      </div>
    </>
  );
}