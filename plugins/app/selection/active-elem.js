const activeElem = module.exports = {}




activeElem.clear = () => {
  $getters.currentPage.elems.activeId = null
}



activeElem.set = (elem) => {
  $app.selection.add(elem.id)
  
  $getters.currentPage.elems.activeId = elem.id
  
  $app.elems.bringToTop(elem)
}
activeElem.setExclusive = (elem) => {
  $app.selection.clear()

  $app.activeElem.set(elem)
}



activeElem.is = (elemId) => {
  return elemId == $getters.currentPage.elems.activeId
}