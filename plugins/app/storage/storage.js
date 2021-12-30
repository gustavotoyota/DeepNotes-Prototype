const storage = module.exports = {}




storage.local = require('./local-storage')
storage.googleDrive = require('./google-drive')




storage.reset = function (type) {
  $set($state, 'storage', {
    type: type ?? null,

    modified: false,
    timeout: false,

    local: {
      fileHandle: null,
      file: null,
    },

    googleDrive: {
      fileId: null,
    },
  })
}




storage.saveProject = (type) => {
  if (type)
    storage.reset(type)
    
  if (!$state.storage.type)
    return

  storage[$state.storage.type].saveProject()
    
  $state.storage.modified = false
}
storage.loadProject = (type) => {
  if (type)
    storage.reset(type)

  storage[$state.storage.type].loadProject()
}





storage.createProjectJSON = function () {
  return JSON.stringify($state.project, null, 2)
}
storage.createProjectBlob = function () {
  return new Blob(
    [storage.createProjectJSON()],
    { type: 'application/json' })
}