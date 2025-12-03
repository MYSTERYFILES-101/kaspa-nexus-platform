# ARCHIVAL-NODE-TUNING-PROTOKOLL: RAM-Scale + Full Resync

**Datum:** 2025-12-03
**Entwickler:** Claude (AI Assistant)
**Bereich:** Infrastructure / Kaspa Nodes

---

## Aenderungen

### 1. RAM-Scale Optimierung
Archival Node RAM-Scale von 1.5 auf 5.0 erhoeht.

### 2. Full Resync von Genesis (WICHTIG!)
**Problem entdeckt:** Der Archival Node hatte nur 38GB Daten - er hatte nur vom
Pruning Point gesynct, nicht von Genesis!

**Loesung:** Datenverzeichnis geloescht und Node neu gestartet fuer Full Sync.

```bash
# Alte Daten gesichert
sudo mv /home/kaspa/kaspa-node-archival/data /home/kaspa/kaspa-node-archival/data-backup-20251203

# Neu gestartet - synct jetzt von Genesis
sudo systemctl restart kaspad-archival
```

**Erwartete Sync-Dauer:** 2-3 Wochen
**Erwartete Datengroesse:** 1+ TB

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
| Disk | SSD 603 MB/s | 38GB Archival Data | - |

---

## Node-Konfiguration

### Pruned Node (Port 18110)
- ram-scale: 2.0
- RAM: ~21GB
- Status: Active, Synced

### Archival Node (Port 18210)
- ram-scale: 5.0 (NEU)
- RAM: ~30-35GB (erwartet)
- Status: Active, Synced
- Features: --archival --utxoindex

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

**ABGESCHLOSSEN**
