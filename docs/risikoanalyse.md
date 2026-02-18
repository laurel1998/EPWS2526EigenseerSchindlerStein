
# Problem- & Risikoanalyse

## Identifikation und Beschreibung des Problemraums
Das Projekt bewegt sich im Spannungsfeld von **Kunst, Technik und Interaktion**.  
Es adressiert die Herausforderung, ein riesiges digitales Bildarchiv - unzugänglich und abstrakt - **in ein erlebbares, interaktives Format** zu übersetzen.  

Das KTDS-Labor verfügt über mehr als **10 Millionen Zeitraffer-Fotografien**, die Veränderungen von Landschaft, Licht und Atmosphäre dokumentieren.  
Ziel ist es, aus diesem Datenmaterial ein interaktives, öffentlich zugängliches System zu entwickeln, das **Neugier, Staunen und Beteiligung** auslöst.  

Es wird eine interaktive Installation entwickelt, bei der Besucher:innen sich auf einer Bodenplatte bewegen, die in verschiedene Sektoren unterteilt ist.
Eine Kamera, die sie tragen, erkennt ihre Position. Je nach Position wird ein passendes Bild gezeigt, mit möglicher Begleitung von passender Beleuchtung und Soundkulisse.

---

## Technische Herausforderungen

**1. Positions- und Bewegungserkennung** -> [**Interaktion und Nutzererkennung im Raum**](../docs/adr/0003-interaktion.md)
  - Wie robust funktioniert das Tracking, wenn sich mehrere Personen gleichzeitig im Raum bzw. auf der Bodenplatte bewegen?
    - Nur Personen mit einem Alt-Tracker (maximal 2) können erkannt werden
  - Wie müssen die Lichtverhältnisse im Raum sein, sodass die Positionserkennung robust funktioneren kann?
    - Das Tracking des Antilatency-Systems funktioniert unabhängig von Lichtverhältnissen, da die Kommunikation auf Infrarot basiert
  - Wie genau muss die Kameraposition ausgerichtet sein, sodass die Positionseerkennung funktionieren kann?
    - Bodensicht des Alt-Trackers ist erforderlich, Nutzerfeedback angebracht
  
**2. Synchronisierung von Medien (Bild, Licht, Ton)**
  - Wie sollen die Übergänge zwischen den anzuzeigenden Bildern geschehen?
    - Eventuell könnte eine Durchiteration der Bilder, die dazwischen liegen, angezeigt werden
    - Das vorherige Bild wird solange angezeigt, bis ein neues Feld betreten wurde. Anschließend wird das alte Bild vom neuen Bild überlagert (Transition)
  - Was wird angezeigt, wenn die Besucher:innen sich auf zwei Feldern gleichzeit befinden?
    - Es entsteht ein Splitscreen, welcher auf den jeweiligen Seiten die Jahreszeiten anzeigt, die auf dem Feld ausgewählt wurden
    - Die Bilder werden aufeinander gelegt/überlagert
  - Wie bekommen wir es hin, dass alle Medien synchron abgespielt/angezeigt werden?
    - Eine gemeinsame "Steuerzentrale" -> Alle Medien sollen auf ein gemeinsames Steuersignal hören und entsprechend darauf reagieren

**3. Datenbereitstellung**
  - Wie können wir die große Anzahl an Bildern reduzieren/ordnen?/ Mit welcher Technologie ist dies möglich? -> [**Bildklassifikation**](../docs/adr/0002-bildklassifikation.md) nach Jahreszeiten und Wetter auf Grundlage des Dateinamens
  - Welche Bilder sind für unseren Kontext relevant?
    - keine Nachtbilder
  - Wie viele Bilder werden min/max benötigt, um das System verwenden zu können?
    - mindestens vier (pro Jahreszeit eins)
  - Wo werden die Bilder gespeichert, sodass das System sie verwenden kann
    - im Git Repository
    - Cloud-Server

**4. Softwareumsetzung**
  - Welchen Code-Editor verwenden wir?
  - In welcher Programmiersprache programmieren wir?
  - Brauchen wir ein Frontend für das Installieren des fertigen Systems in verschiedenen Räumlichkeiten?
    

