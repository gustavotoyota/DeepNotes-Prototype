const clickSelection = module.exports = {}




clickSelection.perform = (elem, event) => {
  // Container shift-selection

  if (elem.parentId != null
  && event.shiftKey && $getters.elem) {
    const fromIndex = $app.elems.getIndex($getters.elem)
    const toIndex = $app.elems.getIndex(elem)

    const step = Math.sign(toIndex - fromIndex)

    for (let i = fromIndex; i !== toIndex; i += step)
      $app.selection.add($getters.regionArray[i])
  }




  if (!event.ctrlKey && !event.shiftKey && !$app.selection.has(elem))
    $app.selection.clear(elem.parentId)
  else
    $app.activeElem.clear()




  if (event.ctrlKey && $app.selection.has(elem))
    $app.selection.remove(elem)
  else
    $app.activeElem.set(elem)
}