import { Theme } from '../config/theme.class.js';

export default function renderPlayerSquareEvents() {
    SquareHoverEvents.call(this);
}

function SquareHoverEvents() {
    const { gameBoard, boardSquareElement } = this;
    const { boardSquareBG } = Theme;
    const {
        players: { player },
    } = gameBoard;

    boardSquareElement.addEventListener('mouseenter', () => {
        const shipSquares = generateShipPlacementSquares(gameBoard, this);
        shipSquares[`${player.placingShip}Group`].forEach((square) => {
            square.boardSquareElement.classList.add(boardSquareBG.valid);
        });
    });

    // on Mouse Leave - will reset colors ( will also need a valid placed)
    boardSquareElement.addEventListener('mouseleave', () => {
        const shipSquares = generateShipPlacementSquares(gameBoard, this);
        console.log(shipSquares);
        const keys = Object.keys(shipSquares);
        keys.forEach((key) => {
            shipSquares[key].forEach((square) => {
                square.resetBGColor();
            });
        });
    });
}

// Generates the spcific placement Squares of ship
function generateShipPlacementSquares(gameBoard, activeSquare) {
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

function verifySurroundPlacementSquares() {}

function dontAllowDrop() {}

// essentially , if iterate through valid placement arrays, and if any valid placement = false then return false
