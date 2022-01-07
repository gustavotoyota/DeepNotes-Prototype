const selection = module.exports = {}




selection.clear = (regionId) => {
  $getters.page.elems.selected = {}
  
  $app.activeElem.clear()

  if (regionId !== undefined)
    $getters.page.elems.regionId = regionId
}



selection.add = (elem) => {
  if (elem.parentId != $getters.regionId)
    $app.selection.clear(elem.parentId)

  $set($getters.page.elems.selected, elem.id, true)
}
selection.remove = (elem) => {
  if (elem.parentId != $getters.regionId)
    return

  if ($app.activeElem.is(elem.id))
    $app.activeElem.clear()

  $delete($getters.page.elems.selected, elem.id)
}



selection.has = (elem) => {
  return elem.parentId == $getters.regionId
    && elem.id in $getters.page.elems.selected
}



selection.getElemIds = () => {
  return Object.keys($getters.page.elems.selected)
}
selection.getElems = () => {
  const elems = []

  for (const elemId of $app.selection.getElemIds()) {
    const elem = $getters.regionArray.find((item) => item.id == elemId)

    elems.push(elem)
  }

  return elems
}



selection.set = (elem) => {
  $app.selection.clear(elem.parentId)

  $app.selection.add(elem.id)
}



selection.addAll = () => {
  for (const elem of $getters.regionArray)
    $app.selection.add(elem)
}



selection.shift = (shiftX, shiftY) => {
  for (const elem of $app.selection.getElems()) {
    elem.pos.x += shiftX
    elem.pos.y += shiftY
  }
}



selection.moveToRegion = (regionElem, dropIndex) => {
  const regionId = regionElem?.id ?? null

  const region = $app.elems.extractRegion(regionElem)

  dropIndex ??= region.length

  const activeElemId = $getters.elemId

  for (const elem of $app.selection.getElems()) {
    $app.elems.removeFromRegion(elem)
    region.splice(dropIndex, 0, elem)
      
    elem.parentId = regionId
    
    if (elem.id == activeElemId)
      $app.activeElem.set(elem)
    else
      $app.selection.add(elem)
  }
}