import { Theme } from '../game-components/config/theme.class.js';
import gameLoopEventListeners from './gameloop-eventlisteners.js';
import { gameBoardConfig } from '../game-components/config/gameBoard.config.js';
import GameBoard from '../game-components/gameboard.class.js';

class GameLoop {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.playerShipsRemaining = 5;
        this.readyToFight = true;
        this.playerScore = 0;
        this.opponentScore = 0;
    }

    gameInit() {
        this.addPlayerRotateShipListener(this.gameBoard);
        this.createGameInfoDiv();
        this.updateGameInfoDivText();
        gameLoopEventListeners.call(this);
    }

    addPlayerRotateShipListener() {
        window.addEventListener('keypress', (e) => {
            const { gameBoard } = this;
            const {
                players: { player },
            } = gameBoard;
            if (e.key === 'r') {
                if (player.placingShip === 'horizontal') player.placingShip = 'vertical';
                else if (player.placingShip === 'vertical') player.placingShip = 'horizontal';
            }
        });
    }

    createGameInfoDiv() {
        const { infoDiv } = Theme;
        const keys = Object.keys(infoDiv);

        const containerElement = document.querySelector(this.gameBoard.gameBoardContainerElement);
        const { opponentBoardElement } = this.gameBoard.playerBoardElements;

        const informationDiv = document.createElement('div');

        keys.forEach((key) => {
            informationDiv.classList.add(`${infoDiv[key]}`);
        });

        containerElement.insertBefore(informationDiv, opponentBoardElement);

        this.informationDiv = informationDiv;
    }

    updateGameInfoDivText() {
        this.informationDiv.innerText = '';

        if (this.playerShipsRemaining > 0) {
            const directions = document.createElement('div');
            const rotateText = document.createElement('div');
            const shipsRemaining = document.createElement('div');

            directions.innerText = 'Place ships on the left board';
            rotateText.innerText = `Press 'R' to rotate ship`;
            shipsRemaining.innerText = `Ships remaining: ${this.playerShipsRemaining}`;
            this.informationDiv.append(directions, rotateText, shipsRemaining);
        } else {
            this.informationDiv.innerText = `Click opponent's board to attack!`;
        }
    }

    checkReadyToFight() {
        if (this.playerShipsRemaining === 0) this.readyToFight = true;
    }

    checkForWinner() {
        const {
            gameBoard: {
                players: { player, opponent },
            },
        } = this;

        if (player.totalHits === 1) this.updateWinnerText('Player');
        else if (opponent.totalHits === 17) this.updateWinnerText('Opponent');
    }

    updateWinnerText(winner) {
        this.freezeBoards();
        const { playAgainButton } = Theme;
        this.informationDiv.innerText = '';
        const winnerText = document.createElement('div');
        const playAgain = document.createElement('div');

        playAgain.innerText = `Play again?`;

        const keys = Object.keys(playAgainButton);
        keys.forEach((key) => {
            playAgain.classList.add(`${playAgainButton[key]}`);
        });

        if (winner === 'Player') winnerText.innerText = `YOU WIN!`;
        else if (winner === 'Opponent') winnerText.innerText = `YOU LOSE!`;
        this.informationDiv.append(winnerText, playAgain);
    }

    freezeBoards() {
        const {
            gameBoard: { playerBoardElements },
        } = this;

        const keys = Object.keys(playerBoardElements);
        keys.forEach((key) => {
            playerBoardElements[key].classList.add('pointer-events-none');
        });
    }
}

function newGame() {
    const gameBoard = new GameBoard(gameBoardConfig);
    gameBoard.build();
    console.dir(gameBoard);

    const gameLoop = new GameLoop(gameBoard);
    gameLoop.gameInit();
}

export { GameLoop, newGame };
