import { RefObject, useEffect, useState } from 'react'

interface FullscreenHTMLElement extends HTMLElement {
  fullscreenElement?: () => Promise<void>
  mozFullScreenElement?: () => Promise<void>
  webkitFullscreenElement?: () => Promise<void>
  msRequestFullscreen?: () => Promise<void>
  webkitRequestFullscreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
}
interface FullscreenDocument extends Document {
  mozCancelFullScreen?: () => Promise<void>
  webkitExitFullscreen?: () => Promise<void>
  mozFullScreenElement?: Element | null
  webkitFullscreenElement?: Element | null
  msFullscreenElement?: Element | null
}
export function useFullscreenStatus(): boolean {
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(false)

  const handleFullscreenChange = () => {
    const target = document as FullscreenDocument
    setIsFullscreenEnabled(
      !!target.fullscreenElement ||
        !!target.mozFullScreenElement ||
        !!target.webkitFullscreenElement ||
        !!target.msFullscreenElement
    )
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange
      )
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      )
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  return isFullscreenEnabled
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
