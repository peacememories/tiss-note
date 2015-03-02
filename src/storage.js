var ss = require('sdk/simple-storage')

ss.storage.notes = ss.storage.notes || {}

var Storage = {
    getAll: function() {
        return Object.keys(ss.storage.notes)
            .map(function(courseId) {
            return {
                courseId: courseId,
                note: ss.storage.notes[courseId]
            }
        })
    },
    set: function(courseId, note) {
        console.log(courseId + ' ' + note)
        ss.storage.notes[courseId] = note
    }
}

module.exports = Storage
