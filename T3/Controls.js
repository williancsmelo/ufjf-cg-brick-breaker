import { gameLevels } from './load-level.js'

export class Controls {
  isPaused = false
  isFullscreen = false
  isStarted = false
  restartGame = false
  gameLevel = 1
  finishGame = false
  powerUpActive = false

  constructor(isFullscreen, toggleOrbitControls) {
    this.isFullscreen = isFullscreen
    this.events()
    this.toggleOrbitControls = toggleOrbitControls
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

  setGameLevel(gameLevel) {
    this.gameLevel = gameLevel
  }

  setFinishGame(finish) {
    this.finishGame = finish
  }

  setPowerUpActive(isActive) {
    this.powerUpActive = isActive
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

      if (key === 'G' || key === 'g') {
        this.gameLevel++
        if (!gameLevels[this.gameLevel]) this.gameLevel = 1
        this.restartGame = true
      }

      if (key === 'o' || key === 'O') {
        this.isPaused = !this.isPaused
        this.toggleOrbitControls()
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

export class ControlsMobile {
  isPaused = false
  isFullscreen = false
  isStarted = false
  restartGame = false
  gameLevel = 1
  finishGame = false
  powerUpActive = false

  constructor(isFullscreen, toggleOrbitControls) {
    this.isFullscreen = isFullscreen
    this.events()
    this.toggleOrbitControls = toggleOrbitControls
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

  setGameLevel(gameLevel) {
    this.gameLevel = gameLevel
  }

  setFinishGame(finish) {
    this.finishGame = finish
  }

  setPowerUpActive(isActive) {
    this.powerUpActive = isActive
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

      if (key === 'G' || key === 'g') {
        this.gameLevel++
        if (!gameLevels[this.gameLevel]) this.gameLevel = 1
        this.restartGame = true
      }

      if (key === 'o' || key === 'O') {
        this.isPaused = !this.isPaused
        this.toggleOrbitControls()
      }
    }

    document.addEventListener('keydown', event => {
      handleKey(event.key)
    })
  }
}


