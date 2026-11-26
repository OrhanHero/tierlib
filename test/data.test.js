import assert from "node:assert/strict";
import test from "node:test";
import { findPetByChip, formatChip, isValidChip, pets } from "../data.js";

test("finds an exact chip, including formatted input and leading zeroes", () => {
  assert.equal(findPetByChip(pets[0].chip), pets[0]);
  assert.equal(findPetByChip("  000-000 000\t000-202  "), pets[1]);
  assert.equal(findPetByChip(formatChip(pets[2].chip)), pets[2]);
});

test("does not return a record for an unknown, partial, or malformed chip", () => {
  const unknownChip = "000000000000999";
  assert.equal(isValidChip(unknownChip), true);
  assert.equal(findPetByChip(unknownChip), null);

  for (const invalidChip of [null, 101, "", "101", "0000000000001010", "00000000000010A", "000.000.000.000.101"]) {
    assert.equal(isValidChip(invalidChip), false);
    assert.equal(findPetByChip(invalidChip), null);
    assert.equal(formatChip(invalidChip), "");
  }
});

test("formats an entered chip in five groups of three digits", () => {
  assert.equal(formatChip("000-000-000-000-101"), "000 000 000 000 101");
});

test("each demo record uses a distinct fictional chip and identifier", () => {
  assert.deepEqual(pets.slice(0, 3).map((pet) => pet.name), ["Luna", "Milo", "Nala"]);
  assert.equal(new Set(pets.map((pet) => pet.id)).size, pets.length);
  assert.equal(new Set(pets.map((pet) => pet.chip)).size, pets.length);
  for (const pet of pets) {
    assert.match(pet.chip, /^0{12}[0-9]{3}$/);
  }
});
