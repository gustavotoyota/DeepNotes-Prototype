globalThis.$app = {}




$app.project = require('./project')

$app.storage = require('./storage/storage')

$app.pages = require('./pages/pages')

$app.display = require('./utils/display')
$app.coords = require('./utils/coords')
$app.sizes = require('./utils/sizes')

$app.camera = require('./camera/camera')
$app.zooming = require('./camera/zooming')
$app.panning = require('./camera/panning')

$app.selection = require('./selection/selection')
$app.clickSelection = require('./selection/click-selection')
$app.boxSelection = require('./selection/box-selection')

$app.elems = require('./elems/elems')
$app.notes = require('./elems/notes')
$app.popup = require('./elems/popup')
$app.creation = require('./elems/creation')
$app.editing = require('./elems/editing')
$app.dragging = require('./elems/dragging')
$app.deleting = require('./elems/deleting')
$app.resizing = require('./elems/resizing')




$app.init = () => {
  $app.panning.init()
  $app.dragging.init()
  $app.boxSelection.init()
  $app.popup.init()
  $app.resizing.init()
  
  $app.storage.reset()
  $app.project.reset()
}