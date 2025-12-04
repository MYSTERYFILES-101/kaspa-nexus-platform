'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

// Icons
const HomeIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const KaspaIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TokensIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const DexIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const DefiIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const InfraIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const SignalsIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const BotIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PortfolioIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const TeamIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const SponsorIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const LoginIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);

const RegisterIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const ProfileIcon = () => (
  <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Icons für später (wenn Auth implementiert ist):
// const UpgradeIcon = () => (
//   <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//   </svg>
// );
// const ApiIcon = () => (
//   <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//   </svg>
// );
// const LogoutIcon = () => (
//   <svg className="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//   </svg>
// );

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`nav-category-chevron ${open ? 'open' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const NodeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

// Category icons
const categoryIcons: Record<string, () => JSX.Element> = {
  kaspaNexus: HomeIcon,
  krc20Network: TokensIcon,
  signals: SignalsIcon,
  investment: PortfolioIcon,
  team: TeamIcon,
  account: ProfileIcon,
};

// Navigation structure
interface NavItem {
  labelKey: string;
  href: string;
  icon: () => JSX.Element;
  badge?: 'pro' | 'pro-plus' | 'upgrade' | 'new' | 'beta';
}

interface NavCategory {
  id: string;
  labelKey: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const navigation: NavCategory[] = [
  {
    id: 'kaspaNexus',
    labelKey: 'kaspaNexus',
    defaultOpen: true,
    items: [
      { labelKey: 'home', href: '/', icon: HomeIcon },
    ],
  },
  {
    id: 'krc20Network',
    labelKey: 'krc20Network',
    defaultOpen: true,
    items: [
      { labelKey: 'kaspa', href: '/krc20/kaspa', icon: KaspaIcon },
      { labelKey: 'tokens', href: '/krc20/tokens', icon: TokensIcon },
      { labelKey: 'dex', href: '/krc20/dex', icon: DexIcon },
      { labelKey: 'defi', href: '/krc20/defi', icon: DefiIcon },
      { labelKey: 'infrastructure', href: '/krc20/infrastructure', icon: InfraIcon },
    ],
  },
  {
    id: 'signals',
    labelKey: 'signals',
    defaultOpen: false,
    items: [
      { labelKey: 'signalsBoard', href: '/signals', icon: SignalsIcon },
      { labelKey: 'signalsPro', href: '/signals/pro', icon: SignalsIcon, badge: 'pro' },
      { labelKey: 'tradingBot', href: '/signals/bot', icon: BotIcon, badge: 'pro-plus' },
    ],
  },
  {
    id: 'investment',
    labelKey: 'investment',
    defaultOpen: false,
    items: [
      { labelKey: 'investmentBoard', href: '/investment', icon: PortfolioIcon },
      { labelKey: 'portfolio', href: '/investment/portfolio', icon: PortfolioIcon, badge: 'pro' },
    ],
  },
  {
    id: 'team',
    labelKey: 'team',
    defaultOpen: false,
    items: [
      { labelKey: 'teamMembers', href: '/team', icon: TeamIcon },
      { labelKey: 'sponsors', href: '/team/sponsors', icon: SponsorIcon },
    ],
  },
  {
    id: 'account',
    labelKey: 'account',
    defaultOpen: false,
    items: [
      // Ohne Auth: nur Login und Register anzeigen
      // Später mit Auth: dynamisch umschalten zu Profile, Upgrade, API, Logout
      { labelKey: 'login', href: '/auth/login', icon: LoginIcon },
      { labelKey: 'register', href: '/auth/register', icon: RegisterIcon },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('sidebar');

  // Track which categories are open
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigation.forEach(cat => {
      initial[cat.id] = cat.defaultOpen ?? false;
    });
    return initial;
  });

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'pro': return 'menu-badge menu-badge-pro';
      case 'pro-plus': return 'menu-badge menu-badge-pro-plus';
      case 'upgrade': return 'menu-badge menu-badge-upgrade';
      case 'new': return 'menu-badge menu-badge-new';
      case 'beta': return 'menu-badge menu-badge-beta';
      default: return '';
    }
  };

  const getBadgeText = (badge?: string) => {
    switch (badge) {
      case 'pro': return 'PRO';
      case 'pro-plus': return 'PRO+';
      case 'upgrade': return 'UPGRADE';
      case 'new': return 'NEW';
      case 'beta': return 'BETA';
      default: return '';
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header / Logo */}
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo" onClick={onClose}>
            <div className="sidebar-logo-icon">K</div>
            <div className="sidebar-logo-text">
              <div className="sidebar-logo-title">
                <span className="primary">KASPA</span>-NEXUS
              </div>
              <div className="sidebar-logo-version">v4.0 Enterprise</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="sidebar-content">
          {navigation.map((category) => {
            const CategoryIcon = categoryIcons[category.id] || HomeIcon;
            const isOpen = openCategories[category.id];

            return (
              <div key={category.id} className="nav-category">
                {/* Category Header */}
                <div
                  className="nav-category-header"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="nav-category-title">
                    <CategoryIcon />
                    {t(`categories.${category.labelKey}`)}
                  </div>
                  <ChevronIcon open={isOpen} />
                </div>

                {/* Category Items */}
                <div className={`nav-items ${isOpen ? 'open' : ''}`}>
                  {category.items.map((item) => {
                    const ItemIcon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item ${active ? 'active' : ''}`}
                        onClick={onClose}
                      >
                        <div className="nav-item-content">
                          <ItemIcon />
                          {t(`items.${item.labelKey}`)}
                        </div>
                        {item.badge && (
                          <span className={getBadgeClass(item.badge)}>
                            {getBadgeText(item.badge)}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Language Switcher */}
          <div className="mt-6 px-4">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Footer - Kaspa Node Status */}
        <div className="sidebar-footer">
          <div className="node-status">
            <div className="node-status-icon">
              <NodeIcon />
            </div>
            <div className="node-status-info">
              <div className="node-status-title">{t('nodeStatus.title')}</div>
              <div className="node-status-state">
                <span className="node-status-dot connected" />
                <span className="node-status-text connected">{t('nodeStatus.connected')}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
