import { el, loadJSON } from "../modules/lib.js";
import { handleNav } from "../modules/handleNav.js";
import { addButton } from "../modules/install.js";
import { initApp, serviceWorkerAktiv } from "../modules/main.js";

// setting a globals Objekt to have acces all over the script
export const globals =  {
    activeLetter : "A",
    championImgPath : "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/",
    allChamps: await (loadJSON("https://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json")),
}

// init App
initApp();

// handle Navigation of the App
el("#showAllChampions").addEventListener("click", handleNav);

serviceWorkerAktiv();

// handle the Install Button for the App
addButton();

el("#test").addEventListener("click", test);












