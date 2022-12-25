/* eslint-disable max-classes-per-file */
class Player {
    constructor({ name, gameBoard, shipYard }) {
        this.name = name;
        this.gameBoard = gameBoard;
        this.shipYard = shipYard;
        this.totalAttacks = 0;
        this.totalHits = 0;
    }

    placeShip() {}
}

export { Player };
