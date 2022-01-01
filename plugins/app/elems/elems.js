const elems = module.exports = {}




elems.create = (type, parent) => {
  const page = $getters.currentPage

  const elem = {
    id: page.elems.nextId++,

    type: type,

    parent: parent ?? null,
  }

  page.elems.list.push(elem)

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



elems.activate = (elemId) => {
  $getters.currentPage.elems.activeId = elemId
}
elems.isActive = (elemId) => {
  return elemId == $getters.currentPage.elems.activeId
}



elems.selectExclusive = (elemId) => {
  $app.selection.clear()

  $app.selection.addElem(elemId)
}



elems.removeFromList = (elemId) => {
  const index = $app.elems.getIndexById(elemId)
  $delete($getters.currentPage.elems.list, index)
}
elems.delete = (elemId) => {
  $app.selection.removeElem(elemId)
  $app.elems.removeFromList(elemId)
}



elems.bringToTop = (elem) => {
  $app.elems.removeFromList(elem.id)
  $getters.currentPage.elems.list.push(elem)
}



elems.getSizeProp = (elem) => {
  return elem.collapsed ? 'collapsedSize' : 'size'
}



elems.selectAll = () => {
  for (const elem of $getters.currentPage.elems.list)
    $app.selection.addElem(elem.id)
}