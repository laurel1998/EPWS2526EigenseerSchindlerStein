# POC-0003: Interaktion-Tracking Daten

**Status:** To be done

**Priority:** High

**Datum:** 2025-11-14

**Datei:** [Antilatency](../antilatency.md)

---

## POC-Goals
Es sollen Tracking-Daten (x,y,(vllt. z)) aus dem Antilatency System erkannt werden, sobald sich eine Person mit der Kamera auf der ausgelegten Bodenfläche befindet bzw. bewegt.

## Scope
Für die Darstellung der Prosition wird eine Demo-App verwendet, die jedoch nur bis Version 4.1.0 exisitiert. Für das Antilatency-Service wurde die Version 4.5.0 verwendet. Jedoch müssen diese mit der Version übereinstimmen, um ein fehlerhaftes Tracking zu vermeiden. 

## Methodik
Verbindung des Antilatency-Services mit der Demo-App.

## Erfolgskriterien
Genaue Erkennung der Position in der Demo-App, um dies Positions-Daten weiter verarbeiten zu können.

## Ressourcen
- Tracking-Fläche
- Kamera-Controller
- Antilatency Service
- Antilatency Demo-App 

## Zeitplan
Im weiteren Schritt wird für das Tracking eine Headless-Lösung versucht, die die Arbeit ohne Unity ermöglicht. Und es wird versucht das Tracking einmal ohne die Verwendung der Kamera am Host in der Demo-App darzustellen.

## POC Flow
1. Nutzer:innen bewegen sich im Raum mit einem Antilatency-Tracker
2. Trackingdaten werden von der Antilatency Hardware erfasst
3. Ein C++-Programm auf dem Raspberry Pi liest die Daten über die Antilatency SDK
4. Die Trackingdaten werden per MQTT an einen Broker gesendet
5. Ein Node.js-Server abonniert diese Daten
6. Node.js leitet die Daten per WebSocket an den Browser weiter
7. Die Webanwendung visualisiert die Bewegung in Echtzeit

## Ergebnisse
Ungenaue Tracking-Position wird in der Demo-App angezeigt. Dies liegt wahrscheinlich daran, dass die Version der Demo-App nicht mit der Version des Antilatency-Service übereinstimmt und/oder, dass bei dem verwendeten Host auch eine Kamera angebracht wurde und diese somit die Positionserkennung des Kamera-Controllers gestört hat. 
