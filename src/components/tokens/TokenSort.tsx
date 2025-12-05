'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export type SortOption =
  | 'marketCap_desc'
  | 'marketCap_asc'
  | 'volume_desc'
  | 'change_desc'
  | 'change_asc'
  | 'holders_desc'
  | 'name_asc';

interface TokenSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; labelKey: string }[] = [
  { value: 'marketCap_desc', labelKey: 'sortMarketCapDesc' },
  { value: 'marketCap_asc', labelKey: 'sortMarketCapAsc' },
  { value: 'volume_desc', labelKey: 'sortVolumeDesc' },
  { value: 'change_desc', labelKey: 'sortChangeDesc' },
  { value: 'change_asc', labelKey: 'sortChangeAsc' },
  { value: 'holders_desc', labelKey: 'sortHoldersDesc' },
  { value: 'name_asc', labelKey: 'sortNameAsc' },
];

export function TokenSort({ value, onChange }: TokenSortProps) {
  const t = useTranslations('tokens');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = sortOptions.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SortOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-input px-4 py-3 flex items-center gap-2 min-w-[180px] justify-between"
      >
        <span className="text-sm">
          {currentOption ? t(currentOption.labelKey) : t('sortBy')}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card py-2 z-50 animate-fade-in">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--glass-bg)] transition-colors ${
                value === option.value
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {t(option.labelKey)}
              {value === option.value && (
                <svg className="w-4 h-4 inline ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
