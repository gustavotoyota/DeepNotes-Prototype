const notes = module.exports = {}




notes.create = (clientPos) => {
  const note = $app.elems.create('note')
  
  const worldPos = $app.coords.clientToWorld(clientPos)

  $assign(note, {
    pos: $utils.shallowCopy(worldPos),
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

  $app.editing.start(note, 0)

  return note
}



notes.getEditorNode = (elemId, editorIdx) => {
  return document.getElementById(`note-${elemId}-editor-${editorIdx}`)
}