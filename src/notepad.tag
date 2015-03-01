var Dispatcher = require('./dispatcher.js')
var NoteStore = require('./note_store.js')
<notepad>
    <textarea name='noteInput' oninput={onInput}>{note}</textarea>
    <button onclick={save} type='button'>{buttonMessage()}</button>
    <script>
        this.note = NoteStore.get(opts.lvaid)
        this.changed = false

        buttonMessage() {
            return this.changed ? 'Save' : 'Saved'
        }

        onChange() {
            this.note = NoteStore.get(opts.lvaid)
            this.update()
        }

        onInput() {
            this.changed = true
        }

        save() {
            this.changed = false
            Dispatcher.dispatch({
                type: 'notes_changed',
                notes: [
                    {
                        courseId: opts.lvaid,
                        note: this.noteInput.value
                    }
                ]
            })
        }

        NoteStore.on('notes_changed', this.onChange)
        this.on('unmount', function() {
            NoteStore.off(this.onChange)
        })
    </script>
</notepad>
