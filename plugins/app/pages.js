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
      nextId: 0,

      blocks: [],
      arrows: [],
      
      regionId: null,
      selected: {},
      activeId: null,
      editing: false,
    },



    // Camera

    camera: {
      pos: { x: 0, y: 0 },
      zoom: 1,

      lockPos: false,
      lockZoom: false,
    },
  }



  $state.project.pages.list.push(page)
  
  $app.pages.navigate(page.id)



  return page
}



pages.getById = (pageId) => {
  return $state.project.pages.list.find((page) => page.id == pageId)
}


pages.bumpRecent = () => {
  const pageId = $getters.page.id

  const pageIdx = $state.project.pages.recent.indexOf(pageId)
  if (pageIdx >= 0)
    $delete($state.project.pages.recent, pageIdx)

  $state.project.pages.recent.push(pageId)
}


pages.changeDepth = (pageDepth) => {
  $state.project.pages.depth = Math.max(0, pageDepth)
  
  $app.selection.clear(null)

  $app.pages.bumpRecent()
}


pages.navigate = (pageId) => {
  const pageDepth = $state.project.pages.path.indexOf(pageId)

  if (pageDepth >= 0) {
    $app.pages.changeDepth(pageDepth)
    return
  }

  $state.project.pages.path.splice($state.project.pages.depth + 1)
  $state.project.pages.path.push(pageId)
  
  $app.pages.changeDepth($state.project.pages.depth + 1)
}


pages.back = () => {
  $app.pages.changeDepth($state.project.pages.depth - 1)
}



pages.getRecent = () => {
  const recentPages = []

  for (let i = $state.project.pages.recent.length - 1; i >= 0; --i) {
    const recentPageId = $state.project.pages.recent[i]

    if (recentPageId == $getters.page.id)
      continue

    const recentPage = $app.pages.getById(recentPageId)

    recentPages.push({ text: recentPage.name, value: recentPageId })
  }
      
  recentPages.push({ text: $getters.page.name, value: $getters.page.id })

  return recentPages
}