import * as model from "./model.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import { API_URL, TIMEOUT_SECONDS } from "./config.js";
import { timeout } from "./helpers.js";

function search(str) {
  let results = [];
  const val = str.toLowerCase(); // f, fi, fir, fire
  const spells = model.state.spellList;

  for (i = 0; i < spells.length; i++) {
    if (spells[i].name.toLowerCase().indexOf(val) > -1) {
      results.push(spells[i].name);
    }
  }

  return results;
}

function controlSearch(e) {
  const inputVal = document.querySelector("#form-spell").value;
  let results = [];

  // Originalno je > 0
  if (inputVal.length > 2) {
    results = search(inputVal);
  }
  showSuggestions(results, inputVal); // Proslijedi spellove koji sadrze input value, kao i sam input value
}

function showSuggestions(results, inputVal) {
  searchView.suggestions.innerHTML = "";

  for (i = 0; i < results.length; i++) {
    let item = results[i];

    /* let match = [];
    if (item.includes(inputVal)) match.push(item); // Radi, ali ne highlighta dobro */

    const match = item.match(new RegExp(inputVal, "i")); // new RegExp (searchPattern, flag)
    item = item.replaceAll(match[0], `<strong>${match[0]}</strong>`);
    searchView.suggestions.innerHTML += `<li>${item}</li>`;
  }
  searchView.suggestions.classList.add("has-suggestions");
}

async function controlDisplaySpell(e) {
  try {
    // 1) Geta spell iz niza na osnovu pretraznog pojma
    const spells = model.state.spellList;
    const [selectedSpell] = spells.filter(
      spell => spell.name === e.target.textContent
    );

    // 2) API poziv na specifican spell na osnovu getanog spella
    const res = await Promise.race([
      fetch(`${API_URL}/${selectedSpell.index}`),
      timeout(TIMEOUT_SECONDS),
    ]);
    const spell = await res.json();
    model.state.currentSpell = spell;

    // 3) Displaya getani spell
    console.log(spell);
    searchView.suggestions.innerHTML = "";
    let spellLevelMarkup = "";
    if (spell.level === 0) spellLevelMarkup = spell.school.name + " cantrip";
    else if (spell.level === 1)
      spellLevelMarkup = "1st-level " + spell.school.index;
    else if (spell.level === 2)
      spellLevelMarkup = "2nd-level " + spell.school.index;
    else if (spell.level === 3)
      spellLevelMarkup = "3rd-level " + spell.school.index;
    else spellLevelMarkup = spell.level + "th-level";

    const spellMarkup = `<h3>${spell.name}</h3>
    <div class="type">${spellLevelMarkup}</div>
    <b>Casting Time:</b> ${spell.casting_time}<br>
    <b>Range:</b> ${spell.range}<br>
    <b>Components:</b>${spell.components.map(c => (c = " " + c))}<br>
    <b>Duration:</b> ${spell.duration}<br><br>
    ${spell.desc.map(element => `<p>${element}</p>`).join("")}

  `;

    document.querySelector(".spell-preview").innerHTML = spellMarkup;
  } catch (err) {
    throw new Error(err);
    console.error(err);
  }
}

const init = function () {
  window.addEventListener("load", model.loadSpells);
  searchView.addHandlerSearch(controlSearch);
  searchView.addHandlerSpells(controlDisplaySpell);
};
init();
