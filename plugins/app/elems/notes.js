const notes = module.exports = {}




notes.create = (clientPos) => {
  const note = $app.elems.create({ type: 'note' })
  
  const worldPos = $app.coords.clientToWorld(clientPos)

  $merge(note, {
    pos: $utils.shallowCopy(worldPos),

    anchor: { x: 0.5, y: 0.5 },

    hasTitle: true,
    hasBody: false,
    
    title: '',
    body: '',

    collapsible: false,
    collapsed: false,
    collapsedSize: { x: 'expanded', y: 'auto' },

    size: { x: 'auto', y: 'auto' },

    expandedHeight: 0,

    movable: true,
    resizable: true,

    wrapTitle: true,
    wrapBody: true,
    
    readOnly: false,
  })

  $app.defaultProps.copy([note])

  $app.editing.start(note)

  return note
}