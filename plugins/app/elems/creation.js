const creation = module.exports = {}




creation.perform = (clientPos) => {
  const worldPos = $app.coords.clientToWorld(clientPos)

  const elem = $app.notes.create(worldPos)

  $app.editing.start(elem)
}