const notes = module.exports = {}




notes.create = (clientPos) => {
  const note = $app.elems.create('note')
  
  const worldPos = $app.coords.clientToWorld(clientPos)

  $merge(note, {
    pos: $utils.shallowCopy(worldPos),
    
    content: ['', ''],

    anchor: { x: 0.5, y: 0.5 },

    hasBody: false,

    collapsible: false,
    collapsed: false,
    collapsedSize: { x: 'expanded', y: 'auto' },

    size: { x: 'auto', y: 'auto' },

    expandedHeight: 0,

    movable: true,
    resizable: true,

    wrapText: true,
    readOnly: false,
  })

  $app.defaultProps.copy([note])

  $app.editing.start(note, 0)

  return note
}