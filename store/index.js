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
getters.regionElem = () => {
  if ($getters.page.elems.regionId == null)
    return null
  else
    return $app.elems.getById($getters.page.elems.regionId)
}
getters.regionArray = () => {
  if ($getters.regionElem == null)
    return $getters.page.elems.blocks
  else
    return $getters.regionElem.children
}
getters.elem = () => {
  return $getters.regionArray.find(
    (item) => item.id == $getters.page.elems.activeId)
}