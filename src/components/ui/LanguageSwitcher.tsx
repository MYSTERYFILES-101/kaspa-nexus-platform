'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';

const locales = [
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      // Set cookie and reload
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          disabled={isPending}
          className={`
            px-2 py-1 text-xs font-medium rounded transition-all duration-200
            ${locale === loc.code
              ? 'bg-primary/20 text-primary border border-primary/30'
              : 'text-text-secondary hover:text-text-primary hover:bg-glass-light'
            }
            ${isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
          `}
          title={loc.code === 'de' ? 'Deutsch' : 'English'}
        >
          <span className="mr-1">{loc.flag}</span>
          {loc.label}
        </button>
      ))}
    </div>
  );
}
