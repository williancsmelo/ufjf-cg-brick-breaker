import { Controls } from './Controls.js'

export function createControls() {
  const fullScreenEntries = [
    'fullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'msFullscreenElement'
  ]
  const isFullscreen = fullScreenEntries.some(entry => document[entry])
  const controls = new Controls(isFullscreen)
  return controls
}
