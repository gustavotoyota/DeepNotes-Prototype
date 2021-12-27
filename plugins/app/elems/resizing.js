const resizing = module.exports = {}




resizing.init = () => {
  $set($state, 'resizing', {
    active: false,
  })
}


resizing.start = (event, side) => {
  if (event.button !== 0)
    return

  $state.resizing = {
    active: true,

    side: side,
  }
}

resizing.update = (event) => {
  if (!$state.resizing.active)
    return

  const elem = $getters.activeElem
  const clientRect = $app.elems.getClientRect(elem)

  const newRect = {
    start: { x: clientRect.x, y: clientRect.y },
    end: { x: clientRect.right, y: clientRect.bottom },
  }

  if ($state.resizing.side.includes('w'))
    newRect.start.x = event.clientX
  if ($state.resizing.side.includes('n'))
    newRect.start.y = event.clientY
  if ($state.resizing.side.includes('e'))
    newRect.end.x = event.clientX
  if ($state.resizing.side.includes('s'))
    newRect.end.y = event.clientY

  newRect.start = $app.coords.clientToWorld(newRect.start)
  newRect.end = $app.coords.clientToWorld(newRect.end)

  elem.pos = {
    x: (newRect.start.x + newRect.end.x) / 2,
    y: (newRect.start.y + newRect.end.y) / 2,
  }

  const newSize = {
    x: newRect.end.x - newRect.start.x,
    y: newRect.end.y - newRect.start.y,
  }

  if (newSize.x !== clientRect.width)
    elem.size.x = newSize.x
  if (newSize.y !== clientRect.height)
    elem.size.y = newSize.y
}

resizing.finish = (event) => {
  if (!$state.resizing.active || event.button !== 0)
    return

  $state.resizing.active = false
}