const editing = module.exports = {}




editing.start = (elem, editorIndex) => {
  if (elem.readOnly)
    return

  const page = $getters.currentPage

  if (page.elems.editing)
    return

  $app.selection.clear()
  $app.elems.addToSelection(elem)

  page.elems.activeId = elem.id
  page.elems.editing = true

  $nextTick(() => {
    const quillEditors = document.querySelectorAll(`#elem-${elem.id} .quill-editor`)
    const quill = quillEditors[editorIndex ?? 1].__vue__.quill

    quill.focus()
    quill.setSelection(0, Infinity, 'user')
  })
}



editing.stop = () => {
  const page = $getters.currentPage

  if (!page.elems.editing)
    return
  
  page.elems.editing = false

  if (page.elems.activeId == null)
    return
  
  const elem = $app.elems.getById(page.elems.activeId)
  const quillEditors = document.querySelectorAll(`#elem-${elem.id} .quill-editor`)

  for (const quillEditor of quillEditors) {
    const quill = quillEditor.__vue__.quill

    quill.setSelection(0, 0, 'user')
  }
}