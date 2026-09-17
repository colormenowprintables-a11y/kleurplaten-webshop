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

    const samplesPath = path.join(process.cwd(), 'src', 'data', 'book-samples.json');
    let bookSamples: Record<string, string[]> = {};
    if (fs.existsSync(samplesPath)) {
      try {
        bookSamples = JSON.parse(fs.readFileSync(samplesPath, 'utf-8'));
      } catch (e) {}
    }


    const baseDate = new Date('2026-09-01T12:00:00Z').toUTCString();

    // 1. GOODIES & PROMOS POOL
    const goodiesPool: any[] = [
      {
        title: '🎁 100% Free Printable Coloring Freebies & Sample Packs (A4 PDF)',
        link: 'https://colormenow.shop/en/freebies',
        img: 'https://colormenow.shop/covers/50_cute_animals_cover.png',
        desc: 'Download 100% free printable coloring sample packs in A4 PDF format! Animals, mandalas, dinosaurs and cozy cottage life.',
      },
      {
        title: '💥 100 Mega Pack Coloring Book Deal (Only €1.00 — 1 Cent Per Page!)',
        link: 'https://colormenow.shop/en/special-deals-promo-packs/promo-packs/all-ages/100-mega-pack',
        img: 'https://colormenow.shop/covers/100_mega_pack_cover.png',
        desc: 'Get our biggest 100-page mega coloring book collection for just €1.00 (that is only 1 cent per page)! 100 hours of relaxing creative coloring in print-ready A4 PDF.',
      },
      {
        title: '📦 Amazon KDP Physical Paperback Coloring Books',
        link: 'https://colormenow.shop/en/kdp',
        img: 'https://colormenow.shop/covers/gothic_kawaii_carnival_cover.png',
        desc: 'Browse our official Amazon KDP physical paperback coloring books with high-quality printed paper delivered straight to your door!',
      },
      {
        title: '🎨 Top Recommended Coloring Markers, Pencils & Heavyweight 160g Paper',
        link: 'https://colormenow.shop/en/recommendations',
        img: 'https://colormenow.shop/affiliates/ohuhu-honolulu-markers.jpg',
        desc: 'Discover the best 160g paper, alcohol brush markers, Faber-Castell pencils, and craft kits for flawless coloring results.',
      },
      {
        title: '🏡 50 Cozy Cottages Promo Pack (Only €0.50)',
        link: 'https://colormenow.shop/en/special-deals-promo-packs/promo-packs/all-ages/50-cozy-cottages',
        img: 'https://colormenow.shop/covers/50_cozy_cottages_cover.png',
        desc: 'Download 50 peaceful storybook cottage coloring pages for just €0.50! High resolution print-ready PDF.',
      },
      {
        title: '🍬 50 Kawaii Sweets & Desserts Promo Pack (€0.50)',
        link: 'https://colormenow.shop/en/special-deals-promo-packs/promo-packs/all-ages/50-kawaii-sweets',
        img: 'https://colormenow.shop/covers/50_kawaii_sweets_cover.png',
        desc: '50 adorable sweet treats, cupcakes, boba tea and donut characters ready to print and color.',
      },
      {
        title: '🚛 50 Monster Trucks Action Pack (€0.50)',
        link: 'https://colormenow.shop/en/special-deals-promo-packs/promo-packs/all-ages/50-monster-trucks',
        img: 'https://colormenow.shop/covers/50_monster_trucks_cover.png',
        desc: '50 giant monster trucks, arena stunts, and off-road racers for kids and toddlers.',
      }
    ];

    // 2. COLORED ARTWORK POOL
    const coloredPool: any[] = [];
    // 3. BOOK COVERS POOL
    const coversPool: any[] = [];
    // 4. BLACK & WHITE LINE ART POOL
    const bwPool: any[] = [];

    validPages.forEach((page: any) => {
      const hub = page.parentHub || 'cute-animals-fantasy';
      const theme = page.parentTheme || 'cute-animals';
      const age = page.ageGroup || 'all-ages';
      const slug = page.slug;
      const rawTitle = page.title || 'Coloring Page';
      const title = cleanTitle(rawTitle, theme);
      const pageUrl = `https://colormenow.shop/en/${hub}/${theme}/${age}/${slug}`;

      // If page has a mapped colored version that matches the title/slug keywords
      const mappedColored = coloredSlugMap[slug]?.coloredImage;
      const mappedTitle = (coloredSlugMap[slug]?.title || '').toLowerCase();
      const currentSlugClean = slug.replace(/-/g, ' ');
      // Only include colored inspiration if title/slug matches to prevent cross-theme mismatch
      if (mappedColored && mappedTitle && currentSlugClean.split(' ').slice(0, 2).some(word => mappedTitle.includes(word))) {
        const fullColored = mappedColored.startsWith('http') ? mappedColored : `https://colormenow.shop${mappedColored}`;
        coloredPool.push({
          title: `🎨 ${title} (Finished Color Inspiration)`,
          link: pageUrl,
          img: fullColored,
          desc: `Stunning colored inspiration artwork for ${title}! Download the printable PDF coloring book directly on ColorMeNow.shop.`,
        });
      }

      // Official Book Cover
      if (page.image) {
        const fullCover = page.image.startsWith('http') ? page.image : `https://colormenow.shop${page.image}`;
        coversPool.push({
          title: `📖 ${title} - Complete Coloring Book (A4 PDF)`,
          link: pageUrl,
          img: fullCover,
          desc: `Full digital coloring book: ${title}. High-resolution 35-50 pages print-ready PDF book for home or classroom.`,
        });
      }

      // Clean Black & White Line Art interior
      const sample = bookSamples[slug]?.[0] || page.downloadableFile;
      if (sample) {
        const fullBw = sample.startsWith('http') ? sample : `https://colormenow.shop${sample}`;
        bwPool.push({
          title: `✏️ Printable ${title} (Black & White Line Art)`,
          link: pageUrl,
          img: fullBw,
          desc: `Clean, crisp black and white line art coloring page: ${title}. Free printable preview in crisp A4 format.`,
        });
      }
    });

    // 5. SCHOOL WORKSHEETS POOL
    const schoolPool: any[] = [
      {
        title: '🏫 Free Educational Math Counting & Numbers Worksheets (A-Z)',
        link: 'https://colormenow.shop/en/school',
        img: 'https://colormenow.shop/covers/50_cute_animals_cover.png',
        desc: 'Over 100+ free educational coloring worksheets for teachers, classrooms, preschool, and homeschooling! Math, letters, and handwriting.',
      },
      {
        title: '🍎 Number 1 to 10 Tracing & Counting Worksheets for Kindergarten',
        link: 'https://colormenow.shop/en/school',
        img: 'https://colormenow.shop/covers/50_cozy_cottages_cover.png',
        desc: 'Free educational math worksheets with cute animal counting and number tracing practice in A4 PDF.',
      },
      {
        title: '✏️ Alphabet Letter Tracing A to Z Handwriting Practice Sheets',
        link: 'https://colormenow.shop/en/school',
        img: 'https://colormenow.shop/covers/50_relaxing_mandalas_cover.png',
        desc: 'Printable handwriting and letter tracing sheets for preschool, kindergarten and early elementary school.',
      },
      {
        title: '📐 Simple Visual Addition & Math Puzzles for Classroom Use',
        link: 'https://colormenow.shop/en/school',
        img: 'https://colormenow.shop/covers/100_mega_pack_cover.png',
        desc: 'Educational math addition worksheets with visual animals and fruits to color and count.',
      },
      {
        title: '🐶 Animal Vocabulary & Spelling Educational Coloring Sheets',
        link: 'https://colormenow.shop/en/school',
        img: 'https://colormenow.shop/covers/50_cute_gothic_cover.png',
        desc: 'Learn spelling and animal names with printable educational coloring worksheets for kids and teachers.',
      }
    ];

    // ROUND-ROBIN INTERLEAVE: 1 Goodie -> 1 Gekleurd -> 1 Cover -> 1 School -> 1 Zwart-Wit
    const mixedItems: any[] = [];
    const maxFeedItems = 220;
    let g = 0, c = 0, cov = 0, s = 0, bw = 0;

    while (
      mixedItems.length < maxFeedItems &&
      (g < goodiesPool.length || c < coloredPool.length || cov < coversPool.length || s < schoolPool.length || bw < bwPool.length)
    ) {
      if (g < goodiesPool.length) mixedItems.push(goodiesPool[g++]);
      if (c < coloredPool.length) mixedItems.push(coloredPool[c++]);
      if (cov < coversPool.length) mixedItems.push(coversPool[cov++]);
      if (s < schoolPool.length) mixedItems.push(schoolPool[s++]);
      if (bw < bwPool.length) mixedItems.push(bwPool[bw++]);

      // Loop over pools if one runs out
      if (g >= goodiesPool.length && mixedItems.length < maxFeedItems) g = 0;
      if (s >= schoolPool.length && mixedItems.length < maxFeedItems) s = 0;
    }

    const itemsXml = mixedItems.map((item: any, idx: number) => {
      const itemDate = new Date(Date.UTC(2026, 8, 1 + (idx % 14), (idx * 3) % 24, (idx * 7) % 60)).toUTCString();
      return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="false">${escapeXml(item.link)}#pin-${idx}</guid>
      <pubDate>${itemDate}</pubDate>
      <description><![CDATA[<p>${item.desc}</p><img src="${item.img}" alt="${escapeXml(item.title)}" />]]></description>
      <enclosure url="${escapeXml(item.img)}" type="image/jpeg" length="102400" />
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
