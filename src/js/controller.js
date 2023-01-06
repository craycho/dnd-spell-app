import * as model from "./model.js";
import searchView from "./views/searchView.js";
import spellView from "./views/spellView.js";

// const controlLoadSpell = async function () {
//   try {
//     // 1) Procita query u input fieldu
//     const query = searchView.getQuery();

//     // 2) Loada spell koji odgovara Stringu u queryu
//     model.state.spellResults = [];
//     await model.loadSpell(query);

//     // 3) Renderuje spell
//     spellView.generateMarkup(model.state.spellResults);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const controlDisplaySpell = function () {
//   spellView.generateMarkup(model.state.spellResults);
// };

const init = function () {
  window.addEventListener("load", model.loadSpell);
  // searchView.addHandlerSearch();
  // searchView.suggestions.innerHTML = "";
};
init();
