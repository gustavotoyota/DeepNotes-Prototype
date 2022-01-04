const zooming = module.exports = {}




zooming.perform = (event) => {
  const multiplier = event.deltaY > 0 ? (1 / 1.2) : 1.2

  $getters.page.camera.zoom = Math.min(Math.max(
    $getters.page.camera.zoom * multiplier,
    $app.configs.minZoom), $app.configs.maxZoom)
}