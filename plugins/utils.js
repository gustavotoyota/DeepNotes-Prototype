globalThis.$utils = {}




$utils.deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
$utils.shallowCopy = (obj) => {
  if (Array.isArray(obj))
    return obj.slice()

  if (obj != null && obj.constructor == Object)
    return Object.assign({}, obj)

  return obj
}