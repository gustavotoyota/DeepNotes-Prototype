const deleting = module.exports = {}




deleting.deleteSelection = () => {
  for (const elem of $getters.elems)
    $app.elems.removeFromRegion(elem)

  $app.selection.clear()
}