import { showPlayersForm, genereatePlayerSides } from "../modules/playersForm.js"; 
import { showChampionList } from "../modules/championList.js";
import { globals } from "../js/app.js";
import { el } from "./lib.js";
import { db } from "./db.js";

export const initApp = async () => {

// check if Players are in db 
if(await db.readItem("players")) {
    el("#playersFormWrapper").className = "hide";

    // when players in db generate the completet side for each Player
    genereatePlayerSides();
  } else {

    // if not show the form to set them
    showPlayersForm();
  }
  // shows Champions List with Startletter A   
  showChampionList("A");
}

export function serviceWorkerAktiv(){
  // Checkk --- Browser knows ServiceWorker
  
  if("serviceWorker" in navigator){
      navigator.serviceWorker.register("../service-worker.js", {scope: "./"});
  }
}