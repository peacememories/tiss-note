var Dispatcher = require('./dispatcher.js')
var NoteStore = require('./note_store.js')
var NotesChanged = require('./messages/notes_changed.js')

module.exports = function(worker) {
    var handler = function(payload) {
        if(payload.sender != id) {
            worker.port.emit('message', payload)
        }
    }

    var id = Dispatcher.register(handler)
    worker.port.on('message', function(payload) {
        payload.sender = id
        Dispatcher.dispatch(payload)
    })

    worker.port.emit('message', NotesChanged(NoteStore.getAll()))

    worker.on('detach', function() {
        console.log('detaching ' + id)
        Dispatcher.unregister(handler)
    })
}
