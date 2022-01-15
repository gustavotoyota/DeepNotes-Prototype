const defaultProps = module.exports = {}




defaultProps.init = () => {
  $set($state.project, 'defaultProps', {
    block: {},
    arrow: {},
  })
}




defaultProps.set = () => {
  const defaultProps = $utils.deepCopy($getters.elem)

  delete defaultProps.id
  delete defaultProps.type 

  if (defaultProps.parentId !== undefined)
    delete defaultProps.parentId

  if (defaultProps.pos !== undefined)
    delete defaultProps.pos

  if (defaultProps.title !== undefined)
    delete defaultProps.title
  if (defaultProps.body !== undefined)
    delete defaultProps.body

  if (defaultProps.children !== undefined)
    delete defaultProps.children

  $state.project.defaultProps[$getters.elem.type] = defaultProps
}




defaultProps.copy = (targets) => {
  for (const elem of targets)
    $merge(elem, $state.project.defaultProps[elem.type])
}