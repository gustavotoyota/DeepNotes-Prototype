const editing = module.exports = {}




editing.start = (elem, editorIdx) => {
  if (elem.readOnly)
    return

  if ($getters.page.elems.editing)
    return

  $app.activeElem.setExclusive(elem)

  $getters.page.elems.editing = true

  $nextTick(() => {
    if (editorIdx == null) {
      if (elem.hasTitle || (elem.hasBody && elem.collapsed))
        editorIdx = 0
      else
        editorIdx = 1
    }
    
    const editor = $app.elems.getEditorNode(elem, editorIdx)
    const quill = editor.__vue__.quill

    quill.focus()
    quill.setSelection(0, 0)
    quill.setSelection(0, Infinity, 'user')
  })
}



editing.stop = () => {
  if (!$getters.page.elems.editing)
    return

  const elem = $app.elems.getById($getters.page.elems.activeId)
  if (!elem)
    return

  const editors = document.querySelectorAll(`#elem-${elem.id} .quill-editor`)

  for (const editor of editors)
    if (editor.__vue__.quill)
      editor.__vue__.quill.theme.tooltip.hide()

  $getters.page.elems.editing = false
}