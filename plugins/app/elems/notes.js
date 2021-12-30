const notes = module.exports = {}




notes.create = (pos) => {
  const note = $app.elems.create('note')

  $assign(note, {
    pos: $utils.shallowCopy(pos),
    size: { x: 'auto', y: 'auto' },
    anchor: { x: 0.5, y: 0.5 },

    content: ['', ''],

    hasBody: false,

    collapsible: false,
    collapsed: false,
    collapsedSize: { x: 'expanded', y: 'auto' },

    expandedWidth: 0,

    movable: true,
    resizable: true,

    wrapText: true,
    readOnly: false,
  })

  return note
}