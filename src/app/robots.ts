export const dynamic ='force-static';
import type { MetadataRoute } from'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent:'*',
        allow:'/',
        disallow: ['/api/','/_next/'],
      },
    ],
    sitemap: [
      'https://colormenow.shop/sitemap.xml',
      'https://colormenow.shop/sitemap-pages/en',
      'https://colormenow.shop/sitemap-pages/nl',
      'https://colormenow.shop/sitemap-pages/de',
      'https://colormenow.shop/sitemap-pages/fr',
    ],
  };
}
