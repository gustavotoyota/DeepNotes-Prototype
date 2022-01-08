const blocks = module.exports = {}




blocks.create = (overrides) => {
  return $app.elems.create({
    parentId: null,

    linkedPageId: null,

    anchor: { x: 0.5, y: 0.5 },

    hasTitle: false,
    hasBody: true,
    
    title: '',
    body: '',

    collapsible: false,
    collapsed: false,
    collapsedSize: { x: 'expanded', y: 'auto' },

    size: { x: 'auto', y: 'auto' },

    expandedHeight: 0,

    movable: true,
    resizable: true,

    wrapTitle: true,
    wrapBody: true,
    
    readOnly: false,

    ...overrides,
  })
}