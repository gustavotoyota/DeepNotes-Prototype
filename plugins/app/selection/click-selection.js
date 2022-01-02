const clickSelection = module.exports = {}




clickSelection.perform = (elem, event) => {
  if (event.button === 0)
    event.stopPropagation()
  else
    return


    
    
  const page = $getters.currentPage

  if (!event.ctrlKey && !event.shiftKey && !$app.selection.hasElem(elem.id))
    $app.selection.clear()
  else
    $app.activeElem.clear()




  if (event.ctrlKey && $app.selection.hasElem(elem.id)) {
    $app.selection.removeElem(elem.id)
  } else {
    $app.activeElem.set(elem.id)

    $app.elems.bringToTop(elem)
  }
}