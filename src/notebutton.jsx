var React = require('react/addons')
var Notepad = require('./notepad.jsx')

var NoteButton = React.createClass({
    getInitialState: function() {
        return {open: false}
    },
    toggleNotepad: function() {
        this.setState({open: !this.state.open})
    },
    render: function() {
        var classes = React.addons.classSet({
            'notepad': true,
            'open': this.state.open,
            'closed': !this.state.open
        })
        return <span className='note-container'>
            <a onClick={this.toggleNotepad}><img src=''/></a>
            <Notepad className={classes} lvaId={this.props.lvaId} />
        </span>
    }
})

module.exports = NoteButton
