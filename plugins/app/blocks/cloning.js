const cloning = module.exports = {}




cloning.perform = () => {
  let activeElem = $getters.elem

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

    if (selectedElem === activeElem)
      activeElem = newElem

    $app.selection.remove(selectedElem)
    $app.selection.add(newElem)
  }

  $app.activeElem.set(activeElem)

  if ($getters.regionId != null) {
    $nextTick(() => {
      $app.elems.scrollIntoView($getters.regionArray[destIdx - 1])
    })
  }
}