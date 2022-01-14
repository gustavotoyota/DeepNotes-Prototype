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
  if (elemId == null)
    return null

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
elems.getClientRect = (elem, part) => {
  const node = $app.elems.getNode(elem, part ?? 'frame')

  return node.getBoundingClientRect()
}




elems.getRegionElem = (elem) => {
  return $app.elems.getById(elem.parentId)
}
elems.getRegionArray = (elem) => {
  if (elem.parentId == null)
    return $getters.page.elems.blocks
  else if (elem.parentId == $getters.regionId)
    return $getters.regionArray
  else
    return $app.elems.getById(elem.parentId).children
}



elems.removeFromRegion = (elem) => {
  const regionArray = $app.elems.getRegionArray(elem)

  $utils.removeFromArray(regionArray, elem)
}



elems.getChildren = (elem) => {
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
  return elem.collapsed ? 'collapsedSize' : 'expandedSize'
}



elems.isOnTop = (elem) => {
  const regionArray = elems.getRegionArray(elem)

  return elem === regionArray.at(-1)
}



elems.scrollIntoView = (elem) => {
  if (elem.parentId == null)
    return

  const elemNode = $app.elems.getNode(elem, 'frame')
  
  elemNode.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  })
}



elems.getIndex = (elem) => {
  const regionArray = $app.elems.getRegionArray(elem)

  return regionArray.findIndex(item => item === elem)
}



elems.getTopSection = (elem) => {
  if (elem.hasTitle)
    return 'title'
  else if (elem.hasBody)
    return 'body'
  else if (elem.container)
    return 'container'
}
elems.getBottomSection = (elem) => {
  if (elem.collapsed)
    return $app.elems.getTopSection(elem)
  else if (elem.container)
    return 'container'
  else if (elem.hasBody)
    return 'body'
  else if (elem.hasTitle)
    return 'title'
}
elems.getNumSections = (elem) => {
  let numSections = 0

  if (elem.hasTitle)
    ++numSections
  if (elem.hasBody)
    ++numSections
  if (elem.container)
    ++numSections

  return numSections
}