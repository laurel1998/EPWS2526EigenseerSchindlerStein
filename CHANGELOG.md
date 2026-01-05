# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.  
Architekturentscheidungen sind über [ADR-Dateien](./docs/adr/) dokumentiert.

## [0.11.0] - 05.01.2026
### Überarbeitet
- [Tracking-Fläche](./docs/antilatency.md) - Neu generiertes Environment, um Hashwert-Problem zu beheben
- [Datenschutz](./docs/poc/0002-poc-datenschutz.md) - Bestätigung des Datenschutz POCs
  
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
- [Architekturmodell](./docs/Modelle/Architekturmodell/Architekturmodell.Version1.pdf) - Erste Version der Systemarchitektur
 


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
- Erster [Code](./tools/image-selection/..) für die Bildklassifikation nach Meta-Daten



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
