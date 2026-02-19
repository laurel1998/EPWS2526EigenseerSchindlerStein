# ADR-0007: Interaktionskonzept
**Status:** entschieden  
**Datum:** 2026-01-15  

---

## Kontext
Ziel des Projekts ist es die Bilder des KTDS-Labors intuitiv und körperlich erfahrbar zu machen. Besucher:innen bewegen sich auf einer markierten Trackingfläche und steuern über ihre Position, welche Bilder angezeigt werden.
Dabei lag der Fokus zuerst darauf ein funktionierendes Erlebnis zu erstellen und erst danach die Logik zu erweitern. Später soll das Konzept so ausgestaltet werden, dass auch die Mehrpersonen-Interaktion möglich wird. 

---

## Optionen
### Version 1 – Quadranten-Logik
- Die Fläche wird in vier Quadranten eingeteilt
- Jeder Quadrant entspricht einer Jahreszeit (zugehöriger [Code](../bilder/V1Interaktionslogik(Code).png))
- Zuordnung auf der Trackingfläche mittels [Vorzeichen](../bilder/InteraktionskonzeptV1.pdf) (Ursprung in der Mitte der Trackingfläche)
- Pro Jahreszeit wird ein "zufälliges" Bild gewählt

**Vorteile**
- Einfach umzusetzen
- Schnell testbar für den PoC

**Nachteile**
- Begrenzte Tiefe: Besucher:innen erleben nur Jahreszeiten, aber keine Zeitdimension (Monate/Stunden/Jahre)
- Zufälligkeit erschwert Verständnis des Konzepts 

---

### Version 2 – Abbildung der Zeit im Raum 
- [Interaktionsidee](../bilder/InteraktionskonzeptV2.pdf): Besucher:innen laufen durch Zeit 
- Die Position steuert ein eindeutiges Bild nach folgenden Regeln:

(1) Zentrum (mittlere Puzzle Bodenmatte) -> zeigt das Titelbild der Ausstellung

(2) Winkel -> zeigt Monate des Jahres
- Die Fläche wird strahlenförmig in 12 Sektoren geteilt
- Jeder Sektor entspricht einem Monat
- Gezeigt wird jeweils der 1. Tag des Monats

(3) Radius -> zeigt Uhrzeit über Distanz vom Zentrum
- Mit größerer Distanz nach außen wechseln verschiedene Uhrzeit-Slots
- 8, 12, 16 & 20 Uhr 

(4) Höhe (z-Achse) -> zeigt Jahr 
- 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024

**Vorteile**
- Raum wird direkt mit der Zeit verknüpft
- Deterministisch: pro Position genau ein Bild → nachvollziehbares Erkunden

**Nachteile**
- Höhere Komplexität in der Logik (Polar-Koordinaten, Radien)

---

## Entscheidung
Es wurde sich, nach der Bestätigung des [Proof of Concept](../poc/0003-poc-interaktion.md), für die Erweiterung der Interaktionslogik entschieden. Aktuell ist Version 2 die Grundlage für die Interaktionslogik.

Begründung:
- Das neue Konzept übersetzt das Archiv in Rauminteraktion: Besucher:innen erkunden nicht nur Jahreszeiten, sondern Zeitpunkte über den Verlauf mehrerer Jahre
- Die deterministische Zuordnung (ein Bild pro Position) stärkt die intuitive Kontrolle

---

## Folgen und To-dos
### Folgen
- Zuordnung wechselt von „Jahreszeit → Bildliste“ zu „Zeitpunkt → genau ein Bild“
- Bilder des Labors müssen neu klassifiziert werden
- Bilder müssen in einer eindeutigen Struktur abgelegt werden (siehe [mapping.json](../../assets/mapping.json))

### To-dos
- Visualisierungskonzept (Wo sollen die Bilder gezeigt werden?) -> auf einem Bildschirm
- Mehrpersonenlogik (Split-Screen?) -> **Lösung:** Es wurde ein Split-Screen eingebaut, sobald sich zwei Personen auf der Fläche befinden
- Controller Gestaltung (Zauberstab? Tablet?)
