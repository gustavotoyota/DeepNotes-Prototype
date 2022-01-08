const dropping = module.exports = {}




dropping.perform = (event, regionElem, dropIndex) => {
  $app.selection.moveToRegion(regionElem, dropIndex)
  
  $app.dragging.finish(event)

  $nextTick(() => {
    const lastSelectedElem = $app.selection.getElems().at(-1)
    $app.elems.scrollIntoView(lastSelectedElem)
  })
}