import { Theme } from './config/theme.class.js';
import { generateQueryConstructor } from '../utils/utils.js';
import { PlayerSquare } from './boardSquares/playerSquare.class.js';
import { OpponentSquare } from './boardSquares/OpponentSquare.class.js';
import { shipConfig } from './config/ship.config.js';
import { Opponent } from './players/opponent.class.js';
import { Player } from './players/player.class.js';
import { Ship } from './ship.class.js';

export default class GameBoard {
    constructor() {
        generateQueryConstructor.call(this, ...arguments);
    }

    get gameBoardElement() {
        return document.querySelector(this.gameBoardContainerElement);
    }

    build() {
        this.#generatePlayers();

        this.#renderPlayerBoardElements();

        this.populateBoardWithSquares(this.playerBoardElements.playerBoardElement);
        this.populateBoardWithSquares(this.playerBoardElements.opponentBoardElement);
    }

    /// Generate players ///
    #generatePlayers() {
        this.players.player = new Player({
            name: 'Human',
            gameBoard: this,
            shipYard: this.#assignShipsToPlayers(),
        });
        this.players.opponent = new Opponent({
            name: 'Computer',
            gameBoard: this,
            shipYard: this.#assignShipsToPlayers(),
        });
    }

    /// Render PlayerBoards ///
    #renderPlayerBoardElements() {
        this.playerBoardElements = {};
        function renderBoards(divID) {
            const { gameBoardElement } = this;
            const { boardStyling } = Theme;
            const playerBoardElement = document.createElement('div');
            playerBoardElement.setAttribute('id', `${divID}`);
            const keys = Object.keys(boardStyling);
            keys.forEach((key) => {
                playerBoardElement.classList.add(`${boardStyling[key]}`);
            });
            gameBoardElement.append(playerBoardElement);
            this.playerBoardElements[`${divID}Element`] = playerBoardElement;
        }
        renderBoards.call(this, 'playerBoard');
        renderBoards.call(this, 'opponentBoard');
    }

    #buildBoardSquares(divID) {
        this.boardCollection[divID] = {};
        const boardDims = 10;
        let boardSquare;

        for (let row = 0; row < boardDims; row++) {
            for (let col = 0; col < boardDims; col++) {
                if (divID === 'playerBoard') {
                    boardSquare = new PlayerSquare({ gameBoard: this, row, col });
                } else if (divID === 'opponentBoard') {
                    boardSquare = new OpponentSquare({ gameBoard: this, row, col });
                }
                const position = `${row},${col}`;
                this.boardCollection[divID][position] = boardSquare;
                boardSquare.render();
            }
        }
    }

    populateBoardWithSquares(board) {
        const boardID = board.getAttribute('id');
        this.#buildBoardSquares(boardID);

        const boardSquares = Object.keys(this.boardCollection[boardID]);
        boardSquares.forEach((square) => {
            board.append(this.boardCollection[boardID][square].boardSquareElement);
        });
    }

    ///  Assign new Ships to Players ///
    #getShips() {
        const shipYard = new Map();
        shipYard.set(1, ['carrier', 5]);
        shipYard.set(2, ['battleship', 4]);
        shipYard.set(3, ['submarine', 3]);
        shipYard.set(4, ['destroyer', 3]);
        shipYard.set(5, ['patrol boat', 2]);

        function generateRandomShip() {
            const randomShipOrder = [];
            const orderSet = new Set();

            while (orderSet.size < 5) {
                orderSet.add(Math.floor(Math.random() * 5) + 1);
            }
            orderSet.forEach((shipID) => {
                randomShipOrder.push(shipYard.get(shipID));
            });

            return randomShipOrder;
        }
        return generateRandomShip();
    }

    #assignShipsToPlayers() {
        const shipArray = this.#getShips();
        const shipYard = [];

        shipArray.forEach((ship) => {
            const [type, length] = ship;
            shipYard.push(new Ship({ ...shipConfig, type, length, GameBoard: this }));
        });
        return shipYard;
    }

    /// TEST ///
    test() {
        const { player } = this.players;
        player.placeShip();
        // player.attack();
    }

    /// /////////// Attacks ////////

    receiveAttack() {
        // this should be in the square function, and gameBoard to receive attack
    }
}
