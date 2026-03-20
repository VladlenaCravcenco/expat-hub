import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { sendToTelegram } from '../utils/telegram';
import { PhoneInputField } from './PhoneInputField';
import { useLanguage } from '../context/LanguageContext';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputBase: React.CSSProperties = {
  width: '100%', padding: '10px 13px', background: '#f8fafc',
  border: '1.5px solid #dde5f0', borderRadius: 8, fontSize: '0.9rem',
  color: '#0f172a', outline: 'none', fontFamily: 'var(--font-sans)',
  boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
};
const inputFocus: React.CSSProperties = {
  ...inputBase, borderColor: '#2F71BE', background: '#ffffff',
  boxShadow: '0 0 0 3px rgba(47,113,190,0.08)',
};

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' });
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'not_configured'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    // Block submit if phone number is invalid
    if (!phoneValid) return;
    setStatus('sending');
    try {
      await sendToTelegram({ ...formData, subject: formData.subject || t.modal.subjects[0] });
      setStatus('success');
      setTimeout(() => {
        onOpenChange(false);
        setFormData({ name: '', phone: '', subject: '', message: '' });
        setPhoneValid(false);
        setPhoneTouched(false);
        setStatus('idle');
        navigate('/thank-you');
      }, 400);
    } catch (err: any) {
      if (err?.message === 'NOT_CONFIGURED') setStatus('not_configured');
      else setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 [&>button]:hidden overflow-hidden" style={{ width: '92vw', maxWidth: 520, borderRadius: 14, background: '#ffffff', border: '1px solid #dde5f0', boxShadow: '0 24px 64px rgba(15,23,42,0.18)', fontFamily: 'var(--font-sans)' }}>
        <VisuallyHidden.Root>
          <DialogTitle>{t.modal.title}</DialogTitle>
          <DialogDescription>LEX BUSINESS HUB</DialogDescription>
        </VisuallyHidden.Root>

        <div style={{ height: 4, background: 'linear-gradient(90deg, #1a3f75, #2F71BE, #4d8fd4)', borderRadius: '14px 14px 0 0' }} />

        <div style={{ padding: '22px 24px 18px', borderBottom: '1px solid #e8eef6' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2, marginBottom: 4 }}>{t.modal.title}</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84375rem', color: '#94a3b8' }}>{t.modal.subtitle}</p>
            </div>
            <button onClick={() => onOpenChange(false)}
              style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: '#f0f4fa', border: '1px solid #dde5f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#e2e8f0'; (e.currentTarget as HTMLButtonElement).style.color = '#0f172a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f0f4fa'; (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'; }}
              aria-label={t.modal.close}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: 5 }}>{t.modal.name}</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder={t.modal.namePlaceholder}
                style={inputBase}
                onFocus={e => Object.assign(e.currentTarget.style, inputFocus)}
                onBlur={e => Object.assign(e.currentTarget.style, inputBase)}
              />
            </div>
            <div>
              <PhoneInputField
                value={formData.phone}
                onChange={val => setFormData({ ...formData, phone: val })}
                onValidChange={valid => { setPhoneValid(valid); setPhoneTouched(true); }}
                required
                label={t.modal.phone}
                variant="modal"
              />
              {phoneTouched && !phoneValid && (
                <p style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: 3, fontFamily: 'var(--font-sans)' }}>
                  Некорректный номер
                </p>
              )}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: 5 }}>{t.modal.subject}</label>
            <select name="subject" value={formData.subject || t.modal.subjects[0]} onChange={handleChange}
              style={inputBase}
              onFocus={e => Object.assign(e.currentTarget.style, inputFocus)}
              onBlur={e => Object.assign(e.currentTarget.style, inputBase)}
            >
              {t.modal.subjects.map((s: string, i: number) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: 5 }}>{t.modal.message}</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required placeholder={t.modal.messagePlaceholder}
              style={{ ...inputBase, height: 100, resize: 'none' }}
              onFocus={e => Object.assign(e.currentTarget.style, { ...inputFocus, height: '100px', resize: 'none' })}
              onBlur={e => Object.assign(e.currentTarget.style, { ...inputBase, height: '100px', resize: 'none' })}
            />
          </div>

          <button type="submit"
            disabled={status === 'sending' || status === 'success'}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700, padding: '13px',
              background: (status === 'sending' || status === 'success') ? '#94a3b8' : '#2F71BE',
              color: '#ffffff', border: 'none', borderRadius: 8,
              cursor: (status === 'sending' || status === 'success') ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s', boxShadow: '0 2px 12px rgba(47,113,190,0.22)',
            }}
            onMouseEnter={e => { if (status === 'idle') (e.currentTarget as HTMLButtonElement).style.background = '#235d9e'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = status === 'idle' ? '#2F71BE' : '#94a3b8'; }}
          >
            {status === 'sending' && t.modal.sending}
            {status === 'success' && t.modal.success}
            {status === 'error' && t.modal.error}
            {status === 'not_configured' && t.modal.notConfigured}
            {status === 'idle' && t.modal.send}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}