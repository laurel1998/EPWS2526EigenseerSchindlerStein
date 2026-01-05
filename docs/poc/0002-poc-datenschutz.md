# POC-0002: Datenschutz

**Status:** To be done

**Priority:** High

**Datum:** 2025-12-14


---

## POC-Goals
Die zu verwendeten Bilder müssen den DSGVO Bestimmungen entsprechen, wenn diese öffentlich gezeigt werden sollen. Es soll geprüft werden, ob Personen/Gesichter auf den Bilder zu erkennen sind. 


## Scope
Es dürfen keine Gesichter von Personen erkennbar sein, da das fertige Produkt an öffentlichen Veranstalungen, wie ,,Tage der offenen Tür", ausgestellt werden soll. Der Datenschutz muss also gewährleistet sein. 

## Methodik
Durchlaufen der Bilder durch ein KI-Bilderkennungstool, das Gesichter bzw. Personen erkennen kann. Als Tool wurde [FaceOnLive](https://faceonlive.com/) verwendet. Dieses Tool ermöglicht es nach dem Hochladen von Bildern zu erkennen, ob in dem Bild ein Geischt zu erkennen ist oder nicht.

## Erfolgskriterien
Die KI muss aufzeigen, dass keine Gesichter bzw. Personen zu erkennen sind. 

## Ressourcen
- Stichprobe [1](../bilder/14.06.2015.jpg) , [2](../bilder/21.04.2009.jpg) , [3](../bilder/27.05.2024.jpg)
- KI-Tool zur Personenerkennung: [FaceOnLive](https://faceonlive.com/)

## POC Flow
Es werden beispielhaft Bilder aus dem Archiv ausgesucht, wo zu erkennen ist, dass sich eine Person auf dem Bild befindet. Anschließend werden die Bilder im Tool hochgeladen und das Tool [analysiert](../bilder/FaceonliveSCAN.jpg), ob ein Gesicht zu erkennen ist. Wenn kein Gesicht erkennbar ist, kommt eine Fehlermeldung: [,,No results"](../bilder/ResultsSCAN.jpg).

## Ergebnisse
Alle ausgesuchten Bilder erhielten das Ergebnis ,,No results". Somit wurde festgestellt, dass die Auflösung der Bilder zu gering ist, um die Gesichter der Personen zu erkennen. Die Bilder dürfen daher im Projekt verwendet werden, ohne dass DSGVO-Bestimmungen verletzt werden und der Datenschutz gewährleistet bleibt. 

