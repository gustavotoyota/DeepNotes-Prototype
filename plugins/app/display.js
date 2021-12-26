const display = module.exports = {}




display.getClientRect = () => {
  return document.getElementById('display').getBoundingClientRect()
}