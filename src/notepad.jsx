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
    save: function(e) {
        NoteStore.save(this.props.lvaId, this.state.note)
        this.setState({changed: false})
        e.stopPropagation()
    },
    render: function() {
        var buttonText = this.state.changed ? 'Save' : 'Saved'
        return <span {...this.props}>
            <textarea onChange={this.handleChange}>{this.state.note}</textarea>
            <button
                onClick={this.save}
                disabled={!this.state.changed}
                type='button'
            >{buttonText}</button>
        </span>
    }
})

module.exports = Notepad
