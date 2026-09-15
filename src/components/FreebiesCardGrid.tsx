'use client';

import React, { useState } from 'react';
import SafeImage from './SafeImage';
import { fireConfetti } from '@/lib/confetti';
import PayPalCheckoutModal from './PayPalCheckoutModal';
import BookSneakPeekPreview from './BookSneakPeekPreview';

interface FreebieItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  img: string;
  slug: string;
  samplePages: Array<{ title: string; image: string }>;
}

export default function FreebiesCardGrid({
  freebiesList,
  isEn,
  lang,
}: {
  freebiesList: FreebieItem[];
  isEn: boolean;
  lang: string;
}) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleDownloadFreebie = async (item: FreebieItem) => {
    if (downloadingId) return;
    setDownloadingId(item.id);
    setProgress(0);

    try {
      const { default: jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;

      let addedPages = 0;
      const pagesToRender = item.samplePages.slice(0, 3);

      for (let i = 0; i < pagesToRender.length; i++) {
        setProgress(i + 1);
        const p = pagesToRender[i];
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(p.image)}`;

        try {
          const res = await fetch(proxyUrl);
          if (res.ok) {
            const blob = await res.blob();
            const img = new Image();
            img.src = URL.createObjectURL(blob);

            await new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });

            if (addedPages > 0) {
              pdf.addPage();
            }
            addedPages++;

            // Header Title
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(12);
            pdf.setTextColor(15, 23, 42);
            pdf.text(p.title, 14, 16);

            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor(148, 163, 184);
            pdf.text(`100% Free Sample Page ${i + 1}/3`, pageWidth - 14, 16, { align: 'right' });

            // Image scaling
            const margin = 14;
            const maxWidth = pageWidth - margin * 2;
            const maxHeight = pageHeight - margin * 2 - 14;

            const imgRatio = (img.width || 800) / (img.height || 800);
            let renderWidth = maxWidth;
            let renderHeight = maxWidth / imgRatio;

            if (renderHeight > maxHeight) {
              renderHeight = maxHeight;
              renderWidth = maxHeight * imgRatio;
            }

            const x = margin + (maxWidth - renderWidth) / 2;
            const y = 22 + (maxHeight - renderHeight) / 2;

            pdf.addImage(img, 'JPEG', x, y, renderWidth, renderHeight);

            // Footer Branding
            pdf.setFontSize(8);
            pdf.setTextColor(180, 190, 205);
            pdf.text('ColorMeNow.shop - 100% Free Printable', pageWidth / 2, pageHeight - 8, { align: 'center' });

            URL.revokeObjectURL(img.src);
          }
        } catch (err) {
          console.warn('Failed to load freebie image:', err);
        }
      }

      const cleanSlug = item.id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      pdf.save(`colormenow-${cleanSlug}-freebie-pack.pdf`);
      fireConfetti();
    } catch (err) {
      console.error('Failed to generate freebie PDF:', err);
    } finally {
      setDownloadingId(null);
      setProgress(0);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.75rem',
          marginTop: '2rem',
        }}
      >
        {freebiesList.map((item) => {
          const isDownloading = downloadingId === item.id;
          return (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #E2E8F0',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div style={{ position: 'relative', height: '220px', background: '#F8FAFC' }}>
                <SafeImage
                  src={item.img}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#16A34A',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                  }}
                >
                  {isEn ? '100% FREE PDF' : '100% GRATIS PDF'}
                </span>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <BookSneakPeekPreview
                    mode="button"
                    coverImage={item.img}
                    title={item.title}
                    samplePages={item.samplePages}
                    isEn={isEn}
                    buttonText={isEn ? '📖 Look Inside Freebie' : '📖 Inkijkexemplaar Bekijken'}
                    buttonStyle={{ width: '100%' }}
                  />

                  <button
                    type="button"
                    onClick={() => handleDownloadFreebie(item)}
                    disabled={isDownloading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                      color: '#FFFFFF',
                      fontWeight: 900,
                      fontSize: '0.92rem',
                      border: 'none',
                      cursor: isDownloading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                    }}
                  >
                    <span>📥</span>
                    <span>
                      {isDownloading
                        ? (isEn ? `Downloading Freebie (${progress}/3)...` : `Downloaden (${progress}/3)...`)
                        : (isEn ? 'Download Freebie Pack (PDF)' : 'Download Gratis PDF Pack')}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCheckout(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '9999px',
                      background: '#F1F5F9',
                      color: '#475569',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span>📚</span>
                    <span>{isEn ? 'Want Full 35+ Page Book? (€1.99)' : 'Wil je het hele boek? (€ 1,99)'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PayPalCheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        defaultTierId="single"
        bookTitle="Compleet Thema Kleurboek"
        isEn={isEn}
      />
    </>
  );
}
