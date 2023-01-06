import { state } from "../model.js";

class SearchView {
  _parentEl = document.querySelector(".search-spell");
  suggestions = document.querySelector(".suggestions");

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
    this._parentEl.addEventListener(
      "keyup",
      this.showSuggestions.bind(this, state.spellResults)
    );
  }

  // searchHandler(e) {
  //   const inputVal = e.currentTarget.value;
  //   let results = [];
  //   if (inputVal.length > 0) {
  //     results = search(inputVal);
  //   }
  //   showSuggestions(results);
  // }

  showSuggestions(results) {
    console.log(results);

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        let spellName = results[i].name;

        const match = spellName;
        console.log(match);
        // item = item.replace(match[0], `<strong>${match}</strong>`);

        this.suggestions.innerHTML += `<li>${match}</li>`;
      }
      this.suggestions.classList.add("has-suggestions");
    } else {
      results = [];
      this.suggestions.innerHTML = "";
      this.suggestions.classList.remove("has-suggestions");
    }
  }
}

export default new SearchView();
