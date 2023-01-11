import { API_URL, TIMEOUT_SECONDS } from "./config.js";
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

const spellList = window.addEventListener("load", loadSpells);
