# ADR-0002: Bildklassifikation nach Jahreszeiten, Wetter und Visueller Analyse

**Status:** entschieden
**Datum:** 2025-11-13 

---

## Kontext
Für die interaktive Installation soll das KDTS-Bildarchiv so strukturiert werden, dass die Bilder nach Wetter Aspekten geordnet werden können. 
Die Bildmenge muss dafür eventuell reduziert werden (z. B. auf ausgewählte Jahre oder Stichproben), um die Verarbeitung zu vereinfachen.
Nachforschungen haben dafür Ergebnisse geliefert, die sich für das Projekt als sinnvoll herausgestellt haben:
- [Research: Bildklassifikation nach Jahreszeiten und Wetter](../research-notes/bildklassifikation.md)

---

## Optionen
1. **Heuristische Klassifikation (Zeitstempel / Jahreszeit)**  
   - Schnell und ressourcenschonend, nutzt vorhandene Metadaten
   - Liefert grobe, aber stabile Zuordnung (z. B. Winter, Sommer, Tag, Nacht)

2. **Wetterdaten-gestützte Klassifikation (API-basiert)**  
   - Ergänzt Metadaten durch historische Wetterdaten (Temperatur, Niederschlag, Bewölkung, Sichtweite)
   - Liefert realistische Labels wie *snow*, *fog*, *clear*, *storm*

3. **Visuelle Feature-Analyse (OpenCV / BoofCV)**  
   - Analysiert Helligkeit, Farbanteile und Kontrast zur Verfeinerung oder Validierung
   - Erkennt visuelle Stimmung (z. B. Weißanteil = Schnee, niedrige Sättigung = Nebel)

4. **Hybridverfahren (Kombination der Ansätze)**  
   - Nutzung von Zeitstempeln und Wetterdaten für die Basis, ergänzt durch visuelle Analyse zur Absicherung

---

## Entscheidung
Für die erste Instanz eines funktionsfähigen PoC's zur Bildklassifikation eignet sich das Zuordnen nach Metadaten. Eine Auswahl an passenden Bildern wird nach Zeitkriterien wie Datum und Uhrzeit gefiltert und in Folge als Basis des Systems genutzt. Eine detailliertere Analyse passender Bilder kann im nachhinein dennoch erfolgen, ist vorerst aber nicht vorgesehen.

---

## Folgen und To-dos
- Auswahl passender Monate und Jahre für den Bilddatensatz
- Implementierung der **Analyse**, Code schreiben der nach Datum und Uhrzeit filtert
- Erstellung eines **Testdatensatzes** mit manuell überprüften Bildern um die Klassifikation zu Validieren
- Ergebnisse so speichern, dass sie für das Projekt nutzbar sind

---

## Probleme 
- Auswahl von Bildern nur über Dateinamen möglich weil Metadaten nicht korrekt sind (Aufnahmezeitpunkt)
- Auswahl von Jahreszeiten nach Monaten schwierig -> es schneit im April, wie geht man damit um?
