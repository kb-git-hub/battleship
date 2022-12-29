/* eslint-disable max-classes-per-file */
import { PlayerSquare } from './app/game-components/boardSquares/playerSquare.class.js';
import { gameBoardConfig } from './app/game-components/config/gameBoard.config.js';
import GameBoard from './app/game-components/gameboard.class.js';
import { Opponent } from './app/game-components/players/opponent.class.js';

const gameBoard = new GameBoard(gameBoardConfig);
gameBoard.build();
console.dir(gameBoard);

window.addEventListener('keypress', (e) => {
    const {
        players: { player },
    } = gameBoard;
    if (e.key === 'r') {
        if (player.placingShip === 'horizontal') player.placingShip = 'vertical';
        else if (player.placingShip === 'vertical') player.placingShip = 'horizontal';
    }
});
