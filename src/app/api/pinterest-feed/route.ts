import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

function cleanTitle(title: string, theme: string, hub: string): string {
  if (!title) {
    const formattedTheme = theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `${formattedTheme} Coloring Sheet`;
  }
  
  let cleaned = title.trim();
  
  // Clean known broken prefixes
  if (/^a\s+mythical\s+[a-z]?\s*(\(|$)/i.test(cleaned)) {
    cleaned = cleaned.replace(/^a\s+mythical\s+[a-z]?\b/i, 'Mythical Fantasy Beast');
  }
  if (/^a\s+clean\s+printa?\b/i.test(cleaned)) {
    cleaned = cleaned.replace(/^a\s+clean\s+printa?\b/i, 'Pixel Game World Scene');
  }
  
  if (cleaned.length <= 4) {
    const formattedTheme = theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    cleaned = `${formattedTheme} Printable`;
  }
  
  return cleaned;
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
    
    // Strict hub-specific filtering
    if (hubFilter === 'disney-pixar') {
      validPages = validPages.filter((p: any) => p.parentHub === 'disney-pixar');
    } else if (hubFilter === 'anime-manga') {
      validPages = validPages.filter((p: any) => p.parentHub === 'anime-manga');
    } else if (hubFilter === 'gaming-virtual-worlds' || hubFilter === 'gaming') {
      validPages = validPages.filter((p: any) => p.parentHub === 'gaming-virtual-worlds');
    } else if (hubFilter === 'superheroes-comic-universes' || hubFilter === 'superheroes') {
      validPages = validPages.filter((p: any) => p.parentHub === 'superheroes-comic-universes');
    } else if (hubFilter === 'kids-tv-shows' || hubFilter === 'cartoons') {
      validPages = validPages.filter((p: any) => p.parentHub === 'kids-tv-shows');
    } else if (hubFilter === 'animals-wildlife' || hubFilter === 'animals') {
      validPages = validPages.filter((p: any) => p.parentHub === 'animals-wildlife');
    } else if (hubFilter === 'art-aesthetic' || hubFilter === 'mandalas') {
      validPages = validPages.filter((p: any) => p.parentHub === 'art-aesthetic');
    } else if (hubFilter === 'fantasy-fairytales' || hubFilter === 'fantasy') {
      validPages = validPages.filter((p: any) => p.parentHub === 'fantasy-fairytales');
    } else if (hubFilter === 'halloween') {
      validPages = validPages.filter((p: any) => 
        (p.parentTheme || '').toLowerCase().includes('halloween') ||
        (p.title || '').toLowerCase().includes('halloween')
      );
    } else if (hubFilter) {
      validPages = validPages.filter((p: any) => (p.parentHub || '').toLowerCase() === hubFilter);
    } else if (themeFilter) {
      validPages = validPages.filter((p: any) => (p.parentTheme || '').toLowerCase().includes(themeFilter));
    } else {
      // Default general feed: curated mix of top popular character hubs
      const popularHubs = ['disney-pixar', 'anime-manga', 'gaming-virtual-worlds', 'superheroes-comic-universes', 'kids-tv-shows', 'animals-wildlife'];
      validPages = validPages.filter((p: any) => popularHubs.includes(p.parentHub));
    }
    
    // Rotate items daily based on day of the year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const batchSize = 50;
    const startIndex = (dayOfYear * 25) % Math.max(1, validPages.length - batchSize);
    const selectedPages = validPages.slice(startIndex, startIndex + batchSize);

    const escapeXml = (unsafe: string) => {
      if (!unsafe) return '';
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const freebieAndAffiliateItems = `
    <item>
      <title>🎁 Printable Freebies &amp; Free Coloring Sample Packs (A4 PDF)</title>
      <link>https://colormenow.shop/en/freebies</link>
      <guid isPermaLink="true">https://colormenow.shop/en/freebies</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[<p>Download 100% free printable freebies and sample coloring packs in A4 PDF format! Animals, mandalas, dinosaurs and cozy cottage life.</p><img src="https://colormenow.shop/covers/50_cute_animals_cover.png" alt="Printable Freebies" />]]></description>
      <enclosure url="https://colormenow.shop/covers/50_cute_animals_cover.png" type="image/png" length="102400" />
    </item>
    <item>
      <title>📦 Amazon KDP Physical Paperback Coloring Books</title>
      <link>https://colormenow.shop/en/kdp</link>
      <guid isPermaLink="true">https://colormenow.shop/en/kdp</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[<p>Browse our official Amazon KDP physical paperback coloring books with high-quality printed paper delivered straight to your door!</p><img src="https://colormenow.shop/covers/gothic_kawaii_carnival_cover.png" alt="Amazon KDP Books" />]]></description>
      <enclosure url="https://colormenow.shop/covers/gothic_kawaii_carnival_cover.png" type="image/png" length="102400" />
    </item>
    <item>
      <title>🎨 Top Recommended Coloring Supplies &amp; Heavyweight Paper</title>
      <link>https://colormenow.shop/en/recommendations</link>
      <guid isPermaLink="true">https://colormenow.shop/en/recommendations</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[<p>Discover the best 160g paper, alcohol brush markers, Faber-Castell pencils, and craft kits for flawless coloring results.</p><img src="https://colormenow.shop/affiliates/ohuhu-honolulu-markers.jpg" alt="Recommended Coloring Supplies" />]]></description>
      <enclosure url="https://colormenow.shop/affiliates/ohuhu-honolulu-markers.jpg" type="image/jpeg" length="102400" />
    </item>`;

    const itemsXml = freebieAndAffiliateItems + selectedPages.map((page: any) => {
      const hub = page.parentHub || 'disney-pixar';
      const theme = page.parentTheme || 'frozen';
      const age = page.ageGroup || 'kids';
      const slug = page.slug;
      const rawTitle = page.title || 'Coloring Page';
      const title = cleanTitle(rawTitle, theme, hub);
      
      // Use colored artwork image if mapped, fallback to standard image
      const mappedColored = coloredSlugMap[slug]?.coloredImage;
      const rawImg = mappedColored || page.image || page.downloadableFile;
      const imgUrl = rawImg.startsWith('http') ? rawImg : `https://colormenow.shop${rawImg}`;
      
      const pageUrl = `https://colormenow.shop/en/${hub}/${theme}/${age}/${slug}`;
      const description = `Download & print this free ${title} coloring page! High-resolution A4 & Letter PDF format ready to print at home or school. Printable coloring page on ColorMeNow.shop.`;

      return `
    <item>
      <title>${escapeXml(title)} - Free Printable Coloring Page</title>
      <link>${escapeXml(pageUrl)}</link>
      <guid isPermaLink="true">${escapeXml(pageUrl)}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[<p>${description}</p><img src="${imgUrl}" alt="${escapeXml(title)}" />]]></description>
      <enclosure url="${escapeXml(imgUrl)}" type="image/jpeg" length="102400" />
    </item>`;
    }).join('');

    const channelTitle = hubFilter 
      ? `ColorMeNow.shop - ${hubFilter} Coloring Pages`
      : 'ColorMeNow.shop - Free Printable Coloring Pages';

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>https://colormenow.shop</link>
    <description>Printable coloring books and pages for kids, toddlers, teens, and adults.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://colormenow.shop/api/pinterest-feed" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    return new NextResponse(`Error generating feed: ${err.message}`, { status: 500 });
  }
}
