const deleting = module.exports = {}




deleting.deleteElem = (elem) => {
  $app.selection.remove(elem)
  $app.elems.removeFromRegion(elem)
}
deleting.deleteSelection = () => {
  for (const elem of $getters.elems)
    $app.deleting.deleteElem(elem)
}