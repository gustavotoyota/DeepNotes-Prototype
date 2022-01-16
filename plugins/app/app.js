globalThis.$app = {}
export default (context, inject) => inject('app', $app)




$app.configs = require('./configs')

$app.project = require('./project')

$app.storage = require('./storage/storage')

$app.pages = require('./pages')

$app.display = require('./space/display')
$app.coords = require('./space/coords')
$app.sizes = require('./space/sizes')
$app.rects = require('./space/rects')

$app.camera = require('./camera/camera')
$app.zooming = require('./camera/zooming')
$app.panning = require('./camera/panning')

$app.activeElem = require('./selection/active-elem')
$app.selection = require('./selection/selection')
$app.clickSelection = require('./selection/click-selection')
$app.boxSelection = require('./selection/box-selection')

$app.elems = require('./elems/elems')
$app.deleting = require('./elems/deleting')
$app.defaultProps = require('./elems/default-props')
$app.clipboard = require('./elems/clipboard')

$app.blocks = require('./blocks/blocks')
$app.notes = require('./blocks/notes')
$app.containers = require('./blocks/containers')
$app.popup = require('./blocks/popup')
$app.editing = require('./blocks/editing')
$app.dragging = require('./blocks/dragging')
$app.dropping = require('./blocks/dropping')
$app.resizing = require('./blocks/resizing')
$app.collapsing = require('./blocks/collapsing')
$app.cloning = require('./blocks/cloning')




$app.init = () => {
  $app.panning.reset()
  $app.dragging.reset()
  $app.boxSelection.reset()
  $app.popup.init()
  $app.resizing.reset()
  
  $app.storage.reset()
  $app.project.reset()
}