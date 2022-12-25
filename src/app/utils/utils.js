function generateQueryConstructor(query) {
    const keys = Object.keys(query);
    keys.forEach((key) => {
        this[key] = query[key];
    });
}

const shipYard = new Map();
shipYard.set(1, ['carrier', 5]);
shipYard.set(2, ['battleship', 4]);
shipYard.set(3, ['submarine', 3]);
shipYard.set(4, ['destroyer', 3]);
shipYard.set(5, ['patrol boat', 2]);

function generateRandomShip() {
    const randomShipOrder = [];
    const orderSet = new Set();

    while (orderSet.size < 5) {
        orderSet.add(Math.floor(Math.random() * 5) + 1);
    }
    orderSet.forEach((shipID) => {
        randomShipOrder.push(shipYard.get(shipID));
    });

    return randomShipOrder;
}

export { generateQueryConstructor, generateRandomShip };
