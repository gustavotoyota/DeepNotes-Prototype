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



notes.getEditorNode = (elemId, editorIdx) => {
  return document.getElementById(`note-${elemId}-editor-${editorIdx}`)
}



notes.expand = (elem) => {
  $app.elems.bringToTop(elem)

  elem.collapsed = false
}
notes.collapse = (elem) => {
  if (!elem.collapsible)
    return

  const clientRect = $app.elems.getClientRect(elem.id)
  elem.expandedWidth = $app.sizes.screenToWorld1D(clientRect.width)

  elem.collapsed = true
}
notes.setCollapsed = (elem, collapsed) => {
  if (collapsed)
    $app.notes.collapse(elem)
  else
    $app.notes.expand(elem)
}
notes.toggleCollapsed = (elem) => {
  if (elem.collapsed)
    $app.notes.expand(elem)
  else
    $app.notes.collapse(elem)
}