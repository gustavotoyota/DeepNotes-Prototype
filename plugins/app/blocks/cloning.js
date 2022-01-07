const cloning = module.exports = {}




cloning.perform = () => {
  const activeElemId = $getters.elemId
  
  for (const selectedElem of $app.selection.getElems()) {
    let newElem
    
    if ($getters.regionId == null) {
      newElem = $app.elems.create(selectedElem)

      newElem.pos.x += 8
      newElem.pos.y += 8
    } else {
      newElem = $utils.deepCopy(selectedElem)

      $app.elems.setup(newElem, $getters.regionId)

      $getters.regionArray.push(newElem)
    }

    $app.selection.remove(selectedElem)

    if (selectedElem.id == activeElemId)
      $app.activeElem.set(newElem)
    else
      $app.selection.add(newElem)
  }

  if ($getters.regionArray != null) {
    $nextTick(() => {
      $app.elems.scrollIntoView($getters.regionArray.at(-1))
    })
  }
}