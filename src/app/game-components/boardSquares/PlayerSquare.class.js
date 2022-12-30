import { BoardSquare } from './boardSquare.class.js';
import { generateQueryConstructor } from '../../utils/utils.js';
import { Theme } from '../config/theme.class.js';
import renderPlayerSquareEvents from './PlayerSquare-event-methods.js';

class PlayerSquare extends BoardSquare {
    constructor() {
        super({}); // HAVE TO PASS IN AN EMPTY OBJECT HERE. CRAZY
        generateQueryConstructor.call(this, ...arguments);
    }

    render() {
        super.render();
        this.renderCursor();
        renderPlayerSquareEvents.call(this);
    }

    renderCursor() {
        const { boardSquareElement } = this;
        const { boardSquareCursor } = Theme;
        boardSquareElement.classList.add(boardSquareCursor.player);
    }

    resetBGColor() {
        const { boardSquareElement } = this;
        const bgRegex = /^bg/;

        boardSquareElement.classList.forEach((className) => {
            if (bgRegex.test(className)) boardSquareElement.classList.remove(className);
        });
    }

    resetAllBGColors() {
        const {
            gameBoard: {
                boardCollection: { playerBoard },
            },
        } = this;

        const bgRegex = /^bg/;
        const boardSquares = Object.values(playerBoard);
        boardSquares.forEach((square) => {
            square.boardSquareElement.classList.forEach((className) => {
                if (square.validForPlacement) {
                    if (bgRegex.test(className)) square.boardSquareElement.classList.remove(className);
                }
            });
        });
    }
}

export { PlayerSquare };
