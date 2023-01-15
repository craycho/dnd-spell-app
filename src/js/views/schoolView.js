import { state } from "../model.js";

class SchoolView {
  _parentEl = document.querySelector(".btn-container");
  _searchBtn = document.querySelector(".btn-search");
  filteredResults = document.querySelector(".filter-results ul");

  addHandlerSchool() {
    this._parentEl.addEventListener("click", function (e) {
      //   console.log(e.target);
      e.target.classList.toggle("selected");
    });
  }

  addHandlerSearch(handler) {
    const schools = document.querySelectorAll(".btn-school");
    let selectedSchools = [];

    this._searchBtn.addEventListener("click", function (e) {
      schools.forEach(s => {
        if (s.classList.contains("selected")) {
          selectedSchools.push(s.textContent.toLowerCase().trim());
        }
      });
      //   console.log(selectedSchools);

      handler(selectedSchools);
      selectedSchools = [];
    });
  }

  displaySelectedSpells(filteredSpells) {
    console.log(filteredSpells);
    this.filteredResults.innerHTML = "";

    for (const spell of filteredSpells) {
      console.log(spell.name);
      this.filteredResults.innerHTML += `<li>${spell.name}</li>`;
    }
    console.log(this.filteredResults);
  }
}

export default new SchoolView();

/**
 * @todo: Ucini da se prikaze live search nakon ponovnog klikanja na search bar
 *        Ucini da nestanu search results nakon sto se klikne van suggestions (search results)
 */