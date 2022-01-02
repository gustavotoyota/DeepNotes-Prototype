const activeElem = module.exports = {}




activeElem.clear = () => {
  $getters.currentPage.elems.activeId = null
}



activeElem.set = (elemId) => {
  $app.selection.addElem(elemId)
  
  $getters.currentPage.elems.activeId = elemId
}
activeElem.setExclusive = (elemId) => {
  $app.selection.clear()

  $app.activeElem.set(elemId)
}



activeElem.is = (elemId) => {
  return elemId == $getters.currentPage.elems.activeId
}