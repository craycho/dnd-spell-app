import searchView from "./searchView.js";

class FilterView {
  _schoolEl = document.querySelector(".btn-container-school");
  _levelEl = document.querySelector(".btn-container-level");
  _searchBtn = document.querySelector(".btn-search");
  filteredResults = document.querySelector(".filtered-container");

  addHandlerSchool() {
    this._schoolEl.addEventListener("click", function (e) {
      e.target.classList.toggle("selected");
    });
  }

  addHandlerLevel() {
    this._levelEl.addEventListener("click", function (e) {
      e.target.classList.toggle("selected");
    });
  }

  addHandlerSearch(handlerFilter) {
    const schools = document.querySelectorAll(".btn-school");
    const levels = document.querySelectorAll(".btn-level");
    let selectedSchools = [];
    let selectedLevels = [];

    this._searchBtn.addEventListener("click", function (e) {
      e.preventDefault();

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

      handlerFilter(selectedSchools, selectedLevels);
      selectedSchools = [];
      selectedLevels = [];

      searchView.suggestions.innerHTML = "";
    });
  }

  scrollToElement(filteredSpells) {
    let element = ".search-instruction-2";
    if (filteredSpells.length >= 12) element = ".btn-container-school";
    if (filteredSpells.length >= 100) element = ".btn-container-level";
    if (filteredSpells.length >= 200) element = ".filter-results-section";

    setTimeout(() => {
      window.scrollTo({
        top:
          document.querySelector(element).getBoundingClientRect().top +
          window.scrollY -
          20,
        left: 0,
        behavior: "smooth",
      });
    }, 10);
  }

  displaySelectedSpells(filteredSpells) {
    // 1) Scrolla window do filterovanih spellova, u ovisnosti od broja rezultata (offset uradjen za scrollY)
    this.scrollToElement(filteredSpells);

    // 2) Displaya filterovane spellove (displaya u paginationu ako ih je >12)
    this.filteredResults.innerHTML = "";

    // Auto reset pagination prije provjere >12
    const pagination = document.querySelector(".pagination-spells");
    pagination.classList.remove("visible");
    this.filteredResults.classList.remove("has-pagination");

    if (filteredSpells.length >= 12) {
      this.generatePagination(filteredSpells);
    } else {
      for (const spell of filteredSpells) {
        this.filteredResults.innerHTML += `<div class = "grid-item">${spell.name}</div>`;
      }
    }
  }

  addHandlerResults(handler) {
    this.filteredResults.addEventListener("click", function (e) {
      if (e.target.classList.contains("grid-item"))
        handler(e.target.textContent);
    });
  }

  generatePagination(filteredSpells) {
    const pagination = document.querySelector(".pagination-spells");
    pagination.innerHTML = "";
    pagination.classList.add("visible");

    let currentLetter = "";

    // Dinamicki displaya pagination na osnovu pocetnih slova spellova
    for (const spell of filteredSpells) {
      if (spell.name[0] !== currentLetter) {
        currentLetter = spell.name[0];
        pagination.innerHTML += `<li class="page-item">${spell.name[0]}</li>`;
      }
    }

    // Automatski displaya prvu stranicu
    let firstLetter = filteredSpells[0].name[0];
    document.querySelector(".page-item").classList.add("current");

    // Displaya spellove na osnovu odabranog pocetnog slova
    for (const spell of filteredSpells) {
      if (spell.name[0] === firstLetter) {
        this.filteredResults.innerHTML += `<div class = "grid-item">${spell.name}</div>`;
      }
    }
  }

  addHandlerPagination(handler) {
    const pagination = document.querySelector(".pagination-spells");

    pagination.addEventListener("click", function (e) {
      // Handlea highlighting trenutne stranice
      const allPages = document.querySelectorAll(".pagination-spells li");
      allPages.forEach(page => page.classList.remove("current"));
      e.target.classList.add("current");

      if (e.target.closest("li")) handler(e.target.textContent);
    });
  }
}

export default new FilterView();
