const elems = module.exports = {}




elems.create = (base) => {
  let elem = $utils.deepCopy(base ?? {})

  $merge(elem, {
    id: $getters.page.elems.nextId++,

    parentId: null,
  })

  $getters.page.elems.blocks.push(elem)

  return elem
}



elems.getById = (id) => {
  return $getters.page.elems.blocks.find((elem) => elem.id == id)
}
elems.getIndexById = (id) => {
  return $getters.page.elems.blocks.findIndex((elem) => elem.id == id)
}



elems.getNode = (elemId) => {
  return document.getElementById(`elem-${elemId}`)
}
elems.getClientRect = (elemId) => {
  return $app.elems.getNode(elemId).getBoundingClientRect()
}



elems.removeFromList = (elemId) => {
  const index = $app.elems.getIndexById(elemId)
  $delete($getters.page.elems.blocks, index)
}
elems.bringToTop = (elem) => {
  $app.elems.removeFromList(elem.id)
  $getters.page.elems.blocks.push(elem)
}



elems.getSizeProp = (elem) => {
  return elem.collapsed ? 'collapsedSize' : 'size'
}



elems.getEditorNode = (elemId, editorIdx) => {
  return document.getElementById(`elem-${elemId}-editor-${editorIdx}`)
}