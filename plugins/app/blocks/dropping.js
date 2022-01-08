const dropping = module.exports = {}




dropping.perform = (event, regionElem, dropIndex) => {
  $app.selection.moveToRegion(regionElem, dropIndex)
  
  $app.dragging.finish(event)
}