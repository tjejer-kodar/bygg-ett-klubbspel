//Används för lagra statet som en singelton
let currentGameState;
let interval;
function startGame() {
  //Initialt spelstate
  currentGameState = createGameState();
  currentGameState = setGameRunning(true);
  clearInterval(interval);
  interval = setInterval(() => {
    currentGameState = decrementTime();
    currentGameState = moveMoleUp(Math.floor(Math.random() * currentGameState.gameBoard.length));
    if(currentGameState.gameTime === 0) {
      interval
    }
  }, 1000);
  //spel loop
  requestAnimationFrame(render);
}

/**
 * gameBoard: Represenation av spelplanen, varje index motsvarar ett hål i spelplanen 0 == tom och 1 == mullvad
 * gameTime: Nuvarande speltiden som är kvar i sekunder
 * gamePoints: Antalet poäng för nuvarande omgången
 */
function createGameState() {
  return {
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    gameTime: 60,
    gamePoints: 0,
    gameRunning: false,
  };
}
/**
 * Kallas när användaren klickar på en ruta
 * Funktionen skall använda incrementPoints och moveMoleDown vid träffad mulvad och därefter returnera statet som dessa skapar
 * @param {number} index som användaren vill slå på
 * @param {object} state Används för att köra tester, väljer man inget så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state objektet med ändrade värden
 */
function whacMoleAt(index, state = currentGameState) {
  //Kolla att det finns en mulvad på detta index
  if(state.gameBoard[index]) {
    return { ...state, ...incrementPoints(moveMoleDown(index, state)) };
  }
  return { ...state }
}
/**
 * Ökar spelpoängen(gamePoints) med 1
 * @param {object} state Används för att köra tester, väljer man inget så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state objektet med ändrade värden
 */
function incrementPoints(state = currentGameState) {
  return { ...state, gamePoints: state.gamePoints + 1 };
}
/**
 * Minskar gameTime
 * @param {object} state Används för att köra tester, väljer man inget så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state objektet med ändrade värden
 */
function decrementTime(state = currentGameState) {
  return { ...state, gameTime: state.gameTime - 1 };
}
/**
 * Uppdaterar index i gameBoard från 0 till 1
 * @param {number} index att uppdatera
 * @param {object} state Används för att köra tester, väljer man inget så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state objektet med ändrade värden
 */
function moveMoleUp(index, state = currentGameState) {
  const gameboardNew = [...state.gameBoard]
  gameboardNew[index] = 1;
  return { ...state, gameBoard: gameboardNew };
}

/**
 * Uppdaterar index i gameBoard från 1 till 0
 * @param {number} index att uppdatera
 * @param {object} state Används för att köra tester, väljer man inget så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state objektet med ändrade värden
 */
function moveMoleDown(index, state = currentGameState) {
  const gameboardNew = [...state.gameBoard]
  gameboardNew[index] = 0;
  return { ...state, gameBoard: gameboardNew };
}

/**
 * Denna del är till för att visa upp gamestate (rör inte)
 */
let lastGameBoard;
let columnsDOM;
let gamePointsDOM;
let gameTimeDOM;
function render() {
  const { gameRunning, gamePoints, gameTime } = currentGameState;
  if (gameRunning) {
    requestAnimationFrame(render);
    if (lastGameBoard !== currentGameState.gameBoard) {
      lastGameBoard = currentGameState.gameBoard;
      document.querySelectorAll(".game-column").forEach((column, i) => {
        if (currentGameState.gameBoard[i]) {
          column.classList.add("game-column-marked");
        } else {
          column.classList.remove("game-column-marked");
        }
      });
    }
    gamePointsDOM.innerText = gamePoints;
    gameTimeDOM.innerText = gameTime;
  }
}

function setGameRunning(gameRunning) {
  return { ...currentGameState, gameRunning };
}

function createBoardColumn(handleClick) {
  const column = document.createElement("div");
  column.classList.add("game-column");
  column.addEventListener("click", handleClick);
  return column;
}

//default to display board on load
currentGameState = createGameState();
for (let i = 0; i < currentGameState.gameBoard.length; i++) {
  document
    .querySelector("#gameBoard")
    .append(createBoardColumn(() => {
      currentGameState = whacMoleAt(i);
    }));
}
columnsDOM = document.querySelectorAll(".game-column");
gamePointsDOM = document.querySelector("#gamePoints");
gameTimeDOM = document.querySelector("#gameTime");
document.querySelector("#start-button").addEventListener("click", startGame);
export {
  startGame,
  createGameState,
  whacMoleAt,
  incrementPoints,
  decrementTime,
  moveMoleDown,
  moveMoleUp,
};
