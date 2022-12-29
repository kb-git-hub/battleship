export default function gameLoopEventListeners() {
    playerSquareListeners.call(this);
    OpponentSquareListeners.call(this);
}

function playerSquareListeners() {
    const { gameBoard } = this;
    const {
        boardCollection: { playerBoard },
    } = gameBoard;

    const keys = Object.keys(playerBoard);
    keys.forEach((key) => {
        playerBoard[key].boardSquareElement.addEventListener('click', () => {
            this.playerShipsRemaining = gameBoard.players.player.shipCount;
            this.updateGameInfoDivText();
            this.checkReadyToFight();
        });
    });
}

function OpponentSquareListeners() {
    const { gameBoard } = this;
}
