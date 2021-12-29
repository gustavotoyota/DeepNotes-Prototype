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
    const quillEditors = document.querySelectorAll(`#elem-${elem.id} .quill-editor`)
    const quill = quillEditors[editorIdx ?? 0].__vue__.quill

    quill.focus()
    quill.setSelection(0, Infinity, 'user')
  })
}



editing.stop = () => {
  const page = $getters.currentPage

  if (!page.elems.editing)
    return
  
  page.elems.editing = false
  
  const elem = $app.elems.getById(page.elems.activeId)
  if (!elem)
    return

  const quillEditors = document.querySelectorAll(`#elem-${elem.id} .quill-editor`)

  for (const quillEditor of quillEditors) {
    const quill = quillEditor.__vue__.quill

    quill.setSelection(0, 0, 'user')
  }
}