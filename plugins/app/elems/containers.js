const containers = module.exports = {}




containers.create = (clientPos) => {
  const elem = $app.elems.create({ type: 'container' })
  
  const worldPos = $app.coords.clientToWorld(clientPos)

  $merge(elem, {
    pos: $utils.shallowCopy(worldPos),

    title: 'Untitled container',
    children: [],

    hasTitle: true,

    anchor: { x: 0.5, y: 0.5 },

    collapsible: true,
    collapsed: false,
    collapsedSize: { x: 'expanded', y: 'auto' },

    size: { x: 'auto', y: 'auto' },

    expandedHeight: 0,

    movable: true,
    resizable: true,

    readOnly: false,
  })

  $app.defaultProps.copy([elem])

  $app.activeElem.setExclusive(elem)

  return elem
}