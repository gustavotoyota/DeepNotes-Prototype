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
    page.elems.activeId = null




  if (event.ctrlKey && $app.selection.hasElem(elem.id)) {
    $app.selection.removeElem(elem.id)

    page.elems.activeId = null
  } else {
    $app.selection.addElem(elem.id)

    page.elems.activeId = elem.id

    $app.elems.bringToTop(elem)
  }
}