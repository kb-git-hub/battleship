import { Theme } from '../config/theme.class.js';
import { Player } from './player.class.js';

class Opponent extends Player {
    constructor({ name, gameBoard, shipYard }) {
        super({ name, gameBoard, shipYard });
        this.totalAttacks = 0;
        this.totalHits = 0;
        this.shipCount = this.shipYard.length;
    }

    generateRandomBoard() {
        const { boardSquareBG } = Theme;

        while (this.shipCount > 0) {
            const ships = this.#generateShipSquareArray();
            ships.forEach((ship) => {
                ship.boardSquareElement.classList.add(boardSquareBG.enemy);
                ship.validForPlacement = false;
            });

            this.shipCount = this.shipYard.length;
        }
    }

    #returnRandomVertHoriz() {
        return Math.floor(Math.random() * 2) === 0 ? 'horizontal' : 'vertical';
    }

    #returnRandomOpponentSquare() {
        const {
            gameBoard: {
                boardCollection: { opponentBoard },
            },
        } = this;
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        return opponentBoard[`${[row, col].join()}`];
    }

    #generateShipSquareArray() {
        const {
            gameBoard,
            gameBoard: {
                boardCollection: { opponentBoard },
            },
        } = this;

        const ship = this.shipYard.pop();
        const { length } = ship;

        while (true) {
            const direction = this.#returnRandomVertHoriz();
            const activeSquare = this.#returnRandomOpponentSquare();
            const { row, col } = activeSquare;

            const shipGroup = [activeSquare];

            for (let i = 1; i < length; i++) {
                if (direction === 'horizontal') {
                    if (col + i <= 9) shipGroup.push(opponentBoard[`${row},${col + i}`]);
                } else if (direction === 'vertical') {
                    if (row - i >= 0) shipGroup.push(opponentBoard[`${row - i},${col}`]);
                }
            }

            if (length === shipGroup.length) {
                const adjacentSquares = this.#generateAdjacentShipSquares(shipGroup, gameBoard);
                const isValid = this.#isPlacementValid(shipGroup, adjacentSquares);
                if (isValid) return shipGroup;
            }
        }
    }

    #generateAdjacentShipSquares(shipSquares, gameBoard) {
        const {
            boardCollection: { opponentBoard },
            players: { player },
        } = gameBoard;
        const { boardSquareBG } = Theme;

        const adjacentSquaresArray = new Set();

        shipSquares.forEach((ship) => {
            const { row, col } = ship;
            adjacentSquaresArray.add(opponentBoard[`${row},${col}`]);
            adjacentSquaresArray.add(opponentBoard[`${row - 1},${col - 1}`]);
            adjacentSquaresArray.add(opponentBoard[`${row - 1},${col}`]);
            adjacentSquaresArray.add(opponentBoard[`${row - 1},${col + 1}`]);
            adjacentSquaresArray.add(opponentBoard[`${row},${col - 1}`]);
            adjacentSquaresArray.add(opponentBoard[`${row},${col + 1}`]);
            adjacentSquaresArray.add(opponentBoard[`${row + 1},${col - 1}`]);
            adjacentSquaresArray.add(opponentBoard[`${row + 1},${col}`]);
            adjacentSquaresArray.add(opponentBoard[`${row + 1},${col + 1}`]);
            adjacentSquaresArray.delete(undefined);
        });

        const array = [...adjacentSquaresArray];
        const filteredArray = array.filter((square) => !shipSquares.includes(square)); // remove ship squares, and return only adjacent squares

        return filteredArray;
    }

    #isPlacementValid(shipSquares, shipAdjacentSquares) {
        for (const ship of shipSquares) {
            if (!ship.validForPlacement) return false;
        }

        for (const ship of shipAdjacentSquares) {
            if (!ship.validForPlacement) return false;
        }
        return true;
    }
}

export { Opponent };
