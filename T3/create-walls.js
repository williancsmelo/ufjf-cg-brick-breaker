import * as T from 'three'
import { Wall } from './Wall.js'

export const createWalls = plane => {
  return [
    { x: -100, vector: [1, 0] }, // left
    { x: 100, vector: [-1, 0] }, // right
    { y: 200, vector: [0, -1] }, // top
    { y: -200, vector: [0, 1], kill: true } // bottom
  ].map(
    wall =>
      new Wall(
        plane,
        wall.x || 0,
        wall.y || 0,
        new T.Vector3(...wall.vector, 0),
        wall.kill || false
      )
  )
}
