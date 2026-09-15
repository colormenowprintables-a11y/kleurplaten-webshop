'use client';

import React, { useState } from 'react';
import SafeImage from './SafeImage';
import styles from './BookSneakPeekPreview.module.css';

interface BookSneakPeekPreviewProps {
  coverImage: string;
  title: string;
  samplePages: { title: string; image: string }[];
  isEn?: boolean;
}

export default function BookSneakPeekPreview({
  coverImage,
  title,
  samplePages,
  isEn = false,
}: BookSneakPeekPreviewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const page1 = samplePages[0];
  const page2 = samplePages[1] || samplePages[0];

  return (
    <>
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
          <span>{isEn ? 'Look Inside (2 Sample Pages)' : 'Inkijkexemplaar (2 Pagina\'s)'}</span>
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
              />
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
              />
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
          <span>{isEn ? 'Click for 2-page interior preview' : 'Klik voor gratis inkijkexemplaar'}</span>
        </div>
      </div>

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
                    ? 'Preview sample interior coloring pages inside this book'
                    : 'Bekijk de binnenkant en kleurplaten uit dit boekje'}
                </p>
              </div>
              <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                {/* Cover view */}
                <div className={styles.sampleBox}>
                  <div className={styles.sampleBadge}>{isEn ? 'Book Cover' : 'Kleurboek Cover'}</div>
                  <div className={styles.sampleImgWrapper}>
                    <SafeImage src={coverImage} alt={title} width={300} height={400} className={styles.sampleImg} />
                  </div>
                  <div className={styles.sampleTitle}>{title}</div>
                </div>

                {/* Page 1 view */}
                {page1 && (
                  <div className={styles.sampleBox}>
                    <div className={styles.sampleBadge}>{isEn ? 'Interior Page 1' : 'Inhoud Pagina 1'}</div>
                    <div className={styles.sampleImgWrapper}>
                      <SafeImage src={page1.image} alt={page1.title} width={300} height={400} className={styles.sampleImg} />
                    </div>
                    <div className={styles.sampleTitle}>{page1.title}</div>
                  </div>
                )}

                {/* Page 2 view */}
                {page2 && (
                  <div className={styles.sampleBox}>
                    <div className={styles.sampleBadge}>{isEn ? 'Interior Page 2' : 'Inhoud Pagina 2'}</div>
                    <div className={styles.sampleImgWrapper}>
                      <SafeImage src={page2.image} alt={page2.title} width={300} height={400} className={styles.sampleImg} />
                    </div>
                    <div className={styles.sampleTitle}>{page2.title}</div>
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
