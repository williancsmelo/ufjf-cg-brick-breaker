import Hitter from "./Hitter.js"
import { hitter } from "./config/constants.js"

export function createHitter(plane) {
  const brick = new Hitter(plane, hitter.width, hitter.height, hitter.color);

    const onMouseMove = (event) => {
        const screenWidth = plane.geometry.parameters.width / 2
        const totalWidth = window.innerWidth / 2;
        const newPosition = event.clientX - totalWidth
        if (Math.abs(newPosition) < (screenWidth - 50)) {
            brick.setPosition(newPosition)
        }
    };

  window.addEventListener("mousemove", onMouseMove);

  return brick;
}
