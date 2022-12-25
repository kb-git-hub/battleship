import { generateQueryConstructor, generateRandomShip } from '../utils/utils.js';
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
        this.#buildComputerBoard();

        this.#generatePlayers();

        // this.receiveAttack();
    }

    #buildHTMLBoardContainer() {}

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

    #buildComputerBoard() {
        this.boardCollection.computerBoard = { ...this.boardCollection.playerBoard };
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

    /// place ships on the boards ///

    #placeShip() {
        const { playerBoard } = this;
        // const activeShip = this.#activateShip();
        const activeSquare = playerBoard['0,1'];

        if (!activeSquare.available) return;

        activeSquare.occupiedByShip = activeShip;
        activeSquare.available = false;
        // testing
    }

    /// /////////// Attacks ////////

    receiveAttack() {
        // this should be in the square function, and gameBoard to receive attack
        // should just update some properties in the gameboard
        // const { playerBoard } = this;
        // const activeSquare = playerBoard['0,1'];
        // if (activeSquare.attacked) return;
        // if (!activeSquare.occupiedByShip) {
        //     activeSquare.attacked = true;
        //     return;
        // }
        // if (activeSquare.occupiedByShip) {
        //     const { occupiedByShip: shippp } = activeSquare;
        //     activeSquare.attacked = true;
        //     shippp.hitCount++;
        //     shippp.hitCount++;
        //     shippp.hitCount++;
        // }
    }
}
// if ship on square, update ship hits, and log sqaure has hit
