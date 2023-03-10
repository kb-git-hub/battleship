import { Theme } from "../config/theme.class.js"

class Player {
  constructor({ name, gameBoard, shipYard }) {
    this.name = name
    this.gameBoard = gameBoard
    this.shipYard = shipYard
    this.totalAttacks = 0
    this.totalHits = 0
    this.placingShip = "horizontal"
    this.shipCount = this.shipYard.length
  }

  placeShip() {
    const {
      gameBoard: {
        boardCollection: { playerBoard },
      },
    } = this

    return this.shipYard[this.shipYard.length - 1]
  }

  removeShipFromYard() {
    this.shipYard.pop()
    this.shipCount = this.shipYard.length
  }
}

export { Player }
