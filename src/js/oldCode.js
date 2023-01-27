// 2) API poziv na specifican spell na osnovu getanog spella

// const res = await Promise.race([
//   fetch(`${API_URL}/${selectedSpell.index}`),
//   timeout(TIMEOUT_SECONDS),
// ]);
// const spell = await res.json();
// model.state.currentSpell = spell;

// 3) Displaya getani spell

//   console.log(spell);
//   searchView.suggestions.innerHTML = "";
//   let spellLevelMarkup = "";

//   if (spell.level === 0) spellLevelMarkup = spell.school.name + " cantrip";
//   else if (spell.level === 1)
//     spellLevelMarkup = "1st-level " + spell.school.index;
//   else if (spell.level === 2)
//     spellLevelMarkup = "2nd-level " + spell.school.index;
//   else if (spell.level === 3)
//     spellLevelMarkup = "3rd-level " + spell.school.index;
//   else spellLevelMarkup = spell.level + "th-level " + spell.school.index;

//   const spellMarkup = `<h3>${spell.name}</h3>
//   <div class="type">${spellLevelMarkup}</div>
//   <b>Casting Time:</b> ${spell.casting_time}<br>
//   <b>Range:</b> ${spell.range}<br>
//   <b>Components:</b>${spell.components.map(c => (c = " " + c))}<br>
//   <b>Duration:</b> ${spell.duration}<br><br>
//   ${spell.desc.map(element => `<p>${element}</p>`).join("")}

// `;

//   document.querySelector(".spell-preview").innerHTML = spellMarkup;

// ------------- DISPLAYANJE SPELLOVA ---------------

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
