const deleting = module.exports = {}




deleting.perform = (event) => {
  if (event.code !== 'Delete' && event.keyCode !== 46)
    return

  const page = $getters.currentPage

  for (const elemId of Object.keys(page.elems.selected))
    $app.elems.delete(elemId)
}