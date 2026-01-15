# ADR-0003: Interaktion

**Status:** entschieden  
**Datum:** 2025-10-26   

---

## Kontext
Für die interaktive Installation *Season Shift* muss erkannt werden, wo sich Besucher:innen im Raum befinden, um ihre Bewegung in die Steuerung der Bild- und Tonwiedergabe einzubinden.  
Ziel ist es, eine präzise und stabile Erfassung der Position und Bewegung zu ermöglichen, die in Echtzeit an das System übermittelt werden kann.  
Die Lösung soll dabei möglichst robust, wartungsarm und für öffentliche Präsentationen geeignet sein.

[Research: Interaktionsmöglichkeiten](../research-notes/interaktion.md)

---

## Optionen

### 1. Antilatency Tracking System
- **Funktion:**  
  Nutzung der an der Hochschule vorhandenen *Antilatency*-Technologie.  
  Das System besteht aus Infrarot-Markern im Boden („Tracking Area“) und kleinen, nach unten gerichteten Kameras („AltTracker“), die diese Marker erkennen.  
  So wird die Position der Nutzer:innen in Echtzeit bestimmt.
- **Vorteile:**  
  - Sehr präzise 3D-Positionsbestimmung in Echtzeit  
  - Hohe Stabilität und geringe Latenz  
  - SDKs für Unity, C++, C#, API für Datenaustausch  
  - Bereits an der Hochschule verfügbar
- **Nachteile:**  
  - Hardware muss korrekt kalibriert und gepflegt werden  
  - Nur innerhalb der Tracking-Fläche nutzbar  
  - Höherer Installationsaufwand im Raum
- **Bewertung:**  
  Aufgrund der vorhandenen Infrastruktur, der hohen Genauigkeit und der Echtzeitfähigkeit ist Antilatency die bevorzugte Lösung für das Raumtracking.

---

### 2. Kamera-/Bildbasierte Bewegungserkennung
- **Funktion:**  
  Erkennung von Bewegung oder Anwesenheit durch Overhead- oder Frontal-Kameras mit Bibliotheken wie OpenCV, BoofCV oder MediaPipe.  
  Bewegungen werden über Differenzbilder, Konturen oder Pose-Erkennung identifiziert.
- **Vorteile:**  
  - Kostengünstig, einfache Einrichtung  
  - Keine tragbaren Sensoren erforderlich  
  - Gut für kleine Setups oder ergänzende Tests
- **Nachteile:**  
  - Begrenzte Präzision und Zuverlässigkeit  
  - Störanfällig durch Lichtverhältnisse und Schatten  
  - Nur 2D-Informationen über Bewegungsfläche
- **Bewertung:**  
  Eine einfache, aber ungenaue Alternative. Kann als experimentelle Variante oder ergänzende Interaktionsform (z. B. Gestenerkennung) eingesetzt werden.

---

### 3. Druck- oder Näherungssensoren im Boden
- **Funktion:**  
  Nutzung von Sensorstreifen oder Bodenmatten, die Gewicht oder Annäherung registrieren.  
  Erkennung erfolgt durch Mikrocontroller (z. B. Arduino) mit Signalübertragung an die Steuerungssoftware.
- **Vorteile:**  
  - Sehr robuste Erkennung klarer Zustände („Zone betreten“)  
  - Unabhängig von Lichtverhältnissen  
  - Einfache Integration physischer Interaktionen
- **Nachteile:**  
  - Kein kontinuierliches Tracking  
  - Eingeschränkte Bewegungsfreiheit  
  - Technisch aufwändiger Einbau und Wartung
- **Bewertung:**  
  Gut geeignet für Zonen-basierte Interaktionen, jedoch nicht für fließende Bewegungen oder raumweite Erkennung.

---

## Entscheidung
Das Projektteam entscheidet sich für das **Antilatency-System** als Haupttechnologie zur Interaktions- und Positionsbestimmung.  
Die vorhandene Hardware an der Hochschule ermöglicht eine präzise, stabile und reproduzierbare Erfassung der Nutzerbewegungen.  
Alternative Verfahren wie Kameratracking oder Drucksensoren werden als ergänzende oder experimentelle Optionen berücksichtigt, kommen aber nicht als primäre Steuerungsmethode zum Einsatz.

---

## Folgen und To-dos
- Einbindung des **Antilatency SDK** in die Entwicklungsumgebung
- Definition der **Interaktionszonen und Schwellenwerte** im Raum (Mapping von Position zu Aktion)
- Einrichtung und Kalibrierung der Tracking-Fläche
- Tests mit mehreren Personen zur Erfassung von Robustheit und Genauigkeit

---

## Probleme
- Ausrichtung der Kabel ist wichtig!! -> Aufbau der Bodenfläche muss sehr exakt sein
- Version Probleme mit Software und Demo App
- es darf kein Alt Tracker im RadioHost sein, da alle Kameras die Trackingfläche "suchen" und somit Fehler in der Positionsberechnung auftreten können

