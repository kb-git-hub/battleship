import { generateQueryConstructor } from '../../utils/utils.js';
import { Theme } from '../config/theme.class.js';

class BoardSquare {
    constructor() {
        generateQueryConstructor.call(this, ...arguments);
    }

    get position() {
        return `[${this.row}-${this.col}]`;
    }

    render() {
        this.#renderHTMLElement();
        this.renderHTMLStyling();
        this.#renderBoardSquareStatus();
    }

    #renderHTMLElement() {
        const squareElement = document.createElement('div');
        squareElement.setAttribute('position', this.position);
        this.boardSquareElement = squareElement;
    }

    renderHTMLStyling() {
        const { boardSquareStyling } = Theme;
        const { boardSquareElement } = this;
        const keys = Object.keys(boardSquareStyling);

        keys.forEach((key) => {
            boardSquareElement.classList.add(`${boardSquareStyling[key]}`);
        });
    }

    #renderBoardSquareStatus() {
        this.attackedStatus = 'open'; // hit or miss
        this.occupiedByShip = null;
        this.validForPlacement = true;
    }
}

export { BoardSquare };
