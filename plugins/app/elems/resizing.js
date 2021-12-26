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

  const result = {
    start: { x: clientRect.x, y: clientRect.y },
    end: { x: clientRect.right, y: clientRect.bottom },
  }

  if ($state.resizing.side.includes('w'))
    result.start.x = event.clientX
  if ($state.resizing.side.includes('n'))
    result.start.y = event.clientY
  if ($state.resizing.side.includes('e'))
    result.end.x = event.clientX
  if ($state.resizing.side.includes('s'))
    result.end.y = event.clientY

  result.start = $app.coords.clientToWorld(result.start)
  result.end = $app.coords.clientToWorld(result.end)

  elem.pos = {
    x: (result.start.x + result.end.x) / 2,
    y: (result.start.y + result.end.y) / 2,
  }
  elem.size = {
    x: result.end.x - result.start.x,
    y: result.end.y - result.start.y,
  }
}

resizing.finish = (event) => {
  if (!$state.resizing.active || event.button !== 0)
    return

  $state.resizing.active = false
}