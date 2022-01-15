const dragging = module.exports = {}




dragging.minDistance = 5




dragging.reset = () => {
  $set($state, 'dragging', {
    active: false,
  })
}


dragging.start = (event, sourceElem) => {
  if (event.button !== 0)
    return

  $state.dragging = {
    down: true,

    sourceElem: sourceElem,

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



  const clientMousePos = $app.coords.getClientPos(event)
  const worldMousePos = $app.coords.clientToWorld(clientMousePos)



  if (!$state.dragging.active) {
    const dist = Math.sqrt(
      Math.pow(clientMousePos.x - $state.dragging.startPos.x, 2) +
      Math.pow(clientMousePos.y - $state.dragging.startPos.y, 2)
    )

    $state.dragging.active = dist >= $app.dragging.minDistance
    if (!$state.dragging.active)
      return


    
    if ($getters.regionId != null) {
      for (const selectedElem of $getters.elems) {
        const clientRect = $app.elems.getClientRect(selectedElem)
        const rectWorldPos = $app.coords.clientToWorld(clientRect)
        const worldRect = $app.sizes.screenToWorld2D({ x: clientRect.width, y: clientRect.height })

        selectedElem.pos.x = rectWorldPos.x + worldRect.x * selectedElem.anchor.x
        selectedElem.pos.y = rectWorldPos.y + worldRect.y * selectedElem.anchor.y

        if (selectedElem.collapsed && selectedElem.collapsedSize.x === 'expanded')
          selectedElem.expandedSize.x = `${worldRect.x}px`
        else
          selectedElem[$app.elems.getSizeProp(selectedElem)].x = `${worldRect.x}px`
      }

      $app.selection.moveToRegion(null)
    }
  }



  for (const selectedElem of $getters.elems) {
    if (!selectedElem.movable)
      continue

    if (selectedElem.pos) {
      selectedElem.pos.x += (clientMousePos.x - $state.dragging.currentPos.x) / $getters.page.camera.zoom
      selectedElem.pos.y += (clientMousePos.y - $state.dragging.currentPos.y) / $getters.page.camera.zoom
    }
  }



  $state.dragging.currentPos = clientMousePos
}
dragging.finish = (event) => {
  if (!$state.dragging.down || event.button !== 0)
    return

  $app.dragging.reset()
}