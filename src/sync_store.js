var Dispatcher = require('./dispatcher')
var NotesChanged = require('./messages/notes_changed.js')
var NoteStore = require('./note_store.js')

var sp = require('sdk/simple-prefs')
var ps = require('sdk/preferences/service')

var sync = false;

function handleSetting() {
    sync = sp.prefs['syncStorage']
    ps.set('service.sync.prefs.sync.extensions.' + addonID + '.notes', sync)
    if(sync) {
        sp.on('notes', handleSync)
        NoteStore.on('notes_changed', handleLocal)
    } else {
        sp.removeListener('notes', handleSync)
        NoteStore.off('notes_changed', handleLocal)
    }
}

function handleSync() {
    var notes = Object.keys(sp.prefs['notes']).map(function(key) {
        return {
            courseID: key,
            note: sp.prefs['notes'][key]
        }
    })
    Dispatcher.dispatch(NotesChanged(notes))
}

function handleLocal() {
    sp.prefs['notes'] = NoteStore.getRaw()
}

NoteStore.on('notes_changed', handleLocal)

module.exports = function() {
    sp.on('syncStorage', handleSetting)
    handleSetting()
}
