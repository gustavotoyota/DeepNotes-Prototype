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

  $app.pages.create('Main Page')
}