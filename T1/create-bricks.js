import { Brick } from "./Brick.js";

const nColumns = 1;
const nRows = 2;

export const createBricks = (plane) => {
  const borderLeft = window.innerHeight / -4;
  const borderTop = 0;
  const topOffset = 40;
  const brickWidth = plane.geometry.parameters.width / nColumns;
  const bricks = [...Array(nRows)].map((_, row) => {
    return [...Array(nColumns)].map((_, column) => {
      const x = borderLeft + brickWidth / 2 + column * brickWidth;
      const y = borderTop - topOffset - row * Brick.height - Brick.height / 2;
      const brick = new Brick(plane, row + 1, brickWidth, x, y);
      return brick;
    });
  });
  return bricks;
};
