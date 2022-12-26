import { generateQueryConstructor } from '../utils/utils.js';
import { BoardSquare } from './boardSquares/boardSquare.class.js';
import { shipConfig } from './config/ship.config.js';
import { Opponent } from './players/opponent.class.js';
import { Player } from './players/player.class.js';
import { Ship } from './ship.class.js';

export default class GameBoard {
    constructor() {
        generateQueryConstructor.call(this, ...arguments);
    }

    build() {
        this.#buildPlayerBoard();
        this.#buildOpponentBoard();

        this.#generatePlayers();
    }

    // #buildHTMLBoardContainer() {} - also have predetermined ship squares to

    ///  generate player boards ///
    #buildPlayerBoard() {
        this.boardCollection.playerBoard = {};
        const boardDims = 3;

        for (let row = 0; row < boardDims; row++) {
            for (let col = 0; col < boardDims; col++) {
                const boardSquare = new BoardSquare({ GameBoard: this, row, col });

                const position = `${row},${col}`; // remove need for getter on boardSquare
                this.boardCollection.playerBoard[position] = boardSquare;
                boardSquare.render();
            }
        }
    }

    #buildOpponentBoard() {
        this.boardCollection.opponentBoard = { ...this.boardCollection.playerBoard };
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
        player.attack();
    }

    /// /////////// Attacks ////////

    receiveAttack() {
        // this should be in the square function, and gameBoard to receive attack
    }
}
