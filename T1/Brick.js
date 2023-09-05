const getColor = (row) =>
  ({
    1: "gray",
    2: "red",
    3: "yellow",
    4: "blue",
    5: "pink",
    6: "green",
  }[row] || "white");

export class Brick {
  broken = false;
  height = 0.5;
  width = 2;
  constructor(row) {}
}
