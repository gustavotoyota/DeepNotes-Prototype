const googleDrive = module.exports = {}





googleDrive.saveProject = async function () {
  if ($state.storage.googleDrive.fileId) {
    $utils.googleDrive.updateFile($state.storage.googleDrive.fileId, $app.storage.createProjectBlob())
  } else {
    const name = $utils.prompt('Name:')

    const fileId = await $utils.googleDrive.createFile(name, $app.storage.createProjectBlob())

    $state.storage.googleDrive.fileId = fileId
  }
}




googleDrive.loadProject = async function () {
  const response = await gapi.client.drive.files.get({
    fileId: $state.storage.googleDrive.fileId,
    alt: 'media'
  })

  $state.project = response.result
}