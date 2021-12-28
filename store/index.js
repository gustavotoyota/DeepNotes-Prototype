export const strict = false



export const state = () => ({})




// Getters

export const getters = {}

getters.currentPageId = () => {
  return $state.project.pages.path[$state.project.pages.depth]
}
getters.currentPage = () => {
  return $state.project.pages.list.find((page) => page.id == $getters.currentPageId)
}
getters.activeElem = () => {
  return $app.elems.getById($getters.currentPage.elems.activeId)
}