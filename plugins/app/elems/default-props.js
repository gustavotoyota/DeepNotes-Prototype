const defaultProps = module.exports = {}




defaultProps.init = () => {
  $set($state.project, 'defaultProps', {
    note: {},
    container: {},
    arrow: {},
  })
}




defaultProps.set = () => {
  const elem = $getters.activeElem

  const defaultProps = $utils.deepCopy(elem)

  if (elem.type === 'note') {
    delete defaultProps.id
    delete defaultProps.pos
    delete defaultProps.content
  }

  $state.project.defaultProps[elem.type] = defaultProps
}




defaultProps.copy = (targets) => {
  for (const elem of targets)
    $utils.merge(elem, $state.project.defaultProps[elem.type])
}