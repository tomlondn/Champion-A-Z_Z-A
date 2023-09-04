import { globals } from "../js/app.js";
import { db } from "./db.js";
import { create, el } from "./lib.js";
import { initPagination } from "./pagination.js";
import { openCompleteForm } from "./completeChampion.js";

export const showChampionList = () => {
  const allChamps = globals.allChamps;
  el("#allChampions").innerHTML = "";
  
  // filter Champions to show on aktive Letter
  generateChampionList(Object.values(allChamps.data)
    .filter((champ) => champ.name.startsWith(globals.activeLetter)));

  // init pagination 
  initPagination();
}

// generate HTML output of the filtered Champions
const generateChampionList = (filteredChamps) => {
  filteredChamps.forEach(champ => {
    const wrapper = create("div");
    wrapper.className = "oneChamp";
    const name = create("h2");
    name.className = "championName";
    name.innerText = champ.name;
    const champImg = new Image();
    champImg.src = `${globals.championImgPath}${champ.id}_0.jpg`;
    champImg.alt = `${champ.id}_0.jpg`;

    // load img of Champion
    champImg.onload = function() {
      wrapper.append(name, champImg);
      generateCompletetButtons(wrapper, champ.name);
    };
    
    // add HTML of the Champions to the Wrapper
    el("#championsWrapper #allChampions").append(wrapper);
  });
}

// dynamic generate complete Buttons for all Players
export const generateCompletetButtons = async (wrapper, champion) => {
  const players = await db.readItem("players");
  const completetChampions = await db.readItem("completetChampions");

  // check if players are in DB
  if(players) {
    const div = create("div");
    div.setAttribute("id", "allPlayers");

    // generate the HTML for the Button for each Player
    players.forEach((player) => {
      const span = create("span");
      span.innerHTML = `Abschließen </br> für ${player.name}`;
      span.setAttribute("data-champion", champion);
      span.setAttribute("data-player", player.id);
      span.setAttribute("data-player-name", player.name);
      span.addEventListener("click", openCompleteForm);

      // check if Champion are already completet from specific Player and Change the complete Button
      if(completetChampions) {
        completetChampions.forEach((completetChampion)  => {
          if((completetChampion.champ === champion) && (completetChampion.player === player.id)) {
            span.innerHTML = `Abgeschlossen </br> ${player.name} ${completetChampion.trys}X`;
            span.className = "completet";
            span.removeEventListener("click", openCompleteForm);
          }
        });
      }

      div.append(span);
    });

    wrapper.append(div);

    // check if there are already completet Champs in the db, if not init them with an empty array
    if(!(await db.readItem("completetChampions"))) {
      db.writeItem("completetChampions", []);
    }
  }
}
