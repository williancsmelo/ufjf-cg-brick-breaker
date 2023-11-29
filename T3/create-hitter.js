import { Hitter } from './Hitter.js'

export function createHitter(plane, camera, renderer, listener, controls) {
  const brick = new Hitter(plane, camera, renderer, listener, controls)
  return brick
}
