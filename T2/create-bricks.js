import { Brick } from "./Brick.js";
import { specialBrickColor } from "./config/constants.js";

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


const nColumnsLevel1 = 8
const nColumnsLevel2 = 9

const nRowsLevel1 = 1
const nRowsLevel2 = 8;

export const createBricks = (plane, level = 1) => {
  const borderLeft = -50
  const borderTop = 100
  const topOffset = 30
  const leftOffset = 5
  const nRows = level === 1 ? nRowsLevel1 : nRowsLevel2
  const nColumns = level === 1 ? nColumnsLevel1 : nColumnsLevel2;
  const brickWidth = (100 - leftOffset * 2) / nColumns
  const columnBreak = Math.floor(nColumns / 2);

  let grayColorRow = (nColumns - 1)
  let grayColorColumn = 0

  const bricks = [...Array(nRows)].map((_, row) => {
    return [...Array(nColumns)].map((_, column) => {
      if (level === 2 && column === columnBreak) return;

      const x = borderLeft + brickWidth / 2 + column * brickWidth + leftOffset
      const y = borderTop - topOffset - row * Brick.height - Brick.height / 2
      let colorId = level === 1 ? row + 1 : Math.floor(Math.random() * 6) + 1; // Verifica o nivel do jogo para a criação dos tijolos

      if (level === 2 && column === grayColorColumn && row === grayColorRow) {
        grayColorColumn--
        grayColorRow++
        colorId = 1 // Gray color
      }

      let color = getColor(colorId);



      let brickType = color === specialBrickColor ? 'special' : 'normal' // Verifica se bloco deve ser normal ou especial
      const brick = new Brick(plane, color, brickWidth, x, y, brickType)
      return brick
    })
  })
  return bricks
}
