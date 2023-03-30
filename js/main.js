function getImagePath(value) {
    return `images/dice-six-faces-${value}.png`;
}

class DiceGame {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.rolls = 0;
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    calculateScore(dice1, dice2) {
        if (dice1 === 1 || dice2 === 1) {
            return 0;
        }
        if (dice1 === dice2) {
            return (dice1 + dice2) * 2;
        }
        return dice1 + dice2;
    }

    playRound() {
        if (this.rolls >= 3) {
            this.showError();
            return;
        }

        const playerDice1 = this.rollDice();
        const playerDice2 = this.rollDice();
        const computerDice1 = this.rollDice();
        const computerDice2 = this.rollDice();

        this.playerScore += this.calculateScore(playerDice1, playerDice2);
        this.computerScore += this.calculateScore(computerDice1, computerDice2);

        this.rolls++;

        this.updateDisplay(playerDice1, playerDice2, computerDice1, computerDice2);

        if (this.rolls === 3) {
            this.showResult();
        }
    }

    updateDisplay(playerDice1, playerDice2, computerDice1, computerDice2) {
        const playerRoundScore = this.calculateScore(playerDice1, playerDice2);
        const computerRoundScore = this.calculateScore(computerDice1, computerDice2);

        $(".round").text(this.rolls);

        $("#player-score").text(this.playerScore);
        $("#computer-score").text(this.computerScore);

        $("#player-round-score").text(playerRoundScore);
        $("#computer-round-score").text(computerRoundScore);

        $("#player-rolled-dice").text(`${playerDice1}, ${playerDice2}`);
        $("#computer-rolled-dice").text(`${computerDice1}, ${computerDice2}`);
        $(".dice").fadeOut(200, () => {
            $("#player-dice-1").attr("src", getImagePath(playerDice1));
            $("#player-dice-2").attr("src", getImagePath(playerDice2));
            $("#computer-dice-1").attr("src", getImagePath(computerDice1));
            $("#computer-dice-2").attr("src", getImagePath(computerDice2));
            $(".dice").fadeIn(200);
        });
    }

    showResult() {
        const message = this.playerScore > this.computerScore
            ? "You win!"
            : this.playerScore === this.computerScore
                ? "It's a tie!"
                : "Computer wins!";
        $("#message").text(message).addClass("fade-in").removeClass("hidden");
    }

    showError() {
        $("#message").text("Please reset game before rolling the dice again.");
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.rolls = 0;
        $(".round").text("");

        $("#player-score").text(0);
        $("#computer-score").text(0);

        $("#player-round-score").text("");
        $("#computer-round-score").text("");

        $("#player-rolled-dice").text("");
        $("#computer-rolled-dice").text("");

        $("#message").text("").removeClass("fade-in").addClass("hidden");

        $(".dice").fadeOut(200, () => {
            $("#player-dice-1").attr("src", getImagePath(0));
            $("#player-dice-2").attr("src", getImagePath(0));
            $("#computer-dice-1").attr("src", getImagePath(0));
            $("#computer-dice-2").attr("src", getImagePath(0));
            $(".dice").fadeIn(200);
        });
    }

}

const game = new DiceGame();

$("#roll-button").on("click", () => {
    game.playRound();
});

$("#reset-button").on("click", () => {
    game.resetGame();
});