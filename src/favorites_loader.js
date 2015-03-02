var pageMod = require('sdk/page-mod')
var data = require('sdk/self').data
WorkerRelay = require('./worker_relay.js')

module.exports = function() {
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
        onAttach: WorkerRelay
    });
}
