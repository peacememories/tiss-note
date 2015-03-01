var riot = require('riot')
require('./notebutton.tag')
require('./connector.js')

var forEach = Array.prototype.forEach;

var elements = []

forEach.call(document.querySelectorAll("table tbody tr"),
function(tr) {
    var refLink = tr.querySelector(".favoritesTitleCol a");
    var courseNumber = refLink.searchParams.get("courseNr");
    var actionBar = tr.querySelector(".favoritesActionCol2");
    var container = document.createElement('span')
    container.className = 'note-container'
    actionBar.appendChild(container)
    riot.mount(container, 'notebutton', {lvaid: courseNumber})
    elements.push(container)

});

global.window.self.port.on("detach", function() {
    elements.forEach(function(element) {
      element.parentNode.removeChild(element)
    })
});
