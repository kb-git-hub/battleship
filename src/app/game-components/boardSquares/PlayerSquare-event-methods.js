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
        const shipLength = player.placeShip().length;

        const shipSquares = generateShipSquares(gameBoard, this);
        const adjacentSquares = generateAdjacentShipSquares(shipSquares[`${player.placingShip}Group`], gameBoard);
        const isValid = isPlacementValid(shipSquares[`${player.placingShip}Group`], adjacentSquares, shipLength);

        console.log(isValid);
        adjacentSquares.forEach((square) => {
            square.boardSquareElement.classList.add(boardSquareBG.adjacentInvalid);
        });

        shipSquares[`${player.placingShip}Group`].forEach((square) => {
            square.boardSquareElement.classList.add(boardSquareBG.valid);
        });
    });

    boardSquareElement.addEventListener('mouseleave', () => {
        this.resetAllBGColors();
    });

    // boardSquareElement.addEventListener('mouseleave', () => {
    //     const shipSquares = generateShipPlacementSquares(gameBoard, this);
    //     const keys = Object.keys(shipSquares);
    //     keys.forEach((key) => {
    //         shipSquares[key].forEach((square) => {
    //             square.resetBGColor();
    //         });
    //     });

    //     const shipLength = player.placeShip().length;

    //     const adjacentSquares = verifyAdjacentPlacementSquares(
    //         shipSquares[`${player.placingShip}Group`],
    //         shipLength,
    //         gameBoard
    //     );

    //     adjacentSquares.forEach((square) => {
    //         square.resetBGColor();
    //     });
    // });
}

// Generates the spcific placement Squares of ship
function generateShipSquares(gameBoard, activeSquare) {
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

function generateAdjacentShipSquares(shipSquares, gameBoard) {
    const {
        boardCollection: { playerBoard },
        players: { player },
    } = gameBoard;
    const { boardSquareBG } = Theme;

    const adjacentSquaresArray = new Set();

    shipSquares.forEach((ship) => {
        const { row, col } = ship;
        adjacentSquaresArray.add(playerBoard[`${row},${col}`]);
        adjacentSquaresArray.add(playerBoard[`${row - 1},${col - 1}`]);
        adjacentSquaresArray.add(playerBoard[`${row - 1},${col}`]);
        adjacentSquaresArray.add(playerBoard[`${row - 1},${col + 1}`]);
        adjacentSquaresArray.add(playerBoard[`${row},${col - 1}`]);
        adjacentSquaresArray.add(playerBoard[`${row},${col + 1}`]);
        adjacentSquaresArray.add(playerBoard[`${row + 1},${col - 1}`]);
        adjacentSquaresArray.add(playerBoard[`${row + 1},${col}`]);
        adjacentSquaresArray.add(playerBoard[`${row + 1},${col + 1}`]);
        adjacentSquaresArray.delete(undefined);
    });

    const array = [...adjacentSquaresArray];
    const filteredArray = array.filter((square) => !shipSquares.includes(square)); // remove ship squares, and return only adjacent squares

    return filteredArray;
}

function isPlacementValid(shipSquares, shipAdjacentSquares, shipLength) {
    if (shipSquares.length !== shipLength) return false;

    // check each square for valid placement
    return true;
}

// essentially , if iterate through valid placement arrays, and if any valid placement = false then return false
