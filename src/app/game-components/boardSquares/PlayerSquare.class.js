import { generateQueryConstructor } from '../../utils/utils.js';
import { BoardSquare } from './BoardSquare.class.js';
import renderPlayerSquareEvents from './playerSquare-event-methods.js';

class PlayerSquare extends BoardSquare {
    constructor() {
        super({}); // HAVE TO PASS IN AN EMPTY OBJECT HERE. CRAZY
        generateQueryConstructor.call(this, ...arguments);
    }

    render() {
        super.render();
        renderPlayerSquareEvents.call(this);
    }

    resetBGColor() {
        const { boardSquareElement } = this;
        const bgRegex = /^bg/;

        boardSquareElement.classList.forEach((className) => {
            if (bgRegex.test(className)) boardSquareElement.classList.remove(className);
        });
    }
}

export { PlayerSquare };
