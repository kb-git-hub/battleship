import { generateQueryConstructor } from '../../utils/utils.js';
import { BoardSquare } from './BoardSquare.class.js';
import renderPlayerSquareEvents from './playerSquare-event-methods.js';

class OpponentSquare extends BoardSquare {
    constructor() {
        super({}); // HAVE TO PASS IN AN EMPTY OBJECT HERE. CRAZY
        generateQueryConstructor.call(this, ...arguments);
    }
}

export { OpponentSquare };
