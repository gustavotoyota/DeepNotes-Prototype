const elems = module.exports = {}




elems.create = (base) => {
  base = base ?? {}

  let elem = $utils.deepCopy(base)

  $app.elems.setup(elem)

  $getters.page.elems.blocks.push(elem)

  return elem
}



elems.setup = (elem, parentId) => {
  elem.id = $getters.page.elems.nextId++

  elem.parentId = parentId ?? null

  if (elem.children)
    for (const child of elem.children)
      $app.elems.setup(child, elem.id)
}



elems.getById = (elemId, regionArray) => {
  regionArray = regionArray ?? $getters.page.elems.blocks

  let result = regionArray.find((item) => item.id == elemId)
  if (result)
    return result

  for (let elem of regionArray) {
    if (!elem.children)
      continue

    result = $app.elems.getById(elemId, elem.children)
    if (result)
      return result
  }

  return null
}



elems.getNode = (elem, part) => {
  if (part == null)
    return document.getElementById(`elem-${elem.id}`)
  else
    return document.getElementById(`elem-${elem.id}-${part}`)
}
elems.getClientRect = (elem) => {
  const node = $app.elems.getNode(elem, 'frame')

  return node.getBoundingClientRect()
}



elems.getRegion = (elem) => {
  if (elem.parentId == null)
    return $getters.page.elems.blocks
  else
    return $app.elems.getById(elem.parentId).children
}
elems.removeFromRegion = (elem) => {
  $utils.removeFromArray($app.elems.getRegion(elem), elem)
}



elems.extractRegion = (elem) => {
  if (elem == null)
    return $getters.page.elems.blocks
  else
    return elem.children
}




elems.bringToTop = (elem) => {
  if (elem.parentId != null)
    return
    
  $app.elems.removeFromRegion(elem)
  $getters.page.elems.blocks.push(elem)
}



elems.getSizeProp = (elem) => {
  return elem.collapsed ? 'collapsedSize' : 'size'
}



elems.getEditorNode = (elem, editorIdx) => {
  return $app.elems.getNode(elem, `editor-${editorIdx}`)
}



elems.isOnTop = (elem) => {
  const region = elems.getRegion(elem)

  return elem.id == region.at(-1).id
}



elems.scrollIntoView = (elem) => {
  if (elem.parentId == null)
    return

  const parentElem = $app.elems.getById(elem.parentId)
  const scrollBoxNode = $app.elems.getNode(parentElem, 'scrollbox')

  if (scrollBoxNode.scrollHeight <= scrollBoxNode.clientHeight)
    return

  const node = $app.elems.getNode(elem, 'frame')
  
  node.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  })
}