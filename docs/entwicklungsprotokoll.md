# Entwicklungsprotokoll für den Tierlib-Prototyp

## 25. November 2026

- Die Projektidee sah eine über die Mikrochipnummer zuordenbare Tierakte vor. Für das MVP wurde die Suche in der Praxisansicht als erster Ablauf gewählt. Ein getrennt sichtbarer Allergiehinweis macht prüfbar, ob eine Person vom Suchauftrag zur benötigten Information gelangt.
- Drei öffentliche Doctolib-Seiten wurden mit REA in einem frischen Browserprofil beobachtet. Die Beobachtungen, die ergänzend gelesene Doctolib-Hilfe und die daraus abgeleiteten Designentscheidungen stehen im [Doctolib-Vergleich](doctolib-vergleich.md).
- Der Prototyp entstand als Web-App mit JavaScript, HTML und CSS. Der Demobestand umfasst drei fiktive Tierakten. Die Suche akzeptiert 15 Ziffern mit optionalen Leerzeichen oder Bindestrichen. Die Ergebnisansicht unterscheidet fehlerhafte Eingaben von gültigen Nummern ohne Treffer.
- Die Tierakte bündelt Stammdaten, einen bei Vorliegen hervorgehobenen Allergiehinweis, Impfungen und den Verlauf. Der Dialog für das Notfallprofil zeigt vor der Bestätigung den Empfänger und den Umfang der simulierten Freigabe. Der Status lässt sich widerrufen und endet spätestens beim Neuladen.
- Der [MVP-Testplan](mvp-testplan.md) legt Aufgabe, Messkriterien und Beobachtungsprotokoll für spätere Tests mit Personen aus Tierarztpraxen fest.

## 26. November 2026

- Die Rücknavigation der Akte führt eindeutig zur Tierübersicht. Die Suchmaske kündigt das Ergebnis über eine dauerhaft vorhandene Statusregion an. Die Tierliste wechselt früher in ihr schmales Layout, damit Chipnummer und Aktion bei kleineren Fenstern Platz haben.
- Die Syntaxprüfung und die vier automatisierten Tests für Chipformat, exakte Zuordnung sowie fehlerhafte und unbekannte Nummern bestanden.
- Zwei REA-Browserläufe prüften die Oberfläche in Chromium 158.0.8127.88 mit einem frischen Profil. Alle nachfolgend aufgeführten Schrittbedingungen wurden erreicht.

| Lauf | Prüfschritte und beobachtetes Ergebnis | REA Evidence-ID |
| --- | --- | --- |
| Desktop, 1280 × 720 | Die Suche nach `000-000-000-000-101` führt zur Tierakte Luna mit dem sichtbaren Allergiehinweis Penicillin. Der Dialog zeigt den Umfang der Freigabe. Nach Bestätigung erscheint der Status, nach Widerruf verschwindet er. Impfungen und Verlauf lassen sich öffnen. Im beobachteten Ablauf wurden keine Seitenfehler aufgezeichnet. | `ev_1c9d5cb126639dbcc541844472e0500a7ddeb7528e3eabc7c78c5e47e629e641` |
| Schmale Ansicht, 390 × 844 | Die Eingabe `101` wird als unvollständig markiert. Die gültig formatierte, unbekannte Nummer `000 000 000 000 999` zeigt „Keine Tierakte gefunden“ und keinen Link zu einer Akte. | `ev_6505ea12d1f1050f02055ad010f59a50dbc7837f74dcb0f752c2ae24d22bf5a8` |

Zum Wiederholen den lokalen Server mit `npm start` starten und die Prüfschritte in einem frischen Browserfenster ausführen. Die Übung startet in der Tierübersicht. Die Tests für das Suchmodul laufen mit `npm test`, die Syntaxprüfung mit `npm run check`.

Die [Bildschirmaufnahme der Akte von Luna](abbildungen/tierakte-luna.png) entstand in einem separaten REA-Lauf bei 1280 × 900 Pixeln. Evidence-ID `ev_0981ef357b9c2df8ba5010735964b9e98f1a38aaf4e64a09b1f496cfd2a6b631`.

## Aussagegrenzen

Die dokumentierten Prüfungen belegen Browserabläufe und Suchlogik im fiktiven Datenbestand. Die REA-Läufe wurden automatisiert ausgeführt. Tests mit Personen, Marktvalidierung und Praxiseinsatz sind noch offen. Die simulierte Freigabe erzeugt keine Übermittlung. Für einen Praxiseinsatz wären unter anderem überprüfte Identitäten, eine serverseitige Zugriffskontrolle und eine sichere Datenhaltung gesondert zu konzipieren und zu prüfen.

Die Umsetzung und Dokumentation wurden mit OpenAI Codex erstellt. REA lieferte die öffentlichen Browserbeobachtungen und die technischen Prüfnachweise. Die Versionshistorie im Repository hält Quellcode und Dokumentation zusammen.
