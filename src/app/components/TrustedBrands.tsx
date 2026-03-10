import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const brands = [
  { name: 'Globitel',                file: '/images/logo1.png' },
  { name: 'Minthar',                 file: '/images/logo2.png' },
  { name: 'i-Center',               file: '/images/logo3.png' },
  { name: 'Автомагістраль Південь', file: '/images/logo4.png' },
  { name: 'PROLEO',                  file: '/images/logo5.png' },
  { name: 'Dureforce',               file: '/images/logo6.png' },
  { name: 'ETHYCA',                  file: '/images/logo7.png' },
  { name: 'Muafa',                   file: '/images/logo8.png' },
];

function BrandItem({ brand }: { brand: typeof brands[0] }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div style={{
      flexShrink: 0,
      width: 160,
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #e2e8f0',
      borderRadius: 10,
      padding: '0 20px',
      overflow: 'hidden',
      background: '#ffffff',
      opacity: 0.5,
      transition: 'opacity 0.3s',
      cursor: 'default',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.9'}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.5'}
    >
      {!imgFailed ? (
        <img
          src={brand.file}
          alt={brand.name}
          onError={() => setImgFailed(true)}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'grayscale(100%)',
            pointerEvents: 'none',
          }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#475569',
          letterSpacing: '0.04em',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}>
          {brand.name}
        </span>
      )}
    </div>
  );
}

export function TrustedBrands() {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Мобильный авто-скролл + пауза при касании пальцем
  useEffect(() => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    const SPEED = 0.6;

    const tick = () => {
      if (!isPaused.current && el) {
        el.scrollLeft += SPEED;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const pause  = () => { isPaused.current = true; };
    const resume = () => { isPaused.current = false; };

    el.addEventListener('touchstart',  pause,  { passive: true });
    el.addEventListener('touchend',    resume, { passive: true });
    el.addEventListener('touchcancel', resume, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener('touchstart',  pause);
      el.removeEventListener('touchend',    resume);
      el.removeEventListener('touchcancel', resume);
    };
  }, [isMobile]);

  const mobileBrands  = [...brands, ...brands];
  const desktopBrands = [...brands, ...brands, ...brands];

  return (
    <section style={{
      background: '#ffffff',
      padding: 'clamp(40px, 5vw, 64px) 0',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'relative' }}>

        {/* Fade края */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: isMobile ? 40 : 120,
          background: 'linear-gradient(90deg, #ffffff 0%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: isMobile ? 40 : 120,
          background: 'linear-gradient(270deg, #ffffff 0%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        {isMobile ? (
          /* ── МОБИЛЕ: скролл пальцем + авто-прокрутка ── */
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: 12,
              overflowX: 'scroll',
              overflowY: 'hidden',
              padding: '4px 20px 8px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="hide-scrollbar"
          >
            {mobileBrands.map((brand, i) => (
              <BrandItem key={i} brand={brand} />
            ))}
          </div>
        ) : (
          /* ── ДЕСКТОП: бесконечная motion-анимация ── */
          <motion.div
            style={{ display: 'flex', gap: 72, alignItems: 'center' }}
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {desktopBrands.map((brand, i) => (
              <BrandItem key={i} brand={brand} />
            ))}
          </motion.div>
        )}
      </div>

      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
