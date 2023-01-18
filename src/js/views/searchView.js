class SearchView {
  _parentEl = document.querySelector(".search-spell");
  suggestions = document.querySelector(".suggestions ul");

  _clearInput() {
    this._parentEl.querySelector("#form-spell").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("keyup", handler);
  }

  addHandlerSpells(handler) {
    this.suggestions.addEventListener("click", handler);
  }

  showSearchResultsOnClick(handler) {
    document.querySelector("#form-spell").addEventListener("click", handler);
  }

  hideSearchResults(handler) {
    document.querySelector(".container").addEventListener("click", handler);
  }
}

export default new SearchView();
