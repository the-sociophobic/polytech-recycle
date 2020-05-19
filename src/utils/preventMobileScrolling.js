const preventDefault = event => event.preventDefault()

const registerListeners = element => {
  element.addEventListener( 'wheel', preventDefault, { passive: false } )
  // element.addEventListener( 'touchstart', preventDefault, { passive: false } )
  // element.addEventListener( 'touchend', preventDefault, { passive: false } )
  element.addEventListener( 'touchmove', preventDefault, { passive: false } )
}

const unregisterListeners = element => {
  element.removeEventListener( 'wheel', preventDefault, { passive: false } )
  // element.removeEventListener( 'touchstart', preventDefault, { passive: false } )
  // element.removeEventListener( 'touchend', preventDefault, { passive: false } )
  element.removeEventListener( 'touchmove', preventDefault, { passive: false } )
}

export { registerListeners, unregisterListeners }