const cloning = module.exports = {}




cloning.perform = () => {
  const activeElemId = $getters.elemId
  
  for (const elem of $app.selection.getElems()) {
    const newElem = $app.elems.create(elem)

    newElem.pos.x += 8
    newElem.pos.y += 8

    $app.selection.remove(elem)

    if (elem.id == activeElemId)
      $app.activeElem.set(newElem)
    else
      $app.selection.add(newElem)
  }
}