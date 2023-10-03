export class Controls {
  isPaused = false
  isFullscreen = false
  isStarted = false
  restartGame = false

  constructor(isFullscreen) {
    this.isFullscreen = isFullscreen
    this.events()
  }

  setIsPaused(isPaused) {
    this.isPaused = isPaused
  }

  setIsFullscreen(isFullscreen) {
    this.isFullscreen = isFullscreen
  }

  setIsStarted(isStarted) {
    this.isStarted = isStarted
  }

  setRestartGame(restartGame) {
    this.restartGame = restartGame
  }

  events() {
    const handleKey = key => {
      if (key === ' ') {
        this.isPaused = !this.isPaused
        if (this.isPaused)
          document.querySelector('body').classList.remove('invisible-cursor')
        else document.querySelector('body').classList.add('invisible-cursor')
      }

      if (key === 'Enter') {
        this.isFullscreen = !this.isFullscreen
        if (this.isFullscreen)
          document.querySelector('canvas').requestFullscreen()
        else document.exitFullscreen()
      }

      if (key === 'R' || key === 'r') {
        this.restartGame = true
      }
    }

    const handleClick = () => {
      if (!this.isStarted) this.isStarted = true
    }

    document.addEventListener('keydown', event => {
      handleKey(event.key)
    })

    document.addEventListener('click', handleClick)
  }
}
