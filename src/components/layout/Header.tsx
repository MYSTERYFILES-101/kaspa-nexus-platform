'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const navItems = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'tokens', href: '/tokens' },
  { labelKey: 'signals', href: '/signals', pro: true },
  { labelKey: 'portfolio', href: '/portfolio', pro: true },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-50 glass-card border-0 border-b border-glass-border rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-primary group-hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-shadow">
              <span className="text-xl font-bold text-white">K</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gradient-primary">KASPA</span>
              <span className="text-xl font-bold text-white">-NEXUS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {t(item.labelKey)}
                {item.pro && (
                  <span className="ml-1.5 badge-pro text-[10px]">PRO</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side - Auth Buttons + Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="px-4 py-2 text-text-secondary hover:text-white transition-colors"
            >
              {t('login')}
            </Link>
            <Link
              href="/register"
              className="btn-primary px-4 py-2 text-sm"
            >
              {t('register')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-glass-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.labelKey)}
                  {item.pro && (
                    <span className="ml-2 badge-pro text-[10px]">PRO</span>
                  )}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-glass-border flex flex-col gap-2">
                <div className="px-4 py-2 flex justify-center">
                  <LanguageSwitcher />
                </div>
                <Link
                  href="/login"
                  className="px-4 py-3 text-center text-text-secondary hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className="btn-primary text-center mx-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('register')}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
