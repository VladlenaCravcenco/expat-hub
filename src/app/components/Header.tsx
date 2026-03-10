import type { MouseEvent } from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { scrollToSection } from '../utils/navigation';
// Removed figma:asset import — using inline logo instead
import { useLanguage } from '../context/LanguageContext';
import type { Lang } from '../i18n/translations';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ro', label: 'RO' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UK' },
];

const BREAKPOINT = 768;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < BREAKPOINT : false
  );
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => {
      const mobile = window.innerWidth < BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#process',  label: t.nav.process  },
    { href: '#faq',      label: t.nav.faq      },
    { href: '#contact',  label: t.nav.contact  },
  ];

  const navClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => scrollToSection(href), 260);
    } else {
      scrollToSection(href);
    }
  };

  /* ── Minimalist lang switcher — plain text with dividers ── */
  const LangSwitcher = ({ small = false }: { small?: boolean }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {LANGS.map((l, i) => (
        <span key={l.code} style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setLang(l.code)}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: small ? '0.7rem' : '0.78rem',
              fontWeight: lang === l.code ? 700 : 400,
              color: lang === l.code ? '#0f172a' : '#94a3b8',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: small ? '2px 6px' : '4px 8px',
              letterSpacing: '0.04em',
              transition: 'color 0.15s',
              lineHeight: 1,
            }}
            onMouseEnter={e => {
              if (lang !== l.code)
                (e.currentTarget as HTMLButtonElement).style.color = '#475569';
            }}
            onMouseLeave={e => {
              if (lang !== l.code)
                (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
            }}
          >
            {l.label}
          </button>
          {i < LANGS.length - 1 && (
            <span style={{
              width: 1,
              height: small ? 10 : 12,
              background: '#dde5f0',
              display: 'block',
              flexShrink: 0,
            }} />
          )}
        </span>
      ))}
    </div>
  );

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #dde5f0' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 16px rgba(15,23,42,0.08)' : 'none',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 48px)',
          height: 88,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* ── LOGO ── */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 8 }}
        >
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#2F71BE',
            letterSpacing: '0.01em',
            lineHeight: 1,
          }}>
            LEX
          </span>
          <span style={{
            width: 1,
            height: 18,
            background: '#dde5f0',
            display: 'block',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#0f172a',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1.2,
          }}>
            BUSINESS<br/>HUB
          </span>
        </a>

        {/* ── DESKTOP NAV ── */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => navClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#475569',
                  textDecoration: 'none',
                  padding: '7px 14px',
                  borderRadius: 7,
                  transition: 'color 0.18s, background 0.18s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#0f172a';
                  (e.currentTarget as HTMLElement).style.background = '#eef3fc';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = '#475569';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* ── DESKTOP RIGHT ── */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
            <LangSwitcher />

            <a
              href="#contact"
              onClick={e => navClick(e, '#contact')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 600,
                padding: '9px 22px',
                background: '#2F71BE',
                color: '#ffffff',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'background 0.18s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#235d9e'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#2F71BE'}
            >
              {t.nav.cta}
            </a>
          </div>
        )}

        {/* ── MOBILE RIGHT ── */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <LangSwitcher small />

            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Меню"
              style={{
                width: 36,
                height: 36,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{
                display: 'block', width: 20, height: 1.5,
                background: '#0f172a', borderRadius: 2,
                transition: 'transform 0.22s',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', width: 20, height: 1.5,
                background: '#0f172a', borderRadius: 2,
                transition: 'opacity 0.22s',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: 20, height: 1.5,
                background: '#0f172a', borderRadius: 2,
                transition: 'transform 0.22s',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>
        )}
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              background: '#ffffff',
              borderTop: '1px solid #e8eef6',
              boxShadow: '0 8px 24px rgba(15,23,42,0.1)',
            }}
          >
            <nav style={{ padding: '10px 16px 18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => navClick(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#334155',
                    textDecoration: 'none',
                    padding: '11px 14px',
                    borderRadius: 8,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0f4fa'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={e => navClick(e, '#contact')}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '13px 16px',
                  borderRadius: 8,
                  background: '#2F71BE',
                  textAlign: 'center',
                  marginTop: 8,
                  display: 'block',
                }}
              >
                {t.nav.cta}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}