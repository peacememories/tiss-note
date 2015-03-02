var Dispatcher = require('flux').Dispatcher

var disp = new Dispatcher()

var origDispatch = disp.dispatch.bind(disp)

disp.dispatch = function(payload) {
    origDispatch(payload)
    global.window.self.port.emit('message', payload)
}

global.window.self.port.on('message', function(payload) {
    origDispatch(payload)
})

module.exports = disp
