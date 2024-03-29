const blocks = module.exports = {}




blocks.create = (overrides) => {
  return $app.elems.create({
    parentId: null,

    linkedPageId: null,

    anchor: { x: 0.5, y: 0.5 },

    hasTitle: false,
    hasBody: false,
    
    title: '',
    body: '',

    collapsible: false,
    collapsed: false,

    expandedSize: {
      x: 'auto',

      y: {
        title: 'auto',
        body: 'auto',
        container: 'auto',
      },
    },
    collapsedSize: {
      x: 'expanded',
      
      y: {
        title: 'auto',
        body: 'auto',
        container: 'auto',
      },
    },

    movable: true,
    resizable: true,

    wrapTitle: true,
    wrapBody: true,
    
    readOnly: false,

    container: false,
    children: [],

    ...overrides,
  })
}