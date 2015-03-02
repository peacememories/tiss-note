var Dispatcher = require('../dispatcher.js')

var origDispatch = Dispatcher.dispatch.bind(Dispatcher)

Dispatcher.dispatch = function(payload) {
    origDispatch(payload)
    global.window.self.port.emit('message', payload)
}

global.window.self.port.on('message', function(payload) {
    origDispatch(payload)
})

module.exports = Dispatcher
