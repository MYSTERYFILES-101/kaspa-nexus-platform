# WICHTIGES WISSEN - Kaspa Nexus Platform

**Letzte Aktualisierung:** 2025-12-03
**Zweck:** Alle wichtigen Erkenntnisse, Loesungen und Wissen fuer zukuenftige Referenz

---

## INHALTSVERZEICHNIS

1. [Server & Infrastructure](#1-server--infrastructure)
2. [Kaspa Nodes](#2-kaspa-nodes)
3. [Frontend Platform](#3-frontend-platform)
4. [API Backend](#4-api-backend)
5. [DEX & KRC-20 Ecosystem](#5-dex--krc-20-ecosystem)
6. [Haeufige Probleme & Loesungen](#6-haeufige-probleme--loesungen)
7. [Wichtige Kontakte](#7-wichtige-kontakte)
8. [Nuetzliche Befehle](#8-nuetzliche-befehle)

---

## 1. SERVER & INFRASTRUCTURE

### Server-Spezifikationen

| Ressource | Wert |
|-----------|------|
| **RAM** | 125 GB |
| **CPU** | Multi-Core (6% typische Auslastung) |
| **Disk** | SSD, 603 MB/s Durchsatz |
| **OS** | Linux (Ubuntu) |

### Benutzer & Verzeichnisse

| Benutzer | Zweck | Home-Verzeichnis |
|----------|-------|------------------|
| `kaspa` | Alle Kaspa-Services | `/home/kaspa/` |
| `root` | System-Admin | `/root/` |

### Wichtige Pfade

```
/home/kaspa/kaspa-nexus-platform/    # Next.js Frontend
/home/kaspa/kaspa-nexus-api/         # NestJS Backend API
/home/kaspa/rusty-kaspa/             # Kaspa Node Binary
/home/kaspa/kaspa-node-archival/     # Archival Node Daten
/etc/systemd/system/                 # Systemd Services
```

---

## 2. KASPA NODES

### Node-Uebersicht

| Node | Port (JSON-RPC) | RAM-Scale | RAM | Status |
|------|-----------------|-----------|-----|--------|
| **Pruned Node** | 18110 | 2.0 | ~21 GB | Vollstaendig |
| **Archival Node** | 18210 | 5.0 | ~30-35 GB | Nur aktuelle Daten |

### Archival Node - KRITISCHES WISSEN

**PROBLEM ENTDECKT (2025-12-03):**
- Der Archival Node hat nur ~38 GB Daten
- Ein ECHTER Archival Node braucht ~1.9 TB (Stand 02/2025)
- Das `--archival` Flag verhindert NUR das Loeschen, erzwingt KEINEN Genesis-Sync
- Jeder neue Node synct automatisch nur vom "Pruning Point" (letzte Wochen)

**LOESUNG:**
Es ist **NICHT moeglich**, einen Archival Node per Netzwerk von Genesis zu syncen!
Der einzige Weg ist **rsync von einem existierenden Archival Node**.

**Kontakt fuer rsync:**
- **Helix (helixeasy)** auf Kaspa Discord
- Oder: **#datadir_exchange Channel** im Discord

**Hardware-Anforderungen fuer echten Archival Node:**

| Ressource | Minimum | Empfohlen |
|-----------|---------|-----------|
| Storage | 1.9 TB | 2.5+ TB |
| Storage Typ | SSD (PFLICHT!) | NVMe SSD |
| RAM | 32 GB | 64 GB |

### Node-Konfigurationsdateien

**Pruned Node:** `/etc/systemd/system/kaspad.service`
**Archival Node:** `/etc/systemd/system/kaspad-archival.service`

### Archival Node Service (aktuell)

```ini
[Service]
ExecStart=/home/kaspa/rusty-kaspa/target/release/kaspad \
    --appdir=/home/kaspa/kaspa-node-archival/data \
    --logdir=/home/kaspa/kaspa-node-archival/logs \
    --archival \
    --utxoindex \
    --listen=0.0.0.0:16211 \
    --rpclisten=127.0.0.1:16210 \
    --rpclisten-borsh=127.0.0.1:17210 \
    --rpclisten-json=127.0.0.1:18210 \
    --ram-scale=5.0 \
    --loglevel=info \
    --perf-metrics
```

### Node Status pruefen

```bash
# Archival Node Status Script
bash /home/kaspa/kaspa-nexus-api/scripts/archival-node-status.sh

# Systemd Status
sudo systemctl status kaspad-archival
sudo systemctl status kaspad

# Logs anschauen
sudo journalctl -u kaspad-archival -f
sudo journalctl -u kaspad -f
```

---

## 3. FRONTEND PLATFORM

### Technologie-Stack

- **Framework:** Next.js 14 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Port (Dev):** 3001

### Wichtige Pfade

```
src/app/                    # Next.js App Router Pages
src/app/krc20/              # KRC-20 Bereich
  ├── tokens/               # Token-Liste
  ├── tokens/[ticker]/      # Token-Detail-Seite
  ├── dex/                  # DEX-Liste
  └── kaspa/                # Kaspa Info-Seite
src/components/             # React Komponenten
src/types/                  # TypeScript Types
public/images/              # Statische Bilder
```

### Dev Server starten

```bash
cd /home/kaspa/kaspa-nexus-platform

# Normal starten
npm run dev

# Mit Port 3001
PORT=3001 npm run dev

# Bei Problemen: Cache loeschen
rm -rf .next && npm run dev
```

### Build & Deploy

```bash
npm run build    # Production Build
npm start        # Production Server starten
```

### Haeufige Next.js Probleme

**Problem: 404 Fehler fuer statische Ressourcen nach Aenderungen**
```bash
# Loesung: Server stoppen, Cache loeschen, neu starten
fuser -k 3001/tcp
rm -rf .next
PORT=3001 npm run dev
```

**Problem: Seite zeigt alte Daten**
```bash
# Hard Refresh im Browser: Ctrl+Shift+R
# Oder: .next loeschen und neu starten
```

---

## 4. API BACKEND

### Technologie-Stack

- **Framework:** NestJS
- **Datenbank:** PostgreSQL + Prisma ORM
- **Cache:** Redis
- **Port:** 3000

### Wichtige Pfade

```
/home/kaspa/kaspa-nexus-api/
  ├── src/                  # Source Code
  ├── prisma/               # Prisma Schema & Migrations
  ├── scripts/              # Utility Scripts
  └── dist/                 # Compiled Output
```

### PM2 Prozess-Manager

```bash
# Status pruefen
sudo -u kaspa pm2 status

# Logs anschauen
sudo -u kaspa pm2 logs kaspa-nexus-api

# Neustart
sudo -u kaspa pm2 restart kaspa-nexus-api
```

---

## 5. DEX & KRC-20 ECOSYSTEM

### Verifizierte DEXs (Stand 2025-12-03)

| Name | URL | Typ | Status |
|------|-----|-----|--------|
| **ZealousSwap** | https://app.zealousswap.com/swap | Web App | Active |
| **KSPR Bot** | https://t.me/ksaborNFT_bot | Telegram | Active |
| **Chainge Finance** | https://www.chainge.finance/ | Web App | Offline (vom Server) |
| **KasPlex** | https://kasplex.org | Web App | Active |

### WICHTIGE REGEL

**NUR verifizierte, echte DEXs duerfen gelistet werden!**

Bevor ein DEX hinzugefuegt wird:
1. URL muss erreichbar sein (HTTP 200 pruefen)
2. Projekt muss real existieren (recherchieren!)
3. Muss tatsaechlich KRC-20 oder Kaspa unterstuetzen

### Entfernte Fake-DEXs

- "Kaspa DEX" - Existiert NICHT
- "ZingSwap" - Existiert NICHT

Diese wurden faelschlicherweise hinzugefuegt und mussten entfernt werden.

### KRC-20 Token APIs

| API | URL | Zweck |
|-----|-----|-------|
| **Kasplex API** | https://api.kasplex.org | Token-Daten, Holder |
| **kas.fyi API** | https://api.kas.fyi | Block Explorer Daten |

---

## 6. HAEUFIGE PROBLEME & LOESUNGEN

### Next.js Frontend

| Problem | Loesung |
|---------|---------|
| 404 fuer statische Dateien | `rm -rf .next && npm run dev` |
| Seite laedt nicht | Port pruefen, `fuser -k 3001/tcp` |
| TypeScript Fehler | `npm run build` zum Pruefen |
| Alte Daten angezeigt | Browser Cache leeren (Ctrl+Shift+R) |

### Kaspa Nodes

| Problem | Loesung |
|---------|---------|
| Node nicht erreichbar | `sudo systemctl restart kaspad` |
| Hohe RAM-Nutzung | `--ram-scale` anpassen |
| Sync steckt fest | Logs pruefen, evtl. Daten loeschen |
| Archival hat keine alten Daten | rsync von externem Archival Node noetig |

### Git & Deployment

| Problem | Loesung |
|---------|---------|
| Commit fehlgeschlagen | Pre-commit Hooks pruefen |
| Push rejected | `git pull --rebase` zuerst |
| Merge Konflikte | Manuell loesen in den Dateien |

---

## 7. WICHTIGE KONTAKTE

### Kaspa Community

| Kontakt | Zweck |
|---------|-------|
| **Helix (helixeasy)** | Archival Node rsync Zugang |
| **Kaspa Discord** | https://discord.gg/kaspa |
| **#datadir_exchange** | Channel fuer Node Snapshots |

### Offizielle Ressourcen

| Ressource | URL |
|-----------|-----|
| Kaspa Wiki | https://wiki.kaspa.org |
| Rusty-Kaspa GitHub | https://github.com/kaspanet/rusty-kaspa |
| Kaspa Explorer | https://explorer.kaspa.org |
| kas.fyi Explorer | https://kas.fyi |

---

## 8. NUETZLICHE BEFEHLE

### System

```bash
# RAM-Nutzung
free -h

# Disk-Nutzung
df -h

# Prozesse mit hoher RAM-Nutzung
ps aux --sort=-%mem | head -20

# Port-Belegung pruefen
lsof -i :3001
netstat -tulpn | grep 3001
```

### Kaspa Nodes

```bash
# Node Status
bash /home/kaspa/kaspa-nexus-api/scripts/archival-node-status.sh

# Service neustarten
sudo systemctl restart kaspad-archival
sudo systemctl restart kaspad

# Logs live anschauen
sudo journalctl -u kaspad-archival -f

# Datenverzeichnis Groesse
du -sh /home/kaspa/kaspa-node-archival/data
```

### Next.js Frontend

```bash
# Dev Server (Port 3001)
cd /home/kaspa/kaspa-nexus-platform
PORT=3001 npm run dev

# Build pruefen
npm run build

# Cache komplett loeschen
rm -rf .next node_modules/.cache
```

### Git

```bash
# Status
git status

# Aenderungen anzeigen
git diff

# Commit erstellen
git add .
git commit -m "Beschreibung"

# Push
git push origin main
```

### PM2 (API Backend)

```bash
# Als kaspa User
sudo -u kaspa pm2 status
sudo -u kaspa pm2 logs kaspa-nexus-api
sudo -u kaspa pm2 restart kaspa-nexus-api
```

---

## AENDERUNGSHISTORIE

| Datum | Aenderung |
|-------|-----------|
| 2025-12-03 | Dokument erstellt |
| 2025-12-03 | Archival Node Wissen hinzugefuegt (rsync-Loesung) |
| 2025-12-03 | DEX-Liste bereinigt (Fake DEXs entfernt) |
| 2025-12-03 | RAM-Scale von 1.5 auf 5.0 erhoeht |

---

## OFFENE AUFGABEN

- [ ] Archival Node: Helix auf Discord kontaktieren fuer rsync
- [ ] Storage erweitern auf 2.5+ TB fuer Archival Node
- [ ] Chainge Finance URL-Erreichbarkeit weiter beobachten

---

**HINWEIS:** Dieses Dokument regelmaessig aktualisieren wenn neues Wissen hinzukommt!
