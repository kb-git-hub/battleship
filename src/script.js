/* eslint-disable max-classes-per-file */
import { gameBoardConfig } from './app/game-components/config/gameBoard.config.js';
import GameBoard from './app/game-components/gameboard.class.js';
import { gameInit } from './app/game-functions/gameloop.js';

const gameBoard = new GameBoard(gameBoardConfig);
gameBoard.build();
console.dir(gameBoard);

gameInit(gameBoard);
