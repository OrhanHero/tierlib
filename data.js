export const pets = [
  {
    id: "luna",
    name: "Luna",
    initials: "LU",
    species: "Hund",
    breed: "Labrador-Mix",
    age: "5 Jahre",
    sex: "weiblich",
    chip: "000000000000101",
    clinic: "Musterpraxis Pfotenblick",
    nextVisit: { title: "Jahreskontrolle", date: "10.12.2026" },
    allergy: {
      name: "Penicillin",
      note: "Demo-Eintrag. Die Unverträglichkeit ist in der fiktiven Stammakte vermerkt.",
    },
    vaccinations: [
      { label: "Tollwut", date: "18.09.2026", note: "Impfung dokumentiert" },
      { label: "Leptospirose", date: "15.04.2026", note: "Impfung dokumentiert" },
    ],
    timeline: [
      {
        kind: "visit",
        title: "Routineuntersuchung",
        date: "20.11.2026",
        note: "Gewicht und Allgemeinzustand wurden dokumentiert.",
      },
      {
        kind: "vaccine",
        title: "Tollwutimpfung",
        date: "18.09.2026",
        note: "Eintrag aus dem fiktiven Impfpass übernommen.",
      },
      {
        kind: "note",
        title: "Allergiehinweis ergänzt",
        date: "18.09.2026",
        note: "Penicillin in der Stammakte hinterlegt.",
      },
    ],
  },
  {
    id: "milo",
    name: "Milo",
    initials: "MI",
    species: "Katze",
    breed: "Europäisch Kurzhaar",
    age: "3 Jahre",
    sex: "männlich",
    chip: "000000000000202",
    clinic: "Musterpraxis Pfotenblick",
    nextVisit: { title: "Vorsorgeuntersuchung", date: "15.12.2026" },
    allergy: null,
    vaccinations: [
      { label: "Katzenschnupfen und Katzenseuche", date: "05.08.2026", note: "Impfung dokumentiert" },
    ],
    timeline: [
      {
        kind: "visit",
        title: "Vorsorgeuntersuchung",
        date: "06.11.2026",
        note: "Gewicht und Zahnstatus wurden erfasst.",
      },
      {
        kind: "vaccine",
        title: "Kombinationsimpfung",
        date: "05.08.2026",
        note: "Impfung gegen Katzenschnupfen und Katzenseuche dokumentiert.",
      },
    ],
  },
  {
    id: "nala",
    name: "Nala",
    initials: "NA",
    species: "Hund",
    breed: "Zwergpudel",
    age: "2 Jahre",
    sex: "weiblich",
    chip: "000000000000303",
    clinic: "Musterpraxis am Tierpark",
    nextVisit: null,
    allergy: null,
    vaccinations: [
      { label: "Tollwut", date: "12.06.2026", note: "Impfung dokumentiert" },
    ],
    timeline: [
      {
        kind: "note",
        title: "Digitaler Impfpass ergänzt",
        date: "16.10.2026",
        note: "Der fiktive Impfnachweis wurde der Akte zugeordnet.",
      },
      {
        kind: "vaccine",
        title: "Tollwutimpfung",
        date: "12.06.2026",
        note: "Impfung im fiktiven Impfpass vermerkt.",
      },
    ],
  },
];

function normalizeChip(input) {
  if (typeof input !== "string") return null;

  const chip = input.trim().replace(/[\s-]/g, "");
  return /^[0-9]{15}$/.test(chip) ? chip : null;
}

export function findPetByChip(input) {
  const chip = normalizeChip(input);
  return pets.find((pet) => pet.chip === chip) ?? null;
}

export function isValidChip(input) {
  return normalizeChip(input) !== null;
}

export function formatChip(input) {
  const chip = normalizeChip(input);
  return chip ? chip.match(/[0-9]{3}/g).join(" ") : "";
}
