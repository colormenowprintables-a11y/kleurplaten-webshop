import { publishedStories, getRelatedStories } from '@/data/stories';
import StoryReadingView from '@/components/StoryReadingView';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ['en', 'nl', 'de', 'fr']) {
    const stories = publishedStories[lang === 'nl' ? 'nl' : 'en'] || publishedStories.nl;
    for (const story of stories) {
      params.push({ lang, slug: story.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const stories = publishedStories[lang === 'nl' ? 'nl' : 'en'] || publishedStories.nl;
  const story = stories.find(s => s.slug === slug);

  if (!story) {
    return {
      title: 'Verhaal Niet Gevonden | ColorMeNow',
    };
  }

  const shareImage = story.image.startsWith('http')
    ? story.image
    : `https://colormenow.shop${story.image}`;

  return {
    title: `${story.title} | Colorful Stories`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: 'article',
      url: `https://colormenow.shop/${lang}/stories/${story.slug}`,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.excerpt,
      images: [shareImage],
    },
    alternates: {
      canonical: `https://colormenow.shop/${lang}/stories/${story.slug}`,
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const stories = publishedStories[lang === 'nl' ? 'nl' : 'en'] || publishedStories.nl;
  const story = stories.find(s => s.slug === slug);

  if (!story) {
    notFound();
  }

  const related = getRelatedStories(story.slug, story.category, lang === 'nl' ? 'nl' : 'en', 3);

  // Schema.org Article Structured Data voor optimale SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.excerpt,
    image: story.image.startsWith('http') ? story.image : `https://colormenow.shop${story.image}`,
    datePublished: story.date,
    author: {
      '@type': 'Organization',
      name: 'Colorful Stories - Color Me Now',
      url: 'https://colormenow.shop',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Color Me Now',
      logo: {
        '@type': 'ImageObject',
        url: 'https://colormenow.shop/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://colormenow.shop/${lang}/stories/${story.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryReadingView story={story} relatedStories={related} lang={lang} />
    </>
  );
}
