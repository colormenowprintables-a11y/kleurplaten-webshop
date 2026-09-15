'use client';

import React, { useState } from 'react';
import SafeImage from './SafeImage';
import styles from './BookSneakPeekPreview.module.css';

interface BookSneakPeekPreviewProps {
  coverImage: string;
  title: string;
  samplePages: { title: string; image: string }[];
  isEn?: boolean;
  mode?: 'stack' | 'button';
  buttonText?: string;
  buttonStyle?: React.CSSProperties;
}

export default function BookSneakPeekPreview({
  coverImage,
  title,
  samplePages,
  isEn = false,
  mode = 'stack',
  buttonText,
  buttonStyle,
}: BookSneakPeekPreviewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const page1 = samplePages[0];
  const page2 = samplePages[1] || samplePages[0];
  const page3 = samplePages[2];

  const defaultBtnLabel = isEn ? '📖 Look Inside (Sample Pages)' : '📖 Inkijkexemplaar (Voorbeelden)';

  return (
    <>
      {mode === 'button' ? (
        <button
          type="button"
          className={styles.previewTriggerBtn}
          onClick={() => setModalOpen(true)}
          style={buttonStyle}
          title={isEn ? 'Click to inspect sample interior pages' : 'Klik om voorbeeldpagina\'s te bekijken'}
        >
          {buttonText || defaultBtnLabel}
        </button>
      ) : (
        <div
          className={styles.previewContainer}
          onClick={() => setModalOpen(true)}
          title={isEn ? 'Click to inspect book interior pages' : 'Klik om binnenin het boekje te kijken'}
          role="button"
          tabIndex={0}
        >
          {/* Badge Top */}
          <div className={styles.sneakPeekBadge}>
            <span>📖</span>
            <span>{isEn ? 'Look Inside (Sample Pages)' : 'Inkijkexemplaar (Voorbeeld Pagina\'s)'}</span>
          </div>

          {/* Fanned 3D Book Stack */}
          <div className={styles.stackWrapper}>
            {/* Back Left Page Sample */}
            {page1 && (
              <div className={`${styles.stackedCard} ${styles.leftPage}`}>
                <SafeImage
                  src={page1.image}
                  alt={`${title} sample page 1`}
                  width={170}
                  height={230}
                  className={styles.pageImg}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className={styles.watermarkOverlay}>
                  <span className={styles.watermarkText}>
                    {isEn ? 'SAMPLE • DO NOT PRINT' : 'VOORBEELD • COLOR ME NOW'}
                  </span>
                </div>
                <div className={styles.pageLabel}>{isEn ? 'Page 1' : 'Pagina 1'}</div>
              </div>
            )}

            {/* Back Right Page Sample */}
            {page2 && (
              <div className={`${styles.stackedCard} ${styles.rightPage}`}>
                <SafeImage
                  src={page2.image}
                  alt={`${title} sample page 2`}
                  width={170}
                  height={230}
                  className={styles.pageImg}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className={styles.watermarkOverlay}>
                  <span className={styles.watermarkText}>
                    {isEn ? 'SAMPLE • DO NOT PRINT' : 'VOORBEELD • COLOR ME NOW'}
                  </span>
                </div>
                <div className={styles.pageLabel}>{isEn ? 'Page 2' : 'Pagina 2'}</div>
              </div>
            )}

            {/* Main Front Cover */}
            <div className={`${styles.stackedCard} ${styles.frontCover}`}>
              <SafeImage
                src={coverImage}
                alt={`${title} Cover`}
                width={190}
                height={260}
                className={styles.coverImg}
              />
              <div className={styles.coverTag}>{isEn ? 'Book Cover' : 'Kleurboek Cover'}</div>
            </div>
          </div>

          {/* Hover Hint CTA */}
          <div className={styles.zoomHint}>
            <span>🔍</span>
            <span>{isEn ? 'Click for interior preview' : 'Klik voor gratis inkijkexemplaar'}</span>
          </div>
        </div>
      )}

      {/* Modal Lightbox for Fullscreen Page Inspection */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>
                  📖 {isEn ? `Look Inside: ${title}` : `Inkijkexemplaar: ${title}`}
                </h3>
                <p className={styles.modalSubtitle}>
                  {isEn
                    ? '🔒 Watermark Protected Preview — High-resolution PDF available upon purchase / download'
                    : '🔒 Beveiligd Voorbeeld met Watermerk — Hoge resolutie PDF zonder watermerk beschikbaar na bestelling'}
                </p>
              </div>
              <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              {/* Explanatory Info Header Banner */}
              <div className={styles.previewInfoBanner}>
                <div className={styles.infoBannerIcon}>✏️</div>
                <div className={styles.infoBannerText}>
                  <strong>{isEn ? 'Interior Book Preview (B&W Coloring Sheets)' : 'Binnenwerk Inkijkexemplaar (Zwart-Wit Kleurplaten)'}</strong>
                  <p>
                    {isEn
                      ? 'Below you can see the book cover alongside actual black-and-white interior line art coloring pages included inside this book.'
                      : 'Hieronder zie je de boekcover samen met de echte zwart-wit kleurplaten (lijntekeningen) die in dit boek zitten om in te kleuren.'}
                  </p>
                </div>
              </div>

              <div className={styles.modalGrid}>
                {/* Cover view */}
                <div className={styles.sampleBox}>
                  <div className={styles.sampleBadge}>{isEn ? '🎨 Book Cover (Color)' : '🎨 Boek Cover (Kleur)'}</div>
                  <div className={styles.sampleImgWrapper}>
                    <SafeImage src={coverImage} alt={title} width={300} height={400} className={styles.sampleImg} />
                  </div>
                  <div className={styles.sampleTitle}>{title}</div>
                </div>

                {/* Page 1 view - Interior Line Art Page */}
                {page1 && (
                  <div className={`${styles.sampleBox} ${styles.interiorBox}`}>
                    <div className={styles.interiorBadge}>
                      {isEn ? '✏️ Interior Page 1 (B&W Line Art)' : '✏️ Binnenwerk Kleurplaat 1'}
                    </div>
                    <div className={styles.sampleImgWrapper} style={{ position: 'relative' }}>
                      <SafeImage
                        src={page1.image}
                        alt={page1.title}
                        width={300}
                        height={400}
                        className={`${styles.sampleImg} ${styles.lineArtImage}`}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <div className={styles.modalWatermarkOverlay}>
                        <div className={styles.modalWatermarkRepeater}>
                          <span>COLOR ME NOW • VOORBEELD</span>
                          <span>SAMPLE • DO NOT PRINT</span>
                          <span>COLOR ME NOW • VOORBEELD</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.sampleTitle}>{page1.title}</div>
                  </div>
                )}

                {/* Page 2 view - Interior Line Art Page */}
                {page2 && (
                  <div className={`${styles.sampleBox} ${styles.interiorBox}`}>
                    <div className={styles.interiorBadge}>
                      {isEn ? '✏️ Interior Page 2 (B&W Line Art)' : '✏️ Binnenwerk Kleurplaat 2'}
                    </div>
                    <div className={styles.sampleImgWrapper} style={{ position: 'relative' }}>
                      <SafeImage
                        src={page2.image}
                        alt={page2.title}
                        width={300}
                        height={400}
                        className={`${styles.sampleImg} ${styles.lineArtImage}`}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <div className={styles.modalWatermarkOverlay}>
                        <div className={styles.modalWatermarkRepeater}>
                          <span>COLOR ME NOW • VOORBEELD</span>
                          <span>SAMPLE • DO NOT PRINT</span>
                          <span>COLOR ME NOW • VOORBEELD</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.sampleTitle}>{page2.title}</div>
                  </div>
                )}

                {/* Page 3 view (if present) */}
                {page3 && (
                  <div className={`${styles.sampleBox} ${styles.interiorBox}`}>
                    <div className={styles.interiorBadge}>
                      {isEn ? '✏️ Interior Page 3 (B&W Line Art)' : '✏️ Binnenwerk Kleurplaat 3'}
                    </div>
                    <div className={styles.sampleImgWrapper} style={{ position: 'relative' }}>
                      <SafeImage
                        src={page3.image}
                        alt={page3.title}
                        width={300}
                        height={400}
                        className={`${styles.sampleImg} ${styles.lineArtImage}`}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <div className={styles.modalWatermarkOverlay}>
                        <div className={styles.modalWatermarkRepeater}>
                          <span>COLOR ME NOW • VOORBEELD</span>
                          <span>SAMPLE • DO NOT PRINT</span>
                          <span>COLOR ME NOW • VOORBEELD</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.sampleTitle}>{page3.title}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
