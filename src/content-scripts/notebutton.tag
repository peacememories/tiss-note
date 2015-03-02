var NoteStore = require('./note_store.js')
require('./notepad.tag')
<notebutton>
  <a onclick={toggleNotepad}>
    <img src={getImage()}>
  </a>
  <span class={overlay: true, shown: active} onclick={toggleNotepad} />
  <notepad class={notepad: true, closed: !active} lvaid={opts.lvaid} />

  <script>
    this.active = false

    getImage() {
        //TODO make image content-dependent
        return NoteStore.image
    }

    onChange() {
        this.hasContent = NoteStore.get(opts.lvaid) != ''
    }

    toggleNotepad() {
      this.active = !this.active
    }

    this.onChange()

    NoteStore.on('notes_changed', this.onChange)
    this.on('unmount', function() {
      NoteStore.off(this.onChange)
    })
  </script>
</notebutton>
