import { generateQueryConstructor } from '../utils/utils.js';

class Ship {
    constructor() {
        generateQueryConstructor.call(this, ...arguments);
    }

    hit() {
        this.hitCount += 1;
    }

    isSunk() {
        return this.length === this.hitCount;
    }
}

export { Ship };

/*

One idea here is to determine if you want to have a position array that includes where this item is placed.  
and then hits increases based on if hit position is included in the ships position. 

*/
