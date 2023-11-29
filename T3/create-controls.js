import { Controls, ControlsMobile } from './Controls.js'

export function createControls(orbitControls) {
  const fullScreenEntries = [
    'fullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'msFullscreenElement'
  ]
  const isFullscreen = fullScreenEntries.some(entry => document[entry])
  const controls = new Controls(
    isFullscreen,
    () => (orbitControls.enabled = !orbitControls.enabled)
  )
  return controls
}

export function createControlsMobile(orbitControls) {
  const fullScreenEntries = [
    'fullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'msFullscreenElement'
  ]
  const isFullscreen = fullScreenEntries.some(entry => document[entry])
  const controls = new ControlsMobile(
    isFullscreen,
    () => (orbitControls.enabled = !orbitControls.enabled)
  )
  return controls
}
