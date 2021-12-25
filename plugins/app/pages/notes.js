const notes = module.exports = {}




notes.create = (pos) => {
  const note = $app.elems.create('note')

  $set(note, 'pos', $utils.shallowCopy(pos))

  return note
}