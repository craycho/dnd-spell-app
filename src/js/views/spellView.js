import searchView from "./searchView.js";

class SpellView {
  displaySpell(spell) {
    // console.log(spell);
    // 1) Displaya getani spell
    searchView.suggestions.innerHTML = "";
    let spellLevelMarkup = "";
    let higherLevel = "";
    if (spell.higher_level[0] !== undefined)
      higherLevel = "<b>At Higher Levels:</b> " + spell.higher_level[0];

    if (spell.level === 0) spellLevelMarkup = spell.school.name + " cantrip";
    else if (spell.level === 1)
      spellLevelMarkup = "1st-level " + spell.school?.index;
    else if (spell.level === 2)
      spellLevelMarkup = "2nd-level " + spell.school?.index;
    else if (spell.level === 3)
      spellLevelMarkup = "3rd-level " + spell.school?.index;
    else spellLevelMarkup = spell.level + "th-level " + spell.school?.index;

    const spellMarkup = `<h3>${spell.name}</h3>
 <div class="type">${spellLevelMarkup}</div>
 <b>Casting Time:</b> ${spell.casting_time}<br>
 <b>Range:</b> ${spell.range}<br>
 <b>Components:</b>${spell.components.map(c => (c = " " + c))}<br>
 <b>Duration:</b> ${spell.duration}<span class="break-small"></span>
 ${spell.desc.map(element => `<p>${element}</p>`).join("")}
 ${higherLevel}
`.replaceAll("***", "");

    // 2) Scrolla window do vrha pagea
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    document.querySelector(".spell-preview").style.display = "block";
    document.querySelector(".spell-preview").innerHTML = spellMarkup;
  }
}

export default new SpellView();
