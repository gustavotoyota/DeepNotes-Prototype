const defaultProps = module.exports = {}




defaultProps.init = () => {
  $set($state.project, 'defaultProps', {
    note: {},
    container: {},
    arrow: {},
  })
}




defaultProps.set = () => {
  const elem = $getters.elem

  const defaultProps = $utils.deepCopy(elem)

  delete defaultProps.id
  delete defaultProps.pos

  if (elem.type === 'note')
    delete defaultProps.content
  else if (elem.type === 'container')
    delete defaultProps.title

  $state.project.defaultProps[elem.type] = defaultProps
}




defaultProps.copy = (targets) => {
  for (const elem of targets)
    $utils.merge(elem, $state.project.defaultProps[elem.type])
}