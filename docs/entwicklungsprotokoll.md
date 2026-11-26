# Entwicklungsprotokoll für den Tierlib-Prototyp

## 25. November 2026

- Die Projektidee sah eine über die Mikrochipnummer zuordenbare Tierakte vor. Für das MVP wurde die Suche in der Praxisansicht als erster Ablauf gewählt. Ein getrennt sichtbarer Allergiehinweis macht prüfbar, ob eine Person vom Suchauftrag zur benötigten Information gelangt.
- Drei öffentliche Doctolib-Seiten wurden mit REA in einem frischen Browserprofil beobachtet. Die Beobachtungen, die ergänzend gelesene Doctolib-Hilfe und die daraus abgeleiteten Designentscheidungen stehen im [Doctolib-Vergleich](doctolib-vergleich.md).
- Der Prototyp entstand als Web-App mit JavaScript, HTML und CSS. Der Demobestand umfasst drei fiktive Tierakten. Die Suche akzeptiert 15 Ziffern mit optionalen Leerzeichen oder Bindestrichen. Die Ergebnisansicht unterscheidet fehlerhafte Eingaben von gültigen Nummern ohne Treffer.
- Die Tierakte bündelt Stammdaten, einen bei Vorliegen hervorgehobenen Allergiehinweis, Impfungen und den Verlauf. Der Dialog für das Notfallprofil zeigt vor der Bestätigung den Empfänger und den Umfang der simulierten Freigabe. Der Status lässt sich widerrufen und endet spätestens beim Neuladen.
- Der [MVP-Testplan](mvp-testplan.md) legt Aufgabe, Messkriterien und Beobachtungsprotokoll für spätere Tests mit Personen aus Tierarztpraxen fest.

## 26. November 2026 · Version 0.1.0

- Die Rücknavigation der Akte führt eindeutig zur Tierübersicht. Die Suchmaske kündigt das Ergebnis über eine dauerhaft vorhandene Statusregion an. Die Tierliste wechselt früher in ihr schmales Layout, damit Chipnummer und Aktion bei kleineren Fenstern Platz haben.
- Die Syntaxprüfung und die vier automatisierten Tests für Chipformat, exakte Zuordnung sowie fehlerhafte und unbekannte Nummern bestanden.
- Zwei REA-Browserläufe prüften die Oberfläche in Chromium 158.0.8127.88 mit einem frischen Profil. Alle nachfolgend aufgeführten Schrittbedingungen wurden erreicht.

| Lauf | Prüfschritte und beobachtetes Ergebnis | REA Evidence-ID |
| --- | --- | --- |
| Desktop, 1280 × 720 | Die Suche nach `000-000-000-000-101` führt zur Tierakte Luna mit dem sichtbaren Allergiehinweis Penicillin. Der Dialog zeigt den Umfang der Freigabe. Nach Bestätigung erscheint der Status, nach Widerruf verschwindet er. Impfungen und Verlauf lassen sich öffnen. Im beobachteten Ablauf wurden keine Seitenfehler aufgezeichnet. | `ev_1c9d5cb126639dbcc541844472e0500a7ddeb7528e3eabc7c78c5e47e629e641` |
| Schmale Ansicht, 390 × 844 | Die Eingabe `101` wird als unvollständig markiert. Die gültig formatierte, unbekannte Nummer `000 000 000 000 999` zeigt „Keine Tierakte gefunden“ und keinen Link zu einer Akte. | `ev_6505ea12d1f1050f02055ad010f59a50dbc7837f74dcb0f752c2ae24d22bf5a8` |

Zum Wiederholen den lokalen Server mit `npm start` starten und die Prüfschritte in einem frischen Browserfenster ausführen. Die Übung startet in der Tierübersicht. Die Tests für das Suchmodul laufen mit `npm test`, die Syntaxprüfung mit `npm run check`.

Die [Bildschirmaufnahme der Akte von Luna](abbildungen/tierakte-luna.png) entstand in einem separaten REA-Lauf bei 1280 × 900 Pixeln. Evidence-ID `ev_0981ef357b9c2df8ba5010735964b9e98f1a38aaf4e64a09b1f496cfd2a6b631`.

## 26. November 2026 · Version 0.2.0

Die simulierte Freigabe bekam eine lesende Empfängeransicht. In der Praxisansicht lassen sich Freigabe und Widerruf auslösen. Die Empfängeransicht zeigt bei aktiver Freigabe für das ausgewählte Tier genau zwei Profildaten, den Tiernamen und den Allergiehinweis. Die Anmeldung und der Datenaustausch bleiben Bestandteile eines möglichen Praxiseinsatzes. Der Prototyp verwendet einen flüchtigen Freigabestatus im Browser-Tab.

Die Syntaxprüfung und die vier bestehenden Tests für die Chip-Suche bestanden erneut. REA prüfte die neue Ansicht in Chromium 158.0.8127.88 mit einem frischen Profil. In beiden Läufen wurden alle Schrittbedingungen erreicht. Es wurden keine Seitenfehler aufgezeichnet.

| Lauf | Beobachtetes Ergebnis | REA Evidence-ID |
| --- | --- | --- |
| Desktop, 1280 × 720 | Chip-Suche führt zu Luna. Die Empfängeransicht bleibt vor Bestätigung und nach Abbruch leer. Nach Freigabe zeigt sie Luna und Penicillin. Milos Profil bleibt ohne Angaben. Widerruf und das Laden eines neuen Dokuments verwerfen die jeweilige Freigabe. | `ev_fa28a58e0432eda96992d483526db7bc3fbdc6ad20cc08fe01fa3e91bf112914` |
| Schmale Ansicht, 390 × 844 | Die Empfängeransicht zeigt Luna und Penicillin. Chipnummer, Verlauf, Praxisnavigation und Bearbeitungsaktionen sind in dieser Ansicht ausgeblendet. | `ev_13f246d0363ef3c8c5efd9ac4c667f0247c22bd4f90196e497067776f4177a8e` |

Die [Bildschirmaufnahme der Empfängeransicht](abbildungen/notfallprofil-mobil-v020.png) stammt aus dem zweiten REA-Lauf. Der Ablauf ist im [README](../README.md#notfallprofil-ausprobieren) nachvollziehbar beschrieben.

## 26. November 2026 · Version 0.3.0

- Das [Business Model Canvas](business-model-canvas.md) beschreibt alle neun Bausteine und formuliert die zu prüfenden Annahmen. Das [Value Proposition Canvas](value-proposition-canvas.md) verbindet die Bedürfnisse von Praxispersonal und Tierhalter:innen mit konkreten App-Funktionen.
- Die Praxis erstellt jetzt eine Freigabeanfrage. Die Halteransicht zeigt Tier, Empfänger und Datenumfang und bietet Zustimmung, Ablehnung und Widerruf an. Der Notdienst sieht Tiername und Allergiehinweis erst nach Zustimmung. Der Ablauf verwendet fiktive Daten und einen flüchtigen Zustand im Browser-Tab.
- Die Syntaxprüfung und alle vier Suchtests bestanden. Der REA-Lauf bei 390 × 844 Pixeln prüfte Chip-Suche, offene Anfrage, Ablehnung, anschließende Zustimmung, den begrenzten Empfängerumfang und Widerruf. Alle 35 aufgezeichneten Schritte wurden abgeschlossen. Evidence-ID `ev_acde762f62ab251da5ec9d4bde491221a7b351c76ba257281606dc2b7ee12e40`.
- Der [MVP-Testplan](mvp-testplan.md) enthält einen getrennten Zusatztest für die Halteransicht. Ergebnisse mit Testpersonen stehen aus. Praxisabo, Pilotregion und Wirtschaftlichkeit bleiben Annahmen.

## Aussagegrenzen

Die dokumentierten Prüfungen belegen Browserabläufe und Suchlogik im fiktiven Datenbestand. Die REA-Läufe wurden automatisiert ausgeführt. Tests mit Personen, Marktvalidierung und Praxiseinsatz sind noch offen. Die simulierte Freigabe erzeugt keine Übermittlung. Für einen Praxiseinsatz wären unter anderem überprüfte Identitäten, eine serverseitige Zugriffskontrolle und eine sichere Datenhaltung gesondert zu konzipieren und zu prüfen.

Die Umsetzung und Dokumentation wurden mit OpenAI Codex erstellt. REA lieferte die öffentlichen Browserbeobachtungen und die technischen Prüfnachweise. Die Versionshistorie im Repository hält Quellcode und Dokumentation zusammen.
