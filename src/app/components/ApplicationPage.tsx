import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { PhoneInputField } from './PhoneInputField';
import { translations } from '../i18n/translations';
import type { Lang } from '../i18n/translations';
import { sendToTelegram } from '../utils/telegram';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ro', label: 'RO' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UA' },
];

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '13px 15px',
  background: '#f8fafc',
  border: '1.5px solid #d7e2ef',
  borderRadius: 12,
  fontSize: '0.98rem',
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
  boxShadow: '0 0 0 4px rgba(47,113,190,0.09)',
};

export function ApplicationPage() {
  const navigate = useNavigate();
  const [pageLang, setPageLang] = useState<Lang>('ro');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    entityType: '',
    message: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [servicesTouched, setServicesTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'not_configured'>('idle');

  const copy = translations[pageLang].application;
  const hasServices = selectedServices.length > 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.lang = pageLang;
  }, [pageLang]);

  const serviceOptions = useMemo(() => copy.serviceOptions as string[], [copy.serviceOptions]);
  const featuredOptions = useMemo(
    () => (copy.featuredOptions ?? copy.serviceOptions) as string[],
    [copy.featuredOptions, copy.serviceOptions]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (service: string) => {
    setServicesTouched(true);
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    setServicesTouched(true);

    if (!phoneValid || !hasServices) {
      setStatus('idle');
      return;
    }

    setStatus('sending');

    try {
      await sendToTelegram({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        entityType: formData.entityType,
        services: selectedServices,
        subject: selectedServices.join(', '),
        message: formData.message,
        leadType: 'service_brief',
      });

      setStatus('success');
      setTimeout(() => navigate('/thank-you'), 400);
    } catch (err: any) {
      if (err?.message === 'NOT_CONFIGURED') setStatus('not_configured');
      else setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      <Helmet>
        <title>{copy.title} | LEX BUSINESS HUB</title>
        <meta name="description" content={copy.description} />
      </Helmet>

      <style>
        {`
          .application-services-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .application-service-item {
            min-width: 0;
            padding: 14px 16px;
            gap: 12px;
          }

          .application-service-label {
            min-width: 0;
            font-size: 0.93rem;
            line-height: 1.4;
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          @media (max-width: 640px) {
            .application-service-item {
              padding: 12px;
              gap: 10px;
            }

            .application-service-label {
              font-size: 0.82rem;
              line-height: 1.3;
            }
          }
        `}
      </style>

      <motion.div
        style={{
          minHeight: '100vh',
          background:
            'radial-gradient(circle at top right, rgba(47,113,190,0.14), transparent 28%), linear-gradient(180deg, #f5f8fd 0%, #ffffff 42%, #f7faff 100%)',
          padding: '24px 16px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0.92 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: '100%', opacity: 0.9 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,248,253,0.92) 100%)',
            backdropFilter: 'blur(12px)',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            top: -140,
            right: -120,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,63,117,0.10) 0%, transparent 72%)',
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          style={{
            maxWidth: 980,
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
        >
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 26,
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0, y: -32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.52, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#2F71BE',
                  lineHeight: 1,
                }}
              >
                LEX
              </span>
              <span style={{ width: 1, height: 20, background: '#d6e0ed' }} />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  lineHeight: 1.2,
                }}
              >
                BUSINESS
                <br />
                HUB
              </span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              {LANGS.map((item, index) => (
                <span key={item.code} style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setPageLang(item.code)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      fontWeight: pageLang === item.code ? 700 : 500,
                      color: pageLang === item.code ? '#0f172a' : '#7b8aa0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {item.label}
                  </button>
                  {index < LANGS.length - 1 && (
                    <span style={{ width: 1, height: 12, background: '#d6e0ed' }} />
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{
              background: 'rgba(255,255,255,0.94)',
              border: '1px solid rgba(47,113,190,0.10)',
              borderRadius: 28,
              boxShadow: '0 30px 70px rgba(15,23,42,0.08)',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 54, scale: 0.985, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.72, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              }}
            >
              <div
                style={{
                  padding: 'clamp(28px, 4vw, 48px)',
                  background:
                    'linear-gradient(180deg, rgba(24,59,107,0.98) 0%, rgba(47,113,190,0.98) 100%)',
                  color: '#ffffff',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 14px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.14)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 18,
                  }}
                >
                  {copy.badge}
                </div>

                <h1
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    marginBottom: 16,
                  }}
                >
                  {copy.title}
                </h1>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.84)',
                    maxWidth: 440,
                    marginBottom: 28,
                  }}
                >
                  {copy.description}
                </p>

                <div style={{ display: 'grid', gap: 10 }}>
                  {featuredOptions.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        color: 'rgba(255,255,255,0.92)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.96rem',
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#ffffff',
                          opacity: 0.8,
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  padding: 'clamp(28px, 4vw, 48px)',
                  display: 'grid',
                  gap: 18,
                }}
              >
                <div style={{ display: 'grid', gap: 6 }}>
                  <label
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#334155',
                    }}
                  >
                    {copy.fullName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={copy.fullNamePlaceholder}
                    style={inputBase}
                    onFocus={(e) => Object.assign(e.currentTarget.style, inputFocus)}
                    onBlur={(e) => Object.assign(e.currentTarget.style, inputBase)}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                    gap: 16,
                  }}
                >
                  <PhoneInputField
                    value={formData.phone}
                    onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                    onValidChange={(valid) => {
                      setPhoneValid(valid);
                      setPhoneTouched(true);
                    }}
                    required
                    label={copy.phone}
                    validText={copy.phoneValid}
                    invalidText={copy.phoneInvalid}
                    formatPrefix={copy.phoneFormat}
                  />

                  <div style={{ display: 'grid', gap: 6 }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#334155',
                      }}
                    >
                      {copy.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={copy.emailPlaceholder}
                      style={inputBase}
                      onFocus={(e) => Object.assign(e.currentTarget.style, inputFocus)}
                      onBlur={(e) => Object.assign(e.currentTarget.style, inputBase)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#334155',
                    }}
                  >
                    {copy.entityType}
                  </span>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                      gap: 12,
                    }}
                  >
                    {[
                      copy.entityTypes.individual,
                      copy.entityTypes.legal,
                    ].map((option) => {
                      const checked = formData.entityType === option;
                      return (
                        <label
                          key={option}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '14px 16px',
                            borderRadius: 14,
                            border: `1.5px solid ${checked ? '#2F71BE' : '#d7e2ef'}`,
                            background: checked ? 'rgba(47,113,190,0.06)' : '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          <input
                            type="radio"
                            name="entityType"
                            value={option}
                            checked={checked}
                            onChange={handleChange}
                            required
                            style={{ accentColor: '#2F71BE' }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.95rem',
                              color: '#0f172a',
                            }}
                          >
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#334155',
                    }}
                  >
                    {copy.services}
                  </span>

                  <div className="application-services-grid">
                    {serviceOptions.map((option) => {
                      const checked = selectedServices.includes(option);
                      return (
                        <label
                          key={option}
                          className="application-service-item"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 14,
                            border: `1.5px solid ${checked ? '#2F71BE' : '#d7e2ef'}`,
                            background: checked ? 'rgba(47,113,190,0.06)' : '#f8fafc',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleService(option)}
                            style={{ accentColor: '#2F71BE' }}
                          />
                          <span
                            className="application-service-label"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              color: '#0f172a',
                            }}
                          >
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {servicesTouched && !hasServices && (
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.78rem',
                        color: '#dc2626',
                      }}
                    >
                      {copy.servicesRequired}
                    </p>
                  )}
                </div>

                <div style={{ display: 'grid', gap: 6 }}>
                  <label
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#334155',
                    }}
                  >
                    {copy.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={copy.messagePlaceholder}
                    style={{ ...inputBase, minHeight: 150, resize: 'vertical' }}
                    onFocus={(e) =>
                      Object.assign(e.currentTarget.style, {
                        ...inputFocus,
                        minHeight: '150px',
                        resize: 'vertical',
                      })
                    }
                    onBlur={(e) =>
                      Object.assign(e.currentTarget.style, {
                        ...inputBase,
                        minHeight: '150px',
                        resize: 'vertical',
                      })
                    }
                  />
                </div>

                <div
                  style={{
                    display: 'block',
                    paddingTop: 6,
                  }}
                >
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    style={{
                      width: '100%',
                      padding: '14px 28px',
                      borderRadius: 999,
                      border: 'none',
                      background:
                        status === 'sending' || status === 'success' ? '#9aa9bc' : '#2F71BE',
                      color: '#ffffff',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      cursor:
                        status === 'sending' || status === 'success' ? 'not-allowed' : 'pointer',
                      boxShadow: '0 12px 24px rgba(47,113,190,0.24)',
                    }}
                  >
                    {status === 'sending' && copy.sending}
                    {status === 'success' && copy.success}
                    {status === 'error' && copy.error}
                    {status === 'not_configured' && copy.notConfigured}
                    {status === 'idle' && copy.send}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
