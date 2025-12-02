# KASPA-NEXUS - ENTWICKLUNGS-REGELN & STANDARDS

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   KASPA-NEXUS ENTWICKLUNGS-REGELN                                            ║
║   Version: 2.0.0                                                             ║
║   Gültig für: Phase 5-15 (API + Platform)                                    ║
║                                                                              ║
║   Diese Regeln sind VERBINDLICH für alle Entwicklungsarbeiten.               ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 1. PROJEKT-STRUKTUR

### 1.1 Verzeichnisstruktur

```
/home/kaspa/kaspa-nexus-api/
├── docs/
│   ├── handover/
│   │   ├── protokolle/           # Alle Übergabe-Protokolle
│   │   │   ├── A5.1-AUFTRAG.md
│   │   │   ├── A5.1-PROTOKOLL.md
│   │   │   └── ...
│   │   └── HANDOVER-INDEX.md     # Übersicht aller Protokolle
│   ├── ENTWICKLUNGS-REGELN.md    # Dieses Dokument
│   ├── PHASE-5-PLAN.md           # Aktuelle Phase
│   ├── RUNBOOK.md                # Operations
│   └── ...
├── KASPA-NEXUS-MASTERPLAN.md     # Enterprise Masterplan
└── ...
```

### 1.2 Namenskonventionen

| Element | Format | Beispiel |
|---------|--------|----------|
| Auftrag-Datei | `A{Phase}.{Nr}-AUFTRAG.md` | `A5.1-AUFTRAG.md` |
| Protokoll-Datei | `A{Phase}.{Nr}-PROTOKOLL.md` | `A5.1-PROTOKOLL.md` |
| Phase-Plan | `PHASE-{Nr}-PLAN.md` | `PHASE-5-PLAN.md` |
| Branch (Git) | `feature/A{Phase}.{Nr}-{kurz}` | `feature/A5.1-node-setup` |
| Commit | `A{Phase}.{Nr}: {beschreibung}` | `A5.1: Kaspa Node installiert` |

---

## 2. AUFTRAGS-SYSTEM

### 2.1 Auftrags-Template

Jeder Auftrag MUSS folgendes Format haben:

```markdown
# KASPA-NEXUS - AUFTRAG A{X}.{Y}

╔══════════════════════════════════════════════════════════════╗
║  KASPA-NEXUS ENTWICKLUNGSAUFTRAG                             ║
╠══════════════════════════════════════════════════════════════╣
║  Auftrag-Nr:    A{X}.{Y}                                     ║
║  Phase:         PHASE-{X} ({Name})                           ║
║  Titel:         {Titel}                                      ║
║  Priorität:     {KRITISCH|HOCH|MITTEL|NIEDRIG}               ║
║  Status:        {⏳ OFFEN|🔄 IN ARBEIT|✅ ABGESCHLOSSEN}     ║
╠══════════════════════════════════════════════════════════════╣
║  BESCHREIBUNG                                                ║
║  {Kurze Beschreibung des Auftrags}                           ║
╠══════════════════════════════════════════════════════════════╣
║  ABHÄNGIGKEITEN                                              ║
║  {Liste der Aufträge die vorher erledigt sein müssen}        ║
╠══════════════════════════════════════════════════════════════╣
║  ANFORDERUNGEN                                               ║
║  1. {Anforderung 1}                                          ║
║  2. {Anforderung 2}                                          ║
║  ...                                                         ║
╠══════════════════════════════════════════════════════════════╣
║  ABNAHMEKRITERIEN                                            ║
║  [ ] {Kriterium 1}                                           ║
║  [ ] {Kriterium 2}                                           ║
║  ...                                                         ║
╚══════════════════════════════════════════════════════════════╝

## Datum: {YYYY-MM-DD}
## Bearbeiter: Claude Code
```

### 2.2 Protokoll-Template

Nach Abschluss MUSS ein Protokoll erstellt werden:

```markdown
# KASPA-NEXUS - ÜBERGABE-PROTOKOLL A{X}.{Y}

╔══════════════════════════════════════════════════════════════╗
║  ÜBERGABE-PROTOKOLL                                          ║
╠══════════════════════════════════════════════════════════════╣
║  Auftrag-Nr:    A{X}.{Y}                                     ║
║  Titel:         {Titel}                                      ║
║  Status:        ✅ ABGESCHLOSSEN                             ║
║  Datum:         {YYYY-MM-DD}                                 ║
║  Bearbeiter:    Claude Code                                  ║
╚══════════════════════════════════════════════════════════════╝

## 1. ZUSAMMENFASSUNG
{Was wurde gemacht?}

## 2. IMPLEMENTIERTE KOMPONENTEN
### 2.1 {Komponente 1}
{Details}

### 2.2 {Komponente 2}
{Details}

## 3. DATEIEN
| Datei | Aktion | Beschreibung |
|-------|--------|--------------|
| `path/to/file` | Erstellt/Geändert | Beschreibung |

## 4. TESTS
| Test | Status |
|------|--------|
| {Test 1} | ✅ |
| {Test 2} | ✅ |

## 5. BEKANNTE EINSCHRÄNKUNGEN
{Falls vorhanden}

## 6. ABNAHMEKRITERIEN
| Kriterium | Status |
|-----------|--------|
| {Kriterium 1} | ✅ |
| {Kriterium 2} | ✅ |

## 7. NÄCHSTE SCHRITTE
{Was kommt als nächstes?}
```

---

## 3. WORKFLOW-REGELN

### 3.1 Vor Beginn eines Auftrags

```
┌─────────────────────────────────────────────────────────────┐
│  CHECKLISTE VOR ARBEITSBEGINN                               │
├─────────────────────────────────────────────────────────────┤
│  [ ] Auftrag-Datei gelesen und verstanden                   │
│  [ ] Abhängigkeiten sind abgeschlossen                      │
│  [ ] Alle benötigten Ressourcen verfügbar                   │
│  [ ] Abnahmekriterien klar                                  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Während der Arbeit

1. **Kleine Commits** - Lieber 10 kleine als 1 großer
2. **Commit Messages** - Immer mit Auftragsnummer: `A5.1: ...`
3. **Tests schreiben** - Bevor oder während der Implementierung
4. **Dokumentation** - Code-Kommentare wo nötig

### 3.3 Nach Abschluss

```
┌─────────────────────────────────────────────────────────────┐
│  CHECKLISTE NACH ABSCHLUSS                                  │
├─────────────────────────────────────────────────────────────┤
│  [ ] Alle Abnahmekriterien erfüllt                          │
│  [ ] Tests bestehen                                         │
│  [ ] Code reviewed (selbst oder durch Claude)               │
│  [ ] Protokoll erstellt                                     │
│  [ ] Auftrag-Status auf ✅ gesetzt                          │
│  [ ] HANDOVER-INDEX.md aktualisiert                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. PRIORITÄTEN-SYSTEM

| Priorität | Bedeutung | Bearbeitungszeit |
|-----------|-----------|------------------|
| 🔴 KRITISCH | Blockiert andere Aufträge | Sofort |
| 🟠 HOCH | Wichtig für Kernfunktion | Diese Woche |
| 🟡 MITTEL | Normale Priorität | Diese Phase |
| 🟢 NIEDRIG | Nice-to-have | Wenn Zeit |

---

## 5. STATUS-DEFINITIONEN

| Status | Symbol | Bedeutung |
|--------|--------|-----------|
| OFFEN | ⏳ | Noch nicht begonnen |
| IN ARBEIT | 🔄 | Aktuell in Bearbeitung |
| REVIEW | 🔍 | Wartet auf Review |
| BLOCKIERT | 🚫 | Wartet auf Abhängigkeit |
| ABGESCHLOSSEN | ✅ | Fertig und abgenommen |

---

## 6. CODE-STANDARDS

### 6.1 TypeScript/JavaScript

```typescript
// ✅ RICHTIG: Klare Benennung, typisiert
async function getTokenPrice(tick: string): Promise<TokenPrice> {
  const token = await this.prisma.krc20Token.findUnique({
    where: { tick: tick.toUpperCase() }
  });

  if (!token) {
    throw new NotFoundException(`Token ${tick} not found`);
  }

  return this.calculatePrice(token);
}

// ❌ FALSCH: Unklar, untypisiert
async function getPrice(t) {
  const x = await this.prisma.krc20Token.findUnique({ where: { tick: t } });
  return this.calc(x);
}
```

### 6.2 Fehlerbehandlung

```typescript
// Immer spezifische Fehler werfen
throw new NotFoundException('Token not found');
throw new BadRequestException('Invalid tick format');
throw new ServiceUnavailableException('External API unavailable');

// Nie generische Fehler
throw new Error('Error');  // ❌
```

### 6.3 Logging

```typescript
// Strukturiertes Logging
this.logger.log(`Processing token: ${tick}`);
this.logger.warn(`Rate limit approaching for ${apiKey}`);
this.logger.error(`Failed to fetch price for ${tick}`, error.stack);

// Nie console.log in Production
console.log('test');  // ❌
```

---

## 7. TEST-STANDARDS

### 7.1 Unit Tests

```typescript
describe('TokenService', () => {
  describe('getToken', () => {
    it('should return token when found', async () => {
      // Arrange
      const mockToken = { tick: 'KASPER', maxSupply: '28700000000' };
      prisma.krc20Token.findUnique.mockResolvedValue(mockToken);

      // Act
      const result = await service.getToken('KASPER');

      // Assert
      expect(result.tick).toBe('KASPER');
    });

    it('should throw NotFoundException when token not found', async () => {
      prisma.krc20Token.findUnique.mockResolvedValue(null);

      await expect(service.getToken('INVALID'))
        .rejects.toThrow(NotFoundException);
    });
  });
});
```

### 7.2 Test-Abdeckung

| Komponente | Minimum |
|------------|---------|
| Services | 80% |
| Controller | 70% |
| Utils | 90% |
| Kritische Pfade (Indexer, Preise) | 95% |

---

## 8. SICHERHEITS-REGELN

### 8.1 Secrets

```bash
# ✅ RICHTIG: In .env
DATABASE_URL=postgresql://...
API_SECRET=xxx

# ❌ FALSCH: Im Code
const secret = "hardcoded-secret";
```

### 8.2 Input Validation

```typescript
// Immer validieren
@IsString()
@Length(4, 6)
@Matches(/^[A-Z]+$/)
tick: string;
```

### 8.3 Keine Credentials in Logs

```typescript
// ❌ FALSCH
this.logger.log(`Connecting with password: ${password}`);

// ✅ RICHTIG
this.logger.log(`Connecting to database...`);
```

---

## 9. DOKUMENTATIONS-REGELN

### 9.1 Was MUSS dokumentiert werden

- Jeder Auftrag (Auftrag + Protokoll)
- Komplexe Algorithmen (Indexer, Preisberechnung)
- API Endpoints (Swagger)
- Konfigurationsoptionen
- Deployment-Prozesse

### 9.2 Sprache

| Dokument | Sprache |
|----------|---------|
| Code-Kommentare | Englisch |
| Commit Messages | Englisch |
| Auftrag/Protokoll | Deutsch |
| API Dokumentation | Englisch |
| README | Englisch |

---

## 10. REVIEW-PROZESS

### 10.1 Selbst-Review Checkliste

```
[ ] Code kompiliert ohne Fehler
[ ] Alle Tests bestehen
[ ] Keine TypeScript Warnings
[ ] Keine eslint Errors
[ ] Logging ist angemessen
[ ] Fehlerbehandlung ist vollständig
[ ] Keine hardcoded Werte
[ ] Performance ist akzeptabel
```

### 10.2 Claude Code Review

Bei kritischen Komponenten (Indexer, Preise, Auth):
- Code an Claude zeigen
- Auf Sicherheitslücken prüfen lassen
- Performance-Empfehlungen einholen

---

## 11. KOMMUNIKATION

### 11.1 Bei Problemen

1. Problem genau beschreiben
2. Was wurde bereits versucht?
3. Fehlermeldung/Logs anhängen
4. Betroffener Auftrag nennen

### 11.2 Bei Unklarheiten

- IMMER fragen bevor falsch implementiert wird
- Annahmen explizit dokumentieren
- Alternativen vorschlagen

---

## 12. BACKUP & RECOVERY

### 12.1 Vor kritischen Änderungen

```bash
# Datenbank Backup
pg_dump -U kaspa_nexus kaspa_nexus_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Code Backup (Git)
git stash
git checkout -b backup/before-A5.3
```

### 12.2 Recovery Plan

Jeder kritische Auftrag MUSS einen Rollback-Plan haben.

---

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   Diese Regeln gelten ab sofort.                                             ║
║   Bei Fragen: IMMER fragen, nie raten.                                       ║
║                                                                              ║
║   Erstellt: 2025-11-30                                                       ║
║   Version: 2.0.0                                                             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```
