const selection = module.exports = {}




selection.clear = () => {
  $getters.page.elems.selected = {}
  
  $app.activeElem.clear()
}



selection.add = (elemId) => {
  $set($getters.page.elems.selected, elemId, true)
}
selection.remove = (elemId) => {
  if ($app.activeElem.is(elemId))
    $app.activeElem.clear()

  $delete($getters.page.elems.selected, elemId)
}



selection.has = (elemId) => {
  return elemId in $getters.page.elems.selected
}



selection.getElemIds = () => {
  return Object.keys($getters.page.elems.selected)
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

  $app.selection.add(elemId)
}



selection.addAll = () => {
  for (const elem of $getters.page.elems.list)
    $app.selection.add(elem.id)
}



selection.clone = () => {
  for (const elem of $app.selection.getElems()) {
    const newElem = $app.elems.create(elem)

    newElem.pos.x += 8
    newElem.pos.y += 8



    $app.selection.add(newElem.id)
    
    if ($app.activeElem.is(elem.id))
      $app.activeElem.set(newElem)

    $app.selection.remove(elem.id)
  }
}



selection.shift = (shiftX, shiftY) => {
  for (const elem of $app.selection.getElems()) {
    elem.pos.x += shiftX
    elem.pos.y += shiftY
  }
}