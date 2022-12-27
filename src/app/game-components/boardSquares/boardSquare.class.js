import { Theme } from '../config/theme.class.js';
import { generateQueryConstructor } from '../../utils/utils.js';

class BoardSquare {
    constructor() {
        generateQueryConstructor.call(this, ...arguments);
    }

    get position() {
        return `[${this.row}-${this.col}]`;
    }

    render() {
        this.#renderHTMLElement();
        this.#renderHTMLStyling();
        this.#renderHTMLAttributes();
        this.#renderBoardSquareStatus();
    }

    #renderHTMLElement() {
        const squareElement = document.createElement('div');
        squareElement.setAttribute('position', this.position);
        this.boardSquareElement = squareElement;
    }

    #renderHTMLStyling() {
        const { boardSquareStyling } = Theme;
        const { boardSquareElement } = this;
        const keys = Object.keys(boardSquareStyling);

        keys.forEach((key) => {
            boardSquareElement.classList.add(`${boardSquareStyling[key]}`);
        });
    }

    #renderHTMLAttributes() {}

    #renderBoardSquareStatus() {
        this.status = 'open'; // hit or miss
        this.occupiedByShip = null;
        this.validPlacement = true;
    }
}

export { BoardSquare };
