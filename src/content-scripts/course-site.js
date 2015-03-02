var riot = require('riot')
require('./notebutton.tag')

var courseId = new URL(global.window.location).searchParams.get('courseNr')

var parent = document.querySelector('#contentInner > h1')
var container = document.createElement('span')
container.className = 'note-container'

parent.appendChild(container)

riot.mount(container, 'notebutton', {
    lvaid: courseId
})

global.window.self.port.on('detach', function() {
    parent.removeChild(container)
})
