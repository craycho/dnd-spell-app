import { API_URL, TIMEOUT_SECONDS, ALT_URL } from "./config.js";
import { timeout } from "./helpers.js";

export const state = {
  currentSpell: {},
  spellList: [],
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

    console.log(this.state.currentSpell);

    return spell;
  } catch (err) {
    throw new Error(err);
    console.error(err);
  }
};

const loadSchool = async function (schoolName) {
  try {
    const res = await Promise.race([fetch(ALT_URL), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    console.log(data.results);
  } catch (err) {
    throw new Error(err);
    console.error(err);
  }
};

window.addEventListener("load", loadSpells);
loadSchool();
