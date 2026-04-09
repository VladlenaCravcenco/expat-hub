// middleware.ts — корень проекта (рядом с vite.config.ts)
// Vercel Edge Middleware — без Next.js, чистый Web API

const META: Record<string, { lang: string; title: string; desc: string; ogTitle: string; ogDesc: string }> = {
  ro: {
    lang: 'ro',
    title: 'LEX Business Hub — Servicii juridice și de afaceri în România',
    desc: 'Deschideți și dezvoltați o afacere în România. Servicii juridice, de traducere și marketing pentru antreprenori străini.',
    ogTitle: 'LEX Business Hub — Afaceri în România, simplu și rapid',
    ogDesc: 'Servicii juridice, de traducere și marketing pentru antreprenori străini în România.',
  },
  ru: {
    lang: 'ru',
    title: 'LEX Business Hub — Юридические и бизнес-услуги в Румынии',
    desc: 'Откройте бизнес в Румынии с профессиональной поддержкой. Юридические, переводческие и маркетинговые услуги.',
    ogTitle: 'LEX Business Hub — Бизнес в Румынии под ключ',
    ogDesc: 'Юридические услуги, переводы и маркетинг для иностранцев в Румынии.',
  },
  en: {
    lang: 'en',
    title: 'LEX Business Hub — Legal & Business Services in Romania',
    desc: 'Open and grow your business in Romania. Legal, translation and marketing services for foreigners.',
    ogTitle: 'LEX Business Hub — Business in Romania, Made Simple',
    ogDesc: 'Legal, translation and marketing services for foreign entrepreneurs in Romania.',
  },
  uk: {
    lang: 'uk',
    title: 'LEX Business Hub — Юридичні та бізнес-послуги в Румунії',
    desc: 'Відкрийте бізнес у Румунії з професійною підтримкою. Юридичні, перекладацькі та маркетингові послуги.',
    ogTitle: 'LEX Business Hub — Бізнес у Румунії під ключ',
    ogDesc: 'Юридичні, перекладацькі та маркетингові послуги для іноземців у Румунії.',
  },
};

const LANGS = Object.keys(META);
const DEFAULT = 'ru';
const OG_IMAGE = 'https://www.lexbusinesshub.ro/og-image.jpg';

export default async function middleware(req: Request): Promise<Response> {
  const cookie = req.headers.get('cookie') ?? '';
  const match  = cookie.match(/(?:^|; )lang=([^;]*)/);
  const lang   = match && LANGS.includes(match[1]) ? match[1] : DEFAULT;
  const m      = META[lang];

  // подтягиваем оригинальный index.html
  const url      = new URL(req.url);
  url.pathname   = '/index.html';
  const original = await fetch(url.toString());
  let html       = await original.text();

  // патчим теги
  html = html
    .replace(/(<html[^>]*lang=")[^"]*(")/,             `$1${m.lang}$2`)
    .replace(/(<title>)[^<]*(<\/title>)/,              `$1${m.title}$2`)
    .replace(/(<meta\s+name="description"[^>]*content=")[^"]*(")/,       `$1${m.desc}$2`)
    .replace(/(<meta\s+property="og:title"[^>]*content=")[^"]*(")/,      `$1${m.ogTitle}$2`)
    .replace(/(<meta\s+property="og:description"[^>]*content=")[^"]*(")/,`$1${m.ogDesc}$2`)
    .replace(/(<meta\s+property="og:image"[^>]*content=")[^"]*(")/,      `$1${OG_IMAGE}$2`)
    .replace(/(<meta\s+property="og:locale"[^>]*content=")[^"]*(")/,     `$1${m.lang}$2`);

  return new Response(html, {
    headers: {
      'content-type':  'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export const config = {
  matcher: ['/', '/index.html'],
  runtime: 'edge',
};