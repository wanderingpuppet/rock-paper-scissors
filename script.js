function game() {
    // Keep track of the scores
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        // Get player selection and computer selection
        let playerSelection = prompt("Rock Paper Scissors!", "");
        let computerSelection = getComputerChoice();

        // Determine the winner and print out the result
        let winner = playRound(playerSelection, computerSelection);

        // Increment the score of the round winner (if any)
        if (winner === "player") {
            playerScore++;
        } else if (winner === "computer") {
            computerScore++;
        }
    }

    // Print the result of the game
    if (playerScore > computerScore) {
        console.log("You win!");
    } else if (playerScore < computerScore) {
        console.log("You lose!");
    } else {
        console.log("Draw!");
    }
    console.log(`Score: ${playerScore}:${computerScore}`);
}

function playRound(playerSelection, computerSelection) {
    // Capitalize both player and computer selections
    playerSelection = capitalize(playerSelection);
    computerSelection = capitalize(computerSelection);

    // Determine the winner of the round
    let winner = null;
    if (
        playerSelection == "Rock" && computerSelection == "Scissors" ||
        playerSelection == "Paper" && computerSelection == "Rock" ||
        playerSelection == "Scissors" && computerSelection == "Paper"
    ) {
        winner = "player";
    } else if (
        playerSelection == "Rock" && computerSelection == "Paper" ||
        playerSelection == "Paper" && computerSelection == "Scissors" ||
        playerSelection == "Scissors" && computerSelection == "Rock"
    ) {
        winner = "computer";
    }

    // Print the result of the round
    let result;
    switch (winner) {
        case "player":
            result = `You Win! ${playerSelection} beats ${computerSelection}`;
            break;
        case "computer":
            result = `You Lose! ${computerSelection} beats ${playerSelection}`;
            break;
        default:
            result = `Draw! Both choose ${playerSelection}`;
    }
    console.log(result);

    return winner;
}

function getComputerChoice() {
    let randNum = Math.floor(Math.random() * 3);
    switch (randNum) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
}

function capitalize(string) {
    if (!string) return string;
    return string[0].toUpperCase() + string.toLowerCase().slice(1);
}
