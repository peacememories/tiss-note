var React = require('react')
var NoteStore = require('./note_store.js')

function getNoteState(lvaId) {
    return {
        note: NoteStore.get(lvaId) || '',
        changed: false
    }
}

var Notepad = React.createClass({
    getInitialState: function() {
        return getNoteState(this.props.lvaId)
    },
    _onDataChange: function() {
        this.setState(getNoteState(this.props.lvaId))
    },
    componentDidMount: function() {
        NoteStore.registerListener(this._onDataChange)
    },
    componentWillUnmount: function() {
        NoteStore.unregisterListener(this._onDataChange)
    },
    handleChange: function(e) {
        this.setState({
            note: e.target.value,
            changed: true
        })
    },
    save: function(e) {
        NoteStore.save(this.props.lvaId, this.state.note)
        e.stopPropagation()
    },
    render: function() {
        var buttonText = this.state.changed ? 'Save' : 'Saved'
        return <span {...this.props}>
            <textarea onChange={this.handleChange} value={this.state.note} />
            <button
                onClick={this.save}
                disabled={!this.state.changed}
                type='button'
            >{buttonText}</button>
        </span>
    }
})

module.exports = Notepad
