import { Player } from './player.class.js';

class Opponent extends Player {
    constructor({ name, gameBoard, shipYard }) {
        super({ name, gameBoard, shipYard });
    }
}

export { Opponent };
