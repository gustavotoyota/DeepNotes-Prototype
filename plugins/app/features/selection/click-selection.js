const clickSelection = module.exports = {}




clickSelection.perform = (elem, event) => {
  if (event.button === 0)
    event.stopPropagation()
  else
    return


    
    
  const page = $getters.currentPage

  if (!event.ctrlKey && !$app.elems.isSelected(elem))
    $app.selection.clear()
  else
    page.elems.activeId = null




  if (event.ctrlKey && $app.elems.isSelected(elem)) {
    $delete(page.elems.selected, elem.id)

    page.elems.activeId = null
  } else {
    $set(page.elems.selected, elem.id, true)

    page.elems.activeId = elem.id
  }
}