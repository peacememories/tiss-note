var data = require('sdk/self').data
var pageMod = require('sdk/page-mod')

var Storage = require('./storage.js')

pageMod.PageMod({
    include: "https://tiss.tuwien.ac.at/education/favorites.xhtml*",
    contentScriptFile: [
    data.url("content-script.js")
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
        worker.port.emit('message', {
            type: 'notes_changed',
            notes: Storage.getAll()
        })
        worker.port.on('message', function(payload) {
            if(payload.type == 'notes_changed') {
                payload.notes.forEach(function(noteObj) {
                    Storage.set(noteObj.courseId, noteObj.note)
                })
            }
        })
    }
});
