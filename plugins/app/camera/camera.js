const camera = module.exports = {}




camera.resetZoom = () => {
  if ($getters.page.camera.lockZoom)
    return
    
  $getters.page.camera.zoom = 1
}

camera.fitToScreen = () => {
  let elems
  if ($getters.elems.length > 0)
    elems = $getters.elems
  else
    elems = $getters.page.elems.blocks
    



  if (elems.length === 0) {
    $getters.page.camera.pos = { x: 0, y: 0 }
    $app.camera.resetZoom()
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




  if (!$getters.page.camera.lockPos) {
    $getters.page.camera.pos.x = (worldTopLeft.x + worldBottomRight.x) / 2
    $getters.page.camera.pos.y = (worldTopLeft.y + worldBottomRight.y) / 2
  }


  

  if (!$getters.page.camera.lockZoom) {
    const displayRect = $app.display.getClientRect()

    $getters.page.camera.zoom = Math.min(
      (Math.min(70, displayRect.width / 4) - displayRect.width / 2) /
      (worldTopLeft.x - $getters.page.camera.pos.x),
      (Math.min(35, displayRect.height / 4) - displayRect.height / 2) /
      (worldTopLeft.y - $getters.page.camera.pos.y))

    $getters.page.camera.zoom = Math.min(Math.max($getters.page.camera.zoom, $app.configs.minZoom), 1)
  }
}