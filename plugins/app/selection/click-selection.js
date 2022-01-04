const clickSelection = module.exports = {}




clickSelection.perform = (elem, event) => {
  if (event.button === 0)
    event.stopPropagation()
  else
    return


    
    
  if (!event.ctrlKey && !event.shiftKey && !$app.selection.has(elem))
    $app.selection.clear(elem.parentId)
  else
    $app.activeElem.clear()




  if (event.ctrlKey && $app.selection.has(elem))
    $app.selection.remove(elem)
  else
    $app.activeElem.set(elem)
}