const selection = module.exports = {}




selection.clear = () => {
  $getters.page.elems.selected = {}
  
  $app.activeElem.clear()
}



selection.add = (elem) => {
  $set($getters.page.elems.selected, elem.id, true)
}
selection.remove = (elem) => {
  if ($app.activeElem.is(elem.id))
    $app.activeElem.clear()

  $delete($getters.page.elems.selected, elem.id)
}



selection.has = (elem) => {
  return elem.id in $getters.page.elems.selected
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



selection.set = (elem) => {
  $app.selection.clear()

  $app.selection.add(elem.id)
}



selection.addAll = () => {
  for (const elem of $getters.page.elems.blocks)
    $app.selection.add(elem)
}



selection.clone = () => {
  for (const elem of $app.selection.getElems()) {
    const newElem = $app.elems.create(elem)

    newElem.pos.x += 8
    newElem.pos.y += 8



    $app.selection.add(newElem)
    
    if ($app.activeElem.is(elem))
      $app.activeElem.set(newElem)

    $app.selection.remove(elem)
  }
}



selection.shift = (shiftX, shiftY) => {
  for (const elem of $app.selection.getElems()) {
    elem.pos.x += shiftX
    elem.pos.y += shiftY
  }
}