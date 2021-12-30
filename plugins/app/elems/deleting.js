const deleting = module.exports = {}




deleting.perform = (event) => {
  if (event.code !== 'Delete' && event.keyCode !== 46)
    return

  for (const elemId of $app.selection.getElemIds())
    $app.elems.delete(elemId)
}