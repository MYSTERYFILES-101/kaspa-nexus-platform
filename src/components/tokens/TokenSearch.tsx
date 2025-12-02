'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { debounce } from '@/lib/utils';

interface TokenSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function TokenSearch({ onSearch, placeholder }: TokenSearchProps) {
  const t = useTranslations('tokens');
  const [value, setValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    debouncedSearch(query);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="relative flex-1">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder || t('searchPlaceholder')}
        className="glass-input pl-12 pr-10 py-3 w-full"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
