import searchView from "./searchView.js";

class FilterView {
  _schoolEl = document.querySelector(".btn-container-school");
  _levelEl = document.querySelector(".btn-container-level");
  _searchBtn = document.querySelector(".btn-search");
  filteredResults = document.querySelector(".filtered-container");

  addHandlerSchool() {
    this._schoolEl.addEventListener("click", function (e) {
      //   console.log(e.target);
      e.target.classList.toggle("selected");
    });
  }

  addHandlerLevel() {
    this._levelEl.addEventListener("click", function (e) {
      // console.log(e.target);
      e.target.classList.toggle("selected");
    });
  }

  addHandlerSearch(handlerFilter) {
    const schools = document.querySelectorAll(".btn-school");
    const levels = document.querySelectorAll(".btn-level");
    let selectedSchools = [];
    let selectedLevels = [];

    this._searchBtn.addEventListener("click", function (e) {
      schools.forEach(s => {
        if (s.classList.contains("selected")) {
          selectedSchools.push(s.textContent.toLowerCase().trim());
        }
      });

      levels.forEach(lvl => {
        if (lvl.classList.contains("selected")) {
          selectedLevels.push(+lvl.textContent);
        }
      });
      // console.log(selectedSchools);
      // console.log(selectedLevels);

      handlerFilter(selectedSchools, selectedLevels);
      selectedSchools = [];
      selectedLevels = [];

      searchView.suggestions.innerHTML = "";
    });
  }

  displaySelectedSpells(filteredSpells) {
    // 1) Scrolla window do filterovanih spellova, u ovisnosti od pozicije viewporta

    // console.log(document.querySelector(".btn-search").getBoundingClientRect());

    window.scrollTo({
      top:
        document.querySelector(".search-instruction-2").getBoundingClientRect()
          .top +
        window.scrollY -
        20,
      left: 0,
      behavior: "smooth",
    });

    // 2) Displaya filterovane spellove
    this.filteredResults.innerHTML = "";
    for (const spell of filteredSpells) {
      // Special case u kojem je ime spella overflowalo parent element
      if (spell.name.includes("/")) spell.name = spell.name.replace("/", "/\n");
      this.filteredResults.innerHTML += `<div class = "grid-item">${spell.name}</div>`;
    }
  }

  addHandlerResults(handler) {
    this.filteredResults.addEventListener("click", function (e) {
      handler(e.target.textContent);
    });
  }
}

export default new FilterView();

/*  PRIKAZIVANJE U LISTI A NE GRIDU  
 // console.log(filteredSpells);
    // this.filteredResults.innerHTML = "";
    // for (const spell of filteredSpells) {
    //   console.log(spell.name);
    //   this.filteredResults.innerHTML += `<li>${spell.name}</li>`;
    // }
    // console.log(this.filteredResults); */
