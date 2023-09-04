import { el, create, group, loadJSON } from "../modules/lib.js";
import { showChampionList } from "./championList.js";
import { globals } from "../js/app.js";

// function to init the Pagination
export const initPagination = () => {
  const champions = globals.allChamps;
  const lettersPag = {};
  const allRealChampNames = [];

  // Collect all Champion-Namesn
  for (let champ in champions.data) {
    allRealChampNames.push(champions.data[champ].name);
  }

  // create der Paginnation
  createPag(allRealChampNames, lettersPag);
};

// function to toogle "aktgiv / passive" class of pagination Elements
const toogleClass = (aktElem) => {
  group("#pagination span").forEach((letter) => {
    letter.className = "letter passive";
  });

  aktElem.className = "letter aktive";
};

// function to create the pagination
const createPag = (champNames, letters) => {
  // sort the Champions Names and count Names for specific letter
  champNames
    .sort((a, b) => a.localeCompare(b))
    .forEach((championName) => {
      if (letters[championName.charAt(0)]) {
        letters[championName.charAt(0)]++;
      } else {
        letters[championName.charAt(0)] = 1;
      }
    });

  // create Pagination HTML output
  createPagHtml(letters);
};

// function to create the HTML-Elements for Pagination
const createPagHtml = (letters) => {
  el("#pagination").innerHTML = "";

  // iterate alle Letters
  for (let letter in letters) {
    const span = create("span");
    span.innerText = `${letter}(${letters[letter]})`;
    span.className =
      letter === globals.activeLetter ? "letter aktive" : "letter passive";
    span.setAttribute("data-letter", letter);

    // adding click Event to the letter
    span.addEventListener("click", function () {
      toogleClass(this);

      // setting the active Letter to clicked letter
      globals.activeLetter = this.getAttribute("data-letter");

      // Updating the champion list based on the selected letter
      showChampionList();
    });

    el("#pagination").append(span);
  }
};
