# POC-0002: Datenschutz

**Status:** To be done

**Priority:** High

**Datum:** 2025-12-14


---

## POC-Goals
Die zu verwendeten Bilder müssen den DSGVO Bestimmungen entsprechen, wenn diese öffentlich gezeigt werden sollen. Es soll geprüft werden, ob Personen/Gesichter auf den Bilder zu erkennen sind. 


## Scope
Es dürfen keine Gesichter von Personen erkennbar sein, da das fertige Produkt an öffentlichen Veranstalungen, wie ,,Tage der offenen Tür", ausgestellt werden soll. Der Datenschutz muss also gewährleitet sein. 

## Methodik
Durchlaufen der Bilder durch eine KI, die Gesichter bzw. Personen erkennen kann. Als KI Tool wurde [FaceOnLive](https://faceonlive.com/) verwendet. Dieses Toll ermöglicht es nach dem Hochladen von Bildern zu erkennen, ob in dem Bild ein Geischt zu erkennen ist oder nicht.

## Erfolgskriterien
Die KI muss aufzeigen, dass keine Gesichter bzw. Personen zu erkennen sind. 

## Ressourcen
- Bildsammlung
- KI-Tool zur Personenerkennung: [FaceOnLive](https://faceonlive.com/)

## POC Flow
Es werden beispielhaft Bilder aus dem Archiv rausgesucht, wo zu erkenne ist, dass sich eine Person auf dem Bild befindet. Anschlißend werden die Bilder im Tool hochgeladen und das Tool analysiert, ob ein Geischt zu erkennen ist. Wenn kein Gesicht erkenbar ist, kommt eine Fehlermeldung: ,,No results".

## Ergebnisse
Alle rausgesuchten Bilder erhielten das Ergebnis ,,No results". Somit wurde festgestellt, dass die Auflösung der Bilder zu gering ist, um die Gesichter der Personen zu erkennen. Die Bilder dürfen daher im Projekt verwendet werden, sodass DSGVO-Bestimmungen nicht verletzt werden und der Datenschutzt erhalten bleibt.
