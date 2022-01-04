const coords = module.exports = {}




coords.getClientPos = (event) => {
  return {
    x: event.clientX,
    y: event.clientY,
  }
}
coords.getDisplayPos = (event) => {
  return $app.coords.clientToDisplay($app.coords.getClientPos(event))
}
coords.getWorldPos = (event) => {
  return $app.coords.clientToWorld($app.coords.getClientPos(event))
}




coords.clientToDisplay = (clientPos) => {
  const displayRect = $app.display.getClientRect()

  return {
    x: clientPos.x - displayRect.x,
    y: clientPos.y - displayRect.y,
  }
}
coords.displayToClient = (displayPos) => {
  const displayRect = $app.display.getClientRect()

  return {
    x: displayPos.x + displayRect.x,
    y: displayPos.y + displayRect.y,
  }
}




coords.displayToWorld = (displayPos) => {
  const displayRect = $app.display.getClientRect()

  return {
    x: $getters.page.camera.pos.x + (displayPos.x - displayRect.width / 2) / $getters.page.camera.zoom,
    y: $getters.page.camera.pos.y + (displayPos.y - displayRect.height / 2) / $getters.page.camera.zoom,
  }
}
coords.worldToDisplay = (worldPos) => {
  const displayRect = $app.display.getClientRect()

  return {
    x: displayRect.width / 2 + (worldPos.x - $getters.page.camera.pos.x) * $getters.page.camera.zoom,
    y: displayRect.height / 2 + (worldPos.y - $getters.page.camera.pos.y) * $getters.page.camera.zoom,
  }
}




coords.clientToWorld = (clientPos) => {
  return $app.coords.displayToWorld($app.coords.clientToDisplay(clientPos))
}
coords.worldToClient = (worldPos) => {
  return $app.coords.displayToClient($app.coords.worldToDisplay(worldPos))
}