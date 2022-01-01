const selection = module.exports = {}




selection.clear = () => {
  const page = $getters.currentPage

  if (!page)
    return

  page.elems.selected = {}
  page.elems.activeId = null
}



selection.addElem = (elemId) => {
  $set($getters.currentPage.elems.selected, elemId, true)
}
selection.removeElem = (elemId) => {
  $delete($getters.currentPage.elems.selected, elemId)
}



selection.hasElem = (elemId) => {
  return elemId in $getters.currentPage.elems.selected
}



selection.getElemIds = () => {
  return Object.keys($getters.currentPage.elems.selected)
}
selection.getElems = () => {
  const elems = []

  for (const elemId of $app.selection.getElemIds()) {
    const elem = $app.elems.getById(elemId)

    elems.push(elem)
  }

  return elems
}



selection.clone = () => {
  const page = $getters.currentPage

  for (const elem of $app.selection.getElems()) {
    const newElem = $utils.deepCopy(elem)

    newElem.id = page.elems.nextId++

    newElem.pos.x += 8
    newElem.pos.y += 8

    page.elems.list.push(newElem)



    $app.selection.removeElem(elem.id)
    $app.selection.addElem(newElem.id)



    if ($app.elems.isActive(elem.id))
      page.elems.activeId = newElem.id
  }
}



selection.shift = (shiftX, shiftY) => {
  for (const elem of $app.selection.getElems()) {
    elem.pos.x += shiftX
    elem.pos.y += shiftY
  }
}