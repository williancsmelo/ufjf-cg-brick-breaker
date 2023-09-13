export class Controls {
    isPaused = false;
    isFullscreen = false;

    constructor(isFullscreen, isPaused) {
        this.isFullscreen = isFullscreen;
        this.isPaused = isPaused;
        this.events();
    }

    setIsPaused(isPaused) {
        this.isPaused = isPaused;
    }

    setisFullscreen(isFullscreen) {
        this.isFullscreen = isFullscreen;
    }

    events() {
        const handleKey = (key) => {
            if (key === " ") {
                this.isPaused = !this.isPaused;
                if (this.isPaused)
                    document.querySelector("body").classList.remove("invisible-cursor");
                else document.querySelector("body").classList.add("invisible-cursor");
            }

            if (key === "Enter") {
                this.isFullscreen = !this.isFullscreen;
                if (this.isFullscreen)
                    document.querySelector("canvas").requestFullscreen();
                else document.exitFullscreen();
            }
        };

        document.addEventListener("keydown", (event) => {
            handleKey(event.key);
        });
    }
}