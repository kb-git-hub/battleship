import { attack, receiveAttack } from '../game-components/players/player.attack-methods.js';

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
    const {
        players: { player },
        boardCollection: { opponentBoard },
    } = gameBoard;

    const keys = Object.keys(opponentBoard);
    keys.forEach((key) => {
        opponentBoard[key].boardSquareElement.addEventListener('click', () => {
            if (this.readyToFight) {
                attack.call(player, opponentBoard[key]);
                receiveAttack.call(player);
                this.checkForWinner();
            }
        });
    });
}
