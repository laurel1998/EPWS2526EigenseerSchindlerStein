# Schritt 1 – Setup des Raspberry Pi (Tracking-Gateway)

Dieser Abschnitt beschreibt alle notwendigen Schritte, um einen Raspberry Pi als Tracking-Gateway für das Gesamtsystem einzurichten.  
Der Raspberry Pi dient als Schnittstelle zwischen der physischen Tracking-Hardware (Antilatency) und der restlichen Systemarchitektur (Backend / Webclient über MQTT).

---

## 1. Ziel dieses Setups

Der Raspberry Pi soll:

- mit den Antilatency-Trackern verbunden sein  
- das Tracking-System zuverlässig ausführen  
- die Tracking-Daten über MQTT in das restliche System einspeisen  
- im Idealfall automatisch starten und dauerhaft laufen (Dauerbetrieb)

---

## 2. Hardware vorbereiten

- Geeigneten Raspberry Pi auswählen (Performance & Stabilität beachten)
- Antilatency-Hardware anschließen (USB-Verbindung)
- Netzwerkzugang sicherstellen (LAN oder WLAN)
- Dauerhafte Stromversorgung sicherstellen

---

## 3. Betriebssystem & Grundkonfiguration

- Geeignetes Betriebssystem für den Raspberry Pi installieren (empfohlen: 64-bit Linux)
- Grundlegende Systemkonfiguration durchführen:
  - Benutzer anlegen
  - Zeitzone & Sprache korrekt setzen
  - SSH-Zugriff (falls Headless-Betrieb geplant)
- Netzwerk konfigurieren:
  - Entscheiden, ob LAN oder WLAN verwendet wird
  - Sicherstellen, dass der Raspberry Pi stabilen Zugriff auf das lokale Netzwerk / Internet hat

---

## 4. Basis-Software installieren

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

## 5. Projekt auf dem Raspberry Pi bereitstellen

- Zugriff auf das Git-Repository sicherstellen  
- Projekt auf den Raspberry Pi kopieren oder klonen  
- Projektstruktur prüfen (insbesondere der `firmware`-Ordner)  
- Sicherstellen, dass die Tracking-Software für ARM (Raspberry Pi) gebaut werden kann

---

## 6. Antilatency SDK integrieren

- Antilatency SDK für die Zielplattform (Linux / ARM) beschaffen  
- Relevante SDK-Bibliotheken identifizieren (Device Network, Tracking, Environment Selector)  

Wichtig:
Das Tracking-Gateway ist funktional abhängig vom Antilatency SDK.  
Ohne korrekt eingebundene SDK-Bibliotheken ist kein Tracking möglich.

---

## 7. Tracking-Software bauen und ausführen

- Projekt auf dem Raspberry Pi bauen  
- Sicherstellen, dass:
  - das Binary korrekt erzeugt wird  
  - zur Laufzeit alle Abhängigkeiten gefunden werden  
- Tracking-Software testweise starten  
- Prüfen, ob:
  - Antilatency-Geräte erkannt werden  
  - Tracking-Tasks gestartet werden können  

---

## 8. Netzwerk- und MQTT-Konfiguration

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
 
### Relevante Stellen im Code
- `server.js`:
  - `MQTT_HOST` (Broker URL)
  - `MQTT_TOPIC = 'antilatency/tracker/#'`

Wichtig:
Der MQTT-Broker ist ein zentraler Bestandteil der Systemarchitektur.  
Die Wahl des Brokers beeinflusst Latenz, Stabilität, Sicherheit und Skalierbarkeit.

---

## 9. Konfiguration der Tracker-Identitäten

- Festlegen, wie Tracker im System identifiziert werden  
- Verwendung von stabilen IDs (z. B. Antilatency Node Properties wie `altId`)  
- Sicherstellen, dass:
  - Tracker im MQTT eindeutig identifizierbar sind  
  - die IDs im Webclient konsistent verwendet werden  

Diese IDs sind die Verbindung zwischen physischem Tracker und logischer Benutzer-/Objektzuordnung im System.

---
