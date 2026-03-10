import { motion } from 'motion/react';
import type { MouseEvent } from 'react';
import { scrollToSection } from '../utils/navigation';
import { useLanguage } from '../context/LanguageContext';

const HERO_IMG = 'https://images.unsplash.com/photo-1550951196-1992d5cb8c2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWNoYXJlc3QlMjBSb21hbmlhJTIwc2t5bGluZSUyMG5pZ2h0JTIwbGlnaHRzJTIwY2l0eXxlbnwxfHx8fDE3NzMxNTYyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080';

interface HeroProps {
  onOpenModal: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  const { t } = useLanguage();
  const nav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <section
      id="hero"
      style={{
        background: '#ffffff',
        paddingTop: 'clamp(96px, 11vw, 112px)',
        paddingBottom: 'clamp(24px, 3vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <motion.div
          style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            minHeight: 'clamp(520px, 65vw, 700px)',
            display: 'flex',
            alignItems: 'center',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background image */}
          <img
            src={HERO_IMG}
            alt="Business building"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
          {/* Dark overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, rgba(8,12,20,0.88) 0%, rgba(8,12,20,0.65) 50%, rgba(8,12,20,0.25) 100%)',
          }} />

          {/* Text content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '60px clamp(40px, 5vw, 80px)',
              width: '65%',
              maxWidth: 860,
            }}
          >
            <motion.p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 22,
                display: 'none',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              LEX BUSINESS HUB · România
            </motion.p>

            <motion.h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#ffffff',
                marginBottom: 20,
                letterSpacing: '-0.025em',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
            >
              {t.hero.line1}
              <br />
              {t.hero.line2}
              <br />
              <span style={{ color: '#6ba3d6' }}>{t.hero.line3}</span>
            </motion.h1>

            <motion.p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.72,
                marginBottom: 36,
                maxWidth: 400,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                onClick={onOpenModal}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '13px 30px',
                  background: '#ffffff',
                  color: '#1a2535',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#e8edf5')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
              >
                {t.hero.ctaPrimary}
              </button>
              <a
                href="#services"
                onClick={e => nav(e, '#services')}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '13px 26px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)';
                  (e.currentTarget as HTMLElement).style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}