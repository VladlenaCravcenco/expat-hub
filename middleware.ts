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
const SITE_URL = 'https://www.lexbusinesshub.ro';
const BASE_OG_IMAGE = `${SITE_URL}/og-image-base.jpg`;
const EVENT_OG_IMAGE = `${SITE_URL}/og-image-event.jpg`;
const OG_LOCALES: Record<string, string> = {
  ro: 'ro_RO',
  ru: 'ru_RU',
  en: 'en_US',
  uk: 'uk_UA',
};

const EVENT_META: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string }> = {
  ro: {
    title: 'Seminar practic în București — LEX Business Hub',
    desc: 'Seminar practic despre contabilitate și administrarea companiei pentru antreprenori în România.',
    ogTitle: 'Seminar practic: contabilitate și administrarea companiei',
    ogDesc: 'Eveniment LEX Business Hub pentru antreprenori: responsabilități, verificări și administrarea companiei.',
  },
  ru: {
    title: 'Практический семинар в Бухаресте — LEX Business Hub',
    desc: 'Практический семинар о бухгалтерии и администрировании компании для предпринимателей в Румынии.',
    ogTitle: 'Практический семинар: бухгалтерия и администрирование компании',
    ogDesc: 'Ивент LEX Business Hub для предпринимателей: ответственность, проверки и управление компанией.',
  },
  en: {
    title: 'Practical Seminar in Bucharest — LEX Business Hub',
    desc: 'A practical seminar on accounting and company administration for entrepreneurs in Romania.',
    ogTitle: 'Practical seminar: accounting and company administration',
    ogDesc: 'LEX Business Hub event for entrepreneurs: responsibilities, checks and company administration.',
  },
  uk: {
    title: 'Практичний семінар у Бухаресті — LEX Business Hub',
    desc: 'Практичний семінар про бухгалтерію та адміністрування компанії для підприємців у Румунії.',
    ogTitle: 'Практичний семінар: бухгалтерія та адміністрування компанії',
    ogDesc: 'Івент LEX Business Hub для підприємців: відповідальність, перевірки та управління компанією.',
  },
};

export default async function middleware(req: Request): Promise<Response> {
  const cookie = req.headers.get('cookie') ?? '';
  const match  = cookie.match(/(?:^|; )lang=([^;]*)/);
  
  // Используем язык из куки, иначе DEFAULT (русский)
  const lang   = (match && LANGS.includes(match[1])) ? match[1] : DEFAULT;
  const m      = META[lang];

  // подтягиваем оригинальный index.html
  const url      = new URL(req.url);
  const isEventPage = url.pathname === '/events' || url.pathname.startsWith('/events/');
  const pageMeta = isEventPage ? EVENT_META[lang] : m;
  const ogImage = isEventPage ? EVENT_OG_IMAGE : BASE_OG_IMAGE;
  const ogType = isEventPage ? 'event' : 'website';
  const ogImageWidth = isEventPage ? '818' : '1200';
  const ogImageHeight = isEventPage ? '429' : '630';
  const ogImageAlt = isEventPage
    ? 'LEX Business Hub practical seminar in Bucharest'
    : 'LEX Business Hub — Servicii juridice și de afaceri în România';
  const pageUrl = `${SITE_URL}${url.pathname === '/index.html' ? '/' : url.pathname}`;

  url.pathname   = '/index.html';
  const original = await fetch(url.toString());
  let html       = await original.text();

  // патчим теги
  html = html
    .replace(/(<html[^>]*lang=")[^"]*(")/,             `$1${m.lang}$2`)
    .replace(/(<title>)[^<]*(<\/title>)/,              `$1${pageMeta.title}$2`)
    .replace(/(<meta\s+name="description"[^>]*content=")[^"]*(")/,       `$1${pageMeta.desc}$2`)
    .replace(/(<meta\s+property="og:type"[^>]*content=")[^"]*(")/,       `$1${ogType}$2`)
    .replace(/(<meta\s+property="og:title"[^>]*content=")[^"]*(")/,      `$1${pageMeta.ogTitle}$2`)
    .replace(/(<meta\s+property="og:description"[^>]*content=")[^"]*(")/,`$1${pageMeta.ogDesc}$2`)
    .replace(/(<meta\s+property="og:url"[^>]*content=")[^"]*(")/,        `$1${pageUrl}$2`)
    .replace(/(<meta\s+property="og:image"[^>]*content=")[^"]*(")/,      `$1${ogImage}$2`)
    .replace(/(<meta\s+property="og:image:width"[^>]*content=")[^"]*(")/, `$1${ogImageWidth}$2`)
    .replace(/(<meta\s+property="og:image:height"[^>]*content=")[^"]*(")/, `$1${ogImageHeight}$2`)
    .replace(/(<meta\s+property="og:image:alt"[^>]*content=")[^"]*(")/,   `$1${ogImageAlt}$2`)
    .replace(/(<meta\s+property="og:locale"[^>]*content=")[^"]*(")/,     `$1${OG_LOCALES[lang]}$2`)
    .replace(/(<meta\s+name="twitter:title"[^>]*content=")[^"]*(")/,     `$1${pageMeta.ogTitle}$2`)
    .replace(/(<meta\s+name="twitter:description"[^>]*content=")[^"]*(")/, `$1${pageMeta.ogDesc}$2`)
    .replace(/(<meta\s+name="twitter:image"[^>]*content=")[^"]*(")/,     `$1${ogImage}$2`);

  return new Response(html, {
    headers: {
      'content-type':  'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'vary': 'Accept-Language, Cookie',
    },
  });
}

export const config = {
  matcher: ['/', '/index.html', '/events', '/events/'],
  runtime: 'edge',
};
