const selection = module.exports = {}




selection.clear = (regionId) => {
  $getters.page.elems.selected = {}
  
  $app.activeElem.clear()

  if (regionId !== undefined)
    $getters.page.elems.regionId = regionId
}



selection.add = (elem) => {
  if ($app.selection.has(elem))
    return

  if (elem.parentId != $getters.regionId)
    $app.selection.clear(elem.parentId)

  $set($getters.page.elems.selected, elem.id, true)

  if ($getters.elemId == null)
    $app.activeElem.set(elem, false)
}
selection.remove = (elem) => {
  if (!$app.selection.has(elem))
    return

  if (elem.parentId != $getters.regionId)
    return

  $delete($getters.page.elems.selected, elem.id)

  if (!$app.activeElem.is(elem))
    return

  if ($getters.elems.length === 0)
    $app.activeElem.clear()
  else
    $app.activeElem.set($getters.elems.at(-1))
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

  $app.selection.add(elem)
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
  // Sort elements by Y position

  let elems = []

  for (const elem of $getters.elems) {
    const clientRect = $app.elems.getClientRect(elem)

    elems.push({
      elem: elem,
      posY: clientRect.start.y + clientRect.size.y * elem.anchor.y,
    })
  }

  elems.sort((a, b) => a.posY - b.posY)

  elems = elems.map(item => item.elem)


  

  // Move elements to region
  
  const regionId = regionElem?.id ?? null
  const regionArray = $app.elems.getChildren(regionElem)
  dropIndex = dropIndex ?? regionArray.length

  const activeElem = $getters.elem

  for (const elem of elems) {
    $app.elems.removeFromRegion(elem)
    regionArray.splice(dropIndex++, 0, elem)
      
    elem.parentId = regionId

    $app.selection.add(elem)
  }

  $app.activeElem.set(activeElem, false)
}