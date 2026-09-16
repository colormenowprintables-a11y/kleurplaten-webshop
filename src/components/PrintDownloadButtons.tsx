'use client';

import { useState } from 'react';
import Link from 'next/link';
import PrintPreviewModal from './PrintPreviewModal';
import OnlineColoringTool from './OnlineColoringTool';
import ReportButton from './ReportButton';
import DownloadEmailModal from './DownloadEmailModal';
import DownloadProgressModal from './DownloadProgressModal';
import PayPalCheckoutModal from './PayPalCheckoutModal';
import { useColoringBook } from '@/context/ColoringBookContext';

export default function PrintDownloadButtons({
  isEn,
  fileUrl,
  category = 'Unknown',
  colorPageUrl,
  lang = 'nl',
  bookSlug,
}: {
  isEn: boolean;
  fileUrl: string;
  category?: string;
  colorPageUrl?: string;
  lang?: string;
  bookSlug?: string;
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showColorOnline, setShowColorOnline] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPayPalCheckout, setShowPayPalCheckout] = useState(false);
  const [progressModal, setProgressModal] = useState<{ open: boolean; type: 'pdf' | 'png' }>({
    open: false,
    type: 'pdf',
  });

  const { isPageSelected, toggleSelectPage } = useColoringBook();
  const pageSlug = fileUrl.split('/').pop()?.replace(/\.[^.]+$/, '') || 'page';
  const effectiveSlug = bookSlug || pageSlug;
  const isSelected = isPageSelected(effectiveSlug);

  const pageTitle =
    fileUrl.split('/').pop()?.replace(/_/g, ' ').replace(/\.[^.]+$/, '') ||
    (isEn ? 'Coloring Page' : 'Kleurplaat');

  const previewUrl = fileUrl && fileUrl.startsWith('/')
    ? fileUrl
    : `/api/proxy-image?url=${encodeURIComponent(fileUrl)}`;

  const handlePrintClick = () => setShowPreview(true);
  const doActualPrint = () => {
    window.print();
  };

  // Download High-Res Image Direct & Clean
  const performActualDownloadPng = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const src = previewUrl || fileUrl;
      const response = await fetch(src);
      if (!response.ok) throw new Error('Fetch failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      const cleanSlug = pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      a.download = `colormenow-${cleanSlug}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error('Failed to download PNG directly', err);
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = `colormenow-${pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setDownloading(false);
    }
  };

  // Download Print-Ready A4 Book PDF
  const performActualDownloadPdf = async () => {
    if (downloadingPdf) return;
    setDownloadingPdf(true);

    try {
      const directPdf = `/books/${effectiveSlug}.pdf`;
      const a = document.createElement('a');
      a.href = directPdf;
      a.download = `ColorMeNow-${effectiveSlug}.pdf`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloadingPdf(false);
      checkAndTriggerEmailModal();
    } catch (err) {
      console.error('Failed to trigger direct PDF download', err);
      window.open(`/books/${effectiveSlug}.pdf`, '_blank');
      setDownloadingPdf(false);
    }
  };

  return (
    <>
      <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Primary Direct Buy Button (€1.99) */}
        <button
          onClick={() => setShowPayPalCheckout(true)}
          type="button"
          style={{
            width: '100%',
            padding: '1.1rem 1.25rem',
            background: 'linear-gradient(135deg, #FF6B4A 0%, #F0501F 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 900,
            fontSize: '1.025rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 8px 24px rgba(240, 80, 31, 0.35)',
            transition: 'transform 0.15s ease, boxShadow 0.15s ease',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🛒</span>
          <span>
            {isEn
              ? 'Buy This Book Now (€1.99) →'
              : lang === 'de'
              ? 'Kauf dieses Buch (€ 1,99) →'
              : lang === 'fr'
              ? 'Acheter ce livre (1,99 €) →'
              : 'Koop Dit Kleurboek Direct (€ 1,99) →'}
          </span>
        </button>

        {/* Secondary Action: Add to Print Basket */}
        <button
          onClick={() => {
            toggleSelectPage({
              id: pageSlug,
              slug: pageSlug,
              title: pageTitle,
              image: fileUrl,
            });
          }}
          type="button"
          style={{
            width: '100%',
            padding: '0.95rem 1.1rem',
            background: isSelected
              ? 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)'
              : 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
            color: isSelected ? '#FFFFFF' : '#4F46E5',
            border: isSelected ? '1.5px solid #4338CA' : '1.5px solid #C7D2FE',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: isSelected ? '0 4px 14px rgba(79, 70, 229, 0.3)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{ fontSize: '1.05rem' }}>{isSelected ? '✓' : '🧺'}</span>
          <span>
            {isSelected
              ? isEn
                ? 'Added to Print Basket (View Basket)'
                : 'In je Printmandje (Bekijk Mandje)'
              : isEn
              ? 'Add to Print Basket (Combine Books)'
              : 'Voeg toe aan Printmandje (Boeken Combineren)'}
          </span>
        </button>

        {/* Security & Guarantee Trust Badge */}
        <div
          style={{
            marginTop: '0.25rem',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '0.75rem 0.9rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 800, color: '#334155' }}>
            <span>
              {lang === 'de'
                ? '⚡ Sofortiger Download als hochauflösende PDF'
                : lang === 'fr'
                ? '⚡ Téléchargement immédiat en PDF haute résolution'
                : isEn
                ? '⚡ Instant High-Resolution PDF Download'
                : '⚡ Direct Hoge-Resolutie PDF Download'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.74rem', fontWeight: 700, color: '#64748B' }}>
            <span>
              {lang === 'de'
                ? '🛡️ Sichere Zahlung per PayPal, iDEAL & Kreditkarte'
                : lang === 'fr'
                ? '🛡️ Paiement sécurisé par PayPal, iDEAL et Carte'
                : isEn
                ? '🛡️ Secure Payment via PayPal, iDEAL & Credit Card'
                : '🛡️ Veilig Betalen via iDEAL, PayPal & Creditcard'}
            </span>
          </div>
        </div>
      </div>

      <PayPalCheckoutModal
        isOpen={showPayPalCheckout}
        onClose={() => setShowPayPalCheckout(false)}
        defaultTierId="single"
        bookTitle={pageTitle}
        isEn={isEn}
        downloadUrl={`/books/${effectiveSlug}.pdf`}
        onSuccessDownload={performActualDownloadPdf}
      />

      {/* Download Preparation Interstitial Modal with AdSlot */}
      <DownloadProgressModal
        isOpen={progressModal.open}
        onClose={() => setProgressModal((prev) => ({ ...prev, open: false }))}
        onCompleteDownload={() => {
          if (progressModal.type === 'pdf') {
            performActualDownloadPdf();
          } else {
            performActualDownloadPng();
          }
        }}
        title={pageTitle}
        imageUrl={previewUrl}
        fileType={progressModal.type}
        isEn={isEn}
      />

      {/* Print Preview Modal */}
      <PrintPreviewModal
        imageUrl={previewUrl}
        title={pageTitle}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirmPrint={doActualPrint}
        isEn={isEn}
      />

      {/* Interactive Online Coloring Canvas Modal */}
      <OnlineColoringTool
        imageUrl={fileUrl}
        title={pageTitle}
        isOpen={showColorOnline}
        onClose={() => setShowColorOnline(false)}
        isEn={isEn}
      />

      {/* Post-Download / Post-Print Email Newsletter Capture Modal */}
      <DownloadEmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        lang={lang}
        isEn={isEn}
        pageTitle={pageTitle}
      />
    </>
  );
}
