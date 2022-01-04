const elems = module.exports = {}




elems.create = (base) => {
  base = base ?? {}

  let elem = $utils.deepCopy(base)

  elem.id = $getters.page.elems.nextId++
  elem.parentId = null 

  $getters.page.elems.blocks.push(elem)

  return elem
}



elems.getById = (elemId, region) => {
  region = region ?? $getters.page.elems.blocks

  let result = region.find((item) => item.id == elemId)
  if (result)
    return result

  for (let elem of region) {
    if (!elem.children)
      continue

    result = $app.elems.getById(elemId, elem.children)
    if (result)
      return result
  }

  return null
}



elems.getNode = (elem) => {
  return document.getElementById(`elem-${elem.id}`)
}
elems.getClientRect = (elem) => {
  return $app.elems.getNode(elem).getBoundingClientRect()
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




elems.bringToTop = (elem) => {
  if (elem.parentId != null)
    return
    
  $app.elems.removeFromRegion(elem)
  $getters.page.elems.blocks.push(elem)
}



elems.getSizeProp = (elem) => {
  return elem.collapsed ? 'collapsedSize' : 'size'
}



elems.getEditorNode = (elemId, editorIdx) => {
  return document.getElementById(`elem-${elemId}-editor-${editorIdx}`)
}