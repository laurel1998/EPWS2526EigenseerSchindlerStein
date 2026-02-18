# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.  
Architekturentscheidungen sind über [ADR-Dateien](./docs/adr/) dokumentiert.



## [1.2.6] - 18.02.2026
### Hinzugefügt
- [Latenz](./docs/bilder/latenzcheck.png) überprüft
- Code-Struktur section in der [Projekt Readme](./README.md)
- [Domänenmodell Readme](../docs/Modelle/README.md)

### Überarbeitet 
- Code UX Anpassungen 



## [1.2.5] - 16.02.2026
### Hinzugefügt
- [Storyboard finale Version](../docs/StoryboardV2.jpg)

### Überarbeitet 
- offene ADRs als entschieden markiert



## [1.2.4] - 13.02.2026
### Hinzugefügt
- [Pi Setup](./docs/setup/01_pi_setup.md) erstellt
- [Trackingfläche Setup](./docs/setup/02_tracking_area_setup.md) erstellt
- [Webclient Setup](./docs/setup/03_webclient_setup.md) erstellt

  
### Überarbeitet 
- [Installationsanleitung](./docs/setup/installationsanleitung.md) überarbeitet
- Code zur Interaktion überarbeitet für folgende Funktionen: Split-Screen bei zwei Personeninteraktion, Datum- & Uhrzeit-Anzeige




## [1.2.3] - 12.02.2026
### Hinzugefügt
- [Installationsanleitung](./docs/installationsanleitung.md) erstellt
- [Archiv-Ordner](_Archiv/) für veraltete Modelle/Code
  
### Überarbeitet 
- [Bildklassifikation](./tools/image-selection/ImageSelectionV2.kt) an überarbeitete Interaktion angepasst
- Code zur [Interaktion](./tools/antilatency/webclient/js/interaction.js) überarbeitet
- Responsibilties aufgeteilt (JS/CSS/HTML)



## [1.2.2] - 11.02.2026
### Hinzugefügt 
- [ADR zum Anzeigesystem und Visualisierung](./docs/adr/0010-anzeigesystem.md) 
- [ADR zur Nutzerorientierung und Anleitung für das System](./docs/adr/0011-nutzerorientierung.md)

### Überarbeitet 
- [User Stories](./docs/user-stories.md) neu priorisiert



## [1.2.1] - 06.02.2026
### Überarbeitet 
- [ADR zur Bilddarstellung bei Mehrpersonen-Interaktion](./docs/adr/0008-mehrpersonen-interaktion.md) -> Versionen 3-5 hinzugefügt
- [ADR für Bildübergänge zwischen zwei Positionen](./docs/adr/0009-bilduebergang.md) -> Version 3 hinzugefügt



## [1.2.0] - 25.01.2026
### Hinzugefügt 
- [ADR zur Bilddarstellung bei Mehrpersonen-Interaktion](./docs/adr/0008-mehrpersonen-interaktion.md)
- [ADR für Bildübergänge zwischen zwei Positionen](./docs/adr/0009-bilduebergang.md)



## [1.1.0] - 15.01.2026
### Hinzugefügt 
- neues [Interaktionskonzept](./docs/bilder/InteraktionskonzeptV2.pdf) entwickelt

### Überarbeitet 
- [Datenbereitstellung](./docs/adr/0006-bereitstellung-der-bilddaten.md) angepasst an geforderte Funktionalität
- Bildklassifikation an neue Logik angepasst



## [0.14.0] - 12.01.2026
### Hinzugefügt
- Interaktionskonzept Version 1 ([Quadrantenlogik](./docs/bilder/InteraktionskonzeptV1.pdf))
### Überarbeitet 
- [Architekturmodell](./docs/Modelle/Architekturmodell.Version3.pdf) 



## [0.13.0] - 09.01.2026
### Überarbeitet 
- [index.html](./tools/antilatency/webclient/index.html) - Code für die Tracking-Visualisierung überarbeitet, um Bilder darzustellen



## [0.12.0] - 07.01.2026
### Hinzugefügt 
- [Datenfluss](./docs/datenfluss.md) - Visualisierung von Datenfluss über MQTT und Websockets
- [ADR zur Datenbereitstellung](./docs/adr/0006-bereitstellung-der-bilddaten.md)
- [ADR zur Datenverarbeitung](./docs/adr/0005-datenverarbeitung.md)
- [Antilatency SDK](./tools/antilatency) - Code für die Tracking-Visualisierung

### Überarbeitet
- [Interaktion POC](./docs/poc/0003-poc-interaktion.md) - Scope, Methodik, Erfolgskriterien, Ressourcen, Flow und Ergebnis angepasst
- [Architekturmodell](./_Archiv/Architekturmodell.Version2.pdf) angepasst
- [Risikoanalyse](./docs/risikoanalyse.md) - neue Erkenntnisse eingearbeitet
- [Datenschutz ADR](./docs/adr/0004-datenschutz.md) - weitere Option eingefügt und sich für diese entschieden



## [0.11.0] - 05.01.2026
### Überarbeitet
- [Tracking-Fläche](./docs/antilatency.md) - neu generiertes Environment, um Hashwert-Problem zu beheben
- Bestätigung des [Datenschutz POCs](./docs/poc/0002-poc-datenschutz.md)


  
## [0.10.0] - 14.12.2025
### Hinzugefügt 
- [POCs](./docs/poc)

### Überarbeitet 
- [ADR zur Interaktion](./docs/adr/0003-interaktion.md) - ein weiteres Problem hinzugefügt 



## [0.9.0] - 01.12.2025
### Hinzugefügt 
- [Audit 2](./Audits/audit2.md) - Roter Faden fürs Audit 2



## [0.8.0] - 01.12.2025
### Überarbeitet 
- [Antilatency Setup](./docs/antilatency.md) - weitere Bilder und Screenshots hinzugefügt

### Hinzugefügt 
- [ADR zu Datenschutz](./docs/adr/0004-datenschutz.md) - Festhalten unserer Entscheidung zum Umgang mit Datenschutz
- [Architekturmodell](./_Archiv/Architekturmodell.Version1.pdf) - Erste Version der Systemarchitektur
 


## [0.7.0] - 30.11.2025
### Überarbeitet 
- [ADR zur Bildklassifikation](./docs/adr/0002-bildklassifikation.md) - Abschnitt für Probleme hinzugefügt
- [ADR zur Interaktion](./docs/adr/0003-interaktion.md) - Abschnitt für Probleme hinzugefügt

### Hinzugefügt 
- [Antilatency Setup](./docs/antilatency.md) - Alle Infos zur Installation + Bilder 
- [User Journeys](./docs/User-Journeys) - 3 User-Journeys mit verschiedenen Personas
    - In den Möglichkeiten finden sich Lösungsansätze zur Verbesserung des System. Allerdings sind diese für die weitere Iterationen nützlich, nachdem alle User-Stories, die mit MUST   gekennzeichnet wurden, erfüllt sind. 



## [0.6.0] - 13.11.2025
### Überarbeitet 
- neue Version [Domänenmodell](./docs/Modelle/Domainmodell/Domaenenmodell.Version3.pdf)
- Priorisierung der [User Stories](./docs/user-stories.md)
- [ADR zur Bildklassifikation](./docs/adr/0002-bildklassifikation.md) an unseren MVP angepasst 

### Hinzugefügt 
- [MVP](./docs/mvp.md) - Defintion der Kernfunktionen ergänzt
- Erster [Code](./_Archiv/ImageSelectionV1.kt) für die Bildklassifikation nach Meta-Daten



## [0.5.0] – 09.11.2025
### Überarbeitet
- User-Stories
  - Trennung von Veranstalter und Betreiber des Systems
- Domänenmodell nach Iterationen unterteilt
 
### Hinzugefügt
- User-Stories für das Erlebnis des Systems
- User-Stories zum Veranstalter und Betreiber
- V1 des Storyboards erstellt



## [0.4.0] – 30.10.2025
### Bearbeitet
- Problem- & Risikoanalyse
  - Mögliche Lösungsstrategien und Ansätze ergänzt
- Exposé
  - Referenz auf User-stories hinzugefügt
  - Projekt konkretisiert und einen theoretischen Ablauf der Interaktion dargestellt
 
### Hinzugefügt
- User-stories
  - Anforderungen an das System
  - Bezug auf Nutzer:innen, Veranstalter:innen, Datengeber:innen
- ADR für Interaktionsmöglichkeiten
- Marktrecherche
  - Informationen über ähnliche Systeme und Bildausstellungen und deren Umsetzung
- Domänenmodell
  - Ausarbeitung des Problemraums
- Zusammenfassung der Inhaltspunkte für Audit 1



## [0.3.0] – 29.10.2025
### Hinzugefügt 
- Problem- & Risikoanalyse
  - Identifikation von Problemen, die während der Entwicklung auftreten könnten  
  - Auflistung von technischen Herausforderungen in Form von Fragen, die für die Durchführung noch beantwortet werden müssen
    - Fragen zur Positions- und Bewegungserkennung
    - Fragen zur Synchronisierung von Medien (Bild, Licht, Ton)
    - Fragen zur Datenbereitstellung
    - Fragen zur Softwareumsetzung



## [0.2.0] – 26.10.2025
### Bearbeitet 
- Ausarbeitung und Besprechung des **Exposés**  
  - Identifikation und Beschreibung des Problemraums  
  - Definition zentraler Entwicklungsziele und Leitidee  
  - Recherche möglicher technischer Umsetzungswege (Bewegungserkennung, Bildklassifikation)  
  - Diskussion potenzieller Risiken (z. B. technische Machbarkeit, Installationsaufwand)  
  - Erste Anforderungsanalyse und Konkretisierung der Stakeholder auf Grundlage der bestehenden User Stories

  

## [0.1.0] – 20.10.2025
### Hinzugefügt
- Projektinitialisierung  
  - Entscheidung für Projektthema und Fokus  
  - Einrichtung der Dokumentationsgrundlagen (README, CHANGELOG, ADR-Verzeichnis)
- Bildklassifizierung
  - Forschung über Realisierungsmöglichkeiten
  - ADR Dokument diesbezüglich erstellt
