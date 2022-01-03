const deleting = module.exports = {}




deleting.deleteElem = (elemId) => {
  $app.selection.remove(elemId)
  $app.elems.removeFromList(elemId)
}
deleting.deleteSelection = (event) => {
  if (event.code !== 'Delete' && event.keyCode !== 46)
    return

  for (const elemId of $app.selection.getElemIds())
    $app.deleting.deleteElem(elemId)
}