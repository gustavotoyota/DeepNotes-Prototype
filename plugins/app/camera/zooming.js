const zooming = module.exports = {}




zooming.perform = (event) => {
  if ($getters.page.camera.lockZoom)
    return




  // Skip if handled

  if (event.altKey)
    event.preventDefault()
  else {
    let node = event.target

    while (node != null) {
      if ($utils.hasVertScrollbar(node))
        return

      node = node.parentNode
    }
  }




  const multiplier = event.deltaY > 0 ? (1 / 1.2) : 1.2

  $getters.page.camera.zoom = Math.min(Math.max(
    $getters.page.camera.zoom * multiplier,
    $app.configs.minZoom), $app.configs.maxZoom)
}