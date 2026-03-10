import type { MouseEvent } from 'react';
import { scrollToSection } from '../utils/navigation';
// figma:asset imports removed — using inline logo and badge components
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const nav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href !== '#') scrollToSection(href);
  };
  const serviceAnchors = ['#services', '#services', '#services'];
  const companyAnchors = ['#services', '#process', '#contact'];

  return (
    <footer style={{ background: 'transparent', paddingBottom: 'clamp(16px, 2vw, 24px)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div style={{
          borderRadius: 16,
          background: '#f6f8fc',
          padding: 'clamp(28px, 3vw, 44px) clamp(24px, 3vw, 48px)',
        }}>
          {/* Top row: logo + columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
            gap: 'clamp(24px, 3vw, 48px)',
            marginBottom: 28,
            paddingBottom: 28,
            borderBottom: '1px solid rgba(0,0,0,0.07)',
          }}>
            {/* Brand */}
            <div>
              {/* Inline text logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#2F71BE',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                }}>LEX</span>
                <span style={{ width: 1, height: 18, background: '#dde5f0', display: 'block' }} />
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  lineHeight: 1.2,
                }}>BUSINESS<br/>HUB</span>
              </div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: '#64748b',
                lineHeight: 1.65,
                maxWidth: 220,
              }}>
                {t.footer.tagline}
              </p>
            </div>

            {/* Services */}
            <div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: 12,
              }}>
                {t.footer.services}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
                {t.footer.serviceLinks.map((label, i) => (
                  <li key={i}>
                    <a
                      href={serviceAnchors[i]}
                      onClick={e => nav(e, serviceAnchors[i])}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: '#475569',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#2F71BE'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#475569'}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: 12,
              }}>
                {t.footer.company}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
                {t.footer.companyLinks.map((label, i) => (
                  <li key={i}>
                    <a
                      href={companyAnchors[i]}
                      onClick={e => nav(e, companyAnchors[i])}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: '#475569',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#2F71BE'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#475569'}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: 12,
              }}>
                {t.footer.contacts}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {['+40 734 468 311', 'info@lexbusinesshub.ro', 'Louis Blanc, 26, Sector 1, Et. 3', t.footer.addressHint].map((line, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: i === 1 ? '#2F71BE' : '#64748b',
                      lineHeight: 1.5,
                    }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: copyright + badges */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: '#94a3b8',
            }}>
              {t.footer.rights}
            </p>
            <a
              href="https://www.growup-agency.co"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                color: '#c0c8d4',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c0c8d4'}
            >
              Made by GROWUP AGENCY
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* ANPC badge — text version */}
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noopener noreferrer"
                title="Soluționarea Alternativă a Litigiilor"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px', borderRadius: 6,
                  border: '1px solid #dde5f0', background: '#f8fafc',
                  textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8'}
              >
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.6rem',
                  fontWeight: 700, color: '#1e40af', letterSpacing: '0.05em',
                }}>ANPC</span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.55rem',
                  color: '#64748b', lineHeight: 1.2,
                }}>SAL</span>
              </a>
              {/* SOL badge — text version */}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                title="Online Dispute Resolution"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px', borderRadius: 6,
                  border: '1px solid #dde5f0', background: '#f8fafc',
                  textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8'}
              >
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.6rem',
                  fontWeight: 700, color: '#1e40af', letterSpacing: '0.05em',
                }}>SOL</span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.55rem',
                  color: '#64748b', lineHeight: 1.2,
                }}>ODR</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}