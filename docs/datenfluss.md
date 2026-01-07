# Datenfluss und Architekturüberblick

Diese Datei dient zur Veranschaulichung und Erklärung der Datenflüsse im System.  
Sie wird von einem Architekturmodell begleitet und dokumentiert wesentliche Architekturentscheidungen sowie deren Funktionsweise.

---

## Antilatency Tracking System

Ein Tracker wird von den Besucher:innen genutzt und sendet seine Position per Funk an den **Radio Socket**, der über **USB** mit einem Host verbunden ist.

Auf dem **Raspberry Pi** läuft ein **C++-Programm**, das die offizielle **Antilatency SDK** verwendet.

Dieses Programm übernimmt folgende Aufgaben:
- Erkennen verbundener Tracking-Geräte
- Berechnung der Pose (Position und Rotation)
- Strukturierte Bereitstellung der Trackingdaten

---

## MQTT

Die erfassten Trackingdaten werden vom C++-Programm an einen **MQTT-Broker** gesendet.

MQTT wird eingesetzt, weil es:
- leichtgewichtig und robust ist
- sich besonders für Sensor- und Echtzeitdaten eignet
- eine saubere Entkopplung zwischen Datenquelle und Datenkonsumenten ermöglicht

Durch den Einsatz von MQTT ist das Tracking-System **nicht direkt an die Visualisierung gebunden**, was die Architektur flexibel und erweiterbar macht.

---

## Node.js (Middleware)

Ein **Node.js-Server** fungiert als Middleware zwischen MQTT und der webbasierten Visualisierung.

Node.js übernimmt folgende Aufgaben:
- Aufbau der Verbindung zum MQTT-Broker
- Abonnieren der Trackingdaten
- Weiterleitung der empfangenen Daten an Web-Clients

---

## WebSockets

Für die Kommunikation zwischen Node.js und dem Browser werden **WebSockets** verwendet, da der Browser nicht direkt mit dem MQTT-Broker kommunizieren kann.

WebSockets ermöglichen:
- eine dauerhafte Verbindung zwischen Server und Client
- das Pushen von Daten in Echtzeit
- eine verzögerungsarme Darstellung von Bewegungen

Im Gegensatz zu klassischem HTTP (Request/Response) müssen Clients nicht aktiv nach neuen Daten fragen – Änderungen werden unmittelbar übertragen.

---

## Client / Browser

Die Visualisierung läuft in einem **Webbrowser**, z. B. auf einem Rechner mit Projektor oder Display.

Die Webanwendung:
- empfängt Trackingdaten über WebSockets
- interpretiert Position (und Rotation) der Tracker
- stellt diese Daten visuell dar (z. B. mit *three.js* oder Canvas)
- bildet die Grundlage für die spätere Logik zur Steuerung von Jahreszeiten, Bildwechseln und Effekten

Durch die webbasierte Umsetzung ist die Visualisierung:
- plattformunabhängig
- leicht anpassbar
- gut mit weiteren Interaktionselementen kombinierbar

---

## Zusammengefasster Datenfluss

1. Nutzer:innen bewegen sich im Raum mit einem Antilatency-Tracker  
2. Trackingdaten werden von der Antilatency-Hardware erfasst  
3. Ein C++-Programm auf dem Raspberry Pi liest die Daten über die Antilatency SDK  
4. Die Trackingdaten werden per MQTT an einen Broker gesendet  
5. Ein Node.js-Server abonniert diese Daten  
6. Node.js leitet die Daten per WebSocket an den Browser weiter  
7. Die Webanwendung visualisiert die Bewegung in Echtzeit
