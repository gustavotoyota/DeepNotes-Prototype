export const strict = false



export const state = () => ({})




// Getters

export const getters = {}



getters.pageId = () => {
  return $state.project.pages.path[$state.project.pages.depth]
}
getters.page = () => {
  return $state.project.pages.list.find((page) => page.id == $getters.pageId)
}



getters.editing = () => {
  return $getters.page.elems.editing
}



getters.regionId = () => {
  return $getters.page.elems.regionId
}
getters.regionElem = () => {
  return $app.elems.getById($getters.regionId)
}
getters.regionArray = () => {
  if ($getters.regionId == null)
    return $getters.page.elems.blocks
  else
    return $getters.regionElem.children
}



getters.elems = () => {
  return $app.selection.getElems()
}



getters.elemId = () => {
  return $getters.page.elems.activeId
}
getters.elem = () => {
  return $getters.regionArray.find(
    (item) => item.id == $getters.elemId)
}