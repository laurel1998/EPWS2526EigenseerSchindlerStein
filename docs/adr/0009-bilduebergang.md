# ADR-0009: Bildübergänge zwischen zwei Positionen

**Status:** entschieden  
**Datum:** 2026-01-25  

---

## Kontext
Im bestehenden Interaktionskonzept ([ADR-0007](./0007-Interaktionskonzept.md)) ist jeder Position auf der Trackingfläche, eindeutig ein Zeitpunkt, und damit genau ein Bild, zugeordnet.
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
- Wie viele bzw. welche Bilder müssen geladen werden? (alle 3 Achsen?) (wo definieren?)
- Höherer Rechen- und Speicherbedarf

---

### Version 3 – Harte Umschaltung mit visueller „Wisch“-Richtung (Directional Swipe)
- Beim Positionswechsel wird das neue Bild sofort angezeigt (keine Verzögerung)
- Der Übergang ist ein sehr kurzer, richtungsabhängiger „Wisch“ (z. B. 80–200 ms)
- Die Wischrichtung entspricht der Bewegungsrichtung auf der Trackingfläche:
  - Bewegung nach außen → Bild „kommt von außen“
  - Bewegung im Winkel → Bild „dreht“ leicht mit
- Optional: leichter Motion-Blur während der Wischphase zur Betonung von Bewegung

**Vorteile**
- Sofortige Rückmeldung bei Positionswechsel
- Bewegungsrichtung wird visuell nachvollziehbar
- Sehr klare Kopplung: Körperbewegung → Bildbewegung

**Nachteile**
- Bei sehr schnellem Wechsel kann es „nervös“ wirken
- Zusätzliche Animationslogik (Richtung/Vektor) nötig

---

### Version 4 – Sofortwechsel + kurzer „Zeit-Stempel“-Impuls (Micro-Overlay)
- Beim Positionswechsel wird das neue Bild sofort angezeigt
- Zusätzlich erscheint für einen sehr kurzen Moment (z. B. 150–400 ms) ein dezenter Overlay-Impuls:
  - Datum / Uhrzeit / Jahr des neuen Bildes
  - optional als „Tick“-Animation (kurzes Einblenden + schnelles Ausfaden)
- Das Overlay dient als Bestätigung: „Du bist jetzt hier“

**Vorteile**
- Bild ist sofort sichtbar, Orientierung wird gleichzeitig gestärkt
- Sehr robust bei schnellen Positionswechseln (Overlay vermittelt Struktur)
- Geringer Gestaltungsaufwand, klarer Nutzen

**Nachteile**
- Zusätzliche UI-Elemente können das Bild kurz stören
- Erfordert gutes visuelles Feintuning (Größe, Dauer, Position)

---

### Version 5 – Sofortwechsel mit „Snap“-Feedback (kurzer Zoom/Schärfe-Impuls)
- Beim Positionswechsel wird das neue Bild sofort angezeigt
- Gleichzeitig bekommt das Bild einen sehr kurzen „Snap“-Impuls, z. B.:
  - minimaler Zoom-in (z. B. 1.00 → 1.03 → 1.00 in 120–220 ms)
  - oder ein kurzer Schärfe-/Kontrast-Impuls (nur für einen Frame-/Kurzzeitbereich)
- Ziel: Der Wechsel fühlt sich haptisch bestätigt an, ohne dass das Bild „überblendet“

**Vorteile**
- Sofortiges Bild + deutliches Feedback „es hat gewechselt“
- Kein zweites Bild sichtbar, keine Übergangs-Mehrdeutigkeit
- Funktioniert sehr gut auch bei schnellem Wechsel

**Nachteile**
- Zu starke Effekte wirken schnell „UI-lastig“
- Feintuning nötig, damit es nicht wie ein Fehler/Glitch wirkt

---

## Entscheidung
Da der Bildwechsel sehr schnell erfolgt und Nutzer:innen die Möglichkeit gegeben werden soll sich aktiv zu Bewegen, erfolgt der Bildwechsel ohne Übergang.
Zur besseren Orientierung befindet sich ein Overlay über jedem Bild, welches Datum und Uhrzeit erkenntlich macht. (Nah an Version 4)

---

## Folgen und To-dos
### Folgen
- Übergangslogik beeinflusst:
  - Bildwahrnehmung
  - Bewegungsverhalten der Besucher:innen
  - technische Anforderungen (Rendering, Performance, Animation)
- Visuelles Feintuning (Dauer, Intensität) wird zentral für die Qualität

### To-dos
- Testen mit schnellen vs. langsamen Bewegungen (Wahrnehmbarkeit ohne Nervosität)
- UX-Test: Können Besucher:innen Wechsel sicher wahrnehmen, ohne dass das Bild „flackert“?
