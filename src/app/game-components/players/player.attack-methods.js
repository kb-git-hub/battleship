import { Theme } from '../config/theme.class.js';

function attack(square) {
    const { boardSquareBG } = Theme;
    const { boardSquareElement } = square;

    if (square.attackedStatus !== 'open') return;
    this.totalAttacks++;

    if (square.occupiedByShip) {
        this.totalHits++;
        square.resetBGColor();
        boardSquareElement.classList.add(boardSquareBG.attackHit);
        square.attackedStatus = 'hit';
    }

    if (!square.occupiedByShip) {
        square.resetBGColor();
        boardSquareElement.classList.add(boardSquareBG.attackMiss);
        square.attackedStatus = 'miss';
    }
}

function receiveAttack() {
    console.log('attacked Received');
}

export { attack, receiveAttack };
