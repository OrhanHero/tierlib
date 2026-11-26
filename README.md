# Tierlib Prototyp

Tierlib ist ein Browserprototyp für Tierarztpraxen. Er demonstriert die Suche nach Tierakten über ihre Mikrochipnummer und die Freigabe eines eingeschränkten Notfallprofils. Die Oberfläche enthält drei fiktive Tierakten mit Stammdaten, Impfungen und Verlauf.

## Lokal starten

Voraussetzung ist Node.js ab Version 22 mit npm. Im Repository-Ordner genügt dieser Befehl.

```sh
npm start
```

Die Anwendung ist unter [http://127.0.0.1:4173](http://127.0.0.1:4173) erreichbar. Der Start erfordert keine Installation zusätzlicher Pakete.

## Demo ausprobieren

1. Öffne die **Chip-Suche** und suche nach `000 000 000 000 101`.
2. Öffne die Akte von **Luna**. In der Übersicht steht der fiktive Allergiehinweis **Penicillin**. Über **Impfungen** und **Verlauf** kannst du die übrigen Einträge ansehen.
3. Suche nach `000 000 000 000 999`. Die Suche meldet, dass keine Tierakte gefunden wurde.

## Notfallprofil ausprobieren

1. Öffne in Lunas Akte **Freigabe anfragen** und bestätige mit **Anfrage erstellen**. In der Empfängeransicht sind noch keine Profildaten sichtbar.
2. Öffne in der Praxisansicht die **Halteransicht**. Prüfe Empfänger und Umfang und wähle **Zustimmen** oder **Ablehnen**.
3. Öffne nach einer Zustimmung über die Praxisansicht die **Empfängeransicht**. Dort erscheinen der Tiername und der Allergiehinweis.
4. Widerrufe in der Halter- oder Praxisansicht die Freigabe. Die Empfängeransicht zeigt wieder keine Profildaten. Auch ein Neuladen setzt die Simulation zurück.

Der Prototyp simuliert die drei Perspektiven mit fiktiven Daten im selben Browser-Tab. Für einen Einsatz in der Praxis wären eine Anmeldung, eine serverseitige Zugriffsprüfung und eine sichere Datenübermittlung erforderlich.

## Technische Prüfung

```sh
npm run check
npm test
```

Der erste Befehl prüft die JavaScript-Syntax. Der zweite führt die automatisierten Tests für die Chip-Suche aus.

[Bildschirmaufnahme der fiktiven Akte von Luna in Version 0.1.0](docs/abbildungen/tierakte-luna.png) · [Empfängeransicht auf einem schmalen Bildschirm in Version 0.2.0](docs/abbildungen/notfallprofil-mobil-v020.png)

## Projektdokumentation

- [Business Model Canvas](docs/business-model-canvas.md) beschreibt die neun Bausteine des Tierlib-Geschäftsmodells und die zu prüfenden Annahmen.
- [Value Proposition Canvas](docs/value-proposition-canvas.md) verbindet die Bedürfnisse von Praxispersonal und Tierhalter:innen mit den Prototypfunktionen.
- [Doctolib-Vergleich und REA-Beobachtungen](docs/doctolib-vergleich.md) hält Referenzabläufe, Quellen und die Ableitungen für Tierlib fest.
- [MVP-Testplan](docs/mvp-testplan.md) beschreibt die Aufgabe für Testpersonen, Erfolgskriterien und das Testprotokoll. Die Tests mit Praxispersonal stehen noch aus.
- [Entwicklungsprotokoll](docs/entwicklungsprotokoll.md) dokumentiert Umsetzung, Entscheidungen und technische Prüfungen.
