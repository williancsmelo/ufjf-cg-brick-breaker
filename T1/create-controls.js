export function pauseGame(gamePause){
    gamePause = !gamePause;
    
    if (gamePause) {
        document.querySelector("body").classList.remove("invisible-cursor")
    } else {
        document.querySelector("body").classList.add("invisible-cursor")
    }

    return gamePause
}

export function toggleFullscreen(){
    isFullscreen() ? exitFullscreen() : startFullscreen();
}

function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}
  
function startFullscreen() {
const canvas = document.querySelector('canvas'); // Substitua 'seu-canvas' pelo ID do seu elemento canvas

if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
    canvas.req
} else if (canvas.mozRequestFullScreen) { // Firefox
    canvas.mozRequestFullScreen();
} else if (canvas.webkitRequestFullscreen) { // Chrome, Safari e Opera
    canvas.webkitRequestFullscreen();
} else if (canvas.msRequestFullscreen) { // Internet Explorer/Edge
    canvas.msRequestFullscreen();
}
}

function exitFullscreen() {
if (document.exitFullscreen) {
    document.exitFullscreen();
} else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) { // Chrome, Safari e Opera
    document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { // Internet Explorer/Edge
    document.msExitFullscreen();
}
}

