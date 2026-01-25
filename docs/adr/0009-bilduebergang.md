# ADR-0009: Bildübergänge zwischen zwei Positionen
**Status:** vorgeschlagen  
**Datum:** 2026-01-25  

---

## Kontext
Im bestehenden Interaktionskonzept ([ADR-0007](./0007-Interaktionskonzept.md)) ist jeder Position auf der Trackingfläche eindeutig ein Zeitpunkt und damit genau ein Bild zugeordnet.
Durch die kontinuierliche Bewegung der Besucher:innen kommt es jedoch zu häufigen Bildwechseln, diese finden an Übergängen zwischen Zeitpunkten (z. B. Stunden- oder Monatsgrenzen) statt.

Ein abruptes Umschalten der Bilder würde:
- das körperliche Erleben unterbrechen
- zu Irritationen bei kleinen Positionsänderungen führen
- das Erkunden der Zeit als fließenden Prozess erschweren

Ziel dieser ADR ist es, Mechanismen für Bildübergänge festzulegen, die:
- Bewegungen im Raum abfedern
- zeitliche Kontinuität visuell erfahrbar machen

---

## Optionen
### Version 1 – Schwellenbasierter Bildwechsel (Dead-Zone-Prinzip)
- Bildwechsel erfolgt nicht sofort bei Überschreiten einer Zeitgrenze
- Eine Position muss:
  - für eine definierte Zeit stabil sein oder
  - einen Mindestabstand zur Grenze überschreiten

**Vorteile**
- Sehr robuste und gut kontrollierbare Logik
- Technisch einfach umzusetzen
- Bild bleibt stabil, auch bei unsicheren Bewegungen

**Nachteile**
- Übergang wirkt funktional, nicht fließend
- Zeit wird eher geschaltet als erlebt

---

### Version 2 – Kontinuierliche Überblendung (Interpolarisation)
- Zwei zeitlich benachbarte Bilder werden gleichzeitig geladen
- Die Position der Besucher:innen steuert den Überblendungsfaktor
- Stillstand -> klares Einzelbild
  Bewegung -> fließender Übergang

**Vorteile**
- Sehr intuitive Rückmeldung auf Bewegung
- Zeit wird als kontinuierlicher Verlauf wahrgenommen
- Hohe Übereinstimmung mit der räumlichen Metapher

**Nachteile**
- Zwei Bilder gleichzeitig sichtbar (Gestaltungsaufwand)
- Höherer Rechen- und Speicherbedarf

---

## Entscheidung
Noch offen – Evaluierung nach Tests.

---

## Folgen und To-dos
### Folgen
- Übergangslogik beeinflusst:
  - Bildwahrnehmung
  - Bewegungsverhalten der Besucher:innen
  - technische Anforderungen (Rendering, Performance)

### To-dos
- Test mit langsamen vs. schnellen Bewegungen
- Definition von Schwellenwerten für Interpolarisation

