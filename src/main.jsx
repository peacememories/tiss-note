var React = require('react')
var Notebutton = require('./notebutton.jsx')

var forEach = Array.prototype.forEach;

var elements = []

forEach.call(document.querySelectorAll("table tbody tr"),
function(tr) {
    var refLink = tr.querySelector(".favoritesTitleCol a");
    var courseNumber = refLink.searchParams.get("courseNr");
    var actionBar = tr.querySelector(".favoritesActionCol2");
    var child = document.createElement('span');
    actionBar.appendChild(child);
    React.render(<Notebutton lvaId={courseNumber} />, child)
    elements.push(child)
});

global.window.self.port.on("detach", function() {
    elements.forEach(function(element) {
      React.unmountComponentAtNode(element)
      element.parentNode.removeChild(element)
    })
});
