const collapsing = module.exports = {}




collapsing.expand = (elem) => {
  $app.elems.bringToTop(elem)

  elem.collapsed = false
}
collapsing.collapse = (elem) => {
  if (!elem.collapsible)
    return

  const clientRect = $app.elems.getClientRect(elem.id)
  elem.expandedWidth = $app.sizes.screenToWorld1D(clientRect.width)

  elem.collapsed = true
}
collapsing.setCollapsed = (elem, collapsed) => {
  if (collapsed)
    $app.collapsing.collapse(elem)
  else
    $app.collapsing.expand(elem)
}
collapsing.toggleCollapsed = (elem) => {
  if (elem.collapsed)
    $app.collapsing.expand(elem)
  else
    $app.collapsing.collapse(elem)
}