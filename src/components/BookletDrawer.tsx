'use client';

import React, { useState } from 'react';
import { useColoringBook } from '@/context/ColoringBookContext';
import { fireConfetti } from '@/lib/confetti';
import SafeImage from './SafeImage';
import styles from './BookletDrawer.module.css';
import PayPalCheckoutModal from './PayPalCheckoutModal';

interface BookletDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

export default function BookletDrawer({ isOpen, onClose, lang }: BookletDrawerProps) {
  const { selectedPages, clearSelection, removePage, totalSelected } = useColoringBook();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPayPalCheckout, setShowPayPalCheckout] = useState(false);

  if (!isOpen) return null;

  const isEn = lang === 'en';

  const getBundleInfo = (count: number, isEnglish: boolean) => {
    if (count <= 1) {
      return {
        tierId: 'single',
        priceDisplay: '€ 1,99',
        price: '1.99',
        tierName: isEnglish ? '1 Single Coloring Book' : '1 Los Kleurboek',
        badge: isEnglish ? 'STANDARD PRICE' : 'STANDAARD PRIJS',
        savings: null,
        unitPrice: '€ 1,99 / book',
        nextTierHint: isEnglish
          ? '💡 Add 1-2 more books to unlock the 3-Book Bundle deal for €4.49!'
          : '💡 Voeg nog 1-2 kleurboeken toe voor de 3-Boeken Bundeldeal van € 4,49!',
      };
    } else if (count <= 3) {
      return {
        tierId: 'pack3',
        priceDisplay: '€ 4,49',
        price: '4.49',
        tierName: isEnglish ? '3-Book Theme Bundle' : '3-Boeken Bundeldeal',
        badge: isEnglish ? 'POPULAR 🌟' : 'POPULAIR 🌟',
        savings: isEnglish ? '3-Book Bundle active (€1.50 per book)!' : '3-Boeken bundelkorting actief (€ 1,50 per boek)!',
        unitPrice: '€ 1,50 / book',
        nextTierHint:
          count === 2
            ? (isEnglish ? '💡 Tip: You can add 1 more book for FREE in this price tier!' : '💡 Tip: Je kunt nog 1 boek GRATIS toevoegen in deze prijsklasse!')
            : (isEnglish ? '💡 Add 1 more book to reach the 5-Book Mega Bundle for €6.49!' : '💡 Voeg nog 1 boek toe voor de 5-Boeken Mega Bundel van € 6,49!'),
      };
    } else if (count <= 5) {
      return {
        tierId: 'pack5',
        priceDisplay: '€ 6,49',
        price: '6.49',
        tierName: isEnglish ? '5-Book Mega Bundle' : '5-Boeken Mega Bundel',
        badge: isEnglish ? 'BEST DEAL 🔥' : 'BESTE DEAL 🔥',
        savings: isEnglish ? '5-Book Mega Bundle active (€1.30 per book)!' : '5-Boeken Mega Bundel actief (€ 1,30 per boek)!',
        unitPrice: '€ 1,30 / book',
        nextTierHint:
          count === 4
            ? (isEnglish ? '💡 Tip: You can add 1 more book for FREE in this price tier!' : '💡 Tip: Je kunt nog 1 boek GRATIS toevoegen in deze prijsklasse!')
            : (isEnglish ? '💡 Add more books to reach the 10-Book Collection Pack for €11.99!' : '💡 Voeg meer boeken toe voor de 10-Boeken Collectie Pack van € 11,99!'),
      };
    } else {
      return {
        tierId: 'pack10',
        priceDisplay: '€ 11,99',
        price: '11.99',
        tierName: isEnglish ? '10-Book Collection Pack' : '10-Boeken Collectie Pack',
        badge: isEnglish ? 'MAX SAVINGS 👑' : 'MAX KORTING 👑',
        savings: isEnglish ? '10-Book Collection Pack active (€1.20 per book)!' : '10-Boeken Collectie Pack actief (€ 1,20 per boek)!',
        unitPrice: '€ 1,20 / book',
        nextTierHint: null,
      };
    }
  };

  const bundleInfo = getBundleInfo(totalSelected, isEn);
  const defaultTierId = bundleInfo.tierId;

  const handleDownloadCustomBooklet = async () => {
    if (downloading || selectedPages.length === 0) return;
    setDownloading(true);
    setProgress(0);

    try {
      const { default: jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation:'portrait',
        unit:'mm',
        format:'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;

      let addedPagesCount = 0;
      for (let i = 0; i < selectedPages.length; i++) {
        setProgress(i + 1);
        const p = selectedPages[i];
        const proxyUrl =`/api/proxy-image?url=${encodeURIComponent(p.image)}`;

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

            if (addedPagesCount > 0) {
              pdf.addPage();
            }
            addedPagesCount++;

            // Page Header Title
            pdf.setFont('helvetica','bold');
            pdf.setFontSize(12);
            pdf.setTextColor(15, 23, 42);
            pdf.text(p.title, 14, 16);

            pdf.setFont('helvetica','normal');
            pdf.setFontSize(9);
            pdf.setTextColor(148, 163, 184);
            pdf.text(`${i + 1} / ${selectedPages.length}`, pageWidth - 14, 16, { align:'right'});

            // Draw coloring page image centered in A4
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

            pdf.addImage(img,'JPEG', x, y, renderWidth, renderHeight);

            // Page footer
            pdf.setFontSize(8);
            pdf.setTextColor(180, 190, 205);
            pdf.text('© ColorMeNow.com — PDF Album Printable Coloring Pages', pageWidth / 2, pageHeight - 8, { align:'center'});

            URL.revokeObjectURL(img.src);
          }
        } catch (err) {
          console.warn('Failed to load page image for custom PDF booklet:', err);
        }
      }

      pdf.save(`colormenow-custom-bundle-${selectedPages.length}-pages.pdf`);
      fireConfetti();
      onClose();
    } catch (e) {
      console.error('Failed to generate custom coloring book PDF:', e);
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.drawer} role="dialog"aria-modal="true"aria-label="Coloring bundle basket">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.basketIcon} aria-hidden="true">🧺</div>
            <div>
              <h2 className={styles.title}>
                {isEn ? 'My Coloring Bundle' : 'Mijn Kleurboek Bundel'}
              </h2>
              <p className={styles.subtitle}>
                {totalSelected} {isEn ? `page${totalSelected === 1 ? '' : 's'} in your print basket` : `kleurplaat${totalSelected === 1 ? '' : 'en'} in je printmandje`}
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label={isEn ? 'Close' : 'Sluiten'}>✕</button>
        </div>

        {/* Content List */}
        <div className={styles.body}>
          {totalSelected === 0 ? (
            <div className={styles.emptyState}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }} aria-hidden="true">🎨</div>
              <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--foreground)' }}>
                {isEn ? 'Your bundle is still empty' : 'Je printmandje is nog leeg'}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', maxWidth: '300px', margin: '0 auto', lineHeight: 1.6 }}>
                {isEn
                  ? 'Browse different categories and click the button on any coloring page to build your custom collection!'
                  : 'Blader door de categorieën en klik op de knop bij een kleurplaat om je eigen verzameling samen te stellen!'}
              </p>
            </div>
          ) : (
            <div className={styles.itemsGrid}>
              {selectedPages.map((page) => (
                <div key={page.slug} className={styles.cardItem}>
                  <div className={styles.thumbWrapper}>
                    <SafeImage src={page.image} alt={page.title} width={60} height={75} className={styles.thumbImg} />
                  </div>
                  <div className={styles.cardDetails}>
                    <div className={styles.cardTheme}>
                      {page.parentTheme ? page.parentTheme.replace(/-/g, '') : 'Coloring Page'}
                    </div>
                    <h4 className={styles.cardTitle}>{page.title}</h4>
                  </div>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removePage(page.slug)}
                    title={isEn ? 'Remove from bundle' : 'Verwijder uit bundel'}
                    aria-label={isEn ? `Remove ${page.title} from bundle` : `Verwijder ${page.title} uit bundel`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {totalSelected > 0 && (
          <div className={styles.footer}>
            <div className={styles.bundleSummaryCard}>
              <div className={styles.summaryTopRow}>
                <div>
                  <span className={styles.summaryBadge}>{bundleInfo.badge}</span>
                  <div className={styles.summaryTierName}>{bundleInfo.tierName}</div>
                </div>
                <div className={styles.summaryPriceBox}>
                  <div className={styles.summaryTotalPrice}>{bundleInfo.priceDisplay}</div>
                  <div className={styles.summaryUnitPrice}>{bundleInfo.unitPrice}</div>
                </div>
              </div>
              {bundleInfo.savings && (
                <div className={styles.summarySavings}>
                  <span>✨</span>
                  <span>{bundleInfo.savings}</span>
                </div>
              )}
              {bundleInfo.nextTierHint && (
                <div className={styles.summaryHint}>
                  {bundleInfo.nextTierHint}
                </div>
              )}
            </div>

            <div className={styles.footerActions}>
              <button
                type="button"
                className={styles.clearBtn}
                onClick={clearSelection}
                disabled={downloading}
              >
                {isEn ? 'Clear All' : 'Alles Wissen'}
              </button>
              <button
                type="button"
                className={styles.downloadBtn}
                onClick={() => setShowPayPalCheckout(true)}
                disabled={downloading}
              >
                <span>🛒</span>
                <span>
                  {downloading
                    ? (isEn ? `Generating (${progress}/${totalSelected})...` : `Genereren (${progress}/${totalSelected})...`)
                    : (isEn ? `Checkout (${bundleInfo.priceDisplay})` : `Afrekenen (${bundleInfo.priceDisplay})`)}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <PayPalCheckoutModal
        isOpen={showPayPalCheckout}
        onClose={() => setShowPayPalCheckout(false)}
        defaultTierId={defaultTierId}
        bookTitle={isEn ? `Custom ${totalSelected}-Page Coloring Bundle` : `Eigen ${totalSelected}-Platen Kleurboek Bundel`}
        isEn={isEn}
        onSuccessDownload={handleDownloadCustomBooklet}
      />
    </div>
  );
}
