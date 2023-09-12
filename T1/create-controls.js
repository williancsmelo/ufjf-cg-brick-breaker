export function createControls(state) {
  const handleKey = (key) => {
    if (key === " ") {
      state.pause = !state.pause;
      if (state.pause)
        document.querySelector("body").classList.remove("invisible-cursor");
      else document.querySelector("body").classList.add("invisible-cursor");
    }

    if (key === "Enter") {
      state.fullScreen = !state.fullScreen;
      if (state.fullScreen)
        document.querySelector("canvas").requestFullscreen();
      else document.exitFullscreen();
    }
  };

  document.addEventListener("keydown", (event) => {
    handleKey(event.key);
  });
}
