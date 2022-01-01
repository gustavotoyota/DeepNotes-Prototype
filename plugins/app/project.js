const project = module.exports = {}




project.reset = () => {
  $set($state, 'project', {
    pages: {
      list: [],
      nextId: 0,

      path: [],
      depth: -1,

      recent: [],
    },
  })

  $app.defaultProps.init()

  $app.pages.create('Main Page')
}