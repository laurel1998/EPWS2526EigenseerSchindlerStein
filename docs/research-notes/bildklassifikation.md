# Research – Bildklassifikation nach Jahreszeiten und Wetter

## Fragestellung
Wie lassen sich die Millionen Bilder aus dem KDTS-Archiv effizient nach Jahreszeiten und Wetterstimmungen (z. B. Sonne, Nebel, Schnee, Sturm) ordnen, um sie für die interaktive Installation nutzbar zu machen?

---

## Ansatz 1: Heuristische Klassifikation (Metadaten / Zeitstempel) + Wetterdaten Klassifikation (API-basiert)
**Beschreibung:**  
Bilder werden anhand ihrer vorhandenen Metadaten (z. B. Datum, Uhrzeit) grob in Kategorien wie Jahreszeit oder Tageszeit eingeordnet.
Sie können dann um historische Wetterdaten ergänzt werden.
Beispiel: Aufnahmen im Dezember–Februar → „Winter“, Juni–August → „Sommer“.

**Vorteile**
- Sehr schnell umsetzbar und leicht skalierbar
- Keine Bildanalyse notwendig
- Unterscheidung spezieller Wetterphänomene
- Geringe Rechenlast, daher geeignet als erster Verarbeitungsschritt

**Nachteile**
- Keine Unterscheidung spezieller Wetterphänomene (z. B. Schnee, Nebel, Sturm)
- Empfindlich gegenüber Ausreißern oder Fehlbelichtungen

**Einschätzung**  
Geeignet zur groben Vor­klassifikation. Sollte durch visuelle Merkmale ergänzt werden.

**Quellen**
- [Mike Carruego: *Choosing the Right Algorithm: Machine Learning vs. Heuristics* (Medium, 2021)](https://mikecarruego.medium.com/choosing-the-right-algorithm-machine-learning-vs-heuristics-dc0b65e97d98)
- [IJRASET: *From Pixels to Predictions – A Comprehensive Survey of Image Classification*](https://www.ijraset.com/research-paper/from-pixels-to-predictions-a-comprehensive-survey-of-image-classification)

---

## Ansatz 2: Visuelle Feature-basierte Klassifikation
**Beschreibung:**  
Bilder werden anhand visueller Merkmale analysiert, z. B.:
- Durchschnittsfarbe (Hue, Saturation, Value)  
- Helligkeit und Kontrast  
- Blauanteil / Weißanteil (zur Erkennung von Himmel, Schnee, Nebel)  
- Texturmerkmale (z. B. Kanten, Flächenhomogenität)

Diese Merkmale werden genutzt, um Szenen mit ähnlicher Stimmung zu gruppieren oder einfache Regeln zur Einteilung zu definieren.

**Vorteile**
- Liefert visuell konsistentere Ergebnisse
- Erkennt Wetterzustände, die sich stark über Farbe und Lichtstimmung ausdrücken

**Nachteile**
- Manuell definieren nach welchen Vorgaben man die Bilder ordnet
- Schwierige Abgrenzung ähnlicher Zustände (z. B. Nebel vs. Schnee)
- Rechenintensiv

**Einschätzung**  
Sehr geeignet, um die heuristische Einteilung zu verfeinern.  
Ziel ist eine Kombination aus Farbanalyse und einfachen Regeln, um atmosphärische Übergänge zu erzeugen (z. B. helle, kontrastreiche Szenen → Sonne; entsättigte, helle Szenen → Nebel).

**Quellen**
- [IJRASET: *From Pixels to Predictions – A Comprehensive Survey of Image Classification*](https://www.ijraset.com/research-paper/from-pixels-to-predictions-a-comprehensive-survey-of-image-classification)

---

## Ansatz 3: Hybridverfahren (Heuristik + visuelle Analyse)
**Beschreibung:**  
Kombination beider Verfahren, um Genauigkeit und Performance auszugleichen.  
Ablauf:
1. Grobe Einteilung per Zeitstempel (Jahreszeiten, Tageszeiten) und Wetterdaten (Nebel, Regen, Sonnenschein, etc.)  
2. Feinanalyse über visuelle Merkmale (Helligkeit, Farbe, Kontrast)  
3. Speicherung der Ergebnisse

**Vorteile**
- Schnelle Vorselektion
- Robustere und konsistentere Ergebnisse
- Skalierbar

**Nachteile**
- Höherer Implementierungsaufwand
- Zusammenspiel und Gewichtung der Verfahren müssen abgestimmt werden

**Einschätzung**  
Empfohlener Ansatz

**Quellen**
- [Mike Carruego: *Choosing the Right Algorithm: Machine Learning vs. Heuristics* (Medium, 2021)](https://mikecarruego.medium.com/choosing-the-right-algorithm-machine-learning-vs-heuristics-dc0b65e97d98)
- [IJRASET: *From Pixels to Predictions – A Comprehensive Survey of Image Classification*](https://www.ijraset.com/research-paper/from-pixels-to-predictions-a-comprehensive-survey-of-image-classification)

---

## Geeignete Tools

### OpenCV
- **Funktion:** Analyse von Farbwerten, Helligkeit und Kontrast; Erkennung visueller Muster
- **Vorteile:** Leistungsfähig, plattformübergreifend (C++, Java, Kotlin)
- **Relevanz:** Hauptwerkzeug für visuelle Analyse

### Wetter-API (z. B. Open-Meteo, OpenWeatherMap)
- **Funktion:** Liefert historische Wetterdaten (Temperatur, Niederschlag, Schneefall, Sichtweite, Bewölkung)
- **Vorteile:** Keine Bildanalyse notwendig, leicht automatisierbar über REST-Aufrufe
- **Relevanz:** Grundlage für realistische Wetterlabels auf Basis der Aufnahmezeitpunkte

### BoofCV
- **Funktion:** Java-basierte Bibliothek zur Bildverarbeitung (Segmentierung, Farbanalyse)
- **Vorteile:** Reines Java, leicht in Kotlin nutzbar
- **Relevanz:** Alternative oder Ergänzung zu OpenCV

---

## Zusammenfassung
Ein **Hybridverfahren** (Heuristik → visuelle Analyse) scheint die effizienteste Lösung zu sein.  
Die reine Heuristik reicht für eine Grundstruktur, während die Feature-Analyse atmosphärische Übergänge ermöglicht und das Ergebnis präzisiert.
Eventuell ist es nötig, eine Stichprobe der Bilder zu erstellen und den gesamten Satz auf ein paar Jahre zu reduzieren.

