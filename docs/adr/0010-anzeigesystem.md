# ADR-0010: Anzeige- und Ausgabesystem (Displays vs. Projektion)

**Status:** vorgeschlagen  
**Datum:** 2026-01-11  

---

## Kontext
Für die interaktive Installation muss entschieden werden, **wie die Visualisierung der Bildabfolgen und Interaktionen ausgegeben wird**.  
Die Anzeige ist ein zentraler Bestandteil des Erlebnisses und beeinflusst Wahrnehmung, Immersion, technische Umsetzung sowie die Eignung für den öffentlichen Einsatz (z. B. Messen, Nacht der Technik, Foyer).

Randbedingungen:
- Installationstauglichkeit (robust, wiederholbar, transportierbar)
- Einsatz auf Veranstaltungen mit wechselnden räumlichen Bedingungen
- Eyecatcher-Charakter
- Aktuell primär **Einzelnutzung**, ohne Mehrnutzer-Szenarien auszuschließen
- Integration in die bestehende webbasierte Architektur (Browser-basierte Visualisierung)

---

## Optionen

1. **Einzelner großer Bildschirm (TV/Monitor)**
   - Visualisierung auf einem großen Display vor der Interaktionsfläche

2. **Mehrere Bildschirme (z. B. Splitscreen / mehrere Perspektiven)**
   - Darstellung verschiedener Bildbereiche oder Zustände (z. B. Jahreszeiten)
   - Vorbereitung für spätere Mehrnutzerinteraktion

3. **Beamer / Projektion**
   - Projektion auf Wand oder Fläche für größere Wirkung und räumliche Immersion

4. **Kombination aus Bildschirm(en) und Projektion**
   - z. B. Hauptvisualisierung per Beamer, ergänzende Infos/Details auf Monitoren

5. **Alternative Anzeigeformen (z. B. LED-Wand, Bodenprojektion)**
   - experimentelle oder installationstypische Sonderformen
  
6. **Anzeige auf einem tragbaren Gerät**
   - z. B. Anzeige auf einem Tablet/Smartphone 

---

## Entscheidung
Das Projektteam tendiert zu einer **Kombination aus Projektion (Beamer) als Hauptausgabe** und **einem oder mehreren Bildschirmen als ergänzende Anzeige**.

Begründung:
- Projektionen erzeugen einen **starken immersiven Effekt** und eignen sich als Eyecatcher im öffentlichen Raum.
- Bildschirme sind **robust, flexibel positionierbar** und eignen sich für Zusatzinformationen, Debug-Ansichten oder alternative Darstellungen.
- Die Kombination erlaubt eine **flexible Anpassung an unterschiedliche Veranstaltungsorte**.
- Die webbasierte Visualisierung kann problemlos auf **mehrere Ausgabegeräte** erweitert werden.
- Die Lösung ist skalierbar und schließt **zukünftige Mehrnutzerinteraktion** nicht aus (z. B. Splitscreen, mehrere Perspektiven).

---

## Folgen und To-dos
- Konzeption eines Anzeige-Layouts für Projektion + Monitor(e)
- Definition von Darstellungsmodi:
  - Einzelnutzung (Vollbild)
  - Optionale Vorbereitung für Mehrnutzer (Splitscreen / Overlays)
- Evtl. technische Tests mir Raum und Licht

---

## Probleme
- **Lichtverhältnisse bei Projektionen**  
  → Lösung: Tests in realistischen Umgebungen, ggf. Kombination mit Displays  
- **Skalierung der Webvisualisierung auf verschiedene Auflösungen**  
  → Lösung: responsive Layouts und flexible Skalierung im Frontend  
- **Mehrnutzerfähigkeit noch nicht implementiert**  
  → Lösung: Anzeige-Architektur von Beginn an so gestalten, dass mehrere Perspektiven später ergänzt werden können
