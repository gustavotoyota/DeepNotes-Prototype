const boxSelection = module.exports = {}




boxSelection.init = () => {
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
  


  for (const elem of $getters.currentPage.elems.list) {
    const clientRect = $app.elems.getClientRect(elem.id)

    if (clientRect.left < topLeft.x || clientRect.top < topLeft.y
    || clientRect.right > bottomRight.x || clientRect.bottom > bottomRight.y)
      continue

    if ($app.selection.hasElem(elem.id) && !event.shiftKey)
      $app.selection.removeElem(elem.id)
    else
      $app.selection.addElem(elem.id)
  }



  // Activate highest selected element

  const page = $getters.currentPage
  
  let lastElem = null

  for (let i = page.elems.list.length - 1; i >= 0; --i) {
    const elem = page.elems.list[i]

    if (!$app.selection.hasElem(elem.id))
      continue

    lastElem = elem
    break
  }

  if (lastElem)
    $app.elems.activate(lastElem.id)



  $state.boxSelection.active = false
}