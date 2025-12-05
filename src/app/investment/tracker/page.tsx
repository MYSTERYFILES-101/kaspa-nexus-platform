'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { InvestmentSwitchbar } from '@/components/investment/InvestmentSwitchbar';

// Types
interface Position {
  id: string;
  coin: string;
  symbol: string;
  amount: number;
  avgPrice: number;
  currentPrice: number;
  purchases: Purchase[];
  addedAt: string;
}

interface Purchase {
  id: string;
  amount: number;
  price: number;
  date: string;
}

interface PortfolioStats {
  totalValue: number;
  totalInvested: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
}

// Mock data for UI demonstration - will be replaced with real data from DB
const mockPositions: Position[] = [];

export default function PortfolioTrackerPage() {
  const t = useTranslations('tracker');

  // State
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddPurchaseModal, setShowAddPurchaseModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Form state for new position
  const [newCoin, setNewCoin] = useState('');
  const [newSymbol, setNewSymbol] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  // Calculate portfolio stats
  const calculateStats = (): PortfolioStats => {
    let totalValue = 0;
    let totalInvested = 0;

    positions.forEach(pos => {
      totalValue += pos.amount * pos.currentPrice;
      totalInvested += pos.amount * pos.avgPrice;
    });

    const totalProfitLoss = totalValue - totalInvested;
    const totalProfitLossPercent = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

    return { totalValue, totalInvested, totalProfitLoss, totalProfitLossPercent };
  };

  const stats = calculateStats();

  // Add new position
  const handleAddPosition = () => {
    if (!newCoin || !newSymbol || !newAmount || !newPrice) return;

    const amount = parseFloat(newAmount);
    const price = parseFloat(newPrice);

    const newPosition: Position = {
      id: Date.now().toString(),
      coin: newCoin,
      symbol: newSymbol.toUpperCase(),
      amount: amount,
      avgPrice: price,
      currentPrice: price, // Will be updated with live price
      purchases: [{
        id: Date.now().toString(),
        amount: amount,
        price: price,
        date: newDate
      }],
      addedAt: new Date().toISOString()
    };

    setPositions([...positions, newPosition]);
    resetForm();
    setShowAddModal(false);
  };

  // Add purchase to existing position (Nachkauf)
  const handleAddPurchase = () => {
    if (!selectedPosition || !newAmount || !newPrice) return;

    const amount = parseFloat(newAmount);
    const price = parseFloat(newPrice);

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      amount: amount,
      price: price,
      date: newDate
    };

    // Calculate new average price
    const totalAmount = selectedPosition.amount + amount;
    const totalCost = (selectedPosition.amount * selectedPosition.avgPrice) + (amount * price);
    const newAvgPrice = totalCost / totalAmount;

    const updatedPosition: Position = {
      ...selectedPosition,
      amount: totalAmount,
      avgPrice: newAvgPrice,
      purchases: [...selectedPosition.purchases, newPurchase]
    };

    setPositions(positions.map(p => p.id === selectedPosition.id ? updatedPosition : p));
    resetForm();
    setShowAddPurchaseModal(false);
    setSelectedPosition(null);
  };

  // Delete position
  const handleDeletePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  // Reset form
  const resetForm = () => {
    setNewCoin('');
    setNewSymbol('');
    setNewAmount('');
    setNewPrice('');
    setNewDate(new Date().toISOString().split('T')[0]);
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    if (value >= 1) {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${value.toFixed(6)}`;
  };

  // Format percent
  const formatPercent = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Investment Banner */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/images/banners/Banner-Investment-Hub.png"
          alt="Investment Hub"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Investment Switchbar */}
      <InvestmentSwitchbar />

      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-[var(--color-primary)]/20 text-[var(--color-primary)]">PRO</span>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('addPosition')}
          </button>
        </div>
      </GlassCard>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <GlassCard className="p-4">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('stats.totalValue')}</p>
          <p className="text-xl md:text-2xl font-bold text-white">
            {formatCurrency(stats.totalValue)}
          </p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('stats.invested')}</p>
          <p className="text-xl md:text-2xl font-bold text-white">
            {formatCurrency(stats.totalInvested)}
          </p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('stats.profitLoss')}</p>
          <p className={`text-xl md:text-2xl font-bold ${stats.totalProfitLoss >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
            {formatCurrency(stats.totalProfitLoss)}
          </p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('stats.profitLossPercent')}</p>
          <p className={`text-xl md:text-2xl font-bold ${stats.totalProfitLossPercent >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
            {formatPercent(stats.totalProfitLossPercent)}
          </p>
        </GlassCard>
      </div>

      {/* Portfolio Chart Placeholder */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{t('chart.title')}</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded bg-[var(--color-primary)]/20 text-[var(--color-primary)]">7D</button>
            <button className="px-3 py-1 text-xs rounded bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10">30D</button>
            <button className="px-3 py-1 text-xs rounded bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10">90D</button>
            <button className="px-3 py-1 text-xs rounded bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10">1Y</button>
            <button className="px-3 py-1 text-xs rounded bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10">ALL</button>
          </div>
        </div>
        <div className="h-48 md:h-64 flex items-center justify-center border border-dashed border-white/20 rounded-lg">
          {positions.length === 0 ? (
            <p className="text-[var(--color-text-muted)] text-sm">{t('chart.empty')}</p>
          ) : (
            <p className="text-[var(--color-text-muted)] text-sm">{t('chart.placeholder')}</p>
          )}
        </div>
      </GlassCard>

      {/* Positions Table */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{t('positions.title')}</h2>
          <span className="text-sm text-[var(--color-text-muted)]">
            {positions.length} {t('positions.count')}
          </span>
        </div>

        {positions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('positions.empty.title')}</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-4">{t('positions.empty.description')}</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-semibold rounded-lg hover:bg-[var(--color-primary)]/30 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t('positions.empty.cta')}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2 text-xs text-[var(--color-text-muted)] font-medium">{t('table.coin')}</th>
                  <th className="text-right py-3 px-2 text-xs text-[var(--color-text-muted)] font-medium">{t('table.amount')}</th>
                  <th className="text-right py-3 px-2 text-xs text-[var(--color-text-muted)] font-medium">{t('table.avgPrice')}</th>
                  <th className="text-right py-3 px-2 text-xs text-[var(--color-text-muted)] font-medium">{t('table.currentPrice')}</th>
                  <th className="text-right py-3 px-2 text-xs text-[var(--color-text-muted)] font-medium">{t('table.value')}</th>
                  <th className="text-right py-3 px-2 text-xs text-[var(--color-text-muted)] font-medium">{t('table.profitLoss')}</th>
                  <th className="text-right py-3 px-2 text-xs text-[var(--color-text-muted)] font-medium">{t('table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => {
                  const value = position.amount * position.currentPrice;
                  const invested = position.amount * position.avgPrice;
                  const profitLoss = value - invested;
                  const profitLossPercent = (profitLoss / invested) * 100;

                  return (
                    <tr key={position.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-xs font-bold">
                            {position.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold">{position.coin}</p>
                            <p className="text-xs text-[var(--color-text-muted)]">{position.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2 font-mono">
                        {position.amount.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                      </td>
                      <td className="text-right py-4 px-2 font-mono text-[var(--color-text-muted)]">
                        {formatCurrency(position.avgPrice)}
                      </td>
                      <td className="text-right py-4 px-2 font-mono">
                        {formatCurrency(position.currentPrice)}
                      </td>
                      <td className="text-right py-4 px-2 font-mono font-semibold">
                        {formatCurrency(value)}
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className={profitLoss >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}>
                          <p className="font-mono font-semibold">{formatCurrency(profitLoss)}</p>
                          <p className="text-xs">{formatPercent(profitLossPercent)}</p>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedPosition(position);
                              setShowAddPurchaseModal(true);
                            }}
                            className="p-2 rounded-lg bg-[var(--color-success)]/20 text-[var(--color-success)] hover:bg-[var(--color-success)]/30 transition-colors"
                            title={t('actions.addPurchase')}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeletePosition(position.id)}
                            className="p-2 rounded-lg bg-[var(--color-error)]/20 text-[var(--color-error)] hover:bg-[var(--color-error)]/30 transition-colors"
                            title={t('actions.delete')}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {/* Purchase History */}
      {positions.length > 0 && (
        <GlassCard className="p-4 md:p-6">
          <h2 className="text-lg font-bold mb-4">{t('history.title')}</h2>
          <div className="space-y-2">
            {positions.flatMap(pos =>
              pos.purchases.map(purchase => ({
                ...purchase,
                coin: pos.coin,
                symbol: pos.symbol
              }))
            ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10).map((purchase, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t('history.bought')} {purchase.amount} {purchase.symbol}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{new Date(purchase.date).toLocaleDateString('de-DE')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{formatCurrency(purchase.price)}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{t('history.perCoin')}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Add Position Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{t('modal.addPosition.title')}</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">{t('modal.coinName')}</label>
                <input
                  type="text"
                  value={newCoin}
                  onChange={(e) => setNewCoin(e.target.value)}
                  placeholder="z.B. Kaspa"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">{t('modal.symbol')}</label>
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                  placeholder="z.B. KAS"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:outline-none transition-colors uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-2">{t('modal.amount')}</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="0.00"
                    step="any"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-2">{t('modal.buyPrice')}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">$</span>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="0.00"
                      step="any"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">{t('modal.buyDate')}</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-semibold"
              >
                {t('modal.cancel')}
              </button>
              <button
                onClick={handleAddPosition}
                disabled={!newCoin || !newSymbol || !newAmount || !newPrice}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('modal.add')}
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Add Purchase Modal (Nachkauf) */}
      {showAddPurchaseModal && selectedPosition && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">{t('modal.addPurchase.title')}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{selectedPosition.coin} ({selectedPosition.symbol})</p>
              </div>
              <button
                onClick={() => {
                  setShowAddPurchaseModal(false);
                  setSelectedPosition(null);
                  resetForm();
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Current position info */}
            <div className="p-3 rounded-lg bg-white/5 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">{t('modal.currentAmount')}:</span>
                <span className="font-mono">{selectedPosition.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-[var(--color-text-muted)]">{t('modal.currentAvgPrice')}:</span>
                <span className="font-mono">{formatCurrency(selectedPosition.avgPrice)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-2">{t('modal.amount')}</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="0.00"
                    step="any"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-2">{t('modal.buyPrice')}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">$</span>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="0.00"
                      step="any"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">{t('modal.buyDate')}</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
              </div>

              {/* Preview new average */}
              {newAmount && newPrice && (
                <div className="p-3 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
                  <p className="text-sm text-[var(--color-success)] font-semibold mb-1">{t('modal.preview')}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">{t('modal.newAmount')}:</span>
                    <span className="font-mono">{(selectedPosition.amount + parseFloat(newAmount)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-[var(--color-text-muted)]">{t('modal.newAvgPrice')}:</span>
                    <span className="font-mono">
                      {formatCurrency(
                        ((selectedPosition.amount * selectedPosition.avgPrice) + (parseFloat(newAmount) * parseFloat(newPrice))) /
                        (selectedPosition.amount + parseFloat(newAmount))
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddPurchaseModal(false);
                  setSelectedPosition(null);
                  resetForm();
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-semibold"
              >
                {t('modal.cancel')}
              </button>
              <button
                onClick={handleAddPurchase}
                disabled={!newAmount || !newPrice}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--color-success)] to-emerald-600 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('modal.addPurchase.confirm')}
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Info Box */}
      <GlassCard className="p-4 mt-6 border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-[var(--color-warning)] mb-1">{t('info.title')}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{t('info.description')}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
