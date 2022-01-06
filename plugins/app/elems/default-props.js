const defaultProps = module.exports = {}




defaultProps.init = () => {
  $set($state.project, 'defaultProps', {
    note: {},
    container: {},
    arrow: {},
  })
}




defaultProps.set = () => {
  const defaultProps = $utils.deepCopy($getters.elem)

  delete defaultProps.id
  delete defaultProps.type 

  if (defaultProps.parentId != null)
    delete defaultProps.parentId

  if (defaultProps.pos != null)
    delete defaultProps.pos

  if (defaultProps.title != null)
    delete defaultProps.title
  if (defaultProps.body != null)
    delete defaultProps.body

  if (defaultProps.children != null)
    delete defaultProps.children

  $state.project.defaultProps[$getters.elem.type] = defaultProps
}




defaultProps.copy = (targets) => {
  for (const elem of targets)
    $merge(elem, $state.project.defaultProps[elem.type])
}