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
      NoteStore.save(opts.lvaid, this.noteInput.value)
    }

    NoteStore.registerListener(this.onChange)
    this.on('unmount', function() {
      console.log('unmounting ' + opts.lvaid)
      NoteStore.unregisterListener(this.onChange)
    })
  </script>
</notepad>
