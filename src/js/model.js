import { API_URL, TIMEOUT_SECONDS, ALT_URL } from "./config.js";
import { timeout } from "./helpers.js";

export const state = {
  spellList: [],
  currentSpell: {},
  searchedSpells: [],
  selectedSchools: [],
  selectedLevels: [],
  filteredSpells: [],
};

const loadSpells = async function () {
  try {
    const res = await Promise.race([fetch(API_URL), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    state.spellList = data.results;
  } catch (err) {
    throw new Error(err);
    console.error(err);
  }
};

export const loadSelectedSpell = async function (selectedSpell) {
  try {
    const res = await Promise.race([
      fetch(`${API_URL}/${selectedSpell.index}`),
      timeout(TIMEOUT_SECONDS),
    ]);
    const spell = await res.json();
    this.state.currentSpell = spell;

    return spell;
  } catch (err) {
    throw new Error(err);
    console.error(err);
  }
};

export const loadSchoolAndLevel = async function (queryString) {
  try {
    console.log(queryString);

    const res = await Promise.race([
      fetch(API_URL + queryString),
      timeout(TIMEOUT_SECONDS),
    ]);
    const data = await res.json();

    return data.results;
  } catch (err) {
    throw new Error(err);
    console.error(err);
  }
};

window.addEventListener("load", loadSpells);
