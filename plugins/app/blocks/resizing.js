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

  const oldClientRect = {
    start: { x: frameClientRect.x, y: sectionClientRect.y },
    end: { x: frameClientRect.right, y: sectionClientRect.bottom },
  }
  oldClientRect.size = {
    x: oldClientRect.end.x - oldClientRect.start.x,
    y: oldClientRect.end.y - oldClientRect.start.y,
  }




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

  newClientRect.size = {
    x: newClientRect.end.x - newClientRect.start.x,
    y: newClientRect.end.y - newClientRect.start.y,
  }




  // Old world rect

  const oldWorldRect = {
    start: $app.coords.clientToWorld(oldClientRect.start),
    end: $app.coords.clientToWorld(oldClientRect.end),
  }
  oldWorldRect.size = {
    x: oldWorldRect.end.x - oldWorldRect.start.x,
    y: oldWorldRect.end.y - oldWorldRect.start.y,
  }




  // New world rect

  const newWorldRect = {
    start: $app.coords.clientToWorld(newClientRect.start),
    end: $app.coords.clientToWorld(newClientRect.end),
  }
  newWorldRect.size = {
    x: newWorldRect.end.x - newWorldRect.start.x,
    y: newWorldRect.end.y - newWorldRect.start.y,
  }




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