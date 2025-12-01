# ADR-0004: Datenschutz im Umgang mit den Bilddaten

**Status:** entschieden
**Datum:** 2025-12-01

---

## Kontext
Das Projekt verwendet ein umfangreiches Bildarchiv des KTDS-Labors als Grundlage für eine interaktive Installation.  
Da es sich um Bildmaterial handelt, muss geprüft werden, ob personenbezogene Daten enthalten sind und ob datenschutzrechtliche Maßnahmen (z. B. Anonymisierung oder Unkenntlichmachung von Gesichtern) erforderlich sind.

Eine erste Analyse und Sichtprüfung des bereitgestellten Archivmaterials hat ergeben:
- Die Bilder zeigen ausschließlich Landschaftsaufnahmen, Wetterverläufe und Außenaufnahmen aus großer Distanz
- Es sind **keine identifizierbaren Personen**, **keine Gesichter** und **keine personenbezogenen Details** enthalten

Damit besteht nach aktuellem Stand **kein Personenbezug** im Sinne der DSGVO.

---

## Optionen
1. **Automatische Anonymisierung / Personenentfernung einbauen**  
   - z. B. via OpenCV, ML-Modelle zur Gesichtserkennung/Maskierung  
   - würde Datenschutzrisiken minimieren, aber erhöht Entwicklungsaufwand deutlich  
   - nicht nötig, wenn keine Personen im Material vorkommen

2. **Manuelle Sichtprüfung jeder Auswahlreihe**  
   - einfache, nicht-technische Maßnahme  
   - geringerer Aufwand  
   - ausreichend bei sehr geringem Risiko

3. **Keine weitere Verarbeitung, da kein Personenbezug besteht (gewählt)**  
   - basiert auf der Analyse der Bilddaten  
   - entspricht dem Grundsatz der Datenminimierung  
   - ermöglicht effiziente Weiterarbeit

---

## Entscheidung
Wir haben uns für **Option 3** entschieden:  
**Es wird keine automatische Anonymisierung oder Gesichtserkennung in den Bildklassifikationsprozess integriert**, da nach aktueller Sichtung **keinerlei personenbezogene Daten** im Archiv enthalten sind.

Die Installation verwendet ausschließlich Bildmaterial ohne erkennbaren Personenbezug und erfüllt damit die Anforderungen der DSGVO an datenarme Verarbeitung.

Begründung:
- Die Quelle enthält keine identifizierbaren Personen
- Technische Anonymisierung wäre unnötig komplex und ressourcenintensiv

---

## Folgen und To-dos
- Keine zusätzlichen technischen Datenschutzmaßnahmen notwendig
- Bei **neuem oder erweitertem Bildmaterial** muss erneut geprüft werden, ob Personen sichtbar sind
- Dokumentation dieser Entscheidung in der Projektakte gewährleistet Nachvollziehbarkeit gegenüber Lehrenden und Stakeholdern
- Hinweis auf mögliche zukünftige Risiken wird im Risiko- und Problemanalyse-Dokument ergänzt

