Überblick:

[ Antilatency / MQTT ]  → MQTT leitet Tracking-Daten weiter  
↓  
(MQTT)  
↓  
[ Node.js Server ]  → fungiert als Brücke / Übersetzer  
↓  
(Socket.IO)  
↓  
[ Browser (index.html + Three.js) ]  → Visualisierung der Tracking-Daten


**Antilatency / MQTT**  
Erfasst die Positionen der Personen im Raum und stellt die Tracking-Daten als MQTT-Nachrichten bereit

**MQTT**  
Dient als leichtgewichtiger Transportmechanismus für kontinuierliche Tracking-Daten zwischen Tracking-System und Server

**Node.js Server**  
Fungiert als Brücke zwischen MQTT und der webbasierten Anwendung.  
Er empfängt Tracking-Daten, verarbeitet sie nicht weiter und leitet sie an verbundene Clients weiter

**Socket.IO**  
Ermöglicht eine dauerhafte, bidirektionale Verbindung zwischen Server und Browser zur Übertragung der Tracking-Daten in Echtzeit

**Browser (index.html + Three.js)**  
Visualisiert die Tracking-Daten im Raum, verwaltet die Interaktion und bildet die Grundlage für unsere weitere Logik (Zonen, Bildauswahl)

