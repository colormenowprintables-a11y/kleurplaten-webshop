'use client';

import { useState, useEffect } from 'react';
import AdminShell from '../AdminShell';
import { Story, StoryCategory, STORY_CATEGORIES } from '@/data/stories';

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<{ nl: Story[]; en: Story[] }>({ nl: [], en: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'list' | 'editor' | 'fb_package'>('list');

  // Editor form state
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(STORY_CATEGORIES[1].id);
  const [date, setDate] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [lang, setLang] = useState<'nl' | 'en'>('nl');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Facebook Package state
  const [selectedFbStory, setSelectedFbStory] = useState<Story | null>(null);
  const [fbIntro, setFbIntro] = useState('');
  const [fbChunks, setFbChunks] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/stories');
      if (res.ok) {
        const data = await res.json();
        setStories(data.stories || { nl: [], en: [] });
      }
    } catch (err) {
      console.error('Fout bij ophalen verhalen:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (story: Story) => {
    setEditingSlug(story.slug);
    setTitle(story.title);
    setSlug(story.slug);
    setCategory(story.category);
    setDate(story.date);
    setExcerpt(story.excerpt);
    setContent(story.content);
    setImage(story.image || '');
    setLang(story.lang || 'nl');
    setActiveTab('editor');
  };

  const handleNew = () => {
    setEditingSlug(null);
    setTitle('');
    setSlug('');
    setCategory(STORY_CATEGORIES[1].id);
    setDate(new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }));
    setExcerpt('');
    setContent('');
    setImage('');
    setLang('nl');
    setActiveTab('editor');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Titel en verhaaltekst zijn verplicht.');
      return;
    }

    setSaving(true);
    setSaveMessage(null);

    const storyPayload: Story = {
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
      title: title.trim(),
      excerpt: excerpt.trim(),
      category,
      date: date.trim() || new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: image.trim(),
      content: content.trim(),
      lang,
    };

    try {
      const res = await fetch('/api/admin/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story: storyPayload }),
      });

      if (res.ok) {
        setSaveMessage('✓ Verhaal succesvol opgeslagen!');
        await fetchStories();
        setTimeout(() => {
          setSaveMessage(null);
          setActiveTab('list');
        }, 1200);
      } else {
        const err = await res.json();
        alert(`Fout bij opslaan: ${err.error || 'Onbekende fout'}`);
      }
    } catch (err) {
      alert('Er is een netwerkfout opgetreden.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (targetSlug: string, targetLang: 'nl' | 'en') => {
    if (!confirm(`Weet je zeker dat je het verhaal "${targetSlug}" wilt verwijderen?`)) return;

    try {
      const res = await fetch(`/api/admin/stories?slug=${encodeURIComponent(targetSlug)}&lang=${targetLang}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchStories();
      } else {
        alert('Fout bij verwijderen.');
      }
    } catch (err) {
      alert('Netwerkfout.');
    }
  };

  // Facebook Pakket Genereren
  const handleOpenFbPackage = (story: Story) => {
    setSelectedFbStory(story);

    // Genereer de Facebook Introductie (De Hook)
    const intro = `🚨 "${story.title}"\n\n${story.excerpt || story.content.slice(0, 200)}...\n\n👇 Lees de eerste reacties hieronder, of bekijk direct het hele verhaal gratis en zonder reclame via de link in de reacties!`;
    setFbIntro(intro);

    // Splits het verhaal in hapklare reacties (~900 - 1300 karakters op alineaniveau)
    const paragraphs = story.content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const chunks: string[] = [];
    let currentChunk = '';

    for (const p of paragraphs) {
      if ((currentChunk + '\n\n' + p).length > 1100 && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = p;
      } else {
        currentChunk = currentChunk ? currentChunk + '\n\n' + p : p;
      }
    }
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    setFbChunks(chunks);
    setActiveTab('fb_package');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentStoriesList = stories[lang] || [];

  return (
    <AdminShell title="Colorful Stories Beheer">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem' }}>
        {/* Header Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('list')}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '8px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'list' ? '#BE185D' : '#E5E7EB',
                color: activeTab === 'list' ? '#FFFFFF' : '#374151',
              }}
            >
              📚 Alle Verhalen ({currentStoriesList.length})
            </button>
            <button
              onClick={handleNew}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '8px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'editor' ? '#BE185D' : '#E5E7EB',
                color: activeTab === 'editor' ? '#FFFFFF' : '#374151',
              }}
            >
              ✍️ {editingSlug ? 'Verhaal Bewerken' : '+ Nieuw Verhaal'}
            </button>
            {selectedFbStory && (
              <button
                onClick={() => setActiveTab('fb_package')}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'fb_package' ? '#1877F2' : '#E5E7EB',
                  color: activeTab === 'fb_package' ? '#FFFFFF' : '#374151',
                }}
              >
                📱 Facebook Pakket ({selectedFbStory.title.slice(0, 20)}...)
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Taal:</span>
            <select
              value={lang}
              onChange={e => setLang(e.target.value as 'nl' | 'en')}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                fontWeight: 700
              }}
            >
              <option value="nl">🇳🇱 Nederlands</option>
              <option value="en">🇬🇧 Engels</option>
            </select>
          </div>
        </div>

        {/* TAB 1: VERHALEN LIJST */}
        {activeTab === 'list' && (
          <div>
            {loading ? (
              <p>Verhalen laden...</p>
            ) : currentStoriesList.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 1.5rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📖</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Nog geen verhalen in {lang === 'nl' ? 'het Nederlands' : 'het Engels'}
                </h3>
                <p style={{ color: '#6B7280', marginBottom: '1.25rem' }}>
                  Voeg je eerste verhaal toe en genereer direct een kant-en-klaar Facebook-pakket.
                </p>
                <button
                  onClick={handleNew}
                  style={{
                    backgroundColor: '#BE185D',
                    color: '#FFFFFF',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  + Schrijf Eerste Verhaal
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {currentStoriesList.map(st => (
                  <div
                    key={st.slug}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '260px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{
                          backgroundColor: '#FCE7F3',
                          color: '#BE185D',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '9999px'
                        }}>
                          {st.category}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{st.date}</span>
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem' }}>
                        {st.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0, lineClamp: 1 }}>
                        {st.excerpt || st.content.slice(0, 90) + '...'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenFbPackage(st)}
                        style={{
                          backgroundColor: '#1877F2',
                          color: '#FFFFFF',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        📱 FB Pakket
                      </button>
                      <button
                        onClick={() => handleEdit(st)}
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#374151',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Bewerk
                      </button>
                      <a
                        href={`/${lang}/stories/${st.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundColor: '#F3F4F6',
                          color: '#374151',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '6px',
                          border: '1px solid #D1D5DB',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        👁️ Bekijk
                      </a>
                      <button
                        onClick={() => handleDelete(st.slug, lang)}
                        style={{
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626',
                          padding: '0.45rem 0.75rem',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VERHAAL EDITOR */}
        {activeTab === 'editor' && (
          <form onSubmit={handleSave} style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E5E7EB',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', color: '#111827' }}>
              {editingSlug ? 'Verhaal Bewerken' : 'Nieuw Verhaal Schrijven'}
            </h3>

            {saveMessage && (
              <div style={{
                backgroundColor: '#D1FAE5',
                color: '#065F46',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontWeight: 700
              }}>
                {saveMessage}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Titel van het verhaal *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Bijv. De brief die 20 jaar verborgen bleef in de oude kist"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Categorie *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.95rem'
                  }}
                >
                  {STORY_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.nl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Omslagafbeelding (URL of cover pad)
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="Bijv. /covers/gingerbread_house_cover.png of https://..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  URL-Slug (automatisch indien leeg)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="de-brief-die-verborgen-bleef"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Korte Teaser / Facebook Hook
              </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="Korte intrigerende samenvatting die nieuwsgierigheid wekt..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit'
                  }}
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Volledige Verhaaltekst * (Alinea's scheiden met een witregel)
              </label>
              <textarea
                required
                rows={12}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Plak hier het volledige verhaal met alinea's en dialogen..."
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  fontFamily: 'Georgia, serif'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#FFFFFF',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Annuleren
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '0.65rem 1.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#BE185D',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {saving ? 'Opslaan...' : '💾 Verhaal Opslaan'}
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: FACEBOOK PUBLICATIEPAKKET (FASE 4) */}
        {activeTab === 'fb_package' && selectedFbStory && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E5E7EB',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <span style={{
                  backgroundColor: '#1877F2',
                  color: '#FFFFFF',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  FACEBOOK PUBLICATIEPAKKET
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.5rem 0 0' }}>
                  {selectedFbStory.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('list')}
                style={{
                  backgroundColor: '#F3F4F6',
                  border: '1px solid #D1D5DB',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Terug naar lijst
              </button>
            </div>

            {/* STAP 1: De Hoofdpost */}
            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1E293B' }}>
                  1. De Facebook Hoofdpost (Tekst + Afbeelding)
                </h4>
                <button
                  onClick={() => copyToClipboard(fbIntro, 'intro')}
                  style={{
                    backgroundColor: copiedIndex === 'intro' ? '#059669' : '#1877F2',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {copiedIndex === 'intro' ? '✓ Gekopieerd!' : '📋 Kopieer Post Tekst'}
                </button>
              </div>
              <textarea
                rows={5}
                value={fbIntro}
                onChange={e => setFbIntro(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* STAP 2: Opeenvolgende Reacties */}
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: '#1E293B' }}>
              2. Opeenvolgende Reacties ({fbChunks.length} delen)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {fbChunks.map((chunk, idx) => {
                const isLast = idx === fbChunks.length - 1;
                const chunkNumber = idx + 1;
                const totalChunks = fbChunks.length;
                const storyUrl = `https://colormenow.shop/${lang}/stories/${selectedFbStory.slug}`;

                const fullCommentText = isLast
                  ? `👉 Deel ${chunkNumber}/${totalChunks}:\n\n${chunk}\n\n✨ Lees het hele verhaal gratis en zonder reclame verder op:\n${storyUrl}`
                  : `👉 Deel ${chunkNumber}/${totalChunks}:\n\n${chunk}`;

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#BE185D' }}>
                        Reactie {chunkNumber} van {totalChunks} {isLast && '(Bevat websitelink)'}
                      </span>
                      <button
                        onClick={() => copyToClipboard(fullCommentText, `chunk-${idx}`)}
                        style={{
                          backgroundColor: copiedIndex === `chunk-${idx}` ? '#059669' : '#F1F5F9',
                          color: copiedIndex === `chunk-${idx}` ? '#FFFFFF' : '#1E293B',
                          border: '1px solid #CBD5E1',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        {copiedIndex === `chunk-${idx}` ? '✓ Gekopieerd!' : `📋 Kopieer Reactie ${chunkNumber}`}
                      </button>
                    </div>
                    <p style={{
                      fontSize: '0.925rem',
                      color: '#334155',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      margin: 0,
                      backgroundColor: '#F8FAFC',
                      padding: '0.75rem',
                      borderRadius: '6px'
                    }}>
                      {fullCommentText}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Directe link naar de live pagina */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#FEF3C7',
              borderRadius: '8px',
              border: '1px solid #FDE68A',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#92400E', fontWeight: 600 }}>
                🔗 Directe verhaallink: <strong>https://colormenow.shop/{lang}/stories/{selectedFbStory.slug}</strong>
              </span>
              <button
                onClick={() => copyToClipboard(`https://colormenow.shop/${lang}/stories/${selectedFbStory.slug}`, 'link')}
                style={{
                  backgroundColor: copiedIndex === 'link' ? '#059669' : '#D97706',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {copiedIndex === 'link' ? '✓ Link Gekopieerd!' : 'Kopieer Link'}
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
