# ADR-0006: Bereitstellung der Bilddaten 

**Status:** entschieden  
**Datum:** 2026-01-07  

---

## Kontext

Für den MVP soll zunächst eine Stichprobe aus dem KTDS-Bildarchiv für die Visualisierung verwendet werden.
Der Fokus liegt auf einer schnellen, nachvollziehbaren Integration der Bilder in den bestehenden Code, bei möglichst geringer technischer Komplexität.

Bedingungen:

- keine Notwendigkeit für dynamische Datenquellen
- Vermeidung unnötiger Abstraktions- oder Bereitstellungsschichten

---

## Optionen

1. **Statische Ablage der Bilder und eines Mapping-Files im Repository**  
   Bilder und Zuordnungen werden direkt im Projekt versioniert und zur Laufzeit geladen.

2. **Externe Datenquelle (API, Datenbank, Backend-Service)**  
   Bilder und Metadaten werden über einen separaten Dienst bereitgestellt.

3. **ADV-Server**
   Bilder werden auf den ADV-Server der Hochschule geladen und durch einen Pfad in einer mapping.json im Repository bereitgestellt.

---

## Entscheidung

Es wurde entschieden, die Bilder auf dem ADV-Server der Hochschule bereitszustellen und diese in einer mapping.json im Repository zu verlinken.

Diese Lösung ist für die weiterführende Projektphase am einfachsten umzusetzen und reduziert die Anzahl technischer Ebenen im System.  
Sie ermöglicht eine direkte Nutzung der Daten im Frontend während der Laufzeit, ohne zusätzliche Services oder Build-Schritte einführen zu müssen.

---

## Folgen und To-dos

**Folgen:**

- Bilddaten und Mapping sind klar versioniert und nachvollziehbar
- Die Visualisierung kann die Daten direkt zur Laufzeit laden
- Änderungen an der Bildauswahl erfordern keine Codeänderungen

**To-dos:**

- Hinzufügen weiterer Bilder in die bereits angelegte Ordnerstruktur
- Entscheidung treffen, ob gitignore Änderung bestehen bleiben kann (.jpg entfernt)
- Mapping-Datei (mapping.json) im Frontend-Code einbinden und laden

Beispiel: fetch('/assets/mapping.json').then(res => res.json()).then(mapping => { /* Nutzung */ })

