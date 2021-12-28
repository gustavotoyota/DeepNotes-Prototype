const notes = module.exports = {}




notes.create = (pos) => {
  const note = $app.elems.create('note')

  $assign(note, {
    pos: $utils.shallowCopy(pos),
    size: { x: null, y: null },
    anchor: { x: 0.5, y: 0.5 },

    title: '',
    content: '',

    hasTitle: false,

    collapsible: false,
    collapsed: false,
    collapsedSize: { x: null, y: null },

    movable: true,
    resizable: true,

    wrapText: true,
    readOnly: false,
  })

  return note
}