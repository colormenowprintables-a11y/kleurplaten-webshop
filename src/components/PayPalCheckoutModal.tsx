'use client';

import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { fireConfetti } from '@/lib/confetti';

export interface BundleTier {
  id: string;
  name: string;
  nameEn: string;
  price: string; // e.g. "1.99"
  priceDisplay: string; // e.g. "€ 1,99"
  description: string;
  descriptionEn: string;
  badge?: string;
  bookCount: number;
}

export const BUNDLE_TIERS: BundleTier[] = [
  {
    id: 'single',
    name: '1 Los Kleurboek',
    nameEn: '1 Single Coloring Book',
    price: '1.99',
    priceDisplay: '€ 1,99',
    description: 'Compleet digitaal kleurboek in A4 PDF-formaat',
    descriptionEn: 'Complete digital coloring book in A4 PDF format',
    bookCount: 1,
  },
  {
    id: 'pack3',
    name: '3-Boeken Thema Bundel',
    nameEn: '3-Book Theme Bundle',
    price: '4.49',
    priceDisplay: '€ 4,49',
    description: 'Kies 3 kleurboeken naar keuze (€ 1,50 per boek)',
    descriptionEn: 'Choose any 3 coloring books (€1.50 per book)',
    badge: 'POPULAIR 🌟',
    bookCount: 3,
  },
  {
    id: 'pack5',
    name: '5-Boeken Mega Bundel',
    nameEn: '5-Book Mega Bundle',
    price: '6.49',
    priceDisplay: '€ 6,49',
    description: 'Kies 5 kleurboeken naar keuze (€ 1,30 per boek)',
    descriptionEn: 'Choose any 5 coloring books (€1.30 per book)',
    badge: 'BESTE DEAL 🔥',
    bookCount: 5,
  },
  {
    id: 'pack10',
    name: '10-Boeken Collectie Pack',
    nameEn: '10-Book Collection Pack',
    price: '11.99',
    priceDisplay: '€ 11,99',
    description: 'Maximale creativiteit voor thuis & klas (€ 1,20 per boek)',
    descriptionEn: 'Maximum creativity for home & classroom (€1.20 per book)',
    bookCount: 10,
  },
];

interface PayPalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTierId?: string;
  bookTitle?: string;
  isEn?: boolean;
  onSuccessDownload?: () => void;
  downloadUrl?: string;
}

export default function PayPalCheckoutModal({
  isOpen,
  onClose,
  defaultTierId = 'single',
  bookTitle = 'ColorMeNow Kleurboek',
  isEn = false,
  onSuccessDownload,
  downloadUrl,
}: PayPalCheckoutModalProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>(defaultTierId);
  const [paid, setPaid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedTierId(defaultTierId);
    }
  }, [isOpen, defaultTierId]);

  if (!isOpen) return null;

  const currentTier = BUNDLE_TIERS.find((t) => t.id === selectedTierId) || BUNDLE_TIERS[0];
  const clientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    'BAAteFL7TYAqwF2RAKSz5QEpGVfFb6HmBgRa6yYctsotI9N5HKBgzWaxdptI5gJN5rNS2_3SxXfzlDPdWg';

  const handleApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      setPaid(true);
      fireConfetti();
      if (onSuccessDownload) {
        onSuccessDownload();
      }
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '2rem',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F1F5F9',
            border: 'none',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
          }}
          aria-label="Sluiten"
        >
          ✕
        </button>

        {!paid ? (
          <>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(108, 92, 231, 0.1)',
                  color: '#6C5CE7',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                🔒 {isEn ? 'SECURE PAYPAL & IDEAL CHECKOUT' : 'VEILIG AFREKENEN VIA PAYPAL & IDEAL'}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                {bookTitle}
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: '0.4rem' }}>
                {isEn
                  ? 'Select your preferred bundle package and download instantly in high quality A4 PDF!'
                  : 'Kies jouw gewenste pakket en ontvang direct je haarscherpe A4 PDF-kleurboek!'}
              </p>
            </div>

            {/* Tier Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {BUNDLE_TIERS.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    style={{
                      border: isSelected ? '2px solid #6C5CE7' : '1px solid #E2E8F0',
                      background: isSelected ? '#F8F7FF' : '#FFFFFF',
                      borderRadius: '16px',
                      padding: '1rem 1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>
                          {isEn ? tier.nameEn : tier.name}
                        </span>
                        {tier.badge && (
                          <span
                            style={{
                              background: '#FF6B35',
                              color: '#FFFFFF',
                              fontSize: '0.65rem',
                              fontWeight: 900,
                              padding: '0.15rem 0.5rem',
                              borderRadius: '9999px',
                            }}
                          >
                            {tier.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                        {isEn ? tier.descriptionEn : tier.description}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#6C5CE7' }}>
                        {tier.priceDisplay}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Guarantee Notice */}
            <div
              style={{
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                fontSize: '0.82rem',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.5rem',
              }}
            >
              <span>💳</span>
              <span>
                {isEn
                  ? 'Pay easily via iDEAL, PayPal Balance, Credit Card or Apple Pay. Instant PDF download after payment.'
                  : 'Betaal eenvoudig via iDEAL, PayPal, Creditcard of Apple Pay. Directe PDF-download na betaling.'}
              </span>
            </div>

            {/* PayPal Smart Buttons */}
            <div>
              {clientId !== 'test' ? (
                <PayPalScriptProvider
                  options={{
                    clientId: clientId,
                    currency: 'EUR',
                  }}
                >
                  <PayPalButtons
                    style={{ layout: 'vertical', shape: 'pill', label: 'pay' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: 'CAPTURE',
                        application_context: {
                          shipping_preference: 'NO_SHIPPING',
                        },
                        purchase_units: [
                          {
                            description: isEn ? currentTier.nameEn : currentTier.name,
                            amount: {
                              currency_code: 'EUR',
                              value: currentTier.price,
                            },
                          },
                        ],
                      } as any);
                    }}
                    onApprove={handleApprove}
                    onError={(err) => {
                      console.error('PayPal Checkout Error:', err);
                      setErrorMessage(
                        isEn
                          ? 'Something went wrong during payment. Please try again.'
                          : 'Er is iets misgegaan bij de betaling. Probeer het opnieuw.'
                      );
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                /* Demo / Fallback mode when PayPal Client ID is pending */
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      setPaid(true);
                      fireConfetti();
                      if (onSuccessDownload) onSuccessDownload();
                    }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #0070BA 0%, #003087 100%)',
                      color: '#FFFFFF',
                      fontWeight: 900,
                      fontSize: '1.05rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(0, 112, 186, 0.4)',
                    }}
                  >
                    {isEn
                      ? `Pay ${currentTier.priceDisplay} with PayPal / iDEAL`
                      : `Afrekenen ${currentTier.priceDisplay} via PayPal / iDEAL`}
                  </button>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.5rem' }}>
                    {isEn
                      ? 'Note: Add NEXT_PUBLIC_PAYPAL_CLIENT_ID to your environment variables to enable live PayPal & iDEAL processing.'
                      : 'Tip: Voeg NEXT_PUBLIC_PAYPAL_CLIENT_ID toe aan je omgevingsvariabelen voor live PayPal & iDEAL betalingen.'}
                  </p>
                </div>
              )}

              {errorMessage && (
                <div
                  style={{
                    color: '#EF4444',
                    background: '#FEF2F2',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginTop: '1rem',
                    textAlign: 'center',
                  }}
                >
                  {errorMessage}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Payment Success View */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
              {isEn ? 'Payment Successful!' : 'Betaling Geslaagd!'}
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
              {isEn
                ? 'Thank you for your order! Your digital coloring book bundle is now ready for instant download.'
                : 'Bedankt voor je bestelling! Je digitale kleurboek bundel staat nu klaar om direct gedownload te worden.'}
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href={downloadUrl || '#'}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (onSuccessDownload) onSuccessDownload();
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  padding: '1.1rem 2.2rem',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '1.08rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                  cursor: 'pointer',
                }}
              >
                📥 {isEn ? 'Download PDF Color Book Now' : 'Download PDF Kleurboek Nu'}
              </a>
              <button
                onClick={onClose}
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  padding: '0.4rem 0.8rem',
                  textDecoration: 'underline',
                }}
              >
                {isEn ? 'Close this window' : 'Sluit dit venster'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
