var typeName = 'notes_changed'

var NotesChanged = function(notes, sender) {
    return {
        type: typeName,
        notes: notes,
        sender: sender
    }
}

NotesChanged.isInstance = function(message) {
    return message.type == typeName
}

module.exports = NotesChanged
