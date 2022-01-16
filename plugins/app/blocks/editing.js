const editing = module.exports = {}




editing.start = (elem, section) => {
  if (elem.readOnly)
    return

  if ($getters.editing)
    return

  $app.activeElem.setExclusive(elem)

  $getters.page.elems.editing = true

  $nextTick(() => {
    section = section ?? $app.elems.getTopSection(elem)
    
    const editor = $app.elems.getNode(elem, `${section}-editor`)
    if (!editor)
      return

    const quill = editor.__vue__.quill

    quill.focus()
    quill.setSelection(0, 0)
    quill.setSelection(0, Infinity, 'user')
  })
}



editing.stop = () => {
  $getters.page.elems.editing = false
}