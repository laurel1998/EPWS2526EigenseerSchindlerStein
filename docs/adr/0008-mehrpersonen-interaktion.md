# ADR-0008: Bilddarstellung bei Mehrpersonen-Interaktion
**Status:** vorgeschlagen  
**Datum:** 2026-01-25  

---

## Kontext
Besucher:innen bewegen sich auf einer Trackingfläche und erkunden Bilder des KTDS-Labors über ihre Position im Raum.
Die Interaktionslogik ([ADR-0007](./0007-Interaktionskonzept.md)) ordnet jeder Position eindeutig einen Zeitpunkt (Jahr, Monat, Tag, Uhrzeit) und damit genau ein Bild zu.

Offen ist aktuell, wie diese Bilder auf einem oder mehreren Bildschirmen dargestellt werden, insbesondere im Hinblick auf:

- Verständlichkeit während der Bewegung
- Gleichzeitige Nutzung durch mehrere Personen
- räumliche Kopplung zwischen Körperbewegung und visueller Rückmeldung

Die Bilddarstellung soll das Erkunden unterstützen, ohne zu verwirren.

---

## Optionen
### Version 1 – Ein gemeinsamer Hauptbildschirm (Fokusbild)
- Ein zentraler Bildschirm zeigt immer das aktuell ausgewählte Bild
- Die Bildauswahl folgt der aktiven Person auf der Fläche
- Daten des aufgenommenen Bildes (Datum, Uhrzeit, Jahr) sollen eingeblendet werden für Orientierung
- Bei mehreren Personen wird entweder:
  - die zuletzt aktive Person priorisiert oder
  - nur eine Person gleichzeitig zugelassen („One at a time“)

**Vorteile**
- sehr einfache technische Umsetzung
- Klare visuelle Fokussierung auf ein Bild

**Nachteile**
- Mehrpersonen-Interaktion nur eingeschränkt möglich
- Unklarheit, wessen Bewegung gerade das Bild steuert

---

### Version 2 – Split-Screen nach Personen
- Der Bildschirm wird in mehrere Bereiche (z. B. links/rechts) aufgeteilt
- Jede getrackte Person bekommt einen eigenen Bildbereich
- Jeder Bereich zeigt das Bild entsprechend der individuellen Position
- Optionale Farbcodierung (Person -> Screenbereich) -> farbigen Rahmen um den Bildbereich auf dem Screen
- Markierung des Controllers in der selben Farbe des Rahmens

**Vorteile**
- Gleichzeitige Mehrpersonen-Interaktion möglich
- Klare Zuordnung: jede Person sieht „ihr“ Bild
- Vergleich unterschiedlicher Zeitpunkte wird direkt sichtbar

**Nachteile**
- Bildschirm wird visuell fragmentiert
- Einzelne Bilder bekommen weniger Raum und Wirkung

---

### Version 3 – Dynamische Fokussierung (Aufmerksamkeitsbasierte Darstellung)
- Der Bildschirm zeigt ein zentrales Fokusbild sowie ein oder mehrere Nebenbilder
- Das Fokusbild wird automatisch der Person zugeordnet, die aktuell die höchste „Aufmerksamkeit“ erzeugt
- Aufmerksamkeit kann bestimmt werden durch:
  - Verweildauer an einer Position
  - Stabilität der Position (wenig Bewegung)
  - Nähe zum Zentrum der Trackingfläche
- Weitere anwesende Personen werden als Nebenbilder dargestellt
  - kleiner skaliert
  - optional leicht gedimmt
  - mit eingeblendeten Zeitinformationen (Jahr, Monat, Uhrzeit)
- Die Darstellung skaliert automatisch:
  - 2 Personen → 1 Fokusbild + 1 Nebenbild
  - 3–4 Personen → 1 Fokusbild + bis zu 3 Nebenbilder
- Der Fokuswechsel erfolgt weich (z. B. zeitverzögert), um visuelle Sprünge zu vermeiden

**Vorteile**
- Mehrpersonen-Interaktion ohne harte Bildschirmaufteilung
- Klare visuelle Hierarchie erhöht Verständlichkeit
- Körperliches Verhalten (Stehenbleiben, Erkunden) wird direkt belohnt
- Skalierbar von 2 bis 4 Personen mit konsistenter Logik

**Nachteile**
- Höhere Komplexität in der Darstellungs- und Priorisierungslogik
- Fokus liegt nicht gleichberechtigt auf allen Personen

---

## Entscheidung
Noch offen – Evaluierung nach Tests.

---

## Folgen und To-dos
### Folgen
- Die Wahl der Darstellungsform beeinflusst direkt:
  - Tracking-Logik
  - Bildschirm-/Projektions-Setup
  - Rolle von Metadaten und UI-Elementen
- Mehrpersonenfähigkeit muss früh mitgedacht werden

### To-dos
- Testen der dynamischen Fokussierung mit 2–4 Personen
- Definition und Feinjustierung der Aufmerksamkeitskriterien
- Testen des Split-Screen für Mehrpersonen-Interaktion
- Testen was der aktuelle Code macht, wenn sich mind. 2 Personen auf der Fläche befinden
- evtll. weitere Optionen überlegen für Bilddarstellung
 
