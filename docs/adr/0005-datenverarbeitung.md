# ADR-0005: Datenverarbeitung (mit WebDev-Komponenten)

**Status:** entschieden  
**Datum:** 2026-01-07  

---

## Kontext
Im Projekt musste entschieden werden, wie die vom Antilatency-System erfassten Trackingdaten verarbeitet, verteilt und visualisiert werden.  
Ursprünglich wurde eine Umsetzung mit **Unity** in Betracht gezogen. Im weiteren Projektverlauf ergaben sich jedoch neue Randbedingungen:

- Nutzung eines **Raspberry Pi** als zentraler Host
- Direkter Zugriff auf die **native Antilatency SDK (C++)**
- Eine **webbasierten, flexiblen Visualisierung**

---

## Optionen

1. **Unity-basierte Lösung**
   - Tracking, Logik und Visualisierung in einer Unity-Anwendung
2. **Webbasierte Architektur**
   - Native Antilatency SDK (C++) für Tracking
   - MQTT zur Datenverteilung
   - Node.js als Middleware
   - WebSockets für Echtzeitkommunikation mit dem Browser

---

## Entscheidung
Das Projektteam hat sich für eine **webbasierte Architektur mit MQTT, Node.js und WebSockets** entschieden.

Gründe für diese Entscheidung:
- Direkte Nutzung der **offiziellen nativen Antilatency SDK** ohne zusätzliche Abstraktion
- **Entkopplung** von Tracking, Datenverarbeitung und Visualisierung
- MQTT als robuster, bewährter Standard für Sensor- und Echtzeitdaten
- WebSockets ermöglichen eine **verzögerungsarme Echtzeitvisualisierung** im Browser
- Webbasierte Visualisierung ist **plattformunabhängig**, leicht anpassbar und gut erweiterbar
- Geringere Abhängigkeit von einer einzelnen Engine (Unity)
- Codebasis bereitgestellt in Zusammenarbeit mit dem moxdlab und bisherigem Arbeitsfortschritt im Bezug auf Antilatency

Unity wurde bewusst nicht weiterverfolgt, da es für die geplante Architektur unnötige Komplexität und Abhängigkeiten eingeführt hätte.

---

## Folgen und To-dos
- Verknüpfung von Datenvisualisierung im Zusammenhang mit dem Bildarchiv des KDTS-Labors
- Anpassen der index.html

---

## Probleme
- Browser kann nicht direkt mit dem MQTT Broker kommunizieren -> Middlewear (Node.js + Websockets) nötig
