export const strict = false



export const state = () => ({})




// Getters

export const getters = {}

getters.currentPageId = () => {
  return $state.project.pages.path.at(-1)
}
getters.currentPage = () => {
  return $state.project.pages.list[$getters.currentPageId]
}
getters.activeElem = () => {
  return $app.elems.getById($getters.currentPage.elems.activeId)
}