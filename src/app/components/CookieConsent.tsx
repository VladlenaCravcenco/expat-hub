import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const COOKIE_KEY = 'lex_cookie_consent';
const META_PIXEL_ID = 'YOUR_PIXEL_ID';

type ConsentValue = 'accepted' | 'declined' | 'custom';

interface ConsentPrefs {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_PREFS_KEY = 'lex_cookie_prefs';

function initMetaPixel(pixelId: string) {
  if (typeof window === 'undefined') return;
  if ((window as any).fbq) return;
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = true; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  (window as any).fbq('init', pixelId);
  (window as any).fbq('track', 'PageView');
}

// ── Translations ──────────────────────────────────────────────────────────────
const UI: Record<string, Record<string, string>> = {
  ro: {
    title: 'Folosim cookie-uri',
    text: 'Utilizăm cookie-uri și instrumente similare (inclusiv Meta Pixel) pentru a îmbunătăți experiența dvs. și a afișa publicitate relevantă. Prin acceptare, confirmați că aveți cel puțin 16 ani și că sunteți de acord cu ',
    policy: 'Politica de confidențialitate',
    accept: 'Accept toate',
    decline: 'Refuz',
    settings: 'Setări',
    modalTitle: 'Preferințe cookie',
    modalSubtitle: 'Alegeți ce tipuri de cookie-uri acceptați',
    necessary: 'Necesare',
    necessaryDesc: 'Esențiale pentru funcționarea site-ului. Nu pot fi dezactivate.',
    analytics: 'Analiză',
    analyticsDesc: 'Ne ajută să înțelegem cum utilizați site-ul (Google Analytics).',
    marketing: 'Marketing',
    marketingDesc: 'Folosite pentru publicitate personalizată (Meta Pixel).',
    alwaysOn: 'Întotdeauna activ',
    savePrefs: 'Salvați preferințele',
    acceptAll: 'Accept toate',
  },
  ru: {
    title: 'Мы используем cookie',
    text: 'Мы используем cookie и аналогичные инструменты (включая Meta Pixel) для улучшения вашего опыта и показа релевантной рекламы. Принимая, вы подтверждаете, что вам не менее 16 лет и вы соглашаетесь с ',
    policy: 'Политикой конфиденциальности',
    accept: 'Принять все',
    decline: 'Отказаться',
    settings: 'Настройки',
    modalTitle: 'Настройки cookie',
    modalSubtitle: 'Выберите типы cookie, которые вы принимаете',
    necessary: 'Необходимые',
    necessaryDesc: 'Необходимы для работы сайта. Не могут быть отключены.',
    analytics: 'Аналитика',
    analyticsDesc: 'Помогают нам понять, как вы используете сайт (Google Analytics).',
    marketing: 'Маркетинг',
    marketingDesc: 'Используются для персонализированной рекламы (Meta Pixel).',
    alwaysOn: 'Всегда включено',
    savePrefs: 'Сохранить настройки',
    acceptAll: 'Принять все',
  },
  en: {
    title: 'We use cookies',
    text: 'We use cookies and similar tools (including Meta Pixel) to improve your experience and show relevant advertising. By accepting, you confirm you are at least 16 years old and agree to our ',
    policy: 'Privacy Policy',
    accept: 'Accept all',
    decline: 'Decline',
    settings: 'Settings',
    modalTitle: 'Cookie preferences',
    modalSubtitle: 'Choose which types of cookies you accept',
    necessary: 'Necessary',
    necessaryDesc: 'Essential for the website to function. Cannot be disabled.',
    analytics: 'Analytics',
    analyticsDesc: 'Help us understand how you use the site (Google Analytics).',
    marketing: 'Marketing',
    marketingDesc: 'Used for personalised advertising (Meta Pixel).',
    alwaysOn: 'Always on',
    savePrefs: 'Save preferences',
    acceptAll: 'Accept all',
  },
  uk: {
    title: 'Ми використовуємо cookie',
    text: 'Ми використовуємо cookie та подібні інструменти (включаючи Meta Pixel) для покращення вашого досвіду та показу релевантної реклами. Приймаючи, ви підтверджуєте, що вам не менше 16 років і погоджуєтесь з ',
    policy: 'Політикою конфіденційності',
    accept: 'Прийняти все',
    decline: 'Відмовитись',
    settings: 'Налаштування',
    modalTitle: 'Налаштування cookie',
    modalSubtitle: 'Оберіть типи cookie, які ви приймаєте',
    necessary: 'Необхідні',
    necessaryDesc: 'Необхідні для роботи сайту. Не можуть бути відключені.',
    analytics: 'Аналітика',
    analyticsDesc: 'Допомагають нам зрозуміти, як ви використовуєте сайт (Google Analytics).',
    marketing: 'Маркетинг',
    marketingDesc: 'Використовуються для персоналізованої реклами (Meta Pixel).',
    alwaysOn: 'Завжди увімкнено',
    savePrefs: 'Зберегти налаштування',
    acceptAll: 'Прийняти все',
  },
};

// ── Toggle component ──────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <div
      onClick={() => !disabled && onChange?.(!checked)}
      style={{
        width: 40, height: 22, borderRadius: 11, flexShrink: 0,
        background: checked ? 'linear-gradient(135deg, #1a3a6b, #2F71BE)' : '#dde5f0',
        position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: checked ? 21 : 3,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
        transition: 'left 0.2s',
      }} />
    </div>
  );
}

// ── Settings modal ────────────────────────────────────────────────────────────
function SettingsModal({
  lang, prefs, onSave, onAcceptAll, onClose,
}: {
  lang: string;
  prefs: ConsentPrefs;
  onSave: (p: ConsentPrefs) => void;
  onAcceptAll: () => void;
  onClose: () => void;
}) {
  const u = UI[lang] ?? UI.en;
  const [analytics, setAnalytics] = useState(prefs.analytics);
  const [marketing, setMarketing] = useState(prefs.marketing);

  return (
    <>
      <style>{`
        @keyframes lexModalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .lex-settings-modal { animation: lexModalIn 0.3s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(10, 20, 50, 0.45)',
          backdropFilter: 'blur(3px)',
        }}
      />

      {/* Modal */}
      <div
        className="lex-settings-modal"
        role="dialog"
        style={{
          position: 'fixed', zIndex: 10001,
          bottom: '24px', left: '24px',
          width: 'min(390px, calc(100vw - 32px))',
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 16px 48px rgba(10,30,70,0.18)',
          border: '1px solid rgba(47,113,190,0.14)',
          overflow: 'hidden',
        }}
      >
        {/* Top accent */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #1a3a6b, #2F71BE, #4d8fd4)' }} />

        <div style={{ padding: '20px 22px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f1f3d', letterSpacing: '-0.01em' }}>
                {u.modalTitle}
              </p>
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#8a9ab5' }}>
                {u.modalSubtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4, marginTop: -2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {/* Necessary */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '12px 14px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e8eef6' }}>
              <div>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f1f3d' }}>{u.necessary}</p>
                <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: '#8a9ab5', lineHeight: 1.5 }}>{u.necessaryDesc}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <Toggle checked={true} disabled />
                <span style={{ fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>{u.alwaysOn}</span>
              </div>
            </div>

            {/* Analytics */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '12px 14px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e8eef6' }}>
              <div>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f1f3d' }}>{u.analytics}</p>
                <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: '#8a9ab5', lineHeight: 1.5 }}>{u.analyticsDesc}</p>
              </div>
              <Toggle checked={analytics} onChange={setAnalytics} />
            </div>

            {/* Marketing */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, padding: '12px 14px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e8eef6' }}>
              <div>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f1f3d' }}>{u.marketing}</p>
                <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: '#8a9ab5', lineHeight: 1.5 }}>{u.marketingDesc}</p>
              </div>
              <Toggle checked={marketing} onChange={setMarketing} />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onSave({ necessary: true, analytics, marketing })}
              style={{
                flex: 1, padding: '10px', borderRadius: '10px',
                border: '1.5px solid rgba(47,113,190,0.3)',
                background: 'transparent', color: '#2F71BE',
                fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(47,113,190,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              {u.savePrefs}
            </button>
            <button
              onClick={onAcceptAll}
              style={{
                flex: 1, padding: '10px', borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #1a3a6b 0%, #2F71BE 100%)',
                color: '#fff', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(47,113,190,0.32)',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 18px rgba(47,113,190,0.48)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(47,113,190,0.32)'; }}
            >
              {u.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function CookieConsent() {
  const { lang } = useLanguage();
  const u = UI[lang] ?? UI.en;

  const [visible, setVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY) as ConsentValue | null;
    if (stored === 'accepted') {
      initMetaPixel(META_PIXEL_ID);
      return;
    }
    if (stored === 'custom') {
      const savedPrefs = localStorage.getItem(CONSENT_PREFS_KEY);
      if (savedPrefs) {
        const p: ConsentPrefs = JSON.parse(savedPrefs);
        if (p.marketing) initMetaPixel(META_PIXEL_ID);
      }
      return;
    }
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissBanner = (cb: () => void) => {
    setAnimateOut(true);
    setTimeout(() => {
      setVisible(false);
      setShowSettings(false);
      cb();
    }, 380);
  };

  const handleAcceptAll = () => {
    dismissBanner(() => {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      initMetaPixel(META_PIXEL_ID);
    });
  };

  const handleDecline = () => {
    dismissBanner(() => {
      localStorage.setItem(COOKIE_KEY, 'declined');
    });
  };

  const handleSavePrefs = (p: ConsentPrefs) => {
    dismissBanner(() => {
      localStorage.setItem(COOKIE_KEY, 'custom');
      localStorage.setItem(CONSENT_PREFS_KEY, JSON.stringify(p));
      if (p.marketing) initMetaPixel(META_PIXEL_ID);
    });
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes lexCookieIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lexCookieOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(20px); }
        }
        .lex-cookie-banner {
          animation: ${animateOut
            ? 'lexCookieOut 0.38s cubic-bezier(0.4,0,1,1) forwards'
            : 'lexCookieIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards'
          };
        }
        .lex-cookie-btn {
          transition: background 0.18s ease, border-color 0.18s ease,
                      color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
          cursor: pointer;
        }
      `}</style>

      {/* Settings modal */}
      {showSettings && (
        <SettingsModal
          lang={lang}
          prefs={prefs}
          onSave={handleSavePrefs}
          onAcceptAll={handleAcceptAll}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Banner */}
      {!showSettings && (
        <div
          className="lex-cookie-banner"
          role="dialog"
          aria-label="Cookie consent"
          style={{
            position: 'fixed',
            bottom: '24px', left: '24px',
            zIndex: 9999,
            width: 'min(390px, calc(100vw - 32px))',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 8px 40px rgba(10, 30, 70, 0.13), 0 2px 8px rgba(10, 30, 70, 0.07)',
            border: '1px solid rgba(47, 113, 190, 0.14)',
            padding: '20px 22px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '1px' }}>
              <circle cx="21" cy="21" r="19" fill="#2F71BE" />
              <circle cx="35.5" cy="8" r="7" fill="#ffffff" />
              <circle cx="15" cy="16" r="2.4" fill="#1a3a6b" />
              <circle cx="24" cy="13.5" r="1.9" fill="#1a3a6b" />
              <circle cx="12.5" cy="26" r="1.9" fill="#1a3a6b" />
              <circle cx="23" cy="25" r="2.4" fill="#1a3a6b" />
              <circle cx="18.5" cy="32" r="1.7" fill="#1a3a6b" />
              <circle cx="29" cy="21" r="1.9" fill="#1a3a6b" />
              <circle cx="19" cy="20" r="0.9" fill="rgba(255,255,255,0.22)" />
              <circle cx="27" cy="29" r="0.9" fill="rgba(255,255,255,0.22)" />
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: '#0f1f3d', lineHeight: 1.3, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                {u.title}
              </p>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#5a6a85', lineHeight: 1.65 }}>
                {u.text}
                <a href="/privacy-policy" style={{ color: '#2F71BE', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(47,113,190,0.35)', paddingBottom: '1px' }}>
                  {u.policy}
                </a>.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="lex-cookie-btn" onClick={handleDecline}
              style={{ padding: '8px 16px', borderRadius: '10px', border: '1.5px solid rgba(47,113,190,0.25)', background: 'transparent', color: '#5a6a85', fontSize: '12.5px', fontWeight: 500 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2F71BE'; e.currentTarget.style.color = '#2F71BE'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(47,113,190,0.25)'; e.currentTarget.style.color = '#5a6a85'; }}
            >
              {u.decline}
            </button>

            <button className="lex-cookie-btn" onClick={() => setShowSettings(true)}
              style={{ padding: '8px 16px', borderRadius: '10px', border: '1.5px solid rgba(47,113,190,0.25)', background: 'transparent', color: '#5a6a85', fontSize: '12.5px', fontWeight: 500 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2F71BE'; e.currentTarget.style.color = '#2F71BE'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(47,113,190,0.25)'; e.currentTarget.style.color = '#5a6a85'; }}
            >
              {u.settings}
            </button>

            <button className="lex-cookie-btn" onClick={handleAcceptAll}
              style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #1a3a6b 0%, #2F71BE 100%)', color: '#ffffff', fontSize: '12.5px', fontWeight: 600, boxShadow: '0 4px 12px rgba(47,113,190,0.32)', letterSpacing: '0.01em' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 18px rgba(47,113,190,0.48)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(47,113,190,0.32)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {u.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}