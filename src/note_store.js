var NoteStore = global.window.self.options.notes

NoteStore.save = function(lvaId, note) {
    global.window.self.port.emit('changedNote', {
        lvaId: lvaId,
        note: note
    })
}

NoteStore.image = global.window.self.options.image

module.exports = NoteStore
