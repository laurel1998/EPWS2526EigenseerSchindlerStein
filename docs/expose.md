# Exposé: Interaktive Installation zum KTDS-Bildarchiv

## Identifikation und Beschreibung des Problemraums
Das Projekt bewegt sich im Spannungsfeld von **Kunst, Technik und Interaktion**.  
Es adressiert die Herausforderung, ein riesiges digitales Bildarchiv **in ein erlebbares, interaktives Format** zu übersetzen.  

Das KTDS-Labor verfügt über mehr als **10 Millionen Zeitraffer-Fotografien**, die Veränderungen von Landschaft, Licht und Atmosphäre dokumentieren.  
Ziel ist es, aus diesem Datenmaterial ein interaktives, öffentlich zugängliches System zu entwickeln, das **Neugier, Staunen und Beteiligung** auslöst.  

**Kernfrage:**  
Wie kann eine technische Infrastruktur und gestalterische Interaktion entstehen, die ein digitales Archiv **räumlich, intuitiv und emotional erfahrbar** macht?

Um den konkreten Problemraum besser erfassen zu können, wurde ein [Domänenmodell](../docs/Modelle/Domainmodell/Domaenenmodell.Version1.pdf) erstellt.

---

## Zielsetzung und Leitidee
Das Entwicklungsprojekt soll eine **interaktive Installation** hervorbringen, die Besucher:innen aktiv einbindet und durch **externe Steuerung** (z. B. Bewegung) erlebbar wird.  
Ziel ist kein reines Software-Tool, sondern ein **öffentlicher Eyecatcher**, der auf Veranstaltungen wie *Nacht der Technik*, *Tag der offenen Tür* oder *Messen* eingesetzt werden kann.  

### Zentrale Entwicklungsziele
- **Interaktive Erkundung** großer Bildarchive  
- **Künstlerisch-technische Transformation** von Daten in audiovisuelle Erlebnisse  
- **Niedrigschwellige Teilnahme** ohne Vorkenntnisse  
- **Robuste, installationstaugliche Umsetzung** (Projektionen, Mehrpersonennutzung)  

### Ablauf

Die Installation des Systems kann flexibel sein, solange eine ausreichende Bodenfläche zur Verfügung steht. Außerdem muss eine Möglichkeit für den Anschluss von Monitoren, oder Projektionen an eine Wand gegeben sein. In Folge wird dargestellt, wie die Interaktion mit unserem System aussehen kann und wie dieses auf die Interaktion reagiert, um die Projektidee zu konkretisieren.

1. Nutzer:in betritt den Raum und sieht eine markierte Bodenfläche vor sich. Diese ist in vier Bereiche unterteilt, welche die vier Jahreszeiten abbilden. Der Blick ist auf Bildschirme bzw. eine Projektion gerichtet, welche sich unmittelbar an der Bodenfläche befindet. Während sich niemand auf einem Feld befindet, wird eine Sequenz an zufälligen Bildern abgespielt, um Aufmerksamkeit auf die Installation zu ziehen. Zusätzlich kann dieser Effekt durch Audio und Lichteffekte verstärkt werden.
2. Nutzer:in nimmt sich einen *Controller* in Form einer kleinen Kamera. Diese behält Bodensicht, um auf die Infrarotsensoren im Boden reagieren zu können.
3. Nutzer:in bewegt sich auf dem Boden in ein Feld. Das System reagiert, indem es ein Bild der passenden Jahreszeit anzeigt. Befinden sich Personen außerdem auf anderen Feldern, verändert sich die Anzeige. Das ist realisierbar, indem sich die Anzeige auf dem Bildschirm in Bereiche aufteilt, jenachdem auf welchen Feldern die Nutzer:innen stehen (Winter und Sommer -> Splitscreen), oder die Bilder sich überlagern (Winter und Sommer gleichzeitig).
4. Nutzer:in verlässt die Installation und übergibt den Controller.

Zur Veranschaulichung ist ein [Storyboard](../docs/Storyboard.pdf) erstellt worden.


Technische Risiken und Probleme können im Verlauf dieses Projekts auftreten und zu Änderungen im Ablauf und den Entscheidungen führen. Sie sind in dieser Datei dokumentiert: 
[Risiko- und Problemanalyse](../docs/risikoanalyse.md)

---

## Anwendungsdomäne und Stakeholder
Die Anwendungsdomäne liegt zwischen **Medienkunst, Interaktionsdesign und Datenvisualisierung**.  

**Zentrale Stakeholder:**
- **Besucher:innen** – erleben und steuern das Archiv intuitiv alleine oder gemeinsam 
- **Veranstalter:innen** - präsentieren, leiten und installieren das System während der Präsentation 
- **Betreiber:innen** – entwickeln, warten und konfigurieren das System 
- **Datengeber:innen / KTDS-Labor** – stellen das Bildmaterial und Kontextinformationen bereit 

Die Interaktion soll kollektiv, immersiv und ästhetisch ansprechend gestaltet sein.
Eine ausführliche Beschreibung der User Stories ist [hier](user-stories.md) zu finden. 

---

## Proof of Concepts und technische Umsetzung
Eine Auswahl bereits existierender Konzepte ist in der [Marktrecherche](../docs/research-notes/marktrecherche.md) zu finden. Diese wird als Ideensammlung für das Finden von Lösungsansätzen genutzt.

Geplant sind mehrere Proof-of-Concepts, die schrittweise zu einem funktionalen Prototypen zusammengeführt werden:

1. [**Interaktion**](../docs/adr/0003-interaktion.md) – Interaktion mithilfe einer Kamera erfassen oder ein System des moxdlab nutzen, welches mit Infrarot arbeitet
2. [**Bildklassifikation**](../docs/adr/0002-bildklassifikation.md) – Ordnen der Bilder mit einer Kombination aus heuristischen Verfahren und visueller Bildanalyse
3. **Datenschutz** - Überprüfung der Einhaltung der DSGVO
4. **Raumwirkung** – Projektion, Licht- und Tonsteuerung im Zusammenspiel  
5. **Systemintegration** – stabile, webbasierte Architektur (z. B. Node.js, WebGL, OpenCV)

---

## Risiken und Herausforderungen
- **Performance & Stabilität** bei großen Bilddatenmengen  
- **Zuverlässigkeit der Erfassungssysteme** – stabile Reaktion auf Interaktionen unabhängig von Licht, Raum oder Publikumsdichte 
- **Räumliche Integration der Hardware** – z. B. Positionierung und Montage von Kameras oder Sensoren 
- **Rechtliche und ethische Fragen** (Urheberrecht, Datenschutz, Darstellung sensibler Inhalte)  
- **Gleichgewicht zwischen Kunst und Technik** – ästhetische Wirkung vs. technische Machbarkeit

Eine konkrete Auflistung von Problemen und Lösungsstrategien sind hier zu finden:
[Risiko- und Problemanalyse](../docs/risikoanalyse.md)

---

## Evaluationskonzept
Die Evaluation erfolgt iterativ und nutzerzentriert:  

**Erfolgskriterien:**
- intuitive Bedienbarkeit  
- stabile Performance  
- immersive ästhetische Wirkung
