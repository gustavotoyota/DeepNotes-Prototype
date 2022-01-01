const clickSelection = module.exports = {}




clickSelection.perform = (elem, event) => {
  if (event.button === 0)
    event.stopPropagation()
  else
    return


    
    
  const page = $getters.currentPage

  if (!event.ctrlKey && !event.shiftKey && !$app.elems.isSelected(elem.id))
    $app.selection.clear()
  else
    page.elems.activeId = null




  if (event.ctrlKey && $app.elems.isSelected(elem.id)) {
    $app.elems.removeFromSelection(elem.id)

    page.elems.activeId = null
  } else {
    $app.elems.addToSelection(elem.id)

    page.elems.activeId = elem.id

    $app.elems.bringToTop(elem)
  }
}