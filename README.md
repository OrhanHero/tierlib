# Tierlib Prototyp

Tierlib ist ein Browserprototyp für Tierarztpraxen. Er demonstriert, wie sich eine Tierakte über ihre Mikrochipnummer finden lässt und wo der Allergiehinweis in der Akte steht. Die Oberfläche enthält drei fiktive Tierakten mit Stammdaten, Impfungen und Verlauf.

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

Über **Notfallprofil freigeben** lässt sich die Freigabe für einen fiktiven Notdienst bestätigen und widerrufen. Der Status gilt bis zum Neuladen. Der Prototyp verwendet ausschließlich Beispieldaten im Browser. Für einen realen Betrieb wären unter anderem Anmeldung, Zugriffsprüfung und Datenübermittlung erforderlich.

## Technische Prüfung

```sh
npm run check
npm test
```

Der erste Befehl prüft die JavaScript-Syntax. Der zweite führt die automatisierten Tests für die Chip-Suche aus.

[Bildschirmaufnahme der fiktiven Akte von Luna](docs/abbildungen/tierakte-luna.png)

## Projektdokumentation

- [Doctolib-Vergleich und REA-Beobachtungen](docs/doctolib-vergleich.md) hält Referenzabläufe, Quellen und die Ableitungen für Tierlib fest.
- [MVP-Testplan](docs/mvp-testplan.md) beschreibt die Aufgabe für Testpersonen, Erfolgskriterien und das Testprotokoll. Die Ergebnisse werden nach der Durchführung eingetragen.
- [Entwicklungsprotokoll](docs/entwicklungsprotokoll.md) dokumentiert Umsetzung, Entscheidungen und technische Prüfungen.
