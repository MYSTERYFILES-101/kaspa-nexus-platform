# PERFORMANCE-FIX-PROTOKOLL: Schnellere Navigation

**Datum:** 2025-12-03
**Entwickler:** Claude (AI Assistant)
**Sprint:** P1 - Core Frontend

---

## Problem

Seitenwechsel waren langsam/laggy. Die Kaspa-Seite hatte eine sehr grosse Bundle-Groesse (217 kB First Load JS) wegen der Recharts-Library.

---

## Loesung

### 1. Loading States (Instant Feedback)

Fuer jede Route wurde eine `loading.tsx` erstellt, die sofort Skeleton-Animationen anzeigt waehrend die Seite laedt.

**Neue Dateien:**
```
src/app/loading.tsx                     # Root Loading
src/app/krc20/loading.tsx               # KRC-20 Section Loading
src/app/krc20/tokens/loading.tsx        # Token List Loading
src/app/krc20/tokens/[ticker]/loading.tsx # Token Detail Loading
src/app/krc20/kaspa/loading.tsx         # Kaspa Page Loading
```

**Vorteile:**
- Sofortiges visuelles Feedback beim Klick
- Skeleton-Layout passt zur finalen Seite
- Nutzer sieht keine leere Seite

### 2. Dynamic Imports (Code Splitting)

Schwere Komponenten mit Recharts werden jetzt dynamisch geladen:

```typescript
// Vorher (synchron):
import { EmissionChart } from '@/components/kaspa/EmissionChart';

// Nachher (dynamisch):
const EmissionChart = dynamic(
  () => import('@/components/kaspa/EmissionChart').then(mod => ({ default: mod.EmissionChart })),
  { loading: () => <ChartSkeleton />, ssr: false }
);
```

**Dynamisch geladene Komponenten:**
- `NetworkStats` - Netzwerk-Statistiken
- `MiningInfo` - Mining-Informationen
- `EmissionChart` - Emissions-Chart (Recharts)
- `MarketWidget` - Markt-Widget

### 3. Bundle-Groessen Vergleich

| Route | Vorher | Nachher | Ersparnis |
|-------|--------|---------|-----------|
| `/krc20/kaspa` | 217 kB | **113 kB** | **-104 kB (-48%)** |
| `/krc20/tokens` | 120 kB | 120 kB | - |
| `/krc20/tokens/[ticker]` | 115 kB | 115 kB | - |

Die Kaspa-Seite hat **48% weniger JavaScript** beim Initial Load!

---

## Technische Details

### Loading States Pattern

```tsx
// src/app/krc20/tokens/loading.tsx
export default function TokensLoading() {
  return (
    <div className="py-4 md:py-6 lg:py-8 animate-in fade-in duration-300">
      {/* Banner Skeleton */}
      <Skeleton className="w-full aspect-[21/9] mb-6 rounded-2xl" variant="rectangular" />

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Token Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <TokenCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
```

### Dynamic Import Pattern

```typescript
const Component = dynamic(
  () => import('@/components/path').then(mod => ({ default: mod.Component })),
  {
    loading: () => <Skeleton />,  // Sofortiger Platzhalter
    ssr: false,                    // Nur Client-side laden
  }
);
```

---

## Wie es funktioniert

### Navigation Flow (Vorher):
1. User klickt Link
2. Browser wartet auf kompletten JS-Bundle (217 kB)
3. Seite rendert erst nach vollstaendigem Download
4. **Gefuehlte Wartezeit: 1-3 Sekunden**

### Navigation Flow (Nachher):
1. User klickt Link
2. Browser zeigt sofort loading.tsx (Skeleton)
3. Haupt-Bundle laedt (113 kB)
4. Seite rendert mit Skeleton-Komponenten
5. Recharts laedt im Hintergrund (separat)
6. Charts erscheinen wenn bereit
7. **Gefuehlte Wartezeit: <500ms**

---

## Geaenderte Dateien

```
src/app/loading.tsx                           # NEU
src/app/krc20/loading.tsx                     # NEU
src/app/krc20/tokens/loading.tsx              # NEU
src/app/krc20/tokens/[ticker]/loading.tsx     # NEU
src/app/krc20/kaspa/loading.tsx               # NEU
src/app/krc20/kaspa/page.tsx                  # Dynamic imports hinzugefuegt
```

---

## Build Output

```
Route (app)                              Size     First Load JS
┌ ƒ /                                    2.33 kB         113 kB
├ ƒ /krc20/kaspa                         5.99 kB         113 kB  ← War 217 kB!
├ ƒ /krc20/tokens                        4.59 kB         120 kB
└ ƒ /krc20/tokens/[ticker]               4.03 kB         115 kB
```

---

## Weitere Optimierungsmoeglichkeiten

1. **React Query/SWR** - API-Caching zwischen Navigationen
2. **ISR** - Incremental Static Regeneration fuer statische Inhalte
3. **Prefetching** - Link prefetch fuer haeufige Navigationspfade
4. **Image Optimization** - next/image statt <img> verwenden

---

## Status

**ABGESCHLOSSEN**
