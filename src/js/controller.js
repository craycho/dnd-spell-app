/**@todo Hide suggestions when clicking outside of container */
/**@todo Fix scrollTo bug */

import * as model from "./model.js";
import searchView from "./views/searchView.js";
import spellView from "./views/spellView.js";
import filterView from "./views/filterView.js";
//import { API_URL, TIMEOUT_SECONDS } from "./config.js";
//mport { timeout } from "./helpers.js";

const init = function () {
  window.addEventListener("load", model.loadSpells);
  searchView.addHandlerSearch(controlSearch);
  searchView.addHandlerSpells(controlDisplaySpell);
  searchView.showSearchResultsOnClick(controlShowSearchOnClick);
  searchView.hideSearchResults(controlHideSearchResults);

  filterView.addHandlerSchool();
  filterView.addHandlerLevel();
  filterView.addHandlerSearch(controlFilteredSpells);
  filterView.addHandlerResults(controlDisplayFilteredSpells);
};
init();

window.addEventListener("beforeunload", () => window.scrollTo(0, 0));

function search(str) {
  let results = [];
  const val = str.toLowerCase();
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
  model.state.searchedSpells = results;

  for (let i = 0; i < results.length; i++) {
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
    const spell = await model.loadSelectedSpell(selectedSpell);

    // 3) Displaya getani spell
    spellView.displaySpell(spell);
  } catch (err) {
    throw new Error(err);
    console.error(err);
  }
}

function controlShowSearchOnClick() {
  const results = model.state.searchedSpells;
  const searchQuery = document.querySelector("#form-spell").value;

  showSuggestions(results, searchQuery);
}

function controlHideSearchResults(e) {
  // console.log(e.target);
  // console.log(e.target.classList.contains("btn-primary"));
  // document.querySelector("#form-spell").addEventListener("blur", function () {
  //   console.log("Desilo se");
  //   searchView.suggestions.innerHTML = "";
  // });
  // Ghetto rjesenje
  if (
    e.target.classList.contains("container") ||
    e.target.classList.contains("btn-primary")
  )
    searchView.suggestions.innerHTML = "";
}

async function controlFilteredSpells(selectedSchools, selectedLevels) {
  try {
    // console.log(selectedSchools);
    // console.log(selectedLevels);
    model.state.selectedSchools = selectedSchools;
    model.state.selectedLevels = selectedLevels;

    // Exit clause ako nema filtera
    if (selectedSchools.length < 1 && selectedLevels.length < 1) return;

    // 1) Dopunjava query string na osnovu odabranih schools i levels
    let queryString = "?";
    selectedSchools.forEach(school => (queryString += `school=${school}&`));
    selectedLevels.forEach(level => (queryString += `level=${level}&`));

    // 2) API poziv sa generisanim query stringom
    const data = await model.loadSchoolAndLevel(queryString);
    model.state.filteredSpells = data;

    // 3) Displaya filterovane spellove (rezultat API poziva)
    filterView.displaySelectedSpells(data);
    filterView.filteredResults.classList.add("is-filtered");
  } catch (err) {
    throw new Error(err);
    console.error(err);
  }
}

async function controlDisplayFilteredSpells(spellName) {
  // console.log(spellName);

  // 1) Geta spell iz niza na osnovu imena odabranog spella (Text contenta elementa)
  const spells = model.state.spellList;
  const [selectedSpell] = spells.filter(spell => spell.name === spellName);

  console.log(selectedSpell);
  // 2) API poziv na osnovu indexa izabranog spella
  const spell = await model.loadSelectedSpell(selectedSpell);

  // 3) Displaya getani spell
  spellView.displaySpell(spell);
}

/* CONTROL SEARCH SA LISTOM 
// function showFilters(results) {
//   schoolView.filteredResults.innerHTML = "";

//   for (let i = 0; i < results.length; i++) {
//     schoolView.filteredResults.innerHTML += `<li>${results[i]}</li>`;
//   }
// } */
