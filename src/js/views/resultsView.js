/**
 * @todo: Popraviti bug koji odmakne haos spellove kada se samo jedno slovo searcha (npr "a")
 */

class SpellView {
  generateMarkup(spells) {
    document.querySelector(".spells").innerHTML = "";

    const html = spells.forEach(spell => {
      document
        .querySelector(".spells")
        .insertAdjacentHTML(
          "beforeend",
          `<div class="spell">${spell.name}</div>`
        );
    });
  }
}

export default new SpellView();
