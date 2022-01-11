const saveAs = require('file-saver').saveAs




const localStorage = module.exports = {}




localStorage.loadProject = function () {
  const fileReader = new FileReader()
  
  fileReader.onload = (event) => {
    $state.project = JSON.parse(event.target.result)
  }

  fileReader.readAsText($state.storage.local.file)
}




localStorage.saveProject = async function () {
  if (!window.showSaveFilePicker) {
    saveAs($app.storage.createProjectBlob(), 'project.json')
    return
  }


    
  try {
    if (!$state.storage.local.fileHandle) {
      $state.storage.local.fileHandle = await showSaveFilePicker({
        types: [{ accept: { 'application/json': [] } }],
      })
    }

    const writable = await $state.storage.local.fileHandle.createWritable()
    await writable.write($app.storage.createProjectBlob())
    await writable.close()
  } catch (err) {
    console.log(err)
  }
}