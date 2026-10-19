import { redirect } from 'next/navigation';
import path from 'path';
import fs from 'fs';

interface Props {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function ColoringBookRedirectPage({ params }: Props) {
  const { lang, slug } = await params;
  const currentLang = ['nl', 'en', 'de', 'fr'].includes(lang) ? lang : 'en';

  const dataPath = path.join(process.cwd(), 'src', 'data', currentLang, 'coloring-pages.json');
  const enDataPath = path.join(process.cwd(), 'src', 'data', 'en', 'coloring-pages.json');

  let books: any[] = [];
  if (fs.existsSync(dataPath)) {
    try {
      books = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } catch (e) {}
  }
  if (!books.length && fs.existsSync(enDataPath)) {
    try {
      books = JSON.parse(fs.readFileSync(enDataPath, 'utf-8'));
    } catch (e) {}
  }

  // Find by slug or partial match
  const cleanSlug = slug.toLowerCase().trim();
  let book = books.find((b: any) => (b.slug || '').toLowerCase() === cleanSlug);

  if (!book) {
    // Fallback: match without -coloring-pages
    const baseSlug = cleanSlug.replace(/-coloring-pages$/, '');
    book = books.find((b: any) => (b.slug || '').toLowerCase().startsWith(baseSlug));
  }

  if (book && book.parentHub && book.parentTheme && book.ageGroup && book.slug) {
    redirect(`/${currentLang}/${book.parentHub}/${book.parentTheme}/${book.ageGroup}/${book.slug}`);
  }

  // If not found, redirect to general catalog
  redirect(`/${currentLang}`);
}
