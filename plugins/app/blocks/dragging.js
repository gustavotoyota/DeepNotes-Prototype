const dragging = module.exports = {}




dragging.minDistance = 5




dragging.reset = () => {
  $set($state, 'dragging', {
    active: false,
  })
}


dragging.start = (event) => {
  if (event.button !== 0)
    return

  $state.dragging = {
    down: true,

    active: false,

    startPos: $app.coords.getClientPos(event),
    currentPos: $app.coords.getClientPos(event),
  }
}
dragging.update = (event) => {
  if (!$state.dragging.down)
    return



  const clientPos = $app.coords.getClientPos(event)



  if (!$state.dragging.active) {
    const dist = Math.sqrt(
      Math.pow(clientPos.x - $state.dragging.startPos.x, 2) +
      Math.pow(clientPos.y - $state.dragging.startPos.y, 2)
    )

    $state.dragging.active = dist >= $app.dragging.minDistance

    if (!$state.dragging.active)
      return
  }



  for (const elemId of $app.selection.getElemIds()) {
    const elem = $app.elems.getById(elemId)

    if (!elem.movable)
      continue

    if (elem.pos) {
      elem.pos.x += (clientPos.x - $state.dragging.currentPos.x) / $getters.page.camera.zoom
      elem.pos.y += (clientPos.y - $state.dragging.currentPos.y) / $getters.page.camera.zoom
    }
  }



  $state.dragging.currentPos = clientPos
}
dragging.finish = (event) => {
  if (!$state.dragging.down || event.button !== 0)
    return

  $app.dragging.reset()
}