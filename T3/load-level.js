import * as T from 'three'
import { Brick } from './Brick.js'
import level1 from './levels/1.js'
import level2 from './levels/2.js'
import level3 from './levels/3.js'

export const gameLevels = {
  1: level1,
  2: level2,
  3: level3
}
const brickMap = {
  1: { color: 'white', points: 50 },
  2: { color: 'tangerine', points: 60 },
  3: { color: 'pale blue', points: 70 },
  4: { color: '#80D010', points: 80 },
  5: { color: 'red', points: 90 },
  6: { color: 'blue', points: 100 },
  7: { color: '#FC74B4', points: 110 },
  8: { color: 'orange', points: 120 },
  g: {
    color: 'gray',
    effect: brick => {
      const texture = new T.TextureLoader().load(
        'assets/texture-gray-brick.png'
      )
      texture.wrapS = T.RepeatWrapping
      texture.wrapT = T.RepeatWrapping
      brick.material.map = texture
      brick.remainingHits = 2
      brick.pointsCalculator = controls => 50 * controls.gameLevel
    }
  },
  y: {
    color: 'yellow',
    points: 0,
    effect: brick => {
      brick.remainingHits = Infinity
    }
  },
  v: { effect: 'void' }
}
export const loadLevel = (plane, levelId) => {
  const level = gameLevels[levelId]
  if (!level) throw new Error(`Invalid level: ${levelId}`)
  const borderLeft = -50
  const borderTop = 100
  const topOffset = 30
  const leftOffset = 5
  const nColumns = 11
  const brickWidth = (100 - leftOffset * 2) / nColumns

  const bricksFromLevel = level
    .split('\n')
    .map(row => row.split(''))
    .filter(row => row.length)

  const errorInvalidLevel = new Error(`Invalid level format: ${levelId}`)
  return bricksFromLevel.map((row, rowIndex) => {
    if (!row.length) return
    if (row.length !== 11) throw errorInvalidLevel
    return row.map((brick, columnIndex) => {
      const brickConfig = brickMap[brick]
      if (!brickConfig) throw errorInvalidLevel
      if (brickConfig.effect === 'void') return null
      const x =
        borderLeft + brickWidth / 2 + columnIndex * brickWidth + leftOffset
      const y =
        borderTop - topOffset - rowIndex * Brick.height - Brick.height / 2
      const brickObject = new Brick(
        plane,
        brickWidth,
        x,
        y,
        brickConfig.color,
        brickConfig.points
      )
      brickConfig.effect?.(brickObject)
      return brickObject
    })
  })
}
