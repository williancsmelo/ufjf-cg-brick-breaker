import * as T from "three";

const getColor = (row) =>
  ({
    1: "gray",
    2: "red",
    3: "yellow",
    4: "blue",
    5: "pink",
    6: "palegreen",
  }[row] || "white");

export class Brick {
  box = null;
  broken = false;
  static height = 8;
  constructor(plane, row, width) {
    const boxGeometry = new T.BoxGeometry(width, Brick.height, 1);
    const edges = new T.EdgesGeometry(boxGeometry);
    const line = new T.LineSegments(
      edges,
      new T.LineBasicMaterial({ color: "black", linewidth: 2 })
    );
    const boxMaterial = new T.MeshBasicMaterial({
      color: getColor(row),
    });
    this.box = new T.Mesh(boxGeometry, boxMaterial);
    this.box.position.z = 0;
    this.box.add(line);
    plane.add(this.box);
  }
}
