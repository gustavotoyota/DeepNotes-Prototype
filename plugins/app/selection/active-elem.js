const activeElem = module.exports = {}




activeElem.clear = () => {
  $getters.page.elems.activeId = null
}



activeElem.set = (elem, bringToTop) => {
  if ($app.activeElem.is(elem))
    return

  if (elem == null) {
    $app.activeElem.clear()
    return
  }

  $app.selection.add(elem)
  
  $getters.page.elems.activeId = elem.id
  
  if (bringToTop !== false)
    $app.elems.bringToTop(elem)
}
activeElem.setExclusive = (elem) => {
  $app.selection.clear()

  $app.activeElem.set(elem)
}



activeElem.is = (elem) => {
  return elem.id == $getters.elemId
}