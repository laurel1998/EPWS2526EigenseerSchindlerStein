# ADR-0002: Bildklassifikation nach Jahreszeiten, Wetter und Visueller Analyse

**Status:** vorgeschlagen
**Datum:** 2025-10-21 

---

## Kontext
Für die interaktive Installation soll das KDTS-Bildarchiv so strukturiert werden, dass die Bilder nach Wetter Aspekten geordnet werden können. 
Die Bildmenge muss dafür eventuell reduziert werden (z. B. auf ausgewählte Jahre oder Stichproben), um die Verarbeitung zu vereinfachen.
Nachforschungen haben dafür Ergebnisse geliefert, die sich für das Projekt als sinnvoll herausgestellt haben:
- [Research: Bildklassifikation nach Jahreszeiten und Wetter](../research/bildklassifikation.md)

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
TODO

---

## Folgen und To-dos
- Auswahl und Integration einer geeigneten **Wetter-API**
- Implementierung der **Analyse** mit OpenCV für Farb- und Helligkeitsauswertung 
- Erstellung eines **Testdatensatzes** mit manuell überprüften Bildern um die Klassifikation zu Validieren
- System zur Kombination von Metadaten, Wetterdaten und visuellen Analysen erstellen
- Ergebnisse so speichern, dass sie für das Projekt nutzbar sind
