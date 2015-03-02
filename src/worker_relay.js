var Dispatcher = require('./dispatcher.js')
var NoteStore = require('./note_store.js')
var NotesChanged = require('./messages/notes_changed.js')

module.exports = function(worker) {
    var id = Dispatcher.register(function(payload) {
        if(payload.sender != id) {
            worker.port.emit('message', payload)
        }
    })
    worker.port.on('message', function(payload) {
        payload.sender = id
        Dispatcher.dispatch(payload)
    })

    worker.port.emit('message', NotesChanged(NoteStore.getAll()))
}
