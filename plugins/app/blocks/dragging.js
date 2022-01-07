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

    dropRegionId: null,
    dropIndex: null,
  }
}
dragging.update = (event) => {
  if (!$state.dragging.down)
    return



  const clientPos = $app.coords.getClientPos(event)
  const worldPos = $app.coords.clientToWorld(clientPos)



  if (!$state.dragging.active) {
    const dist = Math.sqrt(
      Math.pow(clientPos.x - $state.dragging.startPos.x, 2) +
      Math.pow(clientPos.y - $state.dragging.startPos.y, 2)
    )

    $state.dragging.active = dist >= $app.dragging.minDistance
    if (!$state.dragging.active)
      return


    
    if ($getters.regionId != null) {
      for (const elem of $app.selection.getElems()) {
        const clientRect = $app.elems.getClientRect(elem)
        const rectWorldPos = $app.coords.clientToWorld(clientRect)
        const worldHeight = $app.sizes.screenToWorld1D(clientRect.height)

        elem.pos.y = rectWorldPos.y + worldHeight * elem.anchor.y
      }

      $app.selection.moveToRegion(null)

      $nextTick(() => {
        for (const elem of $app.selection.getElems()) {
          const clientRect = $app.elems.getClientRect(elem)
          const worldWidth = $app.sizes.screenToWorld1D(clientRect.width)

          elem.pos.x = worldPos.x + worldWidth * (elem.anchor.x - 0.5)
        }
      })
    }
  }



  for (const elem of $app.selection.getElems()) {
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