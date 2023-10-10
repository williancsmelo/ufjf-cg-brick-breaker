import { Brick } from './Brick.js'
import { specialBrickColor } from './config/constants.js'

/**
  *  Escolhe uma cor para o tijolo
  *  @param {Number} id Identificador da cor:
  * 0. 'white' [DEFAULT]
  * 1. 'gray',
  * 2. 'red',
  * 3. 'yellow',
  * 4. 'orange',
  * 5. 'pink',
  * 6. 'palegreen'
  *  @return {Boolean} Retorna a cor de acordo com o identificador
*/
const getColor = id =>
  ({
    1: 'gray',
    2: 'red',
    3: 'yellow',
    4: 'orange',
    5: 'pink',
    6: 'palegreen'
  }[id] || 'white')


const nColumns = 8
const nRows = 6

export const createBricks = (plane, level) => {
  const borderLeft = -50
  const borderTop = 100
  const topOffset = 10
  const leftOffset = 5
  const brickWidth = (100 - leftOffset * 2) / nColumns
  const bricks = [...Array(nRows)].map((_, row) => {
    return [...Array(nColumns)].map((_, column) => {
      const x = borderLeft + brickWidth / 2 + column * brickWidth + leftOffset
      const y = borderTop - topOffset - row * Brick.height - Brick.height / 2
      const colorId = level === 2 ? row + 1 : Math.floor(Math.random() * 6) + 1; // Verifica o nivel do jogo para a criação dos tijolos
      const color = getColor(colorId);
      let brickType = color === specialBrickColor ? 'special' : 'normal' // Verifica se bloco deve ser normal ou especial
      const brick = new Brick(plane, color, brickWidth, x, y, brickType)
      return brick
    })
  })
  return bricks
}
