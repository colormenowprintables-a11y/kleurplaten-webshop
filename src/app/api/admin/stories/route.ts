import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isAdminLoggedIn } from '@/lib/adminAuth';
import { Story, STORY_CATEGORIES } from '@/data/stories';

export const dynamic = 'force-dynamic';

const STORIES_FILE = path.join(process.cwd(), 'src', 'data', 'stories.json');

function readStories(): Record<'nl' | 'en', Story[]> {
  try {
    if (fs.existsSync(STORIES_FILE)) {
      const raw = fs.readFileSync(STORIES_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      return {
        nl: Array.isArray(parsed.nl) ? parsed.nl : [],
        en: Array.isArray(parsed.en) ? parsed.en : [],
      };
    }
  } catch (err) {
    console.error('Error reading stories.json:', err);
  }
  return { nl: [], en: [] };
}

function writeStories(data: Record<'nl' | 'en', Story[]>): void {
  fs.writeFileSync(STORIES_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = readStories();
  return NextResponse.json({
    stories: data,
    categories: STORY_CATEGORIES,
  });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { story } = body;

    if (!story || !story.title || !story.content) {
      return NextResponse.json({ error: 'Titel en verhaaltekst zijn verplicht.' }, { status: 400 });
    }

    const lang: 'nl' | 'en' = story.lang === 'en' ? 'en' : 'nl';
    const data = readStories();
    const list = data[lang] || [];

    // Genereer slug als die ontbreekt
    if (!story.slug) {
      story.slug = story.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Default datum
    if (!story.date) {
      story.date = new Date().toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    // Bestaand verhaal bijwerken of nieuw toevoegen
    const existingIndex = list.findIndex(s => s.slug === story.slug);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...story };
    } else {
      list.unshift(story);
    }

    data[lang] = list;
    writeStories(data);

    return NextResponse.json({ success: true, story });
  } catch (err: any) {
    console.error('Error in /api/admin/stories:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isAdminLoggedIn();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const lang: 'nl' | 'en' = (searchParams.get('lang') as any) === 'en' ? 'en' : 'nl';

    if (!slug) {
      return NextResponse.json({ error: 'Slug is verplicht' }, { status: 400 });
    }

    const data = readStories();
    data[lang] = (data[lang] || []).filter(s => s.slug !== slug);
    writeStories(data);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error deleting story:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
