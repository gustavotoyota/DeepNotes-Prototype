const project = module.exports = {}




project.reset = () => {
  $set($state, 'project', {
    pages: {
      list: [],
      nextId: 0,

      path: [],
    },
  })

  const mainPage = $app.pages.create('Main page')

  $state.project.pages.path.push(mainPage.id)
}