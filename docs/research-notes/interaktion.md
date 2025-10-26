# Research – Interaktion und Nutzererkennung im Raum

## Fragestellung
Wie können Besucher:innen in der interaktiven Installation räumlich erkannt und ihre Bewegungen zur Steuerung der Projektion genutzt werden?  
Ziel ist es, die Position oder Aktivität der Nutzer:innen zu erfassen, um Bildwechsel, Übergänge oder audiovisuelle Effekte auszulösen.

---

## Ansatz 1: Antilatency Tracking System
**Funktion:**  
Das an der Hochschule verfügbare **Antilatency-System** nutzt Infrarotmarker im Boden („Tracking Area“) und kleine, nach unten gerichtete Kameras („AltTracker“), die diese Marker erkennen.  
Die Position der Nutzer:innen wird so in Echtzeit im Raum berechnet.

**Vorteile:**  
- Sehr präzise 3D-Positionsbestimmung in Echtzeit
- Hohe Stabilität und Wiederholbarkeit

**Warum relevant:**  
Das System ist bereits an der Hochschule vorhanden und bietet eine professionelle, raumfüllende Lösung zur Positions- und Bewegungsverfolgung.  
Ideal, um Besucher:innen-Positionen direkt mit Bild- und Audioausgabe zu verknüpfen.

---

## Ansatz 2: Kamera-/Bildbasierte Bewegungserkennung
**Funktion:**  
Nutzung von herkömmlichen Kameras (RGB oder Tiefenkameras) und Softwarebibliotheken wie OpenCV oder MediaPipe zur Erkennung von Bewegung, Silhouetten oder Personen im Raum. (Ursprünglich mit Python genutzt)

**Vorteile:**  
- Günstig und einfach umsetzbar
- Keine zusätzliche Hardware für Nutzer:innen notwendig
- Gute Lösung für kleinere Interaktionszonen

**Warum relevant:**  
Eignet sich für einfache Interaktionen, z. B. Wechsel der Jahreszeit bei Bewegung in bestimmten Zonen oder Gestenerkennung vor einer Projektion.

---

## Ansatz 3: Druck- oder Näherungssensoren im Boden
**Funktion:**  
Verwendung von Sensorstreifen oder Druckplatten im Boden, die Anwesenheit oder Schritte detektieren.  
Kombinierbar mit Mikrocontrollern (z. B. Arduino) zur einfachen Ansteuerung von Software-Events.

**Vorteile:**  
- Robust und zuverlässig
- Direkte physische Interaktion (z. B. Betreten einer Zone)

**Warum relevant:**  
Eine analoge und kostengünstige Möglichkeit für Zonenerkennung. Gut geeignet für Installationen mit klar definierten Bereichen, aber weniger flexibel als optisches Tracking.

---

## Zusammenfassung
Für *Season Shift* eignen sich generell alle Optionen für die Erfassung von Positionen im Raum. Da die Hochschule das Antilatency System bereits zur Verfügung stellt, bietet dies eine gute Grundlage. Ansatz 2 bietet gute Lösungen für die Verwendung von Python als Programmiersprache, lässt sich aber auch mit C oder Java realisieren.

---

## Quellen
- [Antilatency Official Website – Tracking System Overview](https://antilatency.com)
- [OpenCV Documentation – Motion Detection & Tracking](https://docs.opencv.org](https://medium.com/@chen-yu/real-time-object-tracking-and-classification-with-opencv-and-densenet-43d39f875096))
- [MediaPipe Pose Tracking by Google Research](https://developers.google.com/mediapipe/solutions/vision/pose](https://medium.com/@nsidana123/real-time-pose-tracking-with-mediapipe-a-comprehensive-guide-for-fitness-applications-series-2-731b1b0b8f4d))
- [Arduino Project Hub – Pressure and Proximity Sensors](https://projecthub.arduino.cc/)
