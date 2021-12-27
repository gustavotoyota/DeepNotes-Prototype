const pages = module.exports = {}




pages.create = (name) => {
  const page = {
    id: $state.project.pages.nextId++,

    name: name ?? 'Untitled',



    // Informations

    createdAt: new Date(),
    modifiedAt: new Date(),



    // Elements

    elems: {
      list: [],
      nextId: 0,
      
      selected: {},
      activeId: null,
      editing: false,
    },



    // Camera

    camera: {
      pos: { x: 0, y: 0 },
      zoom: 1,
    },
  }



  $state.project.pages.list.push(page)
  $state.project.pages.path.push(page.id)
  $state.project.pages.recent.push(page.id)



  return page
}



pages.getById = (pageId) => {
  return $state.project.pages.list.find((page) => page.id == pageId)
}