import { NextResponse } from 'next/server';

const ALLOWED_HOSTNAMES = new Set([
  'colormenow.ams3.cdn.digitaloceanspaces.com',
  'colormenow.ams3.digitaloceanspaces.com'
]);

const ALLOWED_ORIGINS = [
  'https://colormenow.shop',
  'https://www.colormenow.shop',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get('origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return origin;
  }
  return 'https://colormenow.shop';
}

export async function OPTIONS(request: Request) {
  const origin = getAllowedOrigin(request);
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  let targetUrl = url;
  if (url.startsWith('/')) {
    const origin = new URL(request.url).origin;
    targetUrl = `${origin}${url}`;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl, request.url);
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  const requestHost = new URL(request.url).hostname;
  const isAllowedHost = 
    url.startsWith('/') ||
    ALLOWED_HOSTNAMES.has(parsedUrl.hostname) ||
    parsedUrl.hostname === requestHost ||
    parsedUrl.hostname === 'localhost' ||
    parsedUrl.hostname === '127.0.0.1';

  if (!isAllowedHost) {
    return new NextResponse('URL not allowed', { status: 403 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(targetUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();
    
    const basename = parsedUrl.pathname.split('/').pop() || '';
    const sanitizedFilename = basename.replace(/[^a-zA-Z0-9.-]/g, '') || 'colormenow-page.jpg';
    const origin = getAllowedOrigin(request);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${sanitizedFilename}"`,
        'Access-Control-Allow-Origin': origin,
        'Vary': 'Origin',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error: unknown) {
    clearTimeout(timeout);
    if (error instanceof Error && error.name === 'AbortError') {
      return new NextResponse('Gateway Timeout', { status: 504 });
    }
    console.error('Proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

