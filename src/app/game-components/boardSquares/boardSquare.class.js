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
        // renderBoardSquareEvents.call(this);
    }

    #renderHTMLElement() {}

    #renderHTMLStyling() {}

    #renderHTMLAttributes() {}

    #renderBoardSquareStatus() {
        this.status = 'open'; // hit or miss
        this.occupiedByShip = null;
        this.validPlacement = true;
    }

    //
}

export { BoardSquare };
