const selection = module.exports = {}




selection.clear = () => {
  const page = $getters.currentPage

  if (!page)
    return

  page.elems.selected = {}
  page.elems.activeId = null
}



selection.duplicate = () => {
  const page = $getters.currentPage

  for (const elemId of Object.keys(page.elems.selected)) {
    const elem = $app.elems.getById(elemId)

    const newElem = $utils.deepCopy(elem)
    newElem.id = page.elems.nextId++
    newElem.pos.x += 8
    newElem.pos.y += 8
    page.elems.list.push(newElem)

    $app.elems.removeFromSelection(elem.id)
    $app.elems.addToSelection(newElem.id)

    if (elem.id == page.elems.activeId)
      page.elems.activeId = newElem.id
  }
}