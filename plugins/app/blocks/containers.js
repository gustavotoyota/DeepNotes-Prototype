const containers = module.exports = {}




containers.create = (clientPos) => {
  const elem = $app.blocks.create({
    type: 'container',
    
    pos: $app.coords.clientToWorld(clientPos),
    
    hasTitle: true,
    title: 'Untitled container',

    children: [],
  })

  $app.defaultProps.copy([elem])

  $app.activeElem.setExclusive(elem)

  return elem
}