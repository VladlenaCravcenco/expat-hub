import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { sendToTelegram } from '../utils/telegram';
import { PhoneInputField } from './PhoneInputField';
import { useLanguage } from '../context/LanguageContext';

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  background: '#f8fafc',
  border: '1.5px solid #dde5f0',
  borderRadius: 8,
  fontSize: '0.9375rem',
  color: '#0f172a',
  outline: 'none',
  fontFamily: 'var(--font-sans)',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
};
const inputFocus: React.CSSProperties = {
  ...inputBase,
  borderColor: '#2F71BE',
  background: '#ffffff',
  boxShadow: '0 0 0 3px rgba(47,113,190,0.08)',
};

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'not_configured'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendToTelegram({ ...formData, subject: formData.subject || t.contact.form.subjects[0] });
      setStatus('success');
      setTimeout(() => { setStatus('idle'); setFormData({ name: '', phone: '', subject: '', message: '' }); }, 3000);
    } catch (err: any) {
      if (err?.message === 'NOT_CONFIGURED') setStatus('not_configured');
      else setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const phones = [
    { label: t.contact.phoneLabels[0], value: '+40 734 468 311' },
    { label: t.contact.phoneLabels[1], value: '+40 757 296 443' },
    { label: t.contact.phoneLabels[2], value: '+40 799 216 717' },
  ];

  const socialHover = (el: HTMLAnchorElement, active: boolean) => {
    el.style.background = active ? '#2F71BE' : '#f1f5f9';
    el.style.color = active ? '#fff' : '#64748b';
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ background: '#ffffff', padding: 'clamp(56px, 8vw, 104px) 0' }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}>

          {/* LEFT — info */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}>
              {t.contact.title}
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.3vw, 1.0625rem)',
              color: '#64748b',
              lineHeight: 1.7,
              marginBottom: 40,
            }}>
              {t.contact.description}
            </p>

            {/* Phones */}
            <div style={{ marginBottom: 28 }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: 14,
              }}>
                {t.contact.phones}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {phones.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      color: '#94a3b8',
                      minWidth: 'min(160px, 45%)',
                    }}>
                      {p.label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#0f172a',
                    }}>
                      {p.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: '#e8eef6', marginBottom: 28 }} />

            {/* Address */}
            <div style={{ marginBottom: 28 }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: 8,
              }}>
                {t.contact.address}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>
                Louis Blanc, 26, Sector 1, Et. 3
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#64748b' }}>
                {t.contact.addressHint}
              </p>
            </div>

            <div style={{ height: 1, background: '#e8eef6', marginBottom: 28 }} />

            {/* Email + social icons in one row */}
            <div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: 8,
              }}>
                {t.contact.email}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#2F71BE',
                  margin: 0,
                }}>
                  info@lexbusinesshub.ro
                </p>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61587770663779&mibextid=wwXIfr&rdid=JKmq4rSY34QHWmq3"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 36, height: 36, borderRadius: 8,
                      background: '#f1f5f9', color: '#64748b',
                      transition: 'background 0.2s, color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => socialHover(e.currentTarget as HTMLAnchorElement, true)}
                    onMouseLeave={e => socialHover(e.currentTarget as HTMLAnchorElement, false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/lexbusinesshub.romania?igsh=MXNiOWJ4dzcwbTUyMA%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 36, height: 36, borderRadius: 8,
                      background: '#f1f5f9', color: '#64748b',
                      transition: 'background 0.2s, color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => socialHover(e.currentTarget as HTMLAnchorElement, true)}
                    onMouseLeave={e => socialHover(e.currentTarget as HTMLAnchorElement, false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@lex.business.hub?_r=1&_t=ZN-94bGXYWWBKI"
                    aria-label="TikTok"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 36, height: 36, borderRadius: 8,
                      background: '#f1f5f9', color: '#64748b',
                      transition: 'background 0.2s, color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => socialHover(e.currentTarget as HTMLAnchorElement, true)}
                    onMouseLeave={e => socialHover(e.currentTarget as HTMLAnchorElement, false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#475569',
                  marginBottom: 6,
                }}>
                  {t.contact.form.name}
                </label>
                <input
                  type="text" name="name"
                  value={formData.name} onChange={handleChange} required
                  placeholder={t.contact.form.namePlaceholder}
                  style={inputBase}
                  onFocus={e => Object.assign(e.currentTarget.style, inputFocus)}
                  onBlur={e => Object.assign(e.currentTarget.style, inputBase)}
                />
              </div>

              {/* Phone */}
              <div>
                <PhoneInputField
                  value={formData.phone}
                  onChange={val => setFormData({ ...formData, phone: val })}
                  required
                  label={t.contact.form.phone}
                  variant="default"
                />
              </div>

              {/* Subject */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#475569',
                  marginBottom: 6,
                }}>
                  {t.contact.form.subject}
                </label>
                <select
                  name="subject"
                  value={formData.subject || t.contact.form.subjects[0]}
                  onChange={handleChange}
                  style={inputBase}
                  onFocus={e => Object.assign(e.currentTarget.style, inputFocus)}
                  onBlur={e => Object.assign(e.currentTarget.style, inputBase)}
                >
                  {t.contact.form.subjects.map((s: string, i: number) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#475569',
                  marginBottom: 6,
                }}>
                  {t.contact.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message} onChange={handleChange}
                  required rows={5}
                  placeholder={t.contact.form.messagePlaceholder}
                  style={{ ...inputBase, resize: 'none' }}
                  onFocus={e => Object.assign(e.currentTarget.style, { ...inputFocus, resize: 'none' })}
                  onBlur={e => Object.assign(e.currentTarget.style, { ...inputBase, resize: 'none' })}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  padding: '14px 28px',
                  background: (status === 'sending' || status === 'success') ? '#94a3b8' : '#2F71BE',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: (status === 'sending' || status === 'success') ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  width: '100%',
                }}
                onMouseEnter={e => { if (status === 'idle') (e.currentTarget as HTMLButtonElement).style.background = '#235d9e'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = status === 'idle' ? '#2F71BE' : '#94a3b8'; }}
              >
                {status === 'sending' && t.contact.form.sending}
                {status === 'success' && t.contact.form.success}
                {status === 'error' && t.contact.form.error}
                {status === 'not_configured' && t.contact.form.notConfigured}
                {status === 'idle' && t.contact.form.send}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}