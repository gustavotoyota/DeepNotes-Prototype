const activeElem = module.exports = {}




activeElem.clear = () => {
  $getters.page.elems.activeId = null
}



activeElem.set = (elem) => {
  $app.selection.add(elem.id)
  
  $getters.page.elems.activeId = elem.id
  
  $app.elems.bringToTop(elem)
}
activeElem.setExclusive = (elem) => {
  $app.selection.clear()

  $app.activeElem.set(elem)
}



activeElem.is = (elemId) => {
  return elemId == $getters.page.elems.activeId
}