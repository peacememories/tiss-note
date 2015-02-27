var React = require('react')
var NoteStore = require('./note_store.js')

var Notepad = React.createClass({
    getInitialState: function() {
        return {
            note: NoteStore[this.props.lvaId],
            changed: false
        }
    },
    handleChange: function(e) {
        this.setState({
            note: e.target.value,
            changed: true
        })
    },
    save: function() {
        NoteStore.save(this.opts.lvaId, this.state.note)
        this.setState({changed: false})
        return false
    },
    render: function() {
        var buttonText = this.state.changed ? 'Save' : 'Saved'
        return <form onSubmit={this.save}>
            <textarea onChange={this.handleChange}>{this.state.note}</textarea>
            <input type='Submit' readOnly
            disabled={!this.state.changed} value={buttonText} />
        </form>
    }
})

module.exports = Notepad
