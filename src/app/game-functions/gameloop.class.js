import { Theme } from '../game-components/config/theme.class.js';

class GameLoop {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
    }

    gameInit() {
        this.addPlayerRotateShipListener(this.gameBoard);
        this.createGameInfoDiv();
        this.updateGameInfoDivText();
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
        const {
            gameBoard: {
                players: {
                    player: { shipCount },
                },
            },
        } = this;

        this.informationDiv.innerText = shipCount;
    }
}
export { GameLoop };
