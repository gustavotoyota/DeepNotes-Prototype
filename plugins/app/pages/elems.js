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



elems.getNode = (elem) => {
  return document.getElementById(`elem-${elem.id}`)
}
elems.getClientRect = (elem) => {
  return $app.elems.getNode(elem).getBoundingClientRect()
}



elems.addToSelection = (elem) => {
  $set($getters.currentPage.elems.selected, elem.id, true)
}
elems.removeFromSelection = (elem) => {
  $delete($getters.currentPage.elems.selected, elem.id)
}
elems.isSelected = (elem) => {
  return elem.id in $getters.currentPage.elems.selected
}



elems.delete = (elemId) => {
  const index = $app.elems.getIndexById(elemId)

  $delete($getters.currentPage.elems.list, index)
}



elems.bringToTop = (elem) => {
  $app.elems.delete(elem.id)

  $getters.currentPage.elems.list.push(elem)
}