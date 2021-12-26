const editing = module.exports = {}




editing.start = (elem, editorIndex) => {
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
    quill.setSelection(0, Infinity)
  })
}