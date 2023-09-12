export function pauseGame(event, gamePause){
    console.log("tecla apertada: ", event.key)
    if (event.key === ' ') {
        gamePause = !gamePause;
        
        if (gamePause) {
            document.querySelector("body").classList.remove("invisible-cursor")
        } else {
            document.querySelector("body").classList.add("invisible-cursor")
        }
    }

    return gamePause
}