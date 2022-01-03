const dragging = module.exports = {}




dragging.reset = () => {
  $set($state, 'dragging', {
    active: false,
  })
}


dragging.start = (event) => {
  if (event.button !== 0)
    return

  const clientPos = $app.coords.getClientPos(event)

  $state.dragging = {
    active: true,

    currentPos: $utils.shallowCopy(clientPos),
    moved: false,
  }
}
dragging.update = (event) => {
  if (!$state.dragging.active)
    return

  const clientPos = $app.coords.getClientPos(event)

  const page = $getters.currentPage

  for (const elemId of $app.selection.getElemIds()) {
    const elem = $app.elems.getById(elemId)

    if (!elem.movable)
      continue

    if (elem.pos) {
      elem.pos.x += (clientPos.x - $state.dragging.currentPos.x) / page.camera.zoom
      elem.pos.y += (clientPos.y - $state.dragging.currentPos.y) / page.camera.zoom
    }
  }

  $state.dragging.currentPos = $utils.shallowCopy(clientPos)
  $state.dragging.moved = true
}
dragging.finish = (event) => {
  if (!$state.dragging.active || event.button !== 0)
    return

  $app.dragging.reset()
}