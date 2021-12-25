const display = module.exports = {}




display.getRect = () => {
  return document.getElementById('display').getBoundingClientRect()
}
display.getMousePos = (event) => {
  const displayRect = $app.display.getRect()

  return {
    x: event.clientX - displayRect.x,
    y: event.clientY - displayRect.y,
  }
}



display.fromClient = (clientPos) => {
  const displayRect = $app.display.getRect()

  return {
    x: clientPos.x - displayRect.x,
    y: clientPos.y - displayRect.y,
  }
}
display.toClient = (displayPos) => {
  const displayRect = $app.display.getRect()

  return {
    x: displayPos.x + displayRect.x,
    y: displayPos.y + displayRect.y,
  }
}