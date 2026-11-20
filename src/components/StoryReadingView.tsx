'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Story, StoryCategory, STORY_CATEGORIES } from '@/data/stories';

interface StoryReadingViewProps {
  story: Story;
  relatedStories: Story[];
  lang: string;
}

export default function StoryReadingView({ story, relatedStories, lang }: StoryReadingViewProps) {
  const isNl = lang === 'nl';
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleFacebookShare = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank', 'width=600,height=450,noopener,noreferrer');
    }
  };

  // Vertaal categorie naam
  const catObj = STORY_CATEGORIES.find(c => c.id === story.category);
  const catName = catObj ? (isNl ? catObj.nl : catObj.en) : story.category;

  // Paragrafen splitsen op dubbele newline
  const paragraphs = story.content
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return (
    <article style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', color: '#1C1917' }}>
      {/* Scroll voortgangsbalk bovenaan het scherm */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '4px',
          width: `${scrollProgress}%`,
          backgroundColor: '#E11D48',
          zIndex: 9999,
          transition: 'width 0.1s ease-out'
        }}
      />

      {/* Header navigatiebalk voor lezers */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E7E5E4',
        zIndex: 50,
        padding: '0.75rem 1rem'
      }}>
        <div style={{
          maxWidth: '780px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <Link
            href={`/${lang}/stories`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#57534E',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            ← {isNl ? 'Alle Verhalen' : 'All Stories'}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Lettergrootte toggle voor extra leesgemak */}
            <button
              onClick={() => setFontSize(f => f === 'normal' ? 'large' : 'normal')}
              title={isNl ? 'Lettergrootte aanpassen' : 'Toggle font size'}
              style={{
                background: 'transparent',
                border: '1px solid #D6D3D1',
                borderRadius: '6px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#44403C',
                cursor: 'pointer'
              }}
            >
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </button>

            {/* Delen op Facebook */}
            <button
              onClick={handleFacebookShare}
              title={isNl ? 'Deel op Facebook' : 'Share on Facebook'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#1877F2',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '0.4rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{isNl ? 'Delen' : 'Share'}</span>
            </button>

            {/* Link kopiëren */}
            <button
              onClick={handleCopy}
              style={{
                backgroundColor: copied ? '#059669' : '#F5F5F4',
                color: copied ? '#FFFFFF' : '#44403C',
                border: '1px solid #D6D3D1',
                borderRadius: '6px',
                padding: '0.4rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {copied ? (isNl ? '✓ Gekopieerd' : '✓ Copied') : (isNl ? '🔗 Link' : '🔗 Copy')}
            </button>
          </div>
        </div>
      </div>

      {/* Hoofdcontent van het verhaal */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2.5rem 1.25rem 4rem' }}>
        {/* Categorie & Datum */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: '#FCE7F3',
            color: '#BE185D',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            {catObj?.icon || '📖'} {catName}
          </span>
          <span style={{ color: '#78716C', fontSize: '0.85rem' }}>{story.date}</span>
        </div>

        {/* Verhaaltitel */}
        <h1 style={{
          fontSize: 'clamp(1.85rem, 5vw, 2.6rem)',
          lineHeight: 1.25,
          fontWeight: 800,
          color: '#1C1917',
          marginBottom: '1.25rem',
          letterSpacing: '-0.02em'
        }}>
          {story.title}
        </h1>

        {/* Korte introductie / Teaser */}
        {story.excerpt && (
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#57534E',
            fontStyle: 'italic',
            marginBottom: '2.5rem',
            borderLeft: '4px solid #E11D48',
            paddingLeft: '1rem'
          }}>
            {story.excerpt}
          </p>
        )}

        {/* Het volledige verhaal - Rustig, groot lettertype, ruime regelafstand */}
        <div style={{
          fontSize: fontSize === 'normal' ? '1.125rem' : '1.275rem', // 18px of ~20px
          lineHeight: 1.85,
          color: '#292524',
          fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif'
        }}>
          {paragraphs.map((p, idx) => (
            <p key={idx} style={{ marginBottom: '1.65rem' }}>
              {p}
            </p>
          ))}
        </div>

        {/* Deelknop onderaan het verhaal */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E7E5E4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#1C1917' }}>
              {isNl ? 'Vond je dit een mooi verhaal?' : 'Enjoyed this story?'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#78716C', margin: '0.25rem 0 0' }}>
              {isNl ? 'Deel het gerust met vrienden of familie op Facebook.' : 'Feel free to share it with friends on Facebook.'}
            </p>
          </div>
          <button
            onClick={handleFacebookShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#1877F2',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.65rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>{isNl ? 'Deel op Facebook' : 'Share on Facebook'}</span>
          </button>
        </div>

        {/* ⭐ DE BRUG NAAR DE WEBSHOP (De Conversie Magneet) ⭐ */}
        <div style={{
          marginTop: '2.5rem',
          padding: '2rem',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 40%, #FEF3C7 100%)',
          border: '2px solid #FECDD3',
          boxShadow: '0 8px 30px rgba(225, 29, 72, 0.08)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>☕ 🎨</div>
          <h2 style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#881337',
            marginBottom: '0.5rem'
          }}>
            {isNl ? 'Heerlijk tot rust gekomen na dit verhaal?' : 'Relaxed and inspired by this story?'}
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#4C0519',
            maxWidth: '520px',
            margin: '0 auto 1.5rem'
          }}>
            {isNl
              ? 'Laat je gedachten lekker varen met onze creatieve printbare kleurboeken. Download nu onze complete 100 Pagina Mega Bundel voor slechts € 1,00!'
              : 'Clear your mind and unwind with our cozy printable coloring collections. Get our complete 100 Page Mega Bundle now for only € 1.00!'}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/${lang}/special-deals-promo-packs/promo-packs/all-ages/100-mega-pack`}
              style={{
                backgroundColor: '#E11D48',
                color: '#FFFFFF',
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(225, 29, 72, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>💥 {isNl ? 'Bekijk de € 1,00 Mega Bundel' : 'Get the € 1.00 Mega Pack'}</span>
            </Link>

            <Link
              href={`/${lang}/freebies`}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#881337',
                border: '1px solid #FECDD3',
                padding: '0.85rem 1.5rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>🎁 {isNl ? 'Gratis Voorbeeldpakketten' : 'Free Sample Packs'}</span>
            </Link>
          </div>
        </div>

        {/* Gerelateerde Verhalen */}
        {relatedStories && relatedStories.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', color: '#1C1917' }}>
              {isNl ? 'Meer mooie verhalen om te lezen:' : 'More stories to read:'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {relatedStories.map(rel => (
                <Link
                  key={rel.slug}
                  href={`/${lang}/stories/${rel.slug}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E7E5E4',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  {rel.image && !rel.image.startsWith('/covers/') ? (
                    <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={rel.image}
                        alt={rel.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      height: '100px',
                      background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 60%, #FEF3C7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem'
                    }}>
                      📖
                    </div>
                  )}

                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1C1917', marginBottom: '0.4rem', lineHeight: 1.35 }}>
                        {rel.title}
                      </h4>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#78716C',
                        lineHeight: 1.5,
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {rel.excerpt}
                      </p>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#BE185D', fontWeight: 700 }}>
                      {isNl ? 'Lees dit verhaal →' : 'Read story →'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
