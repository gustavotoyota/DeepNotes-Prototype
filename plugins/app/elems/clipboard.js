const clipboard = module.exports = {}




clipboard.copy = () => {
  const selectedElems = $app.selection.getElems()
  if (selectedElems.length === 0)
    return


  
  
  // Calculate center position

  const centerPos = { x: 0, y: 0 }

  for (const elem of selectedElems) {
    centerPos.x += elem.pos.x
    centerPos.y += elem.pos.y
  }

  centerPos.x /= selectedElems.length
  centerPos.y /= selectedElems.length




  const clipboardObj = {
    elems: [],
  }


  

  for (const selectedElem of $app.selection.getElems()) {
    const clipboardElem = $utils.deepCopy(selectedElem)

    delete clipboardElem.id

    clipboardElem.pos.x -= centerPos.x
    clipboardElem.pos.y -= centerPos.y

    clipboardObj.elems.push(clipboardElem)
  }




  $utils.writeToClipboard(
    JSON.stringify(clipboardObj, null, 2)
  )
}




clipboard.paste = async (text) => {
  text = text ?? await $utils.readFromClipboard()
  if (text === '')
    return

  

  
  // Get clipboard object

  let clipboardObj

  try {
    clipboardObj = JSON.parse(text)
  } catch (err) {
    console.log(err)
    
    return
  }




  // Paste elems
  
  $app.selection.clear()

  for (const clipboardElem of clipboardObj.elems) {
    const newElem = $app.elems.create(clipboardElem)

    newElem.pos.x += $getters.page.camera.pos.x
    newElem.pos.y += $getters.page.camera.pos.y
    
    $app.selection.add(newElem)
  }

  $app.activeElem.set($getters.page.elems.blocks.at(-1))
}



clipboard.cut = () => {
  $app.clipboard.copy()

  $app.deleting.deleteSelection()
}