import {
  startGame,
  createGameState,
  whacMoleAt,
  incrementPoints,
  decrementTime,
  moveMoleDown,
  moveMoleUp,
} from "../game.js";

/**
 * This file is validating game functions
 */

function displayErrors(errorMessages) {
  document.getElementById("success").style.display = "none";
  document.getElementById("fail").style.display = "block";

  const failUl = document.getElementById("fail-ul");
  failUl.style.display = "block";
  failUl.innerHTML = "";
  errorMessages.forEach((errorMessage) => {
    const li = document.createElement("li");
    li.innerHTML = errorMessage;
    failUl.appendChild(li);
  });
}

function displaySuccess() {
  var failUl = document.getElementById("fail-ul");
  failUl.innerHTML = "";
  document.getElementById("fail").style.display = "none";
  document.getElementById("success").style.display = "block";
}

export function validate() {
  let errorMessages = [];
  let skip = false;
  let initialGameState = createGameState();
  if (!skip && initialGameState.gameBoard.reduce((a, v) => a + v) !== 0) {
    errorMessages.push(
      '<span class="error-span">Funktionen currentGameState ger inte tillbaka en nollställd gameBoard</span>'
    );
    skip = true;
  }

  if (
    !skip &&
    moveMoleDown(2, {
      ...initialGameState,
      gameBoard: [0, 0, 1, 0, 0, 0, 0, 0, 0],
    }).gameBoard[2] !== 0
  ) {
    errorMessages.push(
      '<span class="error-span">Funktion moveMoleDown sätter inte index 2 till 0 på gameBoard</span>'
    );
  }
  if (
    !skip &&
    moveMoleUp(8, {
      ...initialGameState,
      gameBoard: [1, 1, 1, 1, 1, 1, 1, 1, 0],
    }).gameBoard[8] !== 1
  ) {
    errorMessages.push(
      '<span class="error-span">Funktion moveMoleUp sätter inte index 8 till 1 på gameBoard</span>'
    );
  }

  const points = incrementPoints(incrementPoints(initialGameState)).gamePoints;
  if (!skip && points !== 2) {
    errorMessages.push(
      `<span class="error-span">Funktion incrementPoints ökar inte poängen korrekt, förväntat 2 poäng vid 2 exekveringar men fick ${points}</span>`
    );
  }

  if (
    !skip &&
    decrementTime(decrementTime(initialGameState)).gameTime >=
      decrementTime(initialGameState).gameTime
  ) {
    errorMessages.push(
      `<span class="error-span">Funktion decrementTime minskar inte gameTime när man kallar på den</span>`
    );
  }
  const hitState = whacMoleAt(2, moveMoleUp(2, initialGameState));
  if ((!skip && hitState.gamePoints !== 1) || hitState.gameBoard[2] !== 0) {
    errorMessages.push(
      `<span class="error-span">Funktion whacMoleAt returerar inte statet av 1 träffad mulvad (1 poäng och värdet 0 på träffat index) </span>`
    );
  }

  if (errorMessages.length > 0) {
    displayErrors(errorMessages);
  } else {
    displaySuccess();
  }
}
document.getElementById("test-button").onclick = validate;
