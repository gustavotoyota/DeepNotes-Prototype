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

  const newClientRect = {
    start: { x: clientRect.x, y: clientRect.y },
    end: { x: clientRect.right, y: clientRect.bottom },
  }

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

  const newWorldRect = {
    start: $app.coords.clientToWorld(newClientRect.start),
    end: $app.coords.clientToWorld(newClientRect.end),
  }
  newWorldRect.size = {
    x: newWorldRect.end.x - newWorldRect.start.x,
    y: newWorldRect.end.y - newWorldRect.start.y,
  }

  const sizeProp = elem.collapsed ? 'collapsedSize' : 'size'

  if (newClientRect.size.x !== clientRect.width)
    elem[sizeProp].x = newWorldRect.size.x
  if (newClientRect.size.y !== clientRect.height)
    elem[sizeProp].y = newWorldRect.size.y

  elem.pos = {
    x: newWorldRect.start.x + newWorldRect.size.x * elem.anchor.x,
    y: newWorldRect.start.y + newWorldRect.size.y * elem.anchor.y,
  }
}

resizing.finish = (event) => {
  if (!$state.resizing.active || event.button !== 0)
    return

  $state.resizing.active = false
}