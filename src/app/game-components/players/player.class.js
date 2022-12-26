class Player {
    constructor({ name, gameBoard, shipYard }) {
        this.name = name;
        this.gameBoard = gameBoard;
        this.shipYard = shipYard;
        this.totalAttacks = 0;
        this.totalHits = 0;
    }

    placeShip() {
        const {
            gameBoard: {
                boardCollection: { playerBoard, opponentBoard },
            },
        } = this;

        const activeSquare = opponentBoard['0,1'];
        const activeShip = this.shipYard.pop();
        if (!activeSquare.occupiedByShip) {
            activeSquare.occupiedByShip = activeShip;
        }
    }

    determineValidSquares() {}

    attack() {
        const {
            gameBoard: {
                boardCollection: { opponentBoard },
            },
        } = this;

        const activeSquare = opponentBoard['0,1'];
        if (activeSquare.status === 'attacked' || activeSquare.status === 'missed') {
            return;
        }
        if (!activeSquare.occupiedByShip) {
            activeSquare.status = 'missed';
            return;
        }
        if (activeSquare.occupiedByShip) {
            const { occupiedByShip: ship } = activeSquare;
            activeSquare.status = 'attacked';
        }
    }
}

export { Player };
