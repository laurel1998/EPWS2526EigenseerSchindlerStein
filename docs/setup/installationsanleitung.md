# Installation – Gesamtsystem

Dieses Dokument beschreibt die vollständige Installation und Inbetriebnahme des Gesamtsystems.  
Das System besteht aus drei klar getrennten Schritten:

1. Raspberry Pi als Tracking-Gateway  
2. Physisches Setup der Tracking-Fläche  
3. Webclient & Anwendungslogik  

Alle drei Schritte müssen erfolgreich abgeschlossen werden, damit das System funktionsfähig ist.

---

## Systemüberblick

**Datenfluss:**

Antilatency Tracker  
→ Raspberry Pi (Tracking-Gateway)  
→ MQTT Broker  
→ Node.js Server  
→ Webclient (Browser)

Der Raspberry Pi stellt die Verbindung zur Tracking-Hardware her.  
Der MQTT-Broker dient als Transportebene.  
Der Node.js Server verbindet Tracking-Daten mit dem Webclient.  
Der Webclient visualisiert und interpretiert die Tracking-Daten.

---

## Voraussetzungen (Überblick)

- Funktionierende Antilatency-Hardware  
- Netzwerkzugang für alle beteiligten Komponenten  
- Zugriff auf das Projekt-Repository  
- MQTT-Broker (lokal oder Cloud, je nach Setup)  
- Zielsysteme für den Webclient (Browser)

---

## Schritt-für-Schritt Installation

### Schritt 1 – Raspberry Pi Setup (Tracking-Gateway)
[Pi Setup Datei](01_pi_setup.md)

Ziel:
- Antilatency-Tracker laufen stabil  
- Tracking-Daten werden per MQTT publiziert  

Abnahmekriterien:
- Tracking-Daten sind im MQTT-Broker sichtbar

---

### Schritt 2 – Setup der Tracking-Fläche
[Tracking Area Setuo](02_tracking_area_setup.md)

Ziel:
- Physische Fläche korrekt eingerichtet  
- Environment & Placement stimmen  
- Tracking ist räumlich stabil  

Abnahmekriterien:
- Bewegungen im Raum liefern stabile Koordinaten

---

### Schritt 3 – Webclient & Anwendungslogik
[Webclient Setup](03_webclient_setup.md)

Ziel:
- Webclient empfängt Tracking-Daten  
- Anwendungslogik funktioniert  
- Interaktionen reagieren korrekt  

Abnahmekriterien:
- Tracker erscheinen im Webclient  
- Inhalte wechseln korrekt bei Bewegung

---

## Finaler Funktionscheck (Gesamtsystem)

Das Gesamtsystem gilt als korrekt eingerichtet, wenn:

1. Raspberry Pi publiziert Tracking-Daten
2. MQTT-Broker ist erreichbar
3. Node.js Server empfängt Tracking-Daten
4. Webclient zeigt Tracking-Daten in Echtzeit
5. Bewegungen im Raum werden korrekt abgebildet
6. Mapping / Interaktionslogik reagiert erwartungsgemäß
7. Mehrere Tracker funktionieren parallel
8. System startet nach Neustart aller Komponenten wieder korrekt  

---
