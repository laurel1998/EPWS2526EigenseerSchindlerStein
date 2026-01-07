# POC-0003: Interaktion-Tracking Daten

**Status:** Done

**Priority:** High

**Datum:** 2025-11-14

**Datei:** [Antilatency](../antilatency.md)

---

## POC-Goals
Es sollen Tracking-Daten (x,y,(vllt. z)) aus dem Antilatency System erkannt werden, sobald sich eine Person mit der Kamera auf der ausgelegten Bodenfläche befindet bzw. bewegt.

## Scope
Für die Psotionserkennung wird ein Host benötigt, welcher die erfassten Positionsdaten weiterleiten kann. Diese müssen so dargestellt werden, dass sie im Brwoser verwendet werden können.

## Methodik
Positionserkennung anhand eines C++-Programms auf einem RaspberryPi und das Konvertiern der Daten für die Verwendung dieser im Browser.

## Erfolgskriterien
Genaue Erkennung der Position, um dies Positions-Daten weiter verarbeiten zu können.

## Ressourcen
- Tracking-Fläche
- Kamera-Controller (AltTracker)
- Radiosocket
- Antilatency Service
- RaspberryPi

## Zeitplan
Im weiteren Schritt wird für das Tracking eine Headless-Lösung versucht, die die Arbeit ohne Unity ermöglicht und die Positionsdaten im Browser darstellen kann.

## POC Flow
1. Nutzer:innen bewegen sich im Raum mit einem Antilatency-Tracker
2. Trackingdaten werden von der Antilatency Hardware erfasst
3. Ein C++-Programm auf dem Raspberry Pi liest die Daten über die Antilatency SDK
4. Die Trackingdaten werden per MQTT an einen Broker gesendet
5. Ein Node.js-Server abonniert diese Daten
6. Node.js leitet die Daten per WebSocket an den Browser weiter
7. Die Webanwendung visualisiert die Bewegung in Echtzeit

## Ergebnisse
Die Datenübermittlung ist funktionsfähig und eine einfache 3D Visualisierung auf der Webseite ist möglich. Man erkennt den Tracker im Raum und kann die Position der Person (mit x,y,z Koordinaten) nachvollziehen.
