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
        this.available = true;
        this.occupiedByShip = null;
        this.attacked = false;
    }

    //
}

export { BoardSquare };
