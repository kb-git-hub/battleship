import { Theme } from '../game-components/config/theme.class.js';
import gameLoopEventListeners from './gameloop-eventlisteners.js';

class GameLoop {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.playerShipsRemaining = 5;
        this.readyToFight = false;
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
        console.log(this.playerShipsRemaining, this.readyToFight);
    }
}

export { GameLoop };