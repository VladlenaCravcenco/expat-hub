import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

// ─── Pixel helpers ───────────────────────────────────────────────────────────
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function trackConversion() {
  // Meta Pixel — Lead event (стандартное событие для заявок/консультаций)
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }

  // Google Analytics 4 — generate_lead event (для будущего GA4)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'consultation',
      event_label: 'thank_you_page',
    });
  }
}

// ─── Translations ─────────────────────────────────────────────────────────────
const copy = {
  ro: {
    title: 'Vă mulțumim!',
    subtitle: 'Cererea dvs. a fost trimisă cu succes',
    body: 'Experții noștri vă vor contacta în aceeași zi lucrătoare pentru a discuta detaliile consultației.',
    back: 'Înapoi la pagina principală',
    badge: 'LEX BUSINESS HUB',
    note: 'Verificați și dosarul Spam dacă nu primiți răspuns în 24h.',
  },
  ru: {
    title: 'Спасибо!',
    subtitle: 'Ваша заявка успешно отправлена',
    body: 'Наши эксперты свяжутся с вами в течение рабочего дня для обсуждения деталей консультации.',
    back: 'Вернуться на главную',
    badge: 'LEX BUSINESS HUB',
    note: 'Проверьте папку Спам, если не получите ответ в течение 24ч.',
  },
  en: {
    title: 'Thank you!',
    subtitle: 'Your request has been sent successfully',
    body: 'Our experts will contact you within the same business day to discuss the details of your consultation.',
    back: 'Back to homepage',
    badge: 'LEX BUSINESS HUB',
    note: "Check your Spam folder if you don't receive a reply within 24h.",
  },
  uk: {
    title: 'Дякуємо!',
    subtitle: 'Вашу заявку успішно відправлено',
    body: 'Наші експерти звʼяжуться з вами протягом робочого дня для обговорення деталей консультації.',
    back: 'Повернутися на головну',
    badge: 'LEX BUSINESS HUB',
    note: 'Перевірте папку Спам, якщо не отримаєте відповідь протягом 24год.',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function ThankYou() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const c = copy[lang] ?? copy.ro;

  // Fire conversion events once on mount
  useEffect(() => {
    trackConversion();
  }, []);

  return (
    <>
      <Helmet>
        <title>{c.title} — LEX Business Hub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes tyFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tyScale {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes tyCheckDraw {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes tyPulseRing {
          0%   { transform: scale(1);   opacity: 0.35; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }

        .ty-page * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .ty-title  { font-family: 'Cormorant Garamond', serif; }

        .ty-card {
          animation: tyScale 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .ty-row-1 { animation: tyFadeUp 0.5s 0.15s cubic-bezier(0.22,1,0.36,1) both; }
        .ty-row-2 { animation: tyFadeUp 0.5s 0.28s cubic-bezier(0.22,1,0.36,1) both; }
        .ty-row-3 { animation: tyFadeUp 0.5s 0.40s cubic-bezier(0.22,1,0.36,1) both; }
        .ty-row-4 { animation: tyFadeUp 0.5s 0.52s cubic-bezier(0.22,1,0.36,1) both; }
        .ty-row-5 { animation: tyFadeUp 0.5s 0.64s cubic-bezier(0.22,1,0.36,1) both; }

        .ty-check-path {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: tyCheckDraw 0.55s 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .ty-pulse {
          animation: tyPulseRing 1.8s 0.4s ease-out infinite;
        }

        .ty-btn {
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .ty-btn:hover {
          background: linear-gradient(135deg, #163264 0%, #2562a8 100%) !important;
          box-shadow: 0 8px 24px rgba(47,113,190,0.45) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div
        className="ty-page"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #f0f5fb 0%, #ffffff 50%, #eaf0fa 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative circles */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-120px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(47,113,190,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '360px', height: '360px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,58,107,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Card */}
        <div
          className="ty-card"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(10,30,70,0.10), 0 4px 16px rgba(10,30,70,0.06)',
            border: '1px solid rgba(47,113,190,0.12)',
            padding: 'clamp(36px, 6vw, 56px) clamp(28px, 6vw, 60px)',
            maxWidth: '520px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Badge */}
          <div className="ty-row-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(47,113,190,0.08)',
            borderRadius: '100px',
            padding: '5px 14px',
            marginBottom: '28px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#2F71BE" strokeWidth="1.5"/>
              <path d="M4.5 7l2 2 3-3" stroke="#2F71BE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#2F71BE', letterSpacing: '0.08em' }}>
              {c.badge}
            </span>
          </div>

          {/* Check icon with pulse */}
          <div className="ty-row-2" style={{ position: 'relative', display: 'inline-block', marginBottom: '28px' }}>
            {/* Pulse ring */}
            <div className="ty-pulse" style={{
              position: 'absolute', inset: '-8px',
              borderRadius: '50%',
              border: '2px solid rgba(47,113,190,0.4)',
            }} />
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a3a6b 0%, #2F71BE 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(47,113,190,0.35)',
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  className="ty-check-path"
                  d="M8 16.5l6 6 10-11"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="ty-title ty-row-3" style={{
            margin: '0 0 8px',
            fontSize: 'clamp(36px, 6vw, 52px)',
            fontWeight: 700,
            color: '#0f1f3d',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            {c.title}
          </h1>

          {/* Subtitle */}
          <p className="ty-row-3" style={{
            margin: '0 0 16px',
            fontSize: '16px',
            fontWeight: 600,
            color: '#2F71BE',
            letterSpacing: '-0.01em',
          }}>
            {c.subtitle}
          </p>

          {/* Body */}
          <p className="ty-row-4" style={{
            margin: '0 0 10px',
            fontSize: '14.5px',
            color: '#5a6a85',
            lineHeight: 1.7,
          }}>
            {c.body}
          </p>

          {/* Spam note */}
          <p className="ty-row-4" style={{
            margin: '0 0 32px',
            fontSize: '12.5px',
            color: '#9aabb8',
            lineHeight: 1.6,
          }}>
            {c.note}
          </p>

          {/* Divider */}
          <div className="ty-row-4" style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(47,113,190,0.15), transparent)',
            margin: '0 0 28px',
          }} />

          {/* CTA button */}
          <div className="ty-row-5">
            <button
              className="ty-btn"
              onClick={() => navigate('/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 32px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #1a3a6b 0%, #2F71BE 100%)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(47,113,190,0.30)',
                letterSpacing: '0.01em',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {c.back}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p style={{
          marginTop: '24px',
          fontSize: '12px',
          color: '#b0bec8',
          letterSpacing: '0.02em',
        }}>
          © 2026 LEX BUSINESS HUB
        </p>
      </div>
    </>
  );
}