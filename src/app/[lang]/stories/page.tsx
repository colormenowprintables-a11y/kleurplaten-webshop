import { publishedStories } from '@/data/stories';
import StoriesOverviewView from '@/components/StoriesOverviewView';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isNl = lang === 'nl';

  const title = isNl
    ? 'Colorful Stories | Meeslepende Levensverhalen & Drama | ColorMeNow'
    : 'Colorful Stories | Real Life Stories, Love & Drama | ColorMeNow';
  const description = isNl
    ? 'Ontdek gratis meeslepende, ontroerende en herkenbare verhalen uit het echte leven. Volledig leesbaar zonder storende reclame of verplichte kliks.'
    : 'Read gripping, heartfelt and real life stories about love, family, and unexpected twists. Completely free and ad-free.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://colormenow.shop/${lang}/stories`,
    },
    alternates: {
      canonical: `https://colormenow.shop/${lang}/stories`,
    },
  };
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const stories = (publishedStories[lang === 'nl' ? 'nl' : 'en']?.length ? publishedStories[lang === 'nl' ? 'nl' : 'en'] : publishedStories.nl) || [];

  return <StoriesOverviewView stories={stories} lang={lang} />;
}
