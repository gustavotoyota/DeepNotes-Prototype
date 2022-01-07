const cloning = module.exports = {}




cloning.perform = () => {
  let centerX

  const nonRoot = $getters.regionElem != null

  if (nonRoot) {
    for (const elem of $app.selection.getElems()) {
      const clientRect = $app.elems.getClientRect(elem)
      const rectWorldPos = $app.coords.clientToWorld(clientRect)
      const worldSize = $app.sizes.screenToWorld2D({
        x: clientRect.width,
        y: clientRect.height,
      })

      centerX = rectWorldPos.x + worldSize.x / 2
      elem.pos.y = rectWorldPos.y + worldSize.y * elem.anchor.y
    }
  }



  const activeElemId = $getters.elemId
  
  for (const elem of $app.selection.getElems()) {
    const newElem = $app.elems.create(elem)
    
    newElem.pos.y += 8

    $app.selection.remove(elem)

    if (elem.id == activeElemId)
      $app.activeElem.set(newElem)
    else
      $app.selection.add(newElem)
  }



  if (nonRoot) {
    $nextTick(() => {
      for (const elem of $app.selection.getElems()) {
        const clientRect = $app.elems.getClientRect(elem)
        const worldWidth = $app.sizes.screenToWorld1D(clientRect.width)

        elem.pos.x = centerX + worldWidth * (elem.anchor.x - 0.5) + 8
      }
    })
  } else {
    for (const elem of $app.selection.getElems())
      elem.pos.x += 8
  }
}