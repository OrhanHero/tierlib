# Doctolib-Vergleich mit REA

**Untersuchung am 25. November 2026.** Welche öffentlich sichtbaren Schritte von Suche, Auswahlliste und Detailansicht lassen sich auf die Tierakte von Tierlib übertragen? Doctolib dient als Referenz für einen Ablauf aus der Humanmedizin.

## Methode und beobachteter Ablauf

Die Aufzeichnung erfolgte mit `capture_browser_scenario` von REA in Chromium 158.0.8127.88. Jedes Szenario verwendete ein eigenes temporäres Browserprofil ohne Anmeldung. REA navigierte zur angegebenen öffentlichen Ausgangsseite, wartete auf eine sichtbare Hauptüberschrift und erfasste am Ende die URL und den Accessibility-Baum. Beim dritten Szenario öffnete REA zusätzlich einen Praxistreffer aus der Liste und wartete auf die Überschrift des Profils. Der jeweilige Browserprozess wurde nach der Aufzeichnung beendet.

| Szenario | Beobachtung | REA-Evidence-ID |
| --- | --- | --- |
| [Startseite](https://www.doctolib.de/) | Die Suche nach Name, Fachgebiet oder Einrichtung und Ort ist prominent. Die Anmeldung ist davon getrennt. | `ev_e132d50f11d76ae4bdbcd65379db452bb85b95ba022d0c871085a0d17caf0366` |
| [Trefferliste Allgemeinmedizin Berlin](https://www.doctolib.de/allgemeinmedizin/berlin) | Die öffentliche Liste zeigt Filter, Angaben zur Verfügbarkeit und Links zu Praxisprofilen. Die Ergebnisseite wurde direkt geöffnet. | `ev_387d9d4afc473e3339d3add7f5eee2bff22b5836d439a84170af9bfaae0aaaab` |
| [Detailansicht eines Praxistreffers](https://www.doctolib.de/privatpraxis/berlin/rab-arztbesuche) | Der Klick auf den öffentlichen Treffer führt zur Detailansicht mit Praxisprofil, Kontaktinformationen und einer Buchungsaktion. | `ev_76acd1c2c86c1d16a25bb294b78d7000012716eedf889fa4d97558dde4b61b71` |

Die Prüfschritte beschränkten sich auf öffentliche Seiten und den Klick von der Trefferliste zum Profil. Die Evidence-IDs verweisen auf die ursprünglichen REA-Aufzeichnungen. Trefferreihenfolge und Verfügbarkeit können sich bei erneuter Ausführung ändern.

SHA-256 der erfassten Accessibility-Bäume in derselben Reihenfolge:

- `0c9f098ab112436baa296553d167420392373c2adf1ac0d413c34a69d78939b4`
- `0d050720d3068ac9b405ab76c12a290cbdb1c83fb0ddb2eeacd1630c572998a4`
- `910c6ba20beabea992a396c6812f84e2f40aa6ef70a914728330ef89c8772fc3`

## Freigabe laut Doctolib-Hilfe

Die offizielle Doctolib-Hilfe beschreibt für angemeldete Patient:innen die Auswahl eines anstehenden Termins und eines Dokumenttyps sowie das aktive Senden an die behandelnde Praxis. Laut Hilfe können Ärzt:innen Dokumente einsehen, wenn diese im Rahmen eines konkreten Termins geteilt wurden. [Dokument mit Ärzt:innen teilen](https://doctolibpatient.zendesk.com/hc/de/articles/360009570200-Ein-Dokument-mit-%C3%84rzt-innen-teilen) · [Zustimmung zur Speicherung von Dokumenten](https://doctolibpatient.zendesk.com/hc/de/articles/9074164581660-Meine-Zustimmung-zum-Speichern-von-Dokumenten-erteilen-oder-entziehen)

## Übertragung auf den Tierlib-Prototyp

| Referenzprinzip | Designentscheidung für Tierlib |
| --- | --- |
| Suche, Auswahl und Detailansicht sind erkennbare Schritte. | Die Praxisansicht bietet eine Tierübersicht und eine exakte Suche nach einer vollständigen Mikrochipnummer. Ein Treffer nennt das Tier, bevor die Akte geöffnet wird. |
| Die Detailansicht zeigt den aktuellen Gegenstand und eine gezielte Aktion. | Die Tierakte zeigt das ausgewählte Tier, die Mikrochipnummer und den Allergiehinweis. Impfungen und Verlauf sind als eigene Ansichten erreichbar. |
| Ein Dokument wird mit konkretem Anlass und aktiver Bestätigung geteilt. | Seit Version 0.3.0 stellt die Praxis eine Anfrage. Die simulierte Halteransicht zeigt Tier, Empfänger und Umfang vor der Entscheidung. Erst nach Zustimmung zeigt die Empfängeransicht Tiername und Allergiehinweis. Nach Ablehnung, Widerruf oder Neuladen sind keine Profildaten verfügbar. |

Die Mikrochipnummer ordnet einen Treffer dem fiktiven Tier zu. In einer produktiven Lösung müsste die Anwendung die Zugriffsbefugnis unabhängig von dieser Zuordnung prüfen. Im Prototyp lassen sich Praxis-, Halter- und Empfängeransicht im selben Browser-Tab öffnen. Die simulierte Freigabe steuert dort die Anzeige des Notfallprofils und gilt bis zum Widerruf oder Neuladen. Für einen realen Austausch zwischen Praxen wären Anmeldung, serverseitige Zugriffsprüfung und sichere Übermittlung gesondert umzusetzen. [Quellcode der Ansichten](../app.js) · [Fiktive Testdaten](../data.js)
