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
        const ships = this.#generateShipSquareArray();
        console.log(ships);

        ships.shipGroup.forEach((ship) => {
            ship.boardSquareElement.classList.add(boardSquareBG.enemy);
        });
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

    // will need to add placements in there
    #generateShipSquareArray() {
        const {
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

            if (length === shipGroup.length) return { shipGroup, ship, direction };
        }
    }
}

export { Opponent };
