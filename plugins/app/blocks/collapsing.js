const collapsing = module.exports = {}




collapsing.expand = (elem) => {
  elem.collapsed = false
  
  $app.elems.bringToTop(elem)
}
collapsing.collapse = (elem) => {
  if (!elem.collapsible)
    return

  const bodyElem = document.getElementById(`elem-${elem.id}-body`)

  if (bodyElem) {
    const clientRect = bodyElem.getBoundingClientRect()
    elem.expandedHeight = $app.sizes.screenToWorld1D(clientRect.height)
  }

  elem.collapsed = true
  
  $app.elems.bringToTop(elem)
}



collapsing.setCollapsed = (elem, collapsed) => {
  if (collapsed === elem.collapsed)
    return

  if (collapsed)
    $app.collapsing.collapse(elem)
  else
    $app.collapsing.expand(elem)
}



collapsing.toggleCollapsed = (elem) => {
  $app.collapsing.setCollapsed(elem, !elem.collapsed)
}