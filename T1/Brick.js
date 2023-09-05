import * as T from "three";

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
  box = null;
  broken = false;
  static height = 5;
  static width = 20;
  constructor(plane, row) {
    const boxGeometry = new T.BoxGeometry(this.width, this.height);
    const boxMaterial = new T.MeshBasicMaterial({ color: getColor(row) });
    this.box = new T.Mesh(boxGeometry, boxMaterial);
    this.box.position.z = 0;
    plane.add(this.box);
  }
}
