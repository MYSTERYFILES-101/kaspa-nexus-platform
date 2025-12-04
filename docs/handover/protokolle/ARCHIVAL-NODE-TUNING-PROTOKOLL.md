# ARCHIVAL-NODE-TUNING-PROTOKOLL: RAM-Scale + Full Resync Recherche

**Datum:** 2025-12-03
**Entwickler:** Claude (AI Assistant)
**Bereich:** Infrastructure / Kaspa Nodes

---

## Aenderungen

### 1. RAM-Scale Optimierung
Archival Node RAM-Scale von 1.5 auf 5.0 erhoeht.

### 2. Full Resync Problem (WICHTIG!)

**Problem entdeckt:**
- Der Archival Node hatte nur 38GB Daten
- Er synct nur vom "Pruning Point", NICHT von Genesis
- Das `--archival` Flag verhindert nur das Loeschen, erzwingt aber keinen Genesis-Sync
- Ein echter Archival Node braucht ~1.9TB Daten (Stand 02/2025)

**Versuch fehlgeschlagen:**
```bash
# Datenverzeichnis geloescht und neu gestartet
sudo mv /home/kaspa/kaspa-node-archival/data /home/kaspa/kaspa-node-archival/data-backup-20251203
sudo systemctl restart kaspad-archival
# ERGEBNIS: Synct WIEDER nur vom Pruning Point!
```

---

## RECHERCHE-ERGEBNIS: Wie bekommt man einen echten Archival Node?

### Die Wahrheit
**Es ist NICHT moeglich, einen Archival Node per Netzwerk-Sync von Genesis zu starten!**

Der einzige Weg ist **rsync von einem existierenden Archival Node**.

### Offizielle Loesung (aus Kaspa Wiki)

1. **Kontakt aufnehmen mit Helix (helixeasy) auf Kaspa Discord**
   - Er kann rsync-Zugang zu einem laufenden Archival Node bereitstellen

2. **rsync-Prozess (3 Schritte)**
   ```bash
   # Schritt 1: Initial Sync (waehrend Source-Node laeuft)
   rsync -av --progress user@archival-source:/path/to/data/ /home/kaspa/kaspa-node-archival/data/

   # Schritt 2: Incremental Sync (wiederholen bis fast synchron)
   rsync -av --progress user@archival-source:/path/to/data/ /home/kaspa/kaspa-node-archival/data/

   # Schritt 3: Final Sync (Source-Node muss gestoppt werden!)
   # Source: sudo systemctl stop kaspad-archival
   rsync -av --progress user@archival-source:/path/to/data/ /home/kaspa/kaspa-node-archival/data/
   # Dann beide Nodes starten
   ```

3. **Alternative: Discord #datadir_exchange Channel**
   - Manchmal werden dort Archival Node Snapshots geteilt
   - Discord: https://discord.gg/kaspa

### Hardware-Anforderungen fuer Archival Node

| Ressource | Minimum | Empfohlen |
|-----------|---------|-----------|
| Storage | 1.9 TB (Stand 02/2025) | 2.5+ TB |
| Storage Typ | SSD (PFLICHT!) | NVMe SSD |
| RAM | 32 GB | 64 GB |
| CPU | 5 Jahre alt | Aktueller Server-CPU |

### Warum wir 2.5+ TB brauchen

Nach dem Crescendo Hardfork (Mai 2025) ist die Blockrate von 1 BPS auf 10 BPS gestiegen.
Das bedeutet 10x mehr Daten pro Sekunde = schnelleres Wachstum!

---

## Aktueller Status

| Node | Status | Daten | Funktionalitaet |
|------|--------|-------|-----------------|
| Pruned Node | OK | ~300 GB | Vollstaendig |
| Archival Node | EINGESCHRAENKT | ~38 GB | Nur aktuelle Daten |

**Der Archival Node funktioniert fuer aktuelle Abfragen, aber hat KEINE historischen Daten vor dem Pruning Point!**

---

## Naechste Schritte (Aktion erforderlich)

1. **Kaspa Discord beitreten:** https://discord.gg/kaspa
2. **Helix (helixeasy) kontaktieren** fuer rsync-Zugang
3. **Oder #datadir_exchange Channel** nach Archival Snapshots durchsuchen
4. **Storage erweitern** auf mindestens 2.5 TB fuer den Archival Node

---

## Quellen

- [Kaspa Wiki - Node Setup](https://wiki.kaspa.org/en/node)
- [Kaspa Wiki - CLI Node Setup](https://wiki.kaspa.org/en/setting-up-a-cli-node)
- [Kaspa Discord](https://discord.gg/kaspa)
- [kaspadbase.com](http://www.kaspadbase.com/) (nur Regular Node Snapshots)

---

## Vorher

```
--ram-scale=1.5
RAM-Nutzung: ~10GB
```

## Nachher

```
--ram-scale=5.0
RAM-Nutzung: ~30-35GB (erwartet)
```

---

## Server-Ressourcen

| Ressource | Gesamt | Verwendet | Verfuegbar |
|-----------|--------|-----------|------------|
| RAM | 125GB | ~55GB (beide Nodes) | ~70GB |
| CPU | 6% Auslastung | - | - |
| Disk | SSD 603 MB/s | 38GB Archival Data | BRAUCHT 2.5TB! |

---

## Node-Konfiguration

### Pruned Node (Port 18110)
- ram-scale: 2.0
- RAM: ~21GB
- Status: Active, Synced

### Archival Node (Port 18210)
- ram-scale: 5.0 (NEU)
- RAM: ~30-35GB (erwartet)
- Status: Active, nur aktuelle Daten
- Features: --archival --utxoindex
- **ACHTUNG:** Keine historischen Daten vor Pruning Point!

---

## Befehle

```bash
# Config-Aenderung
sudo sed -i 's/--ram-scale=1.5/--ram-scale=5.0/' /etc/systemd/system/kaspad-archival.service
sudo systemctl daemon-reload
sudo systemctl restart kaspad-archival

# Status pruefen
bash /home/kaspa/kaspa-nexus-api/scripts/archival-node-status.sh
```

---

## Geaenderte Dateien

```
/etc/systemd/system/kaspad-archival.service   # ram-scale 1.5 -> 5.0
```

---

## Status

**RAM-SCALE: ABGESCHLOSSEN**
**ARCHIVAL FULL SYNC: OFFEN - Benoetigt rsync von externem Archival Node**
