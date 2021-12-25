const dragging = module.exports = {}




dragging.init = () => {
  $set($state, 'dragging', {
    active: false,
  })
}


dragging.start = (event) => {
  if (event.button !== 0)
    return

  const displayPos = $app.display.getMousePos(event)

  $state.dragging = {
    active: true,

    currentPos: $utils.shallowCopy(displayPos),
  }
}
dragging.update = (event) => {
  if (!$state.dragging.active)
    return

  const displayPos = $app.display.getMousePos(event)

  const page = $getters.currentPage

  for (const elemId of Object.keys(page.elems.selected)) {
    const elem = $app.elems.getById(elemId)

    if (elem.pos) {
      elem.pos.x += (displayPos.x - $state.dragging.currentPos.x) / page.camera.zoom
      elem.pos.y += (displayPos.y - $state.dragging.currentPos.y) / page.camera.zoom
    }
  }

  $state.dragging.currentPos = $utils.shallowCopy(displayPos)
}
dragging.finish = (event) => {
  if (!$state.dragging.active || event.button !== 0)
    return

  $state.dragging.active = false
}