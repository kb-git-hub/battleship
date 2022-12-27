import { Theme } from '../config/theme.class.js';

export default function renderPlayerSquareEvents() {
    generateActiveShipSquares.call(this);
}

function generateActiveShipSquares() {
    const { gameBoard, boardSquareElement } = this;
    const { boardSquareBG } = Theme;
    boardSquareElement.addEventListener('mouseenter', () => {
        const { horizontalGroup, verticalGroup } = createShipSquaresArray(gameBoard, this);
        horizontalGroup.forEach((square) => {
            square.boardSquareElement.classList.add(boardSquareBG.valid);
        });
        verticalGroup.forEach((square) => {
            square.boardSquareElement.classList.add(boardSquareBG.valid);
        });
    });
    boardSquareElement.addEventListener('mouseleave', () => {
        const { horizontalGroup, verticalGroup } = createShipSquaresArray(gameBoard, this);
        horizontalGroup.forEach((square) => {
            square.resetBGColor();
        });
        verticalGroup.forEach((square) => {
            square.resetBGColor();
        });
    });
}

function createShipSquaresArray(gameBoard, activeSquare) {
    const {
        boardCollection: { playerBoard },
        players: { player },
    } = gameBoard;

    const verticalGroup = [activeSquare];
    const horizontalGroup = [activeSquare];

    const { row, col } = activeSquare;

    const activeShip = player.placeShip();
    const { length } = activeShip;

    for (let i = 1; i < length; i++) {
        if (row - i >= 0) verticalGroup.push(playerBoard[`${row - i},${col}`]);
        if (col + i <= 9) horizontalGroup.push(playerBoard[`${row},${col + i}`]);
    }

    return { verticalGroup, horizontalGroup };

    // const activeShip = player.placeShip();
    // console.log(activeShip);
    // const { length } = activeShip;
    // console.log(typeof activeShip);
    // console.log(length);
}
