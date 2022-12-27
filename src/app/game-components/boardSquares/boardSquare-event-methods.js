import { Theme } from '../config/theme.class.js';

export default function renderBoardSquareEvents() {
    generateActiveShipSquares.call(this);
}

function generateActiveShipSquares() {
    const { gameBoard, boardSquareElement } = this;
    const { boardSquareBG } = Theme;
    boardSquareElement.addEventListener('mouseenter', () => {
        // boardSquareElement.classList.add(boardSquareBG.valid);
        const { horizontalGroup, verticalGroup } = createShipSquaresArray(gameBoard, this);
        horizontalGroup.forEach((square) => {
            square.boardSquareElement.classList.add(boardSquareBG.valid);
        });
    });
    boardSquareElement.addEventListener('mouseleave', () => {
        this.resetBGColor();
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
        verticalGroup.push(playerBoard[`${row - i},${col}`]);
        horizontalGroup.push(playerBoard[`${row},${col + 1}`]);
    }

    return { verticalGroup, horizontalGroup };

    // const activeShip = player.placeShip();
    // console.log(activeShip);
    // const { length } = activeShip;
    // console.log(typeof activeShip);
    // console.log(length);
}
