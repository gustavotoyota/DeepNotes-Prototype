const notes = module.exports = {}




notes.create = (pos) => {
  const note = $app.elems.create('note')

  $assign(note, {
    pos: $utils.shallowCopy(pos),

    content: '',
  })

  return note
}