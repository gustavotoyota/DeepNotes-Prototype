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
    },



    // Camera

    camera: {
      pos: { x: 0, y: 0 },
      zoom: 1,
    },
  }



  $state.project.pages.list.push(page)



  return page
}




pages.worldToDisplay = (page, worldPos) => {
  const displayRect = $app.display.getRect()

  return {
    x: displayRect.width / 2 + (worldPos.x - page.camera.pos.x) * page.camera.zoom,
    y: displayRect.height / 2 + (worldPos.y - page.camera.pos.y) * page.camera.zoom,
  }
}
pages.displayToWorld = (page, displayPos) => {
  const displayRect = $app.display.getRect()

  return {
    x: page.camera.pos.x + (displayPos.x - displayRect.width / 2) / page.camera.zoom,
    y: page.camera.pos.y + (displayPos.y - displayRect.height / 2) / page.camera.zoom,
  }
}