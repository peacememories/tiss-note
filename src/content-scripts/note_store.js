var Dispatcher = require('./dispatcher.js')
var observable = require('riot').observable
var NotesChanged = require('../messages/notes_changed.js')

var notes = {}

NoteStore = observable()

NoteStore.getAll = function() {
    return notes
}

NoteStore.get = function(courseNum) {
    return notes[courseNum] || ''
}

NoteStore.id = Dispatcher.register(function(payload) {
    if(NotesChanged.isInstance(payload)) {
        payload.notes.forEach(function(noteObj) {
            notes[noteObj.courseId] = noteObj.note
        })
        NoteStore.trigger('notes_changed')
    }
})

NoteStore.image = global.window.self.options.image

module.exports = NoteStore
