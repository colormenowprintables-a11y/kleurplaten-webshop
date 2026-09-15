import type { Metadata, Viewport } from"next";
import { Fredoka, Nunito } from"next/font/google";
import Script from"next/script";
import"../globals.css";
import Navbar from"@/components/Navbar";
import Footer from"@/components/Footer";
import CookieBanner from"@/components/CookieBanner";
import BackToTop from"@/components/BackToTop";
import ThemeProvider from "@/components/ThemeProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ColoringBookProvider } from "@/context/ColoringBookContext";
import { safeJsonLd } from "@/lib/api";
import PageTransition from "@/components/PageTransition";
import StickyBottomAd from "@/components/StickyBottomAd";
import GoogleTranslator from "@/components/GoogleTranslator";
import HolidayDecorationOverlay from "@/components/HolidayDecorationOverlay";

export const viewport: Viewport = {
  width:"device-width",
  initialScale: 1,
  maximumScale: 5,
};

const fredoka = Fredoka({ 
  subsets: ['latin'], 
  weight: ['300','400','500','600','700'],
  variable:'--font-display',
  display:'swap',
});
const nunito = Nunito({ 
  subsets: ['latin'], 
  weight: ['400','500','600','700','800','900'],
  variable:'--font-body',
  display:'swap',
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://colormenow.shop"),
  title: {
    template:"%s | ColorMeNow.shop",
    default:"ColorMeNow.shop | Printable Coloring Books & Pages",
  },
  description:"Download thousands of high-quality printable coloring pages and premium coloring book packs.",
  openGraph: {
    siteName: "ColorMeNow.shop",
    type: "website",
    images: [
      {
        url: "https://colormenow.shop/images/og-share.jpg",
        secureUrl: "https://colormenow.shop/images/og-share.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "ColorMeNow.shop — Printable Coloring Books & Pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://colormenow.shop/images/og-share.jpg"],
  },
  verification: {
    other: {
      "p:domain_verify": "bb488ddad4ca7ae628902aaf24e447da",
    },
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "nl" }, { lang: "de" }, { lang: "fr" }];
}

function getSkipLinkText(lang: string): string {
  switch (lang) {
    case 'nl':
      return 'Naar hoofdinhoud springen';
    case 'de':
      return 'Zum Hauptinhalt springen';
    case 'fr':
      return 'Aller au contenu principal';
    case 'en':
    default:
      return 'Skip to main content';
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${fredoka.variable} ${nunito.variable}`} data-theme="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1184801748776428" />
        <meta name="p:domain_verify" content="314125f62194f4aab9b5275a55bc34a2" />
      </head>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1184801748776428"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config','${gaId}');`}
            </Script>
          </>
        )}

        <a href="#main-content" className="skip-link">
          {getSkipLinkText(lang)}
        </a>
        <script
          type="application/ld+json"dangerouslySetInnerHTML={{ __html: safeJsonLd({"@context":"https://schema.org","@graph": [
              {"@type":"WebSite","@id":"https://colormenow.shop/#website","url":"https://colormenow.shop","name":"ColorMeNow.shop","description":"Printable coloring pages and book packs","inLanguage": ["en", "nl", "de", "fr"],"potentialAction": [{"@type":"SearchAction","target": {"@type":"EntryPoint","urlTemplate":`https://colormenow.shop/${lang}/search?q={search_term_string}`},"query-input":"required name=search_term_string"}]
              },
              {"@type":"Organization","@id":"https://colormenow.shop/#organization","name":"ColorMeNow.shop","url":"https://colormenow.shop","logo": {"@type":"ImageObject","url":"https://colormenow.shop/images/banner.jpg","width": 1200,"height": 630
                }
              }
            ]
          }) }}
        />
        <ThemeProvider>
          <FavoritesProvider>
            <ColoringBookProvider>
              <div className="layout-container">
                <HolidayDecorationOverlay lang={lang} />
                <Navbar lang={lang} />
                <main id="main-content"><PageTransition>{children}</PageTransition></main>
                <Footer lang={lang} />
                <CookieBanner lang={lang} />
                <BackToTop />
                <GoogleTranslator />
                <StickyBottomAd isEn={lang !== 'nl'} />
              </div>
            </ColoringBookProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
