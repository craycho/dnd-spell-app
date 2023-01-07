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
}

export default new SearchView();
