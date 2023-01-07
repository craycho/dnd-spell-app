import * as model from "./model.js";
import searchView from "./views/searchView.js";
import spellView from "./views/spellView.js";

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
  if (inputVal.length > 1) {
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
    console.log(match);
    item = item.replaceAll(match[0], `<strong>${match[0]}</strong>`);
    searchView.suggestions.innerHTML += `<li>${item}</li>`;
  }
  searchView.suggestions.classList.add("has-suggestions");
}

const init = function () {
  window.addEventListener("load", model.loadSpells);
  searchView.addHandlerSearch(controlSearch);
};
init();
