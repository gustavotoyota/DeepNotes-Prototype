const boxSelection = module.exports = {}




boxSelection.reset = () => {
  $set($state, 'boxSelection', {
    active: false,
  })
}

boxSelection.start = (event) => {
  if (event.button !== 0)
    return

  const displayPos = $app.coords.getDisplayPos(event)

  $state.boxSelection = {
    active: true,

    startPos: $utils.shallowCopy(displayPos),
    endPos: $utils.shallowCopy(displayPos),
  }
}

boxSelection.update = (event) => {
  if (!$state.boxSelection.active)
    return

  const displayPos = $app.coords.getDisplayPos(event)

  $state.boxSelection.endPos = $utils.shallowCopy(displayPos)
}

boxSelection.finish = (event) => {
  if (!$state.boxSelection.active || event.button !== 0)
    return



  const startPos = $app.coords.displayToClient($state.boxSelection.startPos)
  const endPos = $app.coords.displayToClient($state.boxSelection.endPos)



  const topLeft = {
    x: Math.min(startPos.x, endPos.x),
    y: Math.min(startPos.y, endPos.y),
  }
  const bottomRight = {
    x: Math.max(startPos.x, endPos.x),
    y: Math.max(startPos.y, endPos.y),
  }
  


  for (const elem of $getters.page.elems.blocks) {
    const clientRect = $app.elems.getClientRect(elem)

    if (clientRect.left < topLeft.x || clientRect.top < topLeft.y
    || clientRect.right > bottomRight.x || clientRect.bottom > bottomRight.y)
      continue

    if ($app.selection.has(elem) && !event.shiftKey)
      $app.selection.remove(elem)
    else
      $app.selection.add(elem)
  }



  // Activate highest selected element
  
  if ($getters.elems.length > 0)
    $app.activeElem.set($getters.elems.at(-1))



  $app.boxSelection.reset()
}