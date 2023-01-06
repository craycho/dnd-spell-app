import { API_URL, TIMEOUT_SECONDS } from "./config.js";
import { timeout } from "./helpers.js";
import searchView from "./views/searchView.js";

export const state = {
  spell: {},
  spellResults: [],
};

export const loadSpell = async function (spellName) {
  try {
    /**
     * @todo: Fetch se moze staviti i u helper funkciju (AJAX("url"))
     */
    const res = await Promise.race([fetch(API_URL), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    // Pretrazi search query (spellName) medju rezultatima API calla
    // const spellResults = data.results.filter(spell =>
    //   spell.name.toLowerCase().includes(spellName.toLowerCase())
    // );
    // state.spellResults = spellResults;
    // searchView.showSuggestions(spellResults);
    // console.log(spellResults);

    state.spellResults = data.results;
    console.log(state.spellResults);

    searchView.addHandlerSearch();
    searchView.suggestions.innerHTML = "";
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Potencijalni fix za slow loading, loada sve spellove cim se page loada
/* 
const loadSpells = async function () {
  const res = await Promise.race([fetch(API_URL), timeout(TIMEOUT_SECONDS)]);
  const data = await res.json();

  return data;
};

const spellList = window.addEventListener("load", loadSpells);
 */
