const zooming = module.exports = {}




zooming.perform = (event) => {
  const multiplier = event.deltaY > 0 ? (1 / 1.2) : 1.2

  $getters.currentPage.camera.zoom *= multiplier
}