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



selection.getElems = () => {
  const selectedElems = []

  for (const elem of $getters.regionArray)
    if (elem.id in $getters.page.elems.selected)
      selectedElems.push(elem)
  
  return selectedElems
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
  for (const elem of $getters.elems) {
    elem.pos.x += shiftX
    elem.pos.y += shiftY
  }
}



selection.moveToRegion = (regionElem, dropIndex) => {
  const regionId = regionElem?.id ?? null

  const regionArray = $app.elems.getChildren(regionElem)

  dropIndex ??= regionArray.length

  const activeElemId = $getters.elemId

  for (const elem of $getters.elems) {
    $app.elems.removeFromRegion(elem)
    regionArray.splice(dropIndex++, 0, elem)
      
    elem.parentId = regionId
    
    if (elem.id == activeElemId)
      $app.activeElem.set(elem)
    else
      $app.selection.add(elem)
  }
}