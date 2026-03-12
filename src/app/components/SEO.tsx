import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const SITE_URL = 'https://lexbusinesshub.ro';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type LangKey = 'ro' | 'ru' | 'en' | 'uk';

interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  ogLocale: string;
}

const seoConfig: Record<LangKey, SeoConfig> = {
  ro: {
    title: 'LEX BUSINESS HUB | Înregistrarea afacerii în România pentru antreprenori',
    description:
      'Deschideți o companie SRL în România în 3–7 zile. Permis de ședere, traduceri notariale, asistență juridică și marketing pentru antreprenori ucraineni și străini în București.',
    keywords:
      'înregistrare afacere România, deschide SRL București, permis ședere România, relocare antreprenori ucraineni, traduceri notariale România, consultanță juridică imigranți, comunitate de afaceri România, LEX BUSINESS HUB',
    ogLocale: 'ro_RO',
  },
  ru: {
    title: 'LEX BUSINESS HUB | Регистрация бизнеса в Румынии для предпринимателей',
    description:
      'Откройте компанию в Румынии за 3–7 дней. ВНЖ, нотариальные переводы, юридическое сопровождение и маркетинг для украинских предпринимателей в Бухаресте. Полный цикл — от идеи до прибыли.',
    keywords:
      'регистрация бизнеса Румыния, открыть ООО Бухарест, ВНЖ Румыния украинцам, переезд в Румынию предпринимателям, нотариальные переводы Бухарест, юридические услуги иммигрантам, бизнес в Европе для украинцев, LEX BUSINESS HUB',
    ogLocale: 'ru_RU',
  },
  en: {
    title: 'LEX BUSINESS HUB | Business Registration in Romania for Entrepreneurs',
    description:
      'Open a company in Romania in 3–7 days. Residence permit, notarial translations, legal support and marketing for Ukrainian and foreign entrepreneurs in Bucharest. Full-cycle support.',
    keywords:
      'business registration Romania, open LLC Bucharest, residence permit Romania, relocation entrepreneurs Ukraine, notarial translations Bucharest, legal services immigrants, business hub Romania, LEX BUSINESS HUB',
    ogLocale: 'en_US',
  },
  uk: {
    title: 'LEX BUSINESS HUB | Реєстрація бізнесу в Румунії для підприємців',
    description:
      'Відкрийте компанію в Румунії за 3–7 днів. ВНП, нотаріальні переклади, юридичний супровід та маркетинг для українських підприємців у Бухаресті. Повний цикл підтримки.',
    keywords:
      'реєстрація бізнесу Румунія, відкрити ТОВ Бухарест, ВНП Румунія, переїзд до Румунії підприємцям, нотаріальні переклади Бухарест, юридичні послуги іммігрантам, бізнес у Європі для українців, LEX BUSINESS HUB',
    ogLocale: 'uk_UA',
  },
};

export function SEO() {
  const { lang, t } = useLanguage();
  const cfg = seoConfig[lang as LangKey] ?? seoConfig['ro'];

  /* ── JSON-LD: LocalBusiness ── */
  const localBusinessLD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: 'LEX BUSINESS HUB',
    alternateName: 'Lex Business Hub Romania',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo1.png`,
      width: 400,
      height: 120,
    },
    image: OG_IMAGE,
    description: cfg.description,
    telephone: '+40734468311',
    email: 'info@lexbusinesshub.ro',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strada Louis Blanc 26, Et. 3',
      addressLocality: 'București',
      postalCode: '011132',
      addressRegion: 'Sector 1',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '44.4527',
      longitude: '26.0854',
    },
    hasMap: 'https://www.google.com/maps/dir/?api=1&destination=Strada+Louis+Blanc+26,+Sector+1,+Bucharest,+Romania',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61587770663779',
      'https://www.instagram.com/lexbusinesshub.romania',
    ],
    priceRange: '$$',
    currenciesAccepted: 'RON, EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: [
      { '@type': 'Country', name: 'Romania' },
      { '@type': 'City', name: 'București' },
    ],
    knowsLanguage: ['Romanian', 'Russian', 'Ukrainian', 'English'],
    knowsAbout: [
      'Business Registration in Romania',
      'Residence Permit Romania',
      'Notarial Translations',
      'Legal Services for Immigrants',
      'Marketing for Foreign Businesses',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Company Registration (SRL)',
            description: 'Full business registration in Romania in 3–7 days',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Residence Permit',
            description: 'Residence permit and relocation support for entrepreneurs',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Notarial Translations',
            description: 'Official notarial translations for courts, embassies and authorities',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Legal Services',
            description: 'Full legal support for immigration and business in Romania',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing & Business Development',
            description: 'Marketing setup, lead generation and business scaling in Romania',
          },
        },
      ],
    },
  };

  /* ── JSON-LD: Organization ── */
  const organizationLD = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: 'LEX BUSINESS HUB',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo1.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+40734468311',
        contactType: 'customer service',
        areaServed: 'RO',
        availableLanguage: ['Romanian', 'Russian', 'Ukrainian', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+40757296443',
        contactType: 'sales',
        areaServed: 'RO',
        availableLanguage: ['Romanian', 'Russian', 'Ukrainian', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+40799216717',
        contactType: 'technical support',
        areaServed: 'RO',
        availableLanguage: ['Romanian', 'Russian', 'Ukrainian', 'English'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61587770663779',
      'https://www.instagram.com/lexbusinesshub.romania',
    ],
  };

  /* ── JSON-LD: WebSite ── */
  const webSiteLD = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'LEX BUSINESS HUB',
    url: SITE_URL,
    description: cfg.description,
    inLanguage: ['ro', 'ru', 'en', 'uk'],
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  /* ── JSON-LD: FAQPage ── */
  const faqItems: Array<{ question: string; answer: string; bullets?: string[]; footer?: string }> =
    t?.faq?.items ?? [];

  const faqLD =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(
            (item: { question: string; answer: string; bullets?: string[]; footer?: string }) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: [item.answer, ...(item.bullets ?? []), item.footer]
                  .filter(Boolean)
                  .join(' '),
              },
            }),
          ),
        }
      : null;

  /* ── JSON-LD: BreadcrumbList ── */
  const breadcrumbLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/#services` },
      { '@type': 'ListItem', position: 3, name: 'Process', item: `${SITE_URL}/#process` },
      { '@type': 'ListItem', position: 4, name: 'FAQ', item: `${SITE_URL}/#faq` },
      { '@type': 'ListItem', position: 5, name: 'Contact', item: `${SITE_URL}/#contact` },
    ],
  };

  return (
    <Helmet>
      {/* Language */}
      <html lang={lang} />

      {/* Primary */}
      <title>{cfg.title}</title>
      <meta name="description" content={cfg.description} />
      <meta name="keywords" content={cfg.keywords} />
      <link rel="canonical" href={SITE_URL} />

      {/* Indexing */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="author" content="LEX BUSINESS HUB" />
      <meta name="copyright" content="LEX BUSINESS HUB" />
      <meta name="rating" content="general" />

      {/* Geo */}
      <meta name="geo.region" content="RO-B" />
      <meta name="geo.placename" content="București, România" />
      <meta name="geo.position" content="44.4527;26.0854" />
      <meta name="ICBM" content="44.4527, 26.0854" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="LEX BUSINESS HUB" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={cfg.title} />
      <meta property="og:description" content={cfg.description} />
      <meta property="og:locale" content={cfg.ogLocale} />
      <meta property="og:locale:alternate" content="ro_RO" />
      <meta property="og:locale:alternate" content="ru_RU" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="uk_UA" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:secure_url" content={OG_IMAGE} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="LEX BUSINESS HUB — Business Registration & Consulting in Romania" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={cfg.title} />
      <meta name="twitter:description" content={cfg.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="LEX BUSINESS HUB" />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="ro" href={SITE_URL} />
      <link rel="alternate" hrefLang="ru" href={SITE_URL} />
      <link rel="alternate" hrefLang="en" href={SITE_URL} />
      <link rel="alternate" hrefLang="uk" href={SITE_URL} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://maps.googleapis.com" />

      {/* Theme color */}
      <meta name="theme-color" content="#2F71BE" />
      <meta name="msapplication-TileColor" content="#2F71BE" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(localBusinessLD)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationLD)}</script>
      <script type="application/ld+json">{JSON.stringify(webSiteLD)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLD)}</script>
      {faqLD && (
        <script type="application/ld+json">{JSON.stringify(faqLD)}</script>
      )}
    </Helmet>
  );
}
