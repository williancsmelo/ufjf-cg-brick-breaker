import Hitter from "./Hitter.js"
import { hitter } from "./config/constants.js"

export function createHitter(plane) {
  const brick = new Hitter(plane, hitter.width, hitter.height, hitter.color, hitter.positionY);
  return brick;
}
