import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

function cleanTitle(title: string, theme: string): string {
  if (!title) {
    const formattedTheme = theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `${formattedTheme} Coloring Sheet`;
  }
  return title.trim();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hubFilter = searchParams.get('hub')?.toLowerCase();
    const themeFilter = searchParams.get('theme')?.toLowerCase();

    const dataPath = path.join(process.cwd(), 'src', 'data', 'en', 'coloring-pages.json');
    const mappingPath = path.join(process.cwd(), 'src', 'data', 'colored-mapping.json');

    if (!fs.existsSync(dataPath)) {
      return new NextResponse('Data not found', { status: 404 });
    }

    const allPages = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    let coloredSlugMap: Record<string, any> = {};
    if (fs.existsSync(mappingPath)) {
      try {
        const mappingJson = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
        coloredSlugMap = mappingJson.slugMap || {};
      } catch (err) {
        console.warn('Failed to parse colored-mapping.json:', err);
      }
    }
    
    // Filter valid pages with images
    let validPages = allPages.filter((p: any) => p.image && !p.image.includes('default.jpg'));
    
    // Filter valid pages from our 100% original hubs
    const ownHubs = [
      'kids-adventures',
      'cute-animals-fantasy',
      'cozy-life-cottagecore',
      'botanical-floral-art',
      'mindful-mandalas-patterns',
      'gothic-spooky-cute',
      'special-deals-promo-packs',
    ];

    if (hubFilter) {
      validPages = validPages.filter((p: any) => (p.parentHub || '').toLowerCase() === hubFilter);
    } else if (themeFilter) {
      validPages = validPages.filter((p: any) => (p.parentTheme || '').toLowerCase().includes(themeFilter));
    } else {
      validPages = validPages.filter((p: any) => ownHubs.includes(p.parentHub) || !p.parentHub);
    }
    
    // Select up to 200 items (Pinterest RSS supports up to 250 items) so all 198 books are included
    const selectedPages = validPages.slice(0, 200);

    const escapeXml = (unsafe: string) => {
      if (!unsafe) return '';
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const baseDate = new Date('2026-09-01T12:00:00Z').toUTCString();

    const freebieAndAffiliateItems = `
    <item>
      <title>🏫 Free Educational School Worksheets (Math, Letters, Coloring)</title>
      <link>https://colormenow.shop/en/school</link>
      <guid isPermaLink="true">https://colormenow.shop/en/school</guid>
      <pubDate>${baseDate}</pubDate>
      <description><![CDATA[<p>Download 100+ free printable educational coloring worksheets for teachers, classrooms, preschool, and homeschooling! Math counting, alphabet tracing, and handwriting sheets in print-ready A4 PDF.</p><img src="https://colormenow.shop/covers/50_cute_animals_cover.png" alt="Free School Educational Worksheets" />]]></description>
      <enclosure url="https://colormenow.shop/covers/50_cute_animals_cover.png" type="image/png" length="102400" />
    </item>
    <item>
      <title>🎁 Printable Freebies &amp; Free Coloring Sample Packs (A4 PDF)</title>
      <link>https://colormenow.shop/en/freebies</link>
      <guid isPermaLink="true">https://colormenow.shop/en/freebies</guid>
      <pubDate>${baseDate}</pubDate>
      <description><![CDATA[<p>Download 100% free printable freebies and sample coloring packs in A4 PDF format! Animals, mandalas, dinosaurs and cozy cottage life.</p><img src="https://colormenow.shop/covers/50_cute_animals_cover.png" alt="Printable Freebies" />]]></description>
      <enclosure url="https://colormenow.shop/covers/50_cute_animals_cover.png" type="image/png" length="102400" />
    </item>
    <item>
      <title>📦 Amazon KDP Physical Paperback Coloring Books</title>
      <link>https://colormenow.shop/en/kdp</link>
      <guid isPermaLink="true">https://colormenow.shop/en/kdp</guid>
      <pubDate>${baseDate}</pubDate>
      <description><![CDATA[<p>Browse our official Amazon KDP physical paperback coloring books with high-quality printed paper delivered straight to your door!</p><img src="https://colormenow.shop/covers/gothic_kawaii_carnival_cover.png" alt="Amazon KDP Books" />]]></description>
      <enclosure url="https://colormenow.shop/covers/gothic_kawaii_carnival_cover.png" type="image/png" length="102400" />
    </item>
    <item>
      <title>🎨 Top Recommended Coloring Supplies &amp; Heavyweight Paper</title>
      <link>https://colormenow.shop/en/recommendations</link>
      <guid isPermaLink="true">https://colormenow.shop/en/recommendations</guid>
      <pubDate>${baseDate}</pubDate>
      <description><![CDATA[<p>Discover the best 160g paper, alcohol brush markers, Faber-Castell pencils, and craft kits for flawless coloring results.</p><img src="https://colormenow.shop/affiliates/ohuhu-honolulu-markers.jpg" alt="Recommended Coloring Supplies" />]]></description>
      <enclosure url="https://colormenow.shop/affiliates/ohuhu-honolulu-markers.jpg" type="image/jpeg" length="102400" />
    </item>`;

    const itemsXml = freebieAndAffiliateItems + selectedPages.map((page: any, idx: number) => {
      const hub = page.parentHub || 'cute-animals-fantasy';
      const theme = page.parentTheme || 'cute-animals';
      const age = page.ageGroup || 'all-ages';
      const slug = page.slug;
      const rawTitle = page.title || 'Coloring Page';
      const title = cleanTitle(rawTitle, theme);
      
      // Use colored artwork image if mapped, fallback to standard image
      const mappedColored = coloredSlugMap[slug]?.coloredImage;
      const rawImg = mappedColored || page.image || page.downloadableFile;
      const imgUrl = rawImg.startsWith('http') ? rawImg : `https://colormenow.shop${rawImg}`;
      
      const pageUrl = `https://colormenow.shop/en/${hub}/${theme}/${age}/${slug}`;
      const description = `Download & print this free ${title} coloring page! High-resolution A4 & Letter PDF format ready to print at home or school. Printable coloring page on ColorMeNow.shop.`;

      // Stable publication date per item to avoid Pinterest re-pinning duplicates
      const itemDate = new Date(Date.UTC(2026, 8, 1 + (idx % 14), (idx * 3) % 24, (idx * 7) % 60)).toUTCString();

      return `
    <item>
      <title>${escapeXml(title)} - Premium Printable Coloring Page</title>
      <link>${escapeXml(pageUrl)}</link>
      <guid isPermaLink="true">${escapeXml(pageUrl)}</guid>
      <pubDate>${itemDate}</pubDate>
      <description><![CDATA[<p>${description}</p><img src="${imgUrl}" alt="${escapeXml(title)}" />]]></description>
      <enclosure url="${escapeXml(imgUrl)}" type="image/jpeg" length="102400" />
    </item>`;
    }).join('');

    const channelTitle = hubFilter 
      ? `ColorMeNow.shop - ${hubFilter} Coloring Books`
      : 'ColorMeNow.shop - Printable Coloring Books & Art';

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>https://colormenow.shop</link>
    <description>Printable coloring books and pages for kids, toddlers, teens, and adults.</description>
    <language>en-us</language>
    <lastBuildDate>${baseDate}</lastBuildDate>
    <atom:link href="https://colormenow.shop/api/pinterest-feed" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    return new NextResponse(`Error generating feed: ${err.message}`, { status: 500 });
  }
}
