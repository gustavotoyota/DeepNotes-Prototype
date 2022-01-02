globalThis.$utils = {}
export default (context, inject) => inject('utils', $utils)




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




$utils.merge = (target, ...objs) => {
  for (const obj of objs) {
    for (const [key, value] of Object.entries(obj)) {
      if (value != null && value.constructor === Object)
        target[key] = $utils.merge(target[key] ?? {}, value)
      else
        target[key] = value
    }
  }

  return target
}
$utils.merged = (...objs) => {
  const result = {}
  
  for (const obj of objs) {
    for (const [key, value] of Object.entries(obj)) {
      if (value != null && value.constructor === Object)
        result[key] = $utils.merged(result[key] ?? {}, value)
      else
        result[key] = value
    }
  }
  
  return result
}