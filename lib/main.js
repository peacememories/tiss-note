var data = require('sdk/self').data
var pageMod = require('sdk/page-mod')
var ss = require('sdk/simple-storage')

var notes = ss.storage.notes || {}

var Storage = {
  set: function(lvaId, note) {
    notes[lvaId] = note
    ss.storage.notes = notes
  },
  getAll: function() {
    return Object.keys(notes).map(function(lvaId) {
      return {
        lvaId: lvaId,
        note: notes[lvaId]
      }
    })
  }
}

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
    Storage.getAll().forEach(function(msg) {
      worker.port.emit('changedNote', msg)
    })
    worker.port.on('changedNote', function(msg) {
      Storage.set(msg.lvaId, msg.note)
    })
  }
});
