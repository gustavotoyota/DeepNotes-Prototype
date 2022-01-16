const notes = module.exports = {}




notes.create = async (clientPos) => {
  const elem = $app.blocks.create({
    type: 'block',

    pos: $app.coords.clientToWorld(clientPos),

    hasBody: true,
  })

  $app.defaultProps.copy([elem])

  $app.editing.start(elem)




  // Make notes centered on creation

  await $nextTick()

  const clientRect = $app.elems.getClientRect(elem)
  const worldSize = $app.sizes.screenToWorld2D(clientRect.size)

  elem.pos.x += worldSize.x * (elem.anchor.x - 0.5)
  elem.pos.y += worldSize.y * (elem.anchor.y - 0.5)


  

  return elem
}