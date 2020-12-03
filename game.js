//Används för att lagra statet som en singelton
let currentGameState
const startGame = () => {
  //Initialt spelstate
  currentGameState = createGameState()
  currentGameState = setGameRunning(true)
  //spel loop
  requestAnimationFrame(render)
}

/**
 * gameBoard: Representation av spelplanen, varje index motsvarar
 *            ett hål i spelplanen 0 == tom och 1 == mullvad
 * gameTime: Nuvarande speltiden som är kvar i sekunder
 * gamePoints: Antal poäng för nuvarande omgången
 */
const createGameState = () => {
  return {
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    gameTime: 60,
    gamePoints: 0,
    gameRunning: false,
  }
}
/**
 * Kallas när användaren klickar på en ruta
 * Funktionen skall använda incrementPoints och moveMoleDown vid träffad
 * mullvad och därefter returnera statet som dessa skapar
 * @param {number} index som användaren vill slå på
 * @param {object} state Används för att köra tester, väljer man inget
 * så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state-objektet med ändrade värden
 */
const whacMoleAt = (index, state = currentGameState) => {
  return { ...state }
}
/**
 * Ökar spelpoängen(gamePoints) med 1
 * @param {object} state Används för att köra tester, väljer man inget
 * så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state-objektet med ändrade värden
 */
const incrementPoints = (state = currentGameState) => {
  return { ...state }
}
/**
 * Minskar gameTime
 * @param {object} state Används för att köra tester, väljer man inget
 * så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state-objektet med ändrade värden
 */
const decrementTime = (state = currentGameState) => {
  return { ...state }
}
/**
 * Uppdaterar index i gameBoard från 0 till 1
 * @param {number} index att uppdatera
 * @param {object} state Används för att köra tester, väljer man inget
 * så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state-objektet med ändrade värden
 */
const moveMoleUp = (index, state = currentGameState) => {
  return { ...state }
}

/**
 * Uppdaterar index i gameBoard från 1 till 0
 * @param {number} index att uppdatera
 * @param {object} state Används för att köra tester, väljer man inget
 * så blir det singelton statet (currentGameState)
 * @returns {object} Returerar en kopia av state-objektet med ändrade värden
 */
const moveMoleDown = (index, state = currentGameState) => {
  return { ...state }
}

/**
 * Denna del är till för att visa upp gamestate (rör inte)
 */
let lastGameBoard
let columnsDOM
let gamePointsDOM
let gameTimeDOM
const render = () => {
  const { gameRunning, gamePoints, gameTime } = currentGameState
  if (gameRunning) {
    requestAnimationFrame(render)
    if (lastGameBoard !== currentGameState.gameBoard) {
      lastGameBoard = currentGameState.gameBoard
      document.querySelectorAll(".game-column").forEach((column, i) => {
        if (currentGameState.gameBoard[i]) {
          column.classList.add("game-column-marked")
        } else {
          column.classList.remove("game-column-marked")
        }
      })
    }
    gamePointsDOM.innerText = gamePoints
    gameTimeDOM.innerText = gameTime
  }
}

const setGameRunning = (gameRunning) => {
  return { ...currentGameState, gameRunning }
}

const createBoardColumn = (handleClick) => {
  const column = document.createElement("div")
  column.classList.add("game-column")
  column.addEventListener("click", handleClick)
  return column
}

//Default för att visa brädet vid laddning
currentGameState = createGameState()
for (let i = 0; i < currentGameState.gameBoard.length; i++) {
  document
    .querySelector("#gameBoard")
    .append(createBoardColumn(() => {
      currentGameState = whacMoleAt(i)
    }))
}
columnsDOM = document.querySelectorAll(".game-column")
gamePointsDOM = document.querySelector("#gamePoints")
gameTimeDOM = document.querySelector("#gameTime")
document.querySelector("#start-button").addEventListener("click", startGame)
export {
  startGame,
  createGameState,
  whacMoleAt,
  incrementPoints,
  decrementTime,
  moveMoleDown,
  moveMoleUp,
}
