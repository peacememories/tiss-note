var Dispatcher = require('./dispatcher.js')

var id = Dispatcher.register(function(payload) {
    if(payload.type == 'notes_changed') {
        if(payload.sender != id) {
            global.window.self.port.emit('notes_changed', payload.notes)
        }
    }
})

global.window.self.port.on('notes_changed', function(payload) {
    Dispatcher.dispatch({
        sender: id,
        type: 'notes_changed',
        notes: payload
    })
})
