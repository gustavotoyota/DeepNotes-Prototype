const camera = module.exports = {}




camera.resetZoom = () => {
  $getters.page.camera.zoom = 1
}

camera.fitToScreen = () => {
  let elems
  if ($app.selection.getElemIds().length > 0)
    elems = $app.selection.getElems()
  else
    elems = $getters.page.elems.blocks
    



  if (elems.length === 0) {
    $getters.page.camera.pos = { x: 0, y: 0 }
    return
  }



  const clientTopLeft = { x: Infinity, y: Infinity }
  const clientBottomRight = { x: -Infinity, y: -Infinity }

  for (const elem of elems) {
    const clientRect = $app.elems.getClientRect(elem)

    clientTopLeft.x = Math.min(clientTopLeft.x, clientRect.left)
    clientTopLeft.y = Math.min(clientTopLeft.y, clientRect.top)

    clientBottomRight.x = Math.max(clientBottomRight.x, clientRect.right)
    clientBottomRight.y = Math.max(clientBottomRight.y, clientRect.bottom)
  }



  const worldTopLeft = $app.coords.clientToWorld(clientTopLeft)
  const worldBottomRight = $app.coords.clientToWorld(clientBottomRight)



  $getters.page.camera.pos.x = (worldTopLeft.x + worldBottomRight.x) / 2
  $getters.page.camera.pos.y = (worldTopLeft.y + worldBottomRight.y) / 2



  const displayRect = $app.display.getClientRect()

  $getters.page.camera.zoom = Math.min(
    (Math.min(100, displayRect.width / 4) - displayRect.width / 2) /
    (worldTopLeft.x - $getters.page.camera.pos.x),
    (Math.min(50, displayRect.height / 4) - displayRect.height / 2) /
    (worldTopLeft.y - $getters.page.camera.pos.y))

  $getters.page.camera.zoom = Math.min(Math.max($getters.page.camera.zoom, $app.configs.minZoom), 1)
}