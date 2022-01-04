const elems = module.exports = {}




elems.create = (base) => {
  let elem = $utils.deepCopy(base ?? {})

  $utils.merge(elem, {
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



elems.getNode = (elem) => {
  return document.getElementById(`elem-${elem.id}`)
}
elems.getClientRect = (elem) => {
  return $app.elems.getNode(elem).getBoundingClientRect()
}



elems.removeFromList = (elem) => {
  const index = $app.elems.getIndexById(elem.id)
  $delete($getters.page.elems.blocks, index)
}
elems.bringToTop = (elem) => {
  $app.elems.removeFromList(elem)
  $getters.page.elems.blocks.push(elem)
}



elems.getSizeProp = (elem) => {
  return elem.collapsed ? 'collapsedSize' : 'size'
}



elems.getEditorNode = (elemId, editorIdx) => {
  return document.getElementById(`elem-${elemId}-editor-${editorIdx}`)
}