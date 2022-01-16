const display = module.exports = {}




display.getClientRect = () => {
  const node = document.getElementById('display')

  const domClientRect = node.getBoundingClientRect()

  return $app.rects.fromDOM(domClientRect)
}