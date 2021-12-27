globalThis.$app = {}




$app.project = require('./project')

$app.display = require('./display')
$app.coords = require('./coords')
$app.sizes = require('./sizes')

$app.pages = require('./pages/index')
$app.elems = require('./pages/elems')
$app.notes = require('./pages/notes')

$app.zooming = require('./camera/zooming')
$app.panning = require('./camera/panning')

$app.popup = require('./elems/popup')
$app.creation = require('./elems/creation')
$app.editing = require('./elems/editing')
$app.dragging = require('./elems/dragging')
$app.deleting = require('./elems/deleting')
$app.tooltips = require('./elems/tooltips')
$app.resizing = require('./elems/resizing')

$app.selection = require('./selection/selection')
$app.clickSelection = require('./selection/click-selection')
$app.boxSelection = require('./selection/box-selection')




$app.init = () => {
  $app.panning.init()
  $app.dragging.init()
  $app.boxSelection.init()
  $app.popup.init()
  $app.resizing.init()
  
  $app.project.reset()
}