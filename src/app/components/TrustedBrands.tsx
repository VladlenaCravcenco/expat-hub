import { motion } from 'motion/react';

// figma:asset imports removed — using text brand names instead
const brands = [
  { name: 'Globitel' },
  { name: 'Minthar' },
  { name: 'i-Center' },
  { name: 'Автомагістраль Південь' },
  { name: 'PROLEO' },
  { name: 'Dureforce' },
  { name: 'ETHYCA' },
  { name: 'Muafa' },
];

export function TrustedBrands() {
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section style={{
      background: '#ffffff',
      padding: 'clamp(40px, 5vw, 64px) 0',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'relative' }}>
        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
          background: 'linear-gradient(90deg, #ffffff 0%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
          background: 'linear-gradient(270deg, #ffffff 0%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <motion.div
          style={{ display: 'flex', gap: 72, alignItems: 'center' }}
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={index}
              style={{
                flexShrink: 0,
                width: 160,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                padding: '0 20px',
                opacity: 0.5,
                transition: 'opacity 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.9'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.5'}
            >
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
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}