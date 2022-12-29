function gameInit(gameBoard) {
    addPlayerRotateShipListener(gameBoard);
}

function addPlayerRotateShipListener(gameBoard) {
    console.log(gameBoard);
    window.addEventListener('keypress', (e) => {
        const {
            players: { player },
        } = gameBoard;
        if (e.key === 'r') {
            console.log('activate rotate');
            if (player.placingShip === 'horizontal') player.placingShip = 'vertical';
            else if (player.placingShip === 'vertical') player.placingShip = 'horizontal';
        }
    });
}

export { gameInit };
