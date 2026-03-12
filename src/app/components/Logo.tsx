/**
 * ──────────────────────────────────────────────────────────
 * КАК ДОБАВИТЬ ЛОГОТИП:
 *
 * 1. Положи файл логотипа в /public/images/logo.png
 *    (подойдёт .png, .svg, .webp — любой формат)
 *
 * 2. Если файл есть — показывается картинка.
 *    Если файла нет — показывается текстовый логотип LEX | BUSINESS HUB.
 * ──────────────────────────────────────────────────────────
 */

import { useState } from 'react';

interface LogoProps {
  height?: number;
}

function TextLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#2F71BE',
        letterSpacing: '0.01em',
        lineHeight: 1,
      }}>LEX</span>
      <span style={{ width: 1, height: 18, background: '#dde5f0', display: 'block', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.65rem',
        fontWeight: 600,
        color: '#0f172a',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        lineHeight: 1.2,
      }}>BUSINESS<br />HUB</span>
    </div>
  );
}

export function Logo({ height = 32 }: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) return <TextLogo />;

  return (
    <img
      src="/images/logo.png"
      alt="LEX Business Hub"
      height={height}
      onError={() => setImgFailed(true)}
      style={{ height, width: 'auto', objectFit: 'contain', display: 'block' }}
    />
  );
}

export { TextLogo };
