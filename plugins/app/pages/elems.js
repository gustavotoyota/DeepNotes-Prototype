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



elems.select = (elem) => {
  $set($getters.currentPage.elems.selected, elem.id, true)
}
elems.unselect = (elem) => {
  $delete($getters.currentPage.elems.selected, elem.id)
}
elems.isSelected = (elem) => {
  return elem.id in $getters.currentPage.elems.selected
}