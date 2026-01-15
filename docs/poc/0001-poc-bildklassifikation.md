# POC-0001: Bildklassifikation

**Status:** Done

**Priority:** Medium

**Datum:** 2025-11-14

**Datei:** [Image-Selection](../../tools/image-selection)

---

## POC-Goals
Die Bilder aus dem KTDS-Archiv sollen nach Jahreszeit sortiert werden, um diese im Projekt benutzen zu können. Sie sollen außerdem so gespeichert werden, dass sie in den passenden Ordnern (nach Jahreszeit sortiert) gespeichert werden, um sie im späteren Verlauf nach den Jahreszeiten filtern zu können.

## Scope
Die EXIF-Daten der Bilder entsprechen nicht dem Aufnahmezeitpunkt der Bilder selbst. 
Der Aufnahmezeitpunkt ist jedoch in den Dateinamen der Bilder enthalten. 
Bilder aus dem April können winterlich aussehen, durch Wetterschwankungen.

## Methodik
Filterung der Bilder anhand ihrer Dateinamen. Es wird das Bild rausgefiltert, welches am nächsten zu 12Uhr an einem Tag aufgenommen wurde. Beispielhaft wird das Jahr 2021 ausgwählt, um die Methodik zu prüfen. Ein Parser durchsucht alle Tagesordner und prüft, ob der Monat den vordefinierten Jahreszeiten entspricht und legt diese an einem definierten Zielordner ab. 

-> **Logikänderungen folgend aus neuem Interaktionskonzept**:
  Die Logik der image-selection ist im groben gleich geblieben. Das Filtern der Bilder erfolgt weiterhin anhand des Dateinnamen. Nun wird jedoch nach Jahren, Monaten und Uhrzeiten, jeweils   des ersten Tags im Monat, gefiltert. Der Paser durchsucht alle Tagesordner und prüft, ob das Jahr, der Monat, der Tag und die Uhrzeit den entsprechenden definierten Variablen entsprechen. Anschließend werden die Bilder in folgende Datenstruktur abgelegt: Jahr -> Monat -> Uhrzeit. Es wird nicht noch extra ein Tagesorner zwischengespeichert, da immer der erste Tag des Monats gefiltert wird. 

## Erfolgskriterien
Zielordner erstellt und befüllt mit den richtig gefilterten Bildern in den Jahresordnern.

## Ressourcen
- Festplatte mit gesamter Bildsammlung
- IDE 

## Zeitplan
Für das POC wurde nur ein Beispieljahr verwendet, um die Funktionsweise des Codes zu prüfen. Für den späteren Verlauf muss der Code ein wenig umgeschrieben werden, um Bilder aus weiteren Jahres nach Jahreszeiten zu sortieren und diese im Projekt nutzen. 

## POC Flow
Der Code für den POC: [Image-Selection](../../tools/image-selection)

## Ergebnisse
Der POC hat sich als erfolgreich erwiesen und kann für die weitere Bildklassifikation verwendet werden.
