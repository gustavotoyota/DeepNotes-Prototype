const panning = module.exports = {}




panning.init = () => {
  $set($state, 'panning', {
    active: false,
  })
}

panning.start = (event) => {
  if (event.button !== 1)
    return

  const displayPos = $app.display.getMousePos(event)

  $state.panning = {
    active: true,

    currentPos: $utils.shallowCopy(displayPos),
  }
}

panning.update = (event) => {
  if (!$state.panning.active)
    return

  const displayPos = $app.display.getMousePos(event)

  const page = $getters.currentPage

  page.camera.pos.x -= (displayPos.x - $state.panning.currentPos.x) / page.camera.zoom
  page.camera.pos.y -= (displayPos.y - $state.panning.currentPos.y) / page.camera.zoom

  $state.panning.currentPos = $utils.shallowCopy(displayPos)
}

panning.finish = (event) => {
  if (!$state.panning.active || event.button !== 1)
    return

  $state.panning.active = false
}