# Entwicklungsprojekt WS25/26 EigenseerSchindlerStein

Willkommen im Repository **EPWS2526EigenseerSchindlerStein**.  
Dieses Repository bildet die technische und organisatorische Basis unseres Projekts im Rahmen des Moduls *Entwicklungsprojekt*. Es dient der Dokumentation, Planung und Nachverfolgung.
Hier werden alle wichtigen Entscheidungen, Fortschritte und Artefakte zentral dokumentiert, damit sich Außenstehende schnell zurechtfinden können.

---

## Inhaltsverzeichnis
1. [Über das Projekt](#über-das-projekt)
2. [Repository-Struktur](#repository-struktur)
3. [Code-Struktur](#code-struktur)

---

## Über das Projekt

Ziele:
- Entwicklung eines interaktiven Systems, das Bewegungen über Bodenmarkierungen erkennt und entsprechende Bildabfolgen oder Animationen startet
- Immersive Vermittlung von Zeit, Jahreszeiten und atmosphärischen Veränderungen
- Integration und Synchronisation von Licht- und Audioeffekten, um die Wirkung zu verstärken

Das Projekt wird kontinuierlich weiterentwickelt.  
Alle Änderungen und Architekturentscheidungen werden nachvollziehbar dokumentiert.

---

## Repository-Struktur

| Pfad / Datei | Beschreibung |
|---------------|--------------|
| [**`/docs/`**](./docs/) | Enthält alle Projektdokumente |
| [**`/docs/Modelle/`**](./docs/Modelle/) | Enthält alle entworfenen Modelle (Architektur-/Domänenmodell) |
| [**`/docs/User-Journeys/`**](./docs/User-Journeys/) | Enthält 3 User-Journeys |
| [**`/docs/adr/`**](./docs/adr/) | *Architecture Decision Records (ADRs)* dokumentieren alle wichtigen Architekturentscheidungen mit Begründung |
| [**`/docs/bilder/`**](./docs/bilder/) | Enthält verwendete Bilder des Projekts |
| [**`/docs/bilder/StoryboardV2.jpg`**](./docs/StoryboardV2.jpg) | Storyboard - Visuelle Darstelleung der Interaktion |
| [**`/docs/research-notes/`**](./docs/research-notes/) | Verzeichnis zur Dokumentation von Forschungsergebnissen |
| [**`/docs/antilatency.md`**](./docs/antilatency.md) | Beschreibung des Aufbaus des Antilatency Systems |
| [**`/docs/expose.md`**](./docs/expose.md) | Exposé |
| [**`/docs/poc/`**](./docs/poc/) | Enthält alle Proof of Concept (PoC) |
| [**`/docs/mvp.md`**](./docs/mvp.md) | Minimal Viable Product (MVP) - Definition der Kernfunktionen |
| [**`/docs/risikoanalyse.md`**](./docs/risikoanalyse.md) | Auflistung der möglichen Risiken im Projekt |
| [**`/docs/user-stories.md`**](./docs/user-stories.md) | Auflistung aller User-Stories bit Kategorisierung |
| [**`/Audits/`**](./Audits/) | Roter Faden für die Audits |
| [**`/tools/`**](./tools/) | Code zur Bildklassifikation |
| [**`CHANGELOG.md`**](./CHANGELOG.md) | Verzeichnis aller Änderungen im Projektverlauf |
| [**`README.md`**](./README.md) | Diese Datei - für Überblick und Orientierung |
| *(weitere Ordner folgen)* | ggf. Code, Artefakte, Daten oder Präsentationen |

---

## Code-Struktur

| Pfad / Datei | Beschreibung |
|---------------|--------------|
| [**`/tools/`**](./tools/) | Enthält alles an für die Anwendung benötigten Code |
| [**`/tools/image-selection/`**](./tools/image-selection/) | Enthält Code zur Bildklassifizierung |
| [**`/tools/antilatency/`**](./tools/antilatency/) | Enthält firmware und webclient Code |
| [**`/tools/antilatency/firmware/`**](./tools/antilatency/firmware/) | *firmware* enthält die Antilatency SDK für C++, Code der auf dem Pi läuft |
| [**`/tools/antilatency/webclient/`**](./tools/antilatency/webclient/) | *webclient* enthält allen serverseitigen Code |
| [**`/tools/antilatency/webclient/css/`**](./docs/research-notes/) | Styles und Design Dokumentation |
| [**`/tools/antilatency/webclient/js/`**](./tools/antilatency/webclient/js/) | Alle Javascript Dateien |
| [**`/tools/antilatency/webclient/server.js/`**](./tools/antilatency/webclient/server.js/) | Datei die den Server startet |
| [**`/tools/antilatency/webclientindex.html/`**](./tools/antilatency/webclient/index.html/) | Browser Code, Layout der Zielwebseite |


Zusätzlich in GitHub:
- **Project Board (GitHub Projects)** - Überblick über aktuelle Aufgaben, Status und Fortschritt  
- **Issues & Pull Requests** - Austausch zu offenen Themen, Fehlern und neuen Features
