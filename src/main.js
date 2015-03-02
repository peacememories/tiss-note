var data = require('sdk/self').data
var pageMod = require('sdk/page-mod')
var NotesChanged = require('./messages/notes_changed.js')

var Storage = require('./storage.js')

pageMod.PageMod({
    include: "https://tiss.tuwien.ac.at/education/favorites.xhtml*",
    contentScriptFile: [
    data.url("favorites.js")
    ],
    contentStyleFile: [
    data.url("content-style.css")
    ],
    contentScriptWhen: "ready",
    attachTo: ["existing", "top"],
    contentScriptOptions: {
      image: data.url('note-image.png')
    },
    onAttach: function(worker) {
        worker.port.emit('message', NotesChanged(
            Storage.getAll()
        ))
        worker.port.on('message', function(payload) {
            if(NotesChanged.isInstance(payload)) {
                payload.notes.forEach(function(noteObj) {
                    Storage.set(noteObj.courseId, noteObj.note)
                })
            }
        })
    }
});
