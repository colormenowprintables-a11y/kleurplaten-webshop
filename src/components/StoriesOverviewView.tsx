'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { Story, StoryCategory, STORY_CATEGORIES } from '@/data/stories';

interface StoriesOverviewViewProps {
  stories: Story[];
  lang: string;
}

export default function StoriesOverviewView({ stories, lang }: StoriesOverviewViewProps) {
  const isNl = lang === 'nl';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        story.title.toLowerCase().includes(q) || 
        story.excerpt.toLowerCase().includes(q) ||
        story.content.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [stories, selectedCategory, searchQuery]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <section style={{
        background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FEF3C7 100%)',
        borderBottom: '1px solid #FECDD3',
        padding: '3.5rem 1.25rem 3rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #FECDD3',
            color: '#BE185D',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 800,
            marginBottom: '1rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}>
            <span>✨</span>
            <span>{isNl ? 'Kleurrijke Levensverhalen' : 'Real Life Stories'}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
            fontWeight: 900,
            color: '#881337',
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
            lineHeight: 1.15
          }}>
            Colorful Stories
          </h1>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#4C0519',
            maxWidth: '620px',
            margin: '0 auto 2rem'
          }}>
            {isNl
              ? 'Meeslepende, ontroerende en spannende verhalen uit het echte leven. Helemaal gratis te lezen, zonder storende reclame of verplichte kliks.'
              : 'Gripping, heartfelt, and unforgettable stories from real life. Free to read in full, completely ad-free and without interruption.'}
          </p>

          {/* Zoekbalk */}
          <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isNl ? 'Zoek in verhalen (bijv. bruiloft, geheim, liefde)...' : 'Search stories...'}
              style={{
                width: '100%',
                padding: '0.9rem 1.25rem 0.9rem 2.85rem',
                borderRadius: '14px',
                border: '1px solid #E7E5E4',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                backgroundColor: '#FFFFFF'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.1rem',
              color: '#A8A29E',
              pointerEvents: 'none'
            }}>
              🔍
            </span>
          </div>
        </div>
      </section>

      {/* Categorieën navigatie balk (Pills) */}
      <div style={{
        maxWidth: '1100px',
        margin: '2rem auto 2.5rem',
        padding: '0 1.25rem',
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        scrollbarWidth: 'none'
      }}>
        {STORY_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          const label = isNl ? cat.nl : cat.en;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                whiteSpace: 'nowrap',
                padding: '0.55rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: isSelected ? 800 : 600,
                backgroundColor: isSelected ? '#BE185D' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#44403C',
                border: isSelected ? '1px solid #BE185D' : '1px solid #E7E5E4',
                boxShadow: isSelected ? '0 3px 10px rgba(190, 24, 93, 0.3)' : '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>{cat.icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Verhalen Grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.25rem' }}>
        {filteredStories.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E7E5E4'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1C1917', marginBottom: '0.5rem' }}>
              {isNl ? 'Binnenkort de eerste verhalen!' : 'Stories coming soon!'}
            </h3>
            <p style={{ color: '#78716C', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              {isNl
                ? 'Onze schrijvers leggen de laatste hand aan nieuwe, ontroerende verhalen. Kom snel terug of ontspan in de tussentijd met onze kleurboeken!'
                : 'New stories are being written. Check back soon or relax with our coloring books in the meantime!'}
            </p>
            <Link
              href={`/${lang}/freebies`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#BE185D',
                color: '#FFFFFF',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              🎁 {isNl ? 'Bekijk gratis kleurplaten' : 'Explore free coloring pages'}
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredStories.map(story => {
              const catObj = STORY_CATEGORIES.find(c => c.id === story.category);
              const catName = catObj ? (isNl ? catObj.nl : catObj.en) : story.category;

              return (
                <article
                  key={story.slug}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    border: '1px solid #E7E5E4',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  {story.image && !story.image.startsWith('/covers/') ? (
                    <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                      <SafeImage
                        src={story.image}
                        alt={story.title}
                        width={400}
                        height={180}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      height: '130px',
                      background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 60%, #FEF3C7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      borderBottom: '1px solid #FECDD3'
                    }}>
                      {catObj?.icon || '📖'}
                    </div>
                  )}

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        backgroundColor: '#FCE7F3',
                        color: '#BE185D',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px'
                      }}>
                        {catObj?.icon} {catName}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#A8A29E' }}>{story.date}</span>
                    </div>

                    <h2 style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#1C1917',
                      lineHeight: 1.35,
                      marginBottom: '0.65rem'
                    }}>
                      <Link
                        href={`/${lang}/stories/${story.slug}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {story.title}
                      </Link>
                    </h2>

                    <p style={{
                      fontSize: '0.925rem',
                      color: '#57534E',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flex: 1
                    }}>
                      {story.excerpt}
                    </p>

                    <Link
                      href={`/${lang}/stories/${story.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: '#BE185D',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        textDecoration: 'none'
                      }}
                    >
                      <span>{isNl ? 'Lees het hele verhaal' : 'Read full story'}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
