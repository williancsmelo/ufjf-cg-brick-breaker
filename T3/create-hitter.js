import { Hitter } from './Hitter.js'

export function createHitter(plane, camera, listener, controls) {
  const brick = new Hitter(plane, camera, listener, controls)
  return brick
}
