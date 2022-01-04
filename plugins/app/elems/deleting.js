const deleting = module.exports = {}




deleting.deleteElem = (elem) => {
  $app.selection.remove(elem)
  $app.elems.removeFromRegion(elem)
}
deleting.deleteSelection = (event) => {
  if (event.code !== 'Delete' && event.keyCode !== 46)
    return

  for (const elem of $app.selection.getElems())
    $app.deleting.deleteElem(elem)
}