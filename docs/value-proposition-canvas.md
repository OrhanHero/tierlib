# Value Proposition Canvas für Tierlib

**Arbeitsfassung · 26. November 2026**

Die zwei Profile behandeln unterschiedliche Aufgaben. Die Praxis sucht und verwendet Akteninformationen. Halter:innen ordnen ihr Tier zu und entscheiden über Freigaben. Die Einträge beschreiben Hypothesen über die Zielgruppen. Die Demo prüft ausgewählte Abläufe mit fiktiven Daten.

## Profil für Tierarztpraxen

| Kundenaufgaben | Probleme | Gewünschte Ergebnisse |
| --- | --- | --- |
| Das richtige Tier anhand von Chipnummer und Stammdaten zuordnen. | **P1.** Informationen sind verteilt und können im entscheidenden Moment fehlen. | **G1.** Die richtige Akte ist mit wenigen Schritten auffindbar. |
| Bei Erstkontakt oder Vertretung den Allergiehinweis und relevante Vorinformationen finden. | **P2.** Mehrere ähnliche Tiere oder fehlerhafte Nummern erhöhen den Prüfaufwand. | **G2.** Der Allergiehinweis ist auf einen Blick erkennbar. |
| Daten für eine Übergabe an den Notdienst sichten und den Freigabestatus prüfen. | **P3.** Unklare Berechtigungen erschweren die Weitergabe an eine andere Stelle. | **G3.** Der Zugang ist gezielt und nachvollziehbar auf den benötigten Umfang begrenzt. |

| Produkte und Leistungen | Problemlöser | Nutzenstifter |
| --- | --- | --- |
| Exakte Suche nach einer vollständigen Mikrochipnummer. | **P1, P2.** Eine exakte Suche samt Fehler- und Meldung bei ausbleibendem Treffer hilft bei der Zuordnung. | **G1.** Der Treffer zeigt Tier und Art vor dem Öffnen der Akte. |
| Aktenansicht mit Allergiehinweis, Impfungen und Verlauf. | **P1.** Ein eigener Hinweisbereich macht die Information unabhängig vom Verlauf sichtbar. | **G2.** Der Allergiehinweis bleibt beim Wechsel zwischen Aktenbereichen sichtbar. |
| Freigabeanfrage mit festem Demo-Empfänger und begrenzter Empfängeransicht. | **P3.** Die Praxis löst eine Anfrage aus, die simulierte Halteransicht entscheidet. | **G3.** Der Status ist nachvollziehbar. Empfänger sehen nur Tiername und Allergiehinweis. |

## Profil für Tierhalter:innen

| Kundenaufgaben | Probleme | Gewünschte Ergebnisse |
| --- | --- | --- |
| Bei Tierarztbesuch oder Notfall das eigene Tier eindeutig zuordnen. | **P1.** Papierunterlagen sind unterwegs unter Umständen schwer verfügbar. | **G1.** Es ist klar, um welches Tier und welche Akte es geht. |
| Betroffenen Stellen relevante Daten bereitstellen. | **P2.** Empfänger und Umfang einer Weitergabe können unklar sein. | **G2.** Eine Freigabe kann gezielt bestätigt oder abgelehnt werden. |
| Den Überblick über Zustimmungen und Widerruf behalten. | **P3.** Bei zu breitem Zugriff fehlt das Vertrauen in die weitere Nutzung. | **G3.** Eine Freigabe ist widerrufbar und ihr Status ist verständlich. |

| Produkte und Leistungen | Problemlöser | Nutzenstifter |
| --- | --- | --- |
| Chipgebundene Zuordnung eines Tieres zur fiktiven Akte. | **P1.** Die Akte ist im Demoablauf unabhängig vom physischen Dokument auffindbar. | **G1.** Der Tiername wird beim Prüfen einer Anfrage angezeigt. |
| Eigene Halteransicht mit Anfrage und Freigabeentscheidung. | **P2.** Empfänger und Datenumfang erscheinen vor der Entscheidung. | **G2.** Zwei eindeutige Aktionen ermöglichen Zustimmung oder Ablehnung. |
| Anzeige des Status und Aktion zum Widerruf. | **P3.** Nach dem Widerruf zeigt die simulierte Empfängeransicht keine freigegebenen Angaben. | **G3.** Die Halteransicht zeigt den aktuellen Status unmittelbar nach der Entscheidung. |

## Vorrang im MVP

Die Praxis benötigt zuerst einen zuverlässigen Weg von der Chipnummer zum Allergiehinweis. Die Halterseite muss anschließend den Empfänger und Umfang einer Anfrage verstehen. Der [MVP-Testplan](mvp-testplan.md) enthält die Aufgaben und getrennten Erfolgskriterien. Die Prototypansichten zeigen Freigaben innerhalb eines Browser-Tabs. Ein Praxiseinsatz erfordert eine eigene Zugriffsprüfung und sichere Datenübertragung.
