import { create, el, group, loadHTML } from "./lib.js";
import { db } from "./db.js";
import { handleNav } from "./handleNav.js";
import { showChampionList } from "./championList.js";

// function to show the form for Player names
export const showPlayersForm = async () => {
  // load  HTML-Formu für names
  const playerForm = await loadHTML("./data/names.html");

  // add the form to the HTML
  el("#playersFormWrapper").innerHTML = playerForm;
  el("#playersFormWrapper").className = "show";

  let count = el("#playersCount").value;

  // generate Name input for default Player count
  genereateNameInput(count);
  el("#playersCountWrapper input").addEventListener(
    "input",
    genereateNameInput
  );
};

// function to generate Name inputs based on selected player Count
function genereateNameInput(count) {
  count = count;

  // Options of the Players comletion Order
  const directionOptions = [
    { value: "asc", text: "A-Z" },
    { value: "desc", text: "Z-A" },
  ];

  // check if the input event Listener triggers
  if (this) {
    count = this.value;
  }

  el("#playerNames").innerHTML = "";

  // dynamically genereate the inputs for selected player count
  for (let i = 0; i < count; i++) {
    const label = create("label");
    label.innerText = `Name für Spieler ${i + 1}`;
    label.setAttribute("for", `namePlayer${i}`);

    const inputName = create("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", `namePlayer${i}`);
    inputName.setAttribute("data-db-value", "name");
    inputName.className = "namePlayer";

    const labelDirection = create("label");
    labelDirection.innerText = `Startbuchstabe für Spieler ${i + 1}`;
    labelDirection.setAttribute("for", `directionPlayer`);

    const inputDirection = create("select");
    inputDirection.setAttribute("id", `directionPlayer`);
    inputDirection.setAttribute("data-db-value", `direction`);
    inputDirection.className = "directionPlayer";

    directionOptions.forEach((directionOption) => {
      const optionElement = create("option");
      optionElement.value = directionOption.value;
      optionElement.text = directionOption.text;
      inputDirection.append(optionElement);
    });

    el("#playerNames").append(label, inputName, labelDirection, inputDirection);
  }

  // adding a Button to submit the form
  const sumbitPlayerNames = create("button");
  sumbitPlayerNames.setAttribute("class", "btn");
  sumbitPlayerNames.innerText = "Erstelle Übersichtsseiten";
  sumbitPlayerNames.addEventListener("click", setPlayerDataInDB);

  el("#playerNames").append(sumbitPlayerNames);
}

// function to save the Players Data in DB
const setPlayerDataInDB = () => {
  const playersData = [];
  let allNames = true;
  const allInputField = group("#playerNames input");
  const allDirectionSelects = group("#playerNames select");

  // Check if all inputs filled
  for (let i = 0; i < allInputField.length; i++) {
    if (!allInputField[i].value) {
      allNames = false;
      el("#error").innerText = "Fehler! Gib alle Namen ein!";
      break;
    }
  }

  if (allNames) {
    allInputField.forEach((input, index) => {
      const pId = `player${index}`;
      const inputValue = input.value;

      // adding player Data
      playersData.push({
        id: pId,
        name: inputValue,
        direction: allDirectionSelects[index].value,
      });

      // write players Data into DB
      db.writeItem("players", playersData);
    });

    // adding the complete Buttons for each Player to the HTML
    genereatePlayerSides();

    // updating the Champions List to see the complete Buttons for all Player
    showChampionList("A");

    el("#playersFormWrapper").className = "hide";
    el("#playersFormWrapper").innerHTML = "";
  }
};

// function to generate the complete Buttons for each Player
export const genereatePlayerSides = async () => {
  const allPlayers = await db.readItem("players");

  // check if there are Players in DB
  if (allPlayers) {
    allPlayers.forEach((player) => {
      const h2 = create("h2");
      h2.className = "navPoint";
      h2.innerText = `Abgeschlossen: ${player.name}`;
      h2.setAttribute("data-show-player", player.id);
      h2.addEventListener("click", handleNav);

      el("#navHeader").append(h2);
    });
  }
};
