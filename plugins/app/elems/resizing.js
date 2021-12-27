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

  const newScreenSize = {
    x: newClientRect.end.x - newClientRect.start.x,
    y: newClientRect.end.y - newClientRect.start.y,
  }

  const sizeProp = elem.collapsed ? 'collapsedSize' : 'size'

  if (newScreenSize.x !== clientRect.width)
    elem[sizeProp].x = $app.sizes.screenToWorld1D(newScreenSize.x)
  if (newScreenSize.y !== clientRect.height)
    elem[sizeProp].y = $app.sizes.screenToWorld1D(newScreenSize.y)

  elem.pos = $app.coords.clientToWorld(newClientRect.start)
}

resizing.finish = (event) => {
  if (!$state.resizing.active || event.button !== 0)
    return

  $state.resizing.active = false
}