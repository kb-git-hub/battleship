import { BoardSquare } from './boardSquare.class.js';
import { generateQueryConstructor } from '../../utils/utils.js';
import { Theme } from '../config/theme.class.js';

class OpponentSquare extends BoardSquare {
    constructor() {
        super({}); // HAVE TO PASS IN AN EMPTY OBJECT HERE. CRAZY
        generateQueryConstructor.call(this, ...arguments);
    }

    render() {
        super.render();
        this.renderCursor();
    }

    renderCursor() {
        const { boardSquareElement } = this;
        const { boardSquareCursor } = Theme;
        boardSquareElement.classList.add(boardSquareCursor.enemy);
    }
}

export { OpponentSquare };
