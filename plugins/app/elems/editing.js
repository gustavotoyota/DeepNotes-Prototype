const editing = module.exports = {}




editing.start = (elem) => {
  const page = $getters.currentPage

  if (page.elems.editing)
    return

  $app.selection.clear()
  $app.elems.addToSelection(elem)
  page.elems.activeId = elem.id
  page.elems.editing = true

  $nextTick(() => {
    const quill = document.getElementById(`elem-${elem.id}`).children[0].__vue__.quill

    quill.focus()
    quill.setSelection(0, Infinity)
  })
}