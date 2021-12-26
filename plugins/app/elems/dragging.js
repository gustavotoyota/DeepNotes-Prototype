const dragging = module.exports = {}




dragging.init = () => {
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
  }
}
dragging.update = (event) => {
  if (!$state.dragging.active)
    return

  const clientPos = $app.coords.getClientPos(event)

  const page = $getters.currentPage

  for (const elemId of Object.keys(page.elems.selected)) {
    const elem = $app.elems.getById(elemId)

    if (elem.pos) {
      elem.pos.x += (clientPos.x - $state.dragging.currentPos.x) / page.camera.zoom
      elem.pos.y += (clientPos.y - $state.dragging.currentPos.y) / page.camera.zoom
    }
  }

  $state.dragging.currentPos = $utils.shallowCopy(clientPos)
}
dragging.finish = (event) => {
  if (!$state.dragging.active || event.button !== 0)
    return

  $state.dragging.active = false
}