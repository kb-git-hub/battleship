/* eslint-disable max-classes-per-file */
import { gameBoardConfig } from './app/game-components/config/gameBoard.config.js';
import GameBoard from './app/game-components/gameboard.class.js';
import { GameLoop } from './app/game-functions/gameloop.class.js';

const gameBoard = new GameBoard(gameBoardConfig);
gameBoard.build();
console.dir(gameBoard);

const gameLoop = new GameLoop(gameBoard);
gameLoop.gameInit();
