const containers = module.exports = {}




containers.create = (clientPos) => {
  const elem = $app.blocks.create({
    type: 'block',
    
    pos: $app.coords.clientToWorld(clientPos),
    
    hasTitle: true,
    title: 'Untitled container',

    container: true,
  })

  $app.defaultProps.copy([elem])

  $app.activeElem.setExclusive(elem)

  return elem
}