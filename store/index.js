export const strict = false



export const state = () => ({})




// Getters

export const getters = {}

getters.currentPageId = () => {
  return $state.project.pages.path[$state.project.pages.depth]
}
getters.page = () => {
  return $state.project.pages.list.find((page) => page.id == $getters.currentPageId)
}
getters.elem = () => {
  return $app.elems.getById($getters.page.elems.activeId)
}