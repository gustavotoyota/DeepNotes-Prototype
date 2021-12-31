const editing = module.exports = {}




editing.start = (elem, editorIdx) => {
  if (elem.readOnly)
    return

  const page = $getters.currentPage

  if (page.elems.editing)
    return

  $app.elems.selectExclusive(elem.id)

  page.elems.activeId = elem.id
  page.elems.editing = true

  $nextTick(() => {
    const editor = $app.notes.getEditorNode(elem.id, editorIdx)
    const quill = editor.__vue__.quill

    quill.focus()
    quill.setSelection(0, 0)
    quill.setSelection(0, Infinity, 'user')
  })
}



editing.stop = () => {
  const page = $getters.currentPage

  if (!page.elems.editing)
    return

  const elem = $app.elems.getById(page.elems.activeId)
  if (!elem)
    return

  const editors = document.querySelectorAll(`#elem-${elem.id} .quill-editor`)

  for (const editor of editors)
    editor.__vue__.quill.theme.tooltip.hide()

  page.elems.editing = false
}