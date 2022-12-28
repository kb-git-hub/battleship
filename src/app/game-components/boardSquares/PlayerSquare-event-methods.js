import { Theme } from '../config/theme.class.js';

export default function renderPlayerSquareEvents() {
    squareHoverEvents.call(this);
    squarePlacementClickEvents.call(this);
}

function squareHoverEvents() {
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

        adjacentSquares.forEach((square) => {
            if (!square.occupiedByShip) square.boardSquareElement.classList.add(boardSquareBG.adjacent);
        });

        shipSquares[`${player.placingShip}Group`].forEach((square) => {
            if (!square.occupiedByShip) {
                if (isValid) square.boardSquareElement.classList.add(boardSquareBG.valid);
                else square.boardSquareElement.classList.add(boardSquareBG.invalid);
            }
        });
    });

    boardSquareElement.addEventListener('mouseleave', () => {
        this.resetAllBGColors();
    });
}

// adjacent sqaures validForPlacement = false , shipsquares, validForPlacement = false, and occupied ship, shipY
function squarePlacementClickEvents() {
    const { gameBoard, boardSquareElement } = this;
    const { boardSquareBG } = Theme;
    const {
        players: { player },
    } = gameBoard;

    const shipLength = player.placeShip().length;
    boardSquareElement.addEventListener('click', () => {
        const shipSquares = generateShipSquares(gameBoard, this);
        const adjacentSquares = generateAdjacentShipSquares(shipSquares[`${player.placingShip}Group`], gameBoard);
        const isValid = isPlacementValid(shipSquares[`${player.placingShip}Group`], adjacentSquares, shipLength);

        if (!isValid) return;

        // adjacentSquares.forEach((square) => {
        //     square.validForPlacement = false;
        // });

        shipSquares[`${player.placingShip}Group`].forEach((square) => {
            square.validForPlacement = false;
            square.occupiedByShip = player.placeShip();
            square.resetBGColor();
            square.boardSquareElement.classList.add(boardSquareBG.ship);
        });

        console.log(this);
    });
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

    for (const ship of shipSquares) {
        if (!ship.validForPlacement) return false;
    }

    for (const ship of shipAdjacentSquares) {
        if (!ship.validForPlacement) return false;
    }

    // check each square for valid placement
    return true;
}

// essentially , if iterate through valid placement arrays, and if any valid placement = false then return false
