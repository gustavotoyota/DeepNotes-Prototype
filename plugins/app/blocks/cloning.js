const cloning = module.exports = {}




cloning.perform = () => {
  const activeElemId = $getters.elemId

  const selectedElems = $getters.elems

  let destIdx
  if ($getters.regionId != null)
    destIdx = $app.elems.getIndex(selectedElems.at(-1)) + 1
  
  for (const selectedElem of selectedElems) {
    let newElem
    
    if ($getters.regionId == null) {
      newElem = $app.elems.create(selectedElem)

      newElem.pos.x += 8
      newElem.pos.y += 8
    } else {
      newElem = $utils.deepCopy(selectedElem)

      $app.elems.setup(newElem, $getters.regionId)

      $getters.regionArray.splice(destIdx++, 0, newElem)
    }

    $app.selection.remove(selectedElem)

    if (selectedElem.id == activeElemId)
      $app.activeElem.set(newElem)
    else
      $app.selection.add(newElem)
  }

  if ($getters.regionId != null) {
    $nextTick(() => {
      $app.elems.scrollIntoView($getters.regionArray[destIdx - 1])
    })
  }
}