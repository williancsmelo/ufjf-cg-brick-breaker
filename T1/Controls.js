export class Controls {
    isPaused = false;
    isFullscreen = false;
    isStarted = false;

    constructor(isFullscreen) {
        this.isFullscreen = isFullscreen;
        this.events();
    }

    setIsPaused(isPaused) {
        this.isPaused = isPaused;
    }

    setIsFullscreen(isFullscreen) {
        this.isFullscreen = isFullscreen;
    }

    setIsStarted(isStarted) {
        this.isStarted = isStarted;
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

            if (key === "Enter") {
                this.isFullscreen = !this.isFullscreen;
                if (this.isFullscreen)
                    document.querySelector("canvas").requestFullscreen();
                else document.exitFullscreen();
            }
        };

        const handleClick = () => {
            if (!this.isStarted) this.isStarted = true;
            console.log("Iniciou o jogo!")
        }

        document.addEventListener("keydown", (event) => {
            handleKey(event.key);
        });

        document.addEventListener("click", handleClick);
    }
}