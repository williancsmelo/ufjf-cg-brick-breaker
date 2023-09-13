import { Controls } from "./Controls.js";

export function createControls(isFullscreen, isPaused) {
  const controls = new Controls(isFullscreen, isPaused)
  return controls;
}

