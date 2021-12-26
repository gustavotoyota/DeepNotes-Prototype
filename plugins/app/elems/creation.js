const creation = module.exports = {}




creation.perform = (clientPos) => {
  const displayPos = $app.display.fromClient(clientPos)
  const worldPos = $app.pages.displayToWorld($getters.currentPage, displayPos)

  const elem = $app.notes.create(worldPos)

  $app.editing.start(elem)
}