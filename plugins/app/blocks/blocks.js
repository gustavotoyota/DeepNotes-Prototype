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

    expandedSize: { x: 'auto', y: 'auto' },
    collapsedSize: { x: 'expanded', y: 'auto' },

    expandedHeight: 0,

    movable: true,
    resizable: true,

    wrapTitle: true,
    wrapBody: true,
    
    readOnly: false,

    ...overrides,
  })
}