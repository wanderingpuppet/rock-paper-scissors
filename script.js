const playerScoreDiv = document.querySelector(".score.player");
const computerScoreDiv = document.querySelector(".score.computer");
const gameResult = document.querySelector(".game-result");

const playerSelectionDiv = document.querySelector(".hand.player");
const computerSelectionDiv = document.querySelector(".hand.computer");
const handComparison = document.querySelector(".hand-comparison");

const actions = document.querySelectorAll(".action");
const selections = document.querySelectorAll(".selection");
const restartButton = document.querySelector(".restart");

let playerScore = 0;
let computerScore = 0;

// activateAction() must be assigned BEFORE other "click" event listeners
actions.forEach(action => {
    action.addEventListener("click", activateAction);
    action.addEventListener("transitionend", deactivateAction);
});

selections.forEach(selection => selection.addEventListener("click", makeSelection));
restartButton.addEventListener("click", restartGame);


function makeSelection() {
    if (this.classList.contains("disabled")) return;

    const playerSelection = this.dataset.selection;
    const computerSelection = getComputerChoice();
    const winner = getRoundWinner(playerSelection, computerSelection);

    updateScore(winner);
    updateRoundResult(winner, playerSelection, computerSelection);

    // The game will end if any player scored 5 points
    if (playerScore === 5 || computerScore === 5) {
        endGame();
    }
}

function updateScore(winner) {
    if (winner === "player") {
        playerScore++;
        playerScoreDiv.textContent = playerScore;
    } else if (winner === "computer") {
        computerScore++;
        computerScoreDiv.textContent = computerScore;
    }
}

function updateRoundResult(winner, playerSelection, computerSelection) {
    // Update the player and computer selection images
    const playerSelectionImg = createSelectionImg(playerSelection);
    const computerSelectionImg = createSelectionImg(computerSelection);

    playerSelectionDiv.innerHTML = "";
    computerSelectionDiv.innerHTML = "";
    playerSelectionDiv.appendChild(playerSelectionImg);
    computerSelectionDiv.appendChild(computerSelectionImg);

    // Update the hand comparison character
    let handComparisonChar;
    switch (winner) {
        case "player":
            handComparisonChar = ">";
            break;
        case "computer":
            handComparisonChar = "<";
            break;
        default:
            handComparisonChar = "=";
    }
    handComparison.textContent = handComparisonChar;
}

function endGame() {
    // Show the game result
    if (playerScore > computerScore) {
        gameResult.textContent = "You Won!";
    } else {
        gameResult.textContent = "You Lost...";
    }
    gameResult.classList.remove("collapsed");

    selections.forEach(selection => selection.classList.add("disabled"));
    restartButton.classList.remove("disabled");
}

function restartGame() {
    if (this.classList.contains("disabled")) return;

    // Reset all game stats
    playerScore = 0;
    computerScore = 0;

    // Reset all game elements
    playerScoreDiv.textContent = 0;
    computerScoreDiv.textContent = 0;

    gameResult.textContent = "";
    gameResult.classList.add("collapsed");

    playerSelectionDiv.innerHTML = "";
    computerSelectionDiv.innerHTML = "";
    handComparison.textContent = "=";

    selections.forEach(selection => selection.classList.remove("disabled"));
    restartButton.classList.add("disabled");
}

function createSelectionImg(selection) {
    const selectionImg = document.createElement("img");
    selectionImg.src = `images/${selection}.png`;
    selectionImg.draggable = false;
    return selectionImg;
}

function activateAction() {
    if (this.classList.contains("disabled")) return;
    this.classList.add("activated");
}

function deactivateAction() {
    this.classList.remove("activated");
}

function getRoundWinner(playerSelection, computerSelection) {
    let winner = null;

    if (
        playerSelection == "rock" && computerSelection == "scissors" ||
        playerSelection == "paper" && computerSelection == "rock" ||
        playerSelection == "scissors" && computerSelection == "paper"
    ) {
        winner = "player";
    } else if (
        playerSelection == "rock" && computerSelection == "paper" ||
        playerSelection == "paper" && computerSelection == "scissors" ||
        playerSelection == "scissors" && computerSelection == "rock"
    ) {
        winner = "computer";
    }

    return winner;
}

function getComputerChoice() {
    let randNum = Math.floor(Math.random() * 3);
    switch (randNum) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}
