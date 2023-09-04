import { showChampionList } from "./championList.js";
import { showCompletet } from "./completeChampion.js";
import { group } from "./lib.js";

// function to handle Navigation
export function handleNav() {
    // set "passive" class of alle Nav Elements
    group("#navHeader h2").forEach((navPoint) => {
     navPoint.className = "passive";
    });

    // Set Klasse "active" of clicked Nav Element
    this.className = "active";

    // check if the Nav Element has the Attribute "data-show-player"
    if(this.hasAttribute("data-show-player")){
        // if yes show the completet Champion Page of the specific Player 
        showCompletet(this);
    } else {
        // else show the Champions List
        showChampionList();
    }
}
