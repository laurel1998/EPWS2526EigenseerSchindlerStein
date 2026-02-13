# Installationsanleitung

---

## Schritt 1 – Setup des Raspberry Pi (Tracking-Gateway)

Dieser Abschnitt beschreibt alle notwendigen Schritte, um einen Raspberry Pi als Tracking-Gateway für das Gesamtsystem einzurichten.  
Der Raspberry Pi dient als Schnittstelle zwischen der physischen Tracking-Hardware (Antilatency) und der restlichen Systemarchitektur (Backend / Webclient über MQTT).

---

### 1. Ziel dieses Setups

Der Raspberry Pi soll:

- mit den Antilatency-Trackern verbunden sein  
- das Tracking-System zuverlässig ausführen  
- die Tracking-Daten über MQTT in das restliche System einspeisen  
- im Idealfall automatisch starten und dauerhaft laufen (Dauerbetrieb)

---

### 2. Hardware vorbereiten

- Geeigneten Raspberry Pi auswählen (Performance & Stabilität beachten)
- Antilatency-Hardware anschließen (USB-Verbindung)
- Netzwerkzugang sicherstellen (LAN oder WLAN)
- Dauerhafte Stromversorgung sicherstellen

---

### 3. Betriebssystem & Grundkonfiguration

- Geeignetes Betriebssystem für den Raspberry Pi installieren (empfohlen: 64-bit Linux)
- Grundlegende Systemkonfiguration durchführen:
  - Benutzer anlegen
  - Zeitzone & Sprache korrekt setzen
  - SSH-Zugriff (falls Headless-Betrieb geplant)
- Netzwerk konfigurieren:
  - Entscheiden, ob LAN oder WLAN verwendet wird
  - Sicherstellen, dass der Raspberry Pi stabilen Zugriff auf das lokale Netzwerk / Internet hat

---

### 4. Basis-Software installieren

Auf dem Raspberry Pi muss eine Entwicklungs- und Laufzeitumgebung vorhanden sein, um:

- native C++-Programme zu bauen  
- USB-Geräte anzusprechen  
- MQTT-Kommunikation zu ermöglichen  

Dazu gehören u. a.:

- Compiler & Build-Tools  
- CMake  
- USB-Bibliotheken  
- MQTT-Client-Bibliotheken  

Die genaue Installation erfolgt plattformspezifisch und ist abhängig vom verwendeten Betriebssystem.

---

### 5. Projekt auf dem Raspberry Pi bereitstellen

- Zugriff auf das Git-Repository sicherstellen  
- Projekt auf den Raspberry Pi kopieren oder klonen  
- Projektstruktur prüfen (insbesondere der `firmware`-Ordner)  
- Sicherstellen, dass die Tracking-Software für ARM (Raspberry Pi) gebaut werden kann

---

### 6. Antilatency SDK integrieren

- Antilatency SDK für die Zielplattform (Linux / ARM) beschaffen  
- Relevante SDK-Bibliotheken identifizieren (Device Network, Tracking, Environment Selector)  

Wichtig:
Das Tracking-Gateway ist funktional abhängig vom Antilatency SDK.  
Ohne korrekt eingebundene SDK-Bibliotheken ist kein Tracking möglich.

---

### 7. Tracking-Software bauen und ausführen

- Projekt auf dem Raspberry Pi bauen  
- Sicherstellen, dass:
  - das Binary korrekt erzeugt wird  
  - zur Laufzeit alle Abhängigkeiten gefunden werden  
- Tracking-Software testweise starten  
- Prüfen, ob:
  - Antilatency-Geräte erkannt werden  
  - Tracking-Tasks gestartet werden können  

---

### 8. Netzwerk- und MQTT-Konfiguration

Die Tracking-Software kommuniziert über MQTT mit dem restlichen System.

Hier sind folgende Entscheidungen zu treffen:

- Welcher MQTT-Broker wird verwendet?
  - Cloud-Broker (z. B. HiveMQ)
  - Eigener lokaler Broker (z. B. Mosquitto im lokalen Netzwerk)
- In welchem Netzwerk befindet sich der Raspberry Pi?
  - Gleicher Netzwerkbereich wie Webclient/Backend?
  - VPN oder öffentlich erreichbarer Broker?
- Wie ist die Topic-Struktur definiert?
  - Pro Tracker ein Topic  
  - Optional: Sammel-Topic für alle Tracker
 
#### Relevante Stellen im Code
- `server.js`:
  - `MQTT_HOST` (Broker URL)
  - `MQTT_TOPIC = 'antilatency/tracker/#'`

Wichtig:
Der MQTT-Broker ist ein zentraler Bestandteil der Systemarchitektur.  
Die Wahl des Brokers beeinflusst Latenz, Stabilität, Sicherheit und Skalierbarkeit.

---

### 9. Konfiguration der Tracker-Identitäten

- Festlegen, wie Tracker im System identifiziert werden  
- Verwendung von stabilen IDs (z. B. Antilatency Node Properties wie `altId`)  
- Sicherstellen, dass:
  - Tracker im MQTT eindeutig identifizierbar sind  
  - die IDs im Webclient konsistent verwendet werden  

Diese IDs sind die Verbindung zwischen physischem Tracker und logischer Benutzer-/Objektzuordnung im System.

---

## Schritt 2 - Setup der Hardware (Antilatency Trackingfläche)

Das Setup der Trackingfläche wird ausführlich in der [Antilatency Datei](../docs/antilatency.md) beschrieben.
Die Größe und Ausrichtung der Fläche kann variiert werden, korreliert allerdings in diesem Fall mit der Funktionalität des Systems, da die Anwedungslogik mit Längen- und Breitenangaben arbeitet und dementsprechend präzise auf eine 3x3m Fläche ausgerichtet ist. 

---

## Schritt 3 – Webclient & Anwendungslogik (Node.js + Browser)

Dieser Abschnitt beschreibt, wie der Webclient (Browser) und die serverseitige Bridge (Node.js) gestartet und betrieben werden.
Außerdem erklärt es, welche Code-Dateien welche Systemfunktion implementieren.

Voraussetzung: Schritt 1 (Pi-Setup) und Schritt 2 (Tracking-Fläche) sind abgeschlossen.

---

### 1. Systemübersicht (Datenfluss)

1. **Raspberry Pi (Tracking-Gateway)**  
   - liest Antilatency Tracking aus
   - published JSON per MQTT auf `antilatency/tracker/<trackerId>`

2. **MQTT Broker**  
   - Transport-Schicht zwischen Tracking-Gateway und Web-Anwendung

3. **Node.js Server (`server.js`)**  
   - subscribed `antilatency/tracker/#`
   - leitet eingehende MQTT Payloads per Socket.IO an alle Browser weiter
   - hostet den Webclient (index.html + JS + CSS)

4. **Browser (Webclient)**  
   - empfängt Tracking-Daten per Socket.IO
   - visualisiert Tracker in einer 3D Szene (Three.js)
   - wendet Interaktionslogik an (Zonen/Mapping → Content/Bildwechsel)

---

### 2. Server Betrieb

Der Node.js Server kann an zwei Orten betrieben werden:

#### Option A: Server läuft auf dem Raspberry Pi
- Vorteil: Ein Gerät, einfacher Aufbau
- Zugriff im Browser: `http://<PI-IP>:3000`

#### Option B: Server läuft auf einem separaten Rechner (unsere Version)
- Vorteil: mehr Leistung / bessere Wartbarkeit
- Zugriff im Browser: `http://<SERVER-IP>:3000`
- Voraussetzung: Server kann den MQTT Broker erreichen

Wichtig: Der Node.js Server muss im selben Netzwerk (oder über VPN) so angebunden sein,
dass er den MQTT-Broker zuverlässig erreicht.

---

### 3. Mit SSH das Tracking über den Pie starten

**SSH wird benötigt um:**
- den Tracking-Prozess (Pi) zu starten/stoppen (Schritt 1)
- optional den Node.js Server auf dem Pi zu starten
- Logs zu prüfen (MQTT / Tracking / Server)

**SSH Verbindung herstellen:**
1. SSH ssh antilatency@192.168.0.113 -> IP des Pie's
2. PW eingeben
3. Ins Working directory wechseln:
   - `~/AntilatencyTracking/Antilatency.TrackingMinimalDemoCpp/build`
4. Script launchen:
   - `sudo ./TrackingMinimalDemo AntilatencyAltEnvironmentHorizontalGrid~GRIDHASH`

---

### 4. Node.js Server starten (Bridge + Hosting)

#### Aufgaben des Servers
- MQTT subscribe (`antilatency/tracker/#`)
- Weiterleitung an Browser per Socket.IO Event `tracking_data`
- Hosting der Webdateien (index.html, JS, CSS)
- Bereitstellung von `/assets` (Mapping-Datei & Medien)

#### Code-Datei
- `server.js`

#### Wichtige Konfigurationswerte
- `MQTT_HOST` – Broker-Adresse
- `WEB_PORT` – Standard: 3000
- `MQTT_TOPIC` – Standard: `antilatency/tracker/#`

#### Assets-Ordner
Damit das System funktioniert, muss es im Repo einen `assets` Ordner geben,
der mindestens enthält:
- `mapping.json`
- Bilddaten / Medien, auf die `mapping.json` verweist (über `baseUrl` + `src`)

---

### 5. Webclient starten (Browser)

#### Ablauf im Frontend
1. `main.js` lädt Mapping (`loadMapping()` aus `mapping.js`)
2. `threeScene.js` initialisiert die 3D Szene + Renderloop
3. `tracking.js` verbindet Socket.IO (`io()`) und verarbeitet Tracking-Daten
4. `interaction.js` entscheidet anhand der Tracker-Position, welches Bild angezeigt wird

---

### 6. Anwendungslogik: Was passiert bei Tracking-Daten?

#### Tracking-Daten kommen als JSON
Der Browser erwartet JSON im Format:
- `id`
- `pose.position.x/y/z`
- `pose.rotation.x/y/z/w`

Diese Struktur wird vom Raspberry Pi Code geliefert.

#### Multi-Tracker / Multi-User Verhalten
- In `tracking.js` wird pro `id` ein eigener Tracker angelegt
- Jede neue ID erzeugt:
  - ein 3D Objekt in der Szene
  - eine UI-Zeile in der Liste
- Tracker werden entfernt, wenn sie länger als ~1.5s keine Updates senden

Das bedeutet:
- mehrere Personen/Tracker können gleichzeitig visualisiert werden
- kurzfristige Disconnects werden abgefangen

---

### 7. Mapping & Content-Auswahl (Kernlogik)

#### Mapping-Datei
- `mapping.js` lädt `/assets/mapping.json`
- `mapping.json` enthält:
  - `title` (Bild für Center-Zone)
  - `baseUrl`
  - `images[]` mit Metadaten (year/month/hour/src)

#### Raum → Content Regeln (`interaction.js`)
- **Center-Zone**: wenn nahe (0,0) → `mapping.title`
- **Monat**: aus Winkel (x/y)
- **Uhrzeit**: aus Radius (x/y), mit Begrenzung auf Fläche
- **Jahr**: aus Höhe (z), nächstes “Level” (2010..2024)

Ergebnis:
- jede Position in der Fläche mappt deterministisch auf ein Bild

---
