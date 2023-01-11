import { state } from "../model.js";

class SearchView {
  _parentEl = document.querySelector(".search-spell");
  suggestions = document.querySelector(".suggestions ul");

  getQuery() {
    const query = this._parentEl.querySelector("#form-spell").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector("#form-spell").value = "";
  }

  addHandlerSearch(handler) {
    // this._parentEl.addEventListener("submit", function (e) {
    //   e.preventDefault();
    //   handler();
    // });
    this._parentEl.addEventListener("keyup", handler);

    //this.showSuggestions.bind(this, state.spellResults)
  }

  addHandlerSpells(handler) {
    this.suggestions.addEventListener("click", handler);
  }
}

export default new SearchView();

/**
 * @todo: Ucini da se prikaze live search nakon ponovnog klikanja na search bar
 *        Ucini da nestanu search results nakon sto se klikne van suggestions (search results)
 */
