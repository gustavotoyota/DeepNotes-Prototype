const creation = module.exports = {}




creation.perform = (event) => {
  const displayPos = $app.display.getMousePos(event)
  const worldPos = $app.pages.displayToWorld($getters.currentPage, displayPos)

  const elem = $app.notes.create(worldPos)

  $app.editing.start(elem)
}