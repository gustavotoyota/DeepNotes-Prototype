const notes = module.exports = {}




notes.create = (pos) => {
  const note = $app.elems.create('note')

  $assign(note, {
    pos: $utils.shallowCopy(pos),

    title: '',
    content: '',

    hasTitle: false,
    collapsible: false,

    movable: true,
    resizable: true,

    autoWidth: true,
    autoHeight: true,

    horizontalScrollbars: true,
    verticalScrollbars: true,

    wrapText: true,
    readOnly: false,
  })

  return note
}