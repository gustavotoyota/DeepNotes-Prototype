const notes = module.exports = {}




notes.create = (clientPos) => {
  const elem = $app.blocks.create({
    type: 'note',

    pos: $app.coords.clientToWorld(clientPos),

    hasBody: true,
  })

  $app.defaultProps.copy([elem])

  $app.editing.start(elem)

  return elem
}