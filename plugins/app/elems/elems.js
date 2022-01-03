const elems = module.exports = {}




elems.create = (base) => {
  const page = $getters.currentPage

  let elem = $utils.deepCopy(base ?? {})

  $merge(elem, {
    id: page.elems.nextId++,

    parentId: null,
  })

  page.elems.list.push(elem)
  page.elems.root.push(elem.id)

  return elem
}



elems.getById = (id) => {
  return $getters.currentPage.elems.list.find((elem) => elem.id == id)
}
elems.getIndexById = (id) => {
  return $getters.currentPage.elems.list.findIndex((elem) => elem.id == id)
}



elems.getNode = (elemId) => {
  return document.getElementById(`elem-${elemId}`)
}
elems.getClientRect = (elemId) => {
  return $app.elems.getNode(elemId).getBoundingClientRect()
}



elems.removeFromList = (elemId) => {
  const index = $app.elems.getIndexById(elemId)
  $delete($getters.currentPage.elems.list, index)
}
elems.bringToTop = (elem) => {
  $app.elems.removeFromList(elem.id)
  $getters.currentPage.elems.list.push(elem)
}



elems.getSizeProp = (elem) => {
  return elem.collapsed ? 'collapsedSize' : 'size'
}



elems.getEditorNode = (elemId, editorIdx) => {
  return document.getElementById(`elem-${elemId}-editor-${editorIdx}`)
}