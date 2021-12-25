globalThis.$app = {}




$app.project = require('./project')
$app.display = require('./display')

$app.pages = require('./pages/index')
$app.elems = require('./pages/elems')
$app.notes = require('./pages/notes')

$app.zooming = require('./features/camera/zooming')
$app.panning = require('./features/camera/panning')

$app.creation = require('./features/elems/creation')
$app.editing = require('./features/elems/editing')
$app.dragging = require('./features/elems/dragging')

$app.selection = require('./features/selection/selection')
$app.clickSelection = require('./features/selection/click-selection')
$app.boxSelection = require('./features/selection/box-selection')




$app.init = () => {
  $app.panning.init()
  $app.dragging.init()
  $app.boxSelection.init()
  
  $app.project.reset()
}