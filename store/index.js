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
getters.region = () => {
  if ($getters.page.elems.regionId == null)
    return $getters.page.elems.blocks
  else
    return $app.elems.getById($getters.page.elems.regionId).children
}
getters.elem = () => {
  return $getters.region.find(
    (item) => item.id == $getters.page.elems.activeId)
}