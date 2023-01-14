/**
 * @todo: Popraviti bug koji odmakne haos spellove kada se samo jedno slovo searcha (npr "a")
 */
import searchView from "./searchView.js";

class SpellView {
  displaySpell(spell) {
    // 3) Displaya getani spell
    console.log(spell);
    searchView.suggestions.innerHTML = "";
    let spellLevelMarkup = "";
    console.log(spell.school.index);
    if (spell.level === 0) spellLevelMarkup = spell.school.name + " cantrip";
    else if (spell.level === 1)
      spellLevelMarkup = "1st-level " + spell.school.index;
    else if (spell.level === 2)
      spellLevelMarkup = "2nd-level " + spell.school.index;
    else if (spell.level === 3)
      spellLevelMarkup = "3rd-level " + spell.school.index;
    else spellLevelMarkup = spell.level + "th-level " + spell.school.index;

    const spellMarkup = `<h3>${spell.name}</h3>
 <div class="type">${spellLevelMarkup}</div>
 <b>Casting Time:</b> ${spell.casting_time}<br>
 <b>Range:</b> ${spell.range}<br>
 <b>Components:</b>${spell.components.map(c => (c = " " + c))}<br>
 <b>Duration:</b> ${spell.duration}<br><br>
 ${spell.desc.map(element => `<p>${element}</p>`).join("")}

`;

    document.querySelector(".spell-preview").innerHTML = spellMarkup;
  }
}

export default new SpellView();

/* generateMarkup(spells) {
  document.querySelector(".spells").innerHTML = "";

  const html = spells.forEach(spell => {
    document
      .querySelector(".spells")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="spell">${spell.name}</div>`
      );
  });
} */
