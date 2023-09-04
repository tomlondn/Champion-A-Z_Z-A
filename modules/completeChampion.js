import { globals } from "../js/app.js";
import { db } from "./db.js";
import { el, create, group, loadHTML } from "./lib.js";

// function to open complete Form
export async function openCompleteForm() {

  // load complete Champion HTML form file 
  const completetForm = await loadHTML("data/completeChamp.html");
  const champ = this.getAttribute("data-champion");
  const playerId = this.getAttribute("data-player");
  const playerName = this.getAttribute("data-player-name");
  const clickedElem = this;

  // add the form to the HTML
  el("#playersFormWrapper").className = "show";
  el("#playersFormWrapper").innerHTML = completetForm;

  // generate dynamic Form Headline 
  el("#playersFormWrapper #completeChampForm h2").innerText = `${this.getAttribute("data-champion")} abschließen für ${this.getAttribute("data-player-name")}`;

  // add Click Event to open the form popup
  el("#playersFormWrapper #completeChamp").addEventListener("click", function() {
    completeChampion(clickedElem, champ, playerId, playerName);
  });

  // add Click Event to close the form popup
  el("#playersFormWrapper #closeCompleteForm").addEventListener("click", function() {
    // adding hide class and clear form
    el("#playersFormWrapper").innerHTML = "";
    el("#playersFormWrapper").className = "hide";
  });
}

// function to complete Champion
const completeChampion = async (clickedElem, champ, playerId, playerName) => {
  let allInputs = true;
  const allInputField = group("#completeChampForm input");

  // check all inputs to be filled
  allInputField.forEach((inputField) =>  {
    if(!inputField.value) {
      allInputs = false;
      el("#error").innerText = "Fehler! Gib alle Daten ein!";
      return;
    }
  });

  // if all inputs filled
  if(allInputs) {

    // get already completet Champs
    const completeChampions = await db.readItem("completetChampions");
    
    // special check for trys input to be a Number
    if(!isNaN(el("#playerTrys").value)) {
      champ = champ.replace(" ","");

      // play Ban Sound of Champion
      const audio = new Audio();
      audio.src = `/audio/${champ}-Ban.mp3`;
      audio.volume = .05;
      audio.play();

      // add now completet champ to the already completet Array and write it in the DB  
      completeChampions.push({
        champ: champ,
        player: playerId,
        trys: el("#playerTrys").value,
        playedLane: el("#playedLane").value,
        completeDate: el("#completeDate").value
      });
      db.writeItem("completetChampions", completeChampions);

      // visually show in HTML that champ is completet
      clickedElem.innerHTML = `Abgeschlossen </br> ${playerName} ${el("#playerTrys").value}X`;
      clickedElem.className = "completet";
      clickedElem.removeEventListener("click", openCompleteForm);

      // clear and hide form after the submit
      el("#playersFormWrapper").className = "hide";
      el("#playersFormWrapper").innerHTML = "";
    } else {
      el("#error").innerText = "Fehler! Versuche ist keine Zahl!";
    }
  }
}

// function to show all completet Champions
export const showCompletet = async (elem) => {
  el("#allChampions").innerHTML = "";
  el("#pagination").innerHTML = "";

  const players = await db.readItem("players");

  // get Direction to complete Champ for the player
  const playerDirection = players
    .filter((player) => player.id === elem.getAttribute("data-show-player"))
    .map((player) => player.direction)[0];
  
  const allCompletetChamps = await db.readItem("completetChampions");
  const allChamps = Object.keys(globals.allChamps.data);

  // if direction is against alphabet resort the Array
  if(playerDirection === "desc") {
    allChamps.sort((a, b) => b.localeCompare(a));
  }

  // get completet Champs for the specific player
  const filteredCompletetChamps = allCompletetChamps.filter((completet) => completet.player === elem.getAttribute("data-show-player"));
  
  let nextChamp = null;

  // get all names of already completet Champs to Check the "next to Play" 
  const allCompletetChampsNames = filteredCompletetChamps.map((oneCompletet) => oneCompletet.champ);

  // check if is Champ completet, if not only set nextChamp once to get the "next to Play" 
  allChamps.forEach((champ) => {
    if(!allCompletetChampsNames.includes(champ) && nextChamp === null){
      nextChamp = champ;
      return;
    }
  });

  // play the pick Sound of the Champ the player has to play next
  const audio = new Audio();
  audio.src = `audio/${nextChamp}-Pick.mp3`;
  audio.volume = .05;
  audio.play();

  const wrapper = create("section");
  wrapper.className = "allCompletet";

  // adding a output of next Champ to play to the HTML of the completet Champ site
  createNextChamp(globals.allChamps.data[nextChamp].name, wrapper);
  
  // adding a Legend for the completet Champs output
  createLegend(wrapper);

  // generate the HTML output of all completet champs
  filteredCompletetChamps.forEach((oneCompletetChampion) => {
    const div = create("div");
    div.className = "oneCompletet";
    const [ year , month, day ] = oneCompletetChampion.completeDate.split("-");
    
    div.append(createSpan("champion", oneCompletetChampion.champ));
    div.append(createSpan("trys", `${oneCompletetChampion.trys} X`));
    div.append(createSpan("lane", oneCompletetChampion.playedLane));
    div.append(createSpan("date", `${day}.${month}.${year}`));

    wrapper.append(div);
  });

  el("#allChampions").append(wrapper);
}

// fully create a span
const createSpan = (cssClass, content) => {
  const span = create("span");

  if(cssClass !== "")
    span.className = cssClass;

  span.innerText = content;
  return span;
}

// function to create and add the Legend HTML
const createLegend = (wrapper) => {
  const legend = create("div");
  legend.className = "completetLegend";
  legend.append(createSpan("", "Champion"));
  legend.append(createSpan("", "Versuche"));
  legend.append(createSpan("", "Lane"));
  legend.append(createSpan("", "Datum"));

  wrapper.append(legend);
}

// function to create and add the next Champ to play HTML
const createNextChamp = (nextChamp, wrapper) => {
  const section = create("section");
  section.id = "nextChampion";
  const header = create("header");
  const h2 = create("h2");
  h2.innerText = `Als nächstes dran: ${nextChamp}`;
  h2.id = "nextChampHeadline";
  header.append(h2);
  section.append(header);
  wrapper.append(section);
}
