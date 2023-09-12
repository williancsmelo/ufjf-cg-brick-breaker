import * as T from "three";
import { setDefaultMaterial } from "../libs/util/util.js";

const getColor = (row) =>
  ({
    1: "gray",
    2: "red",
    3: "yellow",
    4: "blue",
    5: "pink",
    6: "palegreen",
  }[row] || "white");

export class Brick extends T.Mesh {
  broken = false;
  static height = 8;
  constructor(plane, row, width) {
    const boxGeometry = new T.BoxGeometry(width, Brick.height, 1);
    super(boxGeometry, setDefaultMaterial(getColor(row)));
    this.position.z = 0;
    this.add(
      new T.LineSegments(
        new T.EdgesGeometry(boxGeometry),
        new T.LineBasicMaterial({ color: "black", linewidth: 2 })
      )
    );
    plane.add(this);
  }
}
