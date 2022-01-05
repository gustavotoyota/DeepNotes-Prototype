globalThis.$app = {}
export default (context, inject) => inject('app', $app)




$app.configs = require('./configs')

$app.project = require('./project')

$app.storage = require('./storage/storage')

$app.pages = require('./pages')

$app.display = require('./space/display')
$app.coords = require('./space/coords')
$app.sizes = require('./space/sizes')

$app.camera = require('./camera/camera')
$app.zooming = require('./camera/zooming')
$app.panning = require('./camera/panning')

$app.activeElem = require('./selection/active-elem')
$app.selection = require('./selection/selection')
$app.clickSelection = require('./selection/click-selection')
$app.boxSelection = require('./selection/box-selection')

$app.elems = require('./elems/elems')
$app.popup = require('./elems/popup')
$app.editing = require('./elems/editing')
$app.dragging = require('./elems/dragging')
$app.deleting = require('./elems/deleting')
$app.resizing = require('./elems/resizing')
$app.collapsing = require('./elems/collapsing')
$app.defaultProps = require('./elems/default-props')
$app.clipboard = require('./elems/clipboard')

$app.blocks = require('./blocks/blocks')
$app.notes = require('./blocks/notes')
$app.containers = require('./blocks/containers')




$app.init = () => {
  $app.panning.reset()
  $app.dragging.reset()
  $app.boxSelection.reset()
  $app.popup.init()
  $app.resizing.reset()
  
  $app.storage.reset()
  $app.project.reset()
}