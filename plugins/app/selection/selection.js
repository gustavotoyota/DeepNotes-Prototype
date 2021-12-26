const selection = module.exports = {}




selection.clear = () => {
  const page = $getters.currentPage

  page.elems.selected = {}
  page.elems.activeId = null
}