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
    window.scrollTo({
      top:
        document.querySelector(".search-instruction-2").getBoundingClientRect()
          .top +
        window.scrollY -
        20,
      left: 0,
      behavior: "smooth",
    });

    // 2) Displaya filterovane spellove (displaya u paginationu ako ih je >12)
    this.filteredResults.innerHTML = "";

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
      handler(e.target.textContent);
    });
  }

  generatePagination(filteredSpells) {
    const pagination = document.querySelector(".pagination-spells");
    pagination.innerHTML = "";
    pagination.classList.add("visible");
    this.filteredResults.classList.add("has-pagination");

    let currentLetter = "";

    for (const spell of filteredSpells) {
      if (spell.name[0] !== currentLetter) {
        currentLetter = spell.name[0];
        pagination.innerHTML += `<li class="page-item">${spell.name[0]}</li>`;
      }
    }

    // Displaya prvu stranicu automatski
    let firstLetter = filteredSpells[0].name[0];

    for (const spell of filteredSpells) {
      if (spell.name[0] === firstLetter) {
        this.filteredResults.innerHTML += `<div class = "grid-item">${spell.name}</div>`;
      }
    }
  }

  addHandlerPagination(handler) {
    const pagination = document.querySelector(".pagination-spells");

    pagination.addEventListener("click", function (e) {
      // e.target.classList.toggle("current");
      if (e.target.textContent.length === 1) handler(e.target.textContent);
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

/* DINAMICKO DISPLAYANJE U 1 ILI 3 KOLONE
// 2) Displaya filterovane spellove i sortira po imenu

    // let currentLetter = "";
    // this.filteredResults.style.columns = 3; // BITNO kada je vise od 1 kolone
    this.filteredResults.innerHTML = "";

    for (const spell of filteredSpells) {
      if (filteredSpells.length >= 12) {
        this.generatePagination(filteredSpells);
      }

      // Special case u kojem je ime spella overflowalo parent element
      // if (spell.name.includes("/")) spell.name = spell.name.replace("/", "/\n");

      // GRUPISE PO IMENU SA SAMO 1 ELEMENTOM U ROWU
      // if (spell.name[0] !== currentLetter) {
      //   currentLetter !== "" ? (this.filteredResults.innerHTML += `<br>`) : "";
      //   currentLetter = spell.name[0];
      //   this.filteredResults.innerHTML += `<span class="letter-group">${currentLetter}</span>`;
      // }

      this.filteredResults.innerHTML += `<div class = "grid-item">${spell.name}</div>`;
    }
    // 2.1) Special case kada je manje od 5 spellova
    // if (filteredSpells.length <= 5) this.filteredResults.style.columns = 1;*/
