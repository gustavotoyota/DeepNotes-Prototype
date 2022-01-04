const panning = module.exports = {}




panning.reset = () => {
  $set($state, 'panning', {
    active: false,
  })
}

panning.start = (event) => {
  if (event.button !== 1)
    return

  const clientPos = $app.coords.getClientPos(event)

  $state.panning = {
    active: true,

    currentPos: $utils.shallowCopy(clientPos),
  }
}

panning.update = (event) => {
  if (!$state.panning.active)
    return

  const clientPos = $app.coords.getClientPos(event)

  $getters.page.camera.pos.x -= (clientPos.x - $state.panning.currentPos.x) / $getters.page.camera.zoom
  $getters.page.camera.pos.y -= (clientPos.y - $state.panning.currentPos.y) / $getters.page.camera.zoom

  $state.panning.currentPos = $utils.shallowCopy(clientPos)
}

panning.finish = (event) => {
  if (!$state.panning.active || event.button !== 1)
    return

  $app.panning.reset()
}