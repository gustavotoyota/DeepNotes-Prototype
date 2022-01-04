const containers = module.exports = {}




containers.create = (clientPos) => {
  const elem = $app.elems.create({ type: 'container' })
  
  const worldPos = $app.coords.clientToWorld(clientPos)

  $merge(elem, {
    pos: $utils.shallowCopy(worldPos),

    hasTitle: true,
    hasBody: true,

    title: 'Untitled container',

    anchor: { x: 0.5, y: 0.5 },

    collapsible: true,
    collapsed: false,
    collapsedSize: { x: 'expanded', y: 'auto' },

    size: { x: 'auto', y: 'auto' },

    expandedHeight: 0,

    movable: true,
    resizable: true,

    wrapText: true,
    readOnly: false,
    
    children: [],
  })

  $app.defaultProps.copy([elem])

  $app.activeElem.setExclusive(elem)

  return elem
}