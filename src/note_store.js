var ss = require('sdk/simple-storage')
var observable = require('riot').observable
var Dispatcher = require('./dispatcher.js')
var NotesChanged = require('./messages/notes_changed.js')

ss.storage.notes = ss.storage.notes || {}

var NoteStore = observable()

NoteStore.getAll = function() {
    return Object.keys(ss.storage.notes)
        .map(function(courseId) {
            return {
                courseId: courseId,
                note: ss.storage.notes[courseId]
            }
        })
}

NoteStore.id = Dispatcher.register(function(payload) {
    if(NotesChanged.isInstance(payload)) {
        payload.notes.forEach(function(noteObj) {
            ss.storage.notes[noteObj.courseId] = noteObj.note
        })
        NoteStore.trigger('notes_changed')
    }
})

module.exports = NoteStore
