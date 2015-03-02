var pageMod = require('sdk/page-mod')
var data = require('sdk/self').data
WorkerRelay = require('./worker_relay.js')

module.exports = function() {
    pageMod.PageMod({
        include: "https://tiss.tuwien.ac.at/course/educationDetails.xhtml*",
        contentScriptFile: [
            data.url("course-site.js")
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
