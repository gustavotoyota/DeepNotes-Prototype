const popup = module.exports = {}




popup.init = () => {
  $set($state, 'popup', {
    visible: false,

    pos: { x: 0, y: 0 },
  })
}



popup.show = (event) => {
  $state.popup = {
    visible: true,

    pos: {
      x: event.clientX,
      y: event.clientY,
    },
  }
}