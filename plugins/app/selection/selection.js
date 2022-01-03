const selection = module.exports = {}




selection.clear = () => {
  const page = $getters.currentPage

  if (!page)
    return

  page.elems.selected = {}
  
  $app.activeElem.clear()
}



selection.addElem = (elemId) => {
  $set($getters.currentPage.elems.selected, elemId, true)
}
selection.removeElem = (elemId) => {
  if ($app.activeElem.is(elemId))
    $app.activeElem.clear()

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



selection.set = (elemId) => {
  $app.selection.clear()

  $app.selection.addElem(elemId)
}



selection.clone = () => {
  const page = $getters.currentPage

  for (const elem of $app.selection.getElems()) {
    const newElem = $app.elems.create(elem)

    newElem.pos.x += 8
    newElem.pos.y += 8



    $app.selection.addElem(newElem.id)
    
    if ($app.activeElem.is(elem.id))
      $app.activeElem.set(newElem.id)

    $app.selection.removeElem(elem.id)
  }
}



selection.shift = (shiftX, shiftY) => {
  for (const elem of $app.selection.getElems()) {
    elem.pos.x += shiftX
    elem.pos.y += shiftY
  }
}