class Player {
    constructor({ name, gameBoard, shipYard }) {
        this.name = name;
        this.gameBoard = gameBoard;
        this.shipYard = shipYard;
        this.totalAttacks = 0;
        this.totalHits = 0;
        this.placingShip = 'horizontal';
        this.shipCount = this.shipYard.length;
    }

    placeShip() {
        const {
            gameBoard: {
                boardCollection: { playerBoard },
            },
        } = this;

        // return this.shipYard[this.shipYard.length - 1];
        return this.shipYard[this.shipYard.length - 1];
    }

    removeShipFromYard() {
        this.shipYard.pop();
        this.shipCount = this.shipYard.length;
        console.log(this.shipCount);
    }

    attack() {
        //     const {
        //         gameBoard: {
        //             boardCollection: { opponentBoard },
        //         },
        //     } = this;
        //     const activeSquare = opponentBoard['0,1'];
        //     if (activeSquare.status === 'attacked' || activeSquare.status === 'missed') {
        //         return;
        //     }
        //     if (!activeSquare.occupiedByShip) {
        //         activeSquare.status = 'missed';
        //         return;
        //     }
        //     if (activeSquare.occupiedByShip) {
        //         const { occupiedByShip: ship } = activeSquare;
        //         activeSquare.status = 'attacked';
        //     }
    }
}

export { Player };
