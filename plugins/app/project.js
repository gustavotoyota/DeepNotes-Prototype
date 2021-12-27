const project = module.exports = {}




project.reset = () => {
  $set($state, 'project', {
    pages: {
      list: [],
      nextId: 0,

      path: [],
      recent: [],
    },
  })

  const mainPage = $app.pages.create('Main Page')

  $state.project.pages.path.push(mainPage.id)
  $state.project.pages.recent.push(mainPage.id)
}