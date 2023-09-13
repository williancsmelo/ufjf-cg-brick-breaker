import { Controls } from "./Controls.js";

export function createControls(isFullscreen) {
  const controls = new Controls(isFullscreen)
  return controls;
}

