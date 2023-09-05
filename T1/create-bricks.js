import { Brick } from "./Brick.js";

const nColumns = 12;
const nRows = 6;

export const createBricks = (plane) => {
  const borderLeft = window.innerHeight / -4;
  const borderTop = window.innerHeight / 2;
  const topOffset = 50;
  const bricks = [...Array(nRows)].map((_, row) => {
    return [...Array(nColumns)].map((_, column) => {
      const x = borderLeft + Brick.width / 2 + column * Brick.width;
      const y = borderTop - topOffset - row * Brick.height - Brick.height / 2;
      const brick = new Brick(plane, row + 1);
      brick.box.position.x = x;
      brick.box.position.y = y;

      return brick;
    });
  });
  return bricks;
};
