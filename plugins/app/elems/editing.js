const editing = module.exports = {}




editing.start = (elem, editorIdx) => {
  if (elem.readOnly)
    return

  const page = $getters.currentPage

  if (page.elems.editing)
    return

  $app.activeElem.setExclusive(elem)

  page.elems.editing = true

  $nextTick(() => {
    const editor = $app.elems.getEditorNode(elem.id, editorIdx)
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
    if (editor.__vue__.quill)
      editor.__vue__.quill.theme.tooltip.hide()

  page.elems.editing = false
}