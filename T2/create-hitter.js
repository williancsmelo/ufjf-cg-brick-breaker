//import Hitter, { Hitter2 } from "./Hitter.js"
import { Hitter2 } from "./Hitter.js"
import { hitter } from "./config/constants.js"

// export function createHitter(plane) {
//   const brick = new Hitter(plane, hitter.width, hitter.height, hitter.color, hitter.positionY);
//   return brick;
// }

export function createHitter2(plane) {
  const brick = new Hitter2(plane, hitter.color, hitter.positionY);
  return brick;
}
