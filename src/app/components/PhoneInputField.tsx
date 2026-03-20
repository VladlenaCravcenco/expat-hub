import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import type { Country } from 'react-phone-number-input';
import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import 'react-phone-number-input/style.css';

function getPlaceholder(country: Country): string {
  try {
    const example = getExampleNumber(country, examples);
    return example ? example.formatInternational() : '';
  } catch {
    return '';
  }
}

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
  variant?: 'default' | 'modal';
  required?: boolean;
  label?: string;
}

export function PhoneInputField({
  value,
  onChange,
  onValidChange,
  variant = 'default',
  required = true,
  label = 'Telefon',
}: PhoneInputFieldProps) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [country, setCountry] = useState<Country>('RO');

  const isModal = variant === 'modal';
  const isValid = value ? isValidPhoneNumber(value) : false;
  const showError = touched && !isValid;
  const showSuccess = touched && isValid;

  const hint = getPlaceholder(country);

  const handleChange = (val: string | undefined) => {
    const v = val ?? '';
    onChange(v);
    onValidChange?.(v ? isValidPhoneNumber(v) : false);
  };

  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
    onValidChange?.(value ? isValidPhoneNumber(value) : false);
  };

  const borderColor = showError
    ? '#ef4444'
    : showSuccess
    ? '#22c55e'
    : focused
    ? '#2F71BE'
    : '#dde5f0';

  const shadowColor = showError
    ? 'rgba(239,68,68,0.10)'
    : showSuccess
    ? 'rgba(34,197,94,0.10)'
    : focused
    ? 'rgba(47,113,190,0.08)'
    : 'transparent';

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: isModal ? '0.75rem' : '0.8125rem',
          fontWeight: 600,
          color: '#475569',
          marginBottom: 6,
          fontFamily: 'var(--font-sans)',
        }}>
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          background: focused ? '#ffffff' : '#f8fafc',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 8,
          transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
          overflow: 'hidden',
          boxSizing: 'border-box',
          boxShadow: `0 0 0 3px ${shadowColor}`,
        }}>
          <PhoneInput
            international
            defaultCountry="RO"
            value={value}
            onChange={handleChange}
            onCountryChange={(c) => { if (c) setCountry(c); }}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            placeholder={hint}
            style={{ width: '100%' }}
            numberInputProps={{
              required,
              style: {
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: isModal ? '10px 34px 10px 6px' : '13px 34px 13px 6px',
                fontSize: isModal ? '0.9rem' : '0.9375rem',
                color: '#1a1a1a',
                fontFamily: 'var(--font-sans)',
                width: '100%',
                minWidth: 0,
                letterSpacing: '0.025em',
              },
            }}
          />

          {/* Status icon */}
          {touched && value && (
            <div style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}>
              {isValid ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" fill="#22c55e"/>
                  <path d="M5 8.5l2 2 4-4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" fill="#ef4444"/>
                  <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          )}
        </div>

        {/* Hint / error / success */}
        <p style={{
          fontSize: '0.72rem',
          margin: '4px 0 0',
          fontFamily: 'var(--font-sans)',
          minHeight: 16,
          color: showError ? '#ef4444' : showSuccess ? '#22c55e' : '#b0bec8',
        }}>
          {showSuccess
            ? '✓ Număr valid'
            : hint
            ? `Format: ${hint}`
            : ''}
        </p>
      </div>

      <style>{`
        .PhoneInput { display: flex; align-items: center; width: 100%; }
        .PhoneInputCountry {
          display: flex; align-items: center; gap: 4px;
          padding-left: ${isModal ? '10px' : '14px'};
          flex-shrink: 0; cursor: pointer; position: relative;
        }
        .PhoneInputCountryIcon {
          width: 22px; height: 16px; border-radius: 2px;
          overflow: hidden; flex-shrink: 0;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
        }
        .PhoneInputCountryIcon--square { width: 22px; height: 22px; }
        .PhoneInputCountrySelectArrow {
          width: 7px; height: 7px;
          border-bottom: 1.5px solid #9ca3af;
          border-right: 1.5px solid #9ca3af;
          transform: rotate(45deg) translateY(-2px);
          margin-left: 2px; flex-shrink: 0;
        }
        .PhoneInputCountrySelect {
          position: absolute; inset: 0; opacity: 0;
          cursor: pointer; width: 100%; height: 100%;
        }
        .PhoneInputInput { flex: 1; min-width: 0; }
        .PhoneInputInput::placeholder { color: #c8d4e0; letter-spacing: 0.03em; }
      `}</style>
    </div>
  );
}