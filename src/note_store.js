var notes = {}
var listeners = []

function emitChange() {
  listeners.forEach(function(listener) {
    listener()
  })
}

function storeChange(lvaId, note) {
  notes[lvaId] = note
  emitChange()
}

var NoteStore = {
  get: function(lvaId) {
    return notes[lvaId]
  },
  save: function(lvaId, note) {
    global.window.self.port.emit('changedNote', {
        lvaId: lvaId,
        note: note
    })
    storeChange(lvaId, note)
  },
  registerListener: function(listener) {
    listeners.push(listener)
  },
  unregisterListener: function(listener) {
    listeners.splice(listeners.indexOf(listener), 1)
  }
}

NoteStore.image = global.window.self.options.image

global.window.self.port.on('changedNote', function(msg) {
  storeChange(msg.lvaId, msg.note)
})

module.exports = NoteStore
