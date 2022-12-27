import { PlayerSquare } from './app/game-components/boardSquares/playerSquare.class.js';
import { gameBoardConfig } from './app/game-components/config/gameBoard.config.js';
import GameBoard from './app/game-components/gameboard.class.js';

const gameBoard = new GameBoard(gameBoardConfig);
gameBoard.build();
gameBoard.test();
console.dir(gameBoard);
