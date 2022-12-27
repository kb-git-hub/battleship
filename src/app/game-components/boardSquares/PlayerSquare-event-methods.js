import { Theme } from '../config/theme.class.js';

export default function renderPlayerSquareEvents() {
    SquareHoverEvents.call(this);
}

function SquareHoverEvents() {
    const { gameBoard, boardSquareElement } = this;
    const { boardSquareBG } = Theme;

    // this is going to have to be updated for vertical or horizontal at some point
    boardSquareElement.addEventListener('mouseenter', () => {
        const shipSquares = createShipSquaresArray(gameBoard, this);
        const keys = Object.keys(shipSquares);
        keys.forEach((key) => {
            shipSquares[key].forEach((square) => {
                square.boardSquareElement.classList.add(boardSquareBG.valid);
            });
        });
    });

    boardSquareElement.addEventListener('mouseleave', () => {
        const shipSquares = createShipSquaresArray(gameBoard, this);
        const keys = Object.keys(shipSquares);
        keys.forEach((key) => {
            shipSquares[key].forEach((square) => {
                square.resetBGColor();
            });
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
}
