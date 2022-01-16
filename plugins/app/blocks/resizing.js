const resizing = module.exports = {}




resizing.reset = () => {
  $set($state, 'resizing', {
    active: false,
  })
}


resizing.start = (event, elem, side, section) => {
  if (event.button !== 0)
    return

  $app.activeElem.set(elem)

  $state.resizing = {
    active: true,

    side: side,
    section: section,
  }
}

resizing.update = (event) => {
  if (!$state.resizing.active)
    return

  const elem = $getters.elem
  
  const frameClientRect = $app.elems.getClientRect(elem)
  const sectionClientRect = $app.elems.getClientRect(elem, $state.resizing.section)




  // Old client rect

  const oldClientRect = $app.rects.fromStartEnd(
    { x: frameClientRect.start.x, y: sectionClientRect.start.y },
    { x: frameClientRect.end.x, y: sectionClientRect.end.y })




  // New client rect

  const newClientRect = $utils.deepCopy(oldClientRect)

  if ($state.resizing.side.includes('w'))
    newClientRect.start.x = event.clientX
  if ($state.resizing.side.includes('n'))
    newClientRect.start.y = event.clientY
  if ($state.resizing.side.includes('e'))
    newClientRect.end.x = event.clientX
  if ($state.resizing.side.includes('s'))
    newClientRect.end.y = event.clientY

  $app.rects.updateSize(newClientRect)




  // Old world rect

  const oldWorldRect = $app.rects.clientToWorld(oldClientRect)




  // New world rect
  
  const newWorldRect = $app.rects.clientToWorld(newClientRect)




  for (const elem of $getters.elems) {
    const sizeProp = $app.elems.getSizeProp(elem)

    if (newClientRect.size.x !== oldClientRect.size.x) {
      if (elem[sizeProp].x === 'expanded')
        elem.expandedSize.x = `${newWorldRect.size.x}px`
      else
        elem[sizeProp].x = `${newWorldRect.size.x}px`
    }

    if (newClientRect.size.y !== oldClientRect.size.y) {
      if (elem[sizeProp].y[$state.resizing.section] === 'auto')
        elem.expandedSize.y[$state.resizing.section] = `${newWorldRect.size.y}px`
      else
        elem[sizeProp].y[$state.resizing.section] = `${newWorldRect.size.y}px`
    }

    elem.pos.x +=
      (newWorldRect.start.x - oldWorldRect.start.x) * (1 - elem.anchor.x)
      + (newWorldRect.end.x - oldWorldRect.end.x) * elem.anchor.x
    elem.pos.y +=
      (newWorldRect.start.y - oldWorldRect.start.y) * (1 - elem.anchor.y)
      + (newWorldRect.end.y - oldWorldRect.end.y) * elem.anchor.y
  }
}

resizing.finish = (event) => {
  if (!$state.resizing.active || event.button !== 0)
    return

  $app.resizing.reset()
}