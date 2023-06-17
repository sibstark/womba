import { RefObject, useEffect } from 'react'

interface FullscreenHTMLElement extends HTMLElement {
  fullscreenElement?: () => Promise<void>
  mozFullScreenElement?: () => Promise<void>
  webkitFullscreenElement?: () => Promise<void>
  msRequestFullscreen?: () => Promise<void>
  webkitRequestFullscreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
}
interface FullscreenDocument extends Document {
  exitFullscreen: () => Promise<void>
  mozCancelFullScreen: () => Promise<void>
  webkitExitFullscreen: () => Promise<void>
}
export function useFullScreen(ref: RefObject<HTMLElement> | null) {
  function activateFullscreen() {
    if (ref?.current) {
      const target = ref.current as FullscreenHTMLElement
      if (target.requestFullscreen) {
        target.requestFullscreen() // W3C spec
      } else if (target.mozRequestFullScreen) {
        target.mozRequestFullScreen() // Firefox
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen() // Safari
      } else if (target.msRequestFullscreen) {
        target.msRequestFullscreen() // IE/Edge
      }
    }
  }

  function deactivateFullscreen() {
    const target = document as FullscreenDocument
    if (target.exitFullscreen) {
      target.exitFullscreen()
    } else if (target.mozCancelFullScreen) {
      target.mozCancelFullScreen()
    } else if (target.webkitExitFullscreen) {
      target.webkitExitFullscreen()
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        deactivateFullscreen()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      // Cleanup: remove the event listener when the component unmounts
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [ref])

  return {
    onFullscreen: activateFullscreen,
    onExitFullscreen: deactivateFullscreen,
  }
}
