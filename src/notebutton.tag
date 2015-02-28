var NoteStore = require('./note_store.js')
require('./notepad.tag')
<notebutton>
  <a onclick={toggleNotepad}>
    <img src={image}>
  </a>
  <span class={overlay: true, shown: active} onclick={toggleNotepad}></span>
  <notepad class={notepad: true, closed: !active} lvaid={opts.lvaid} />

  <script>
    this.image = NoteStore.image
    this.active = false
    toggleNotepad() {
      this.active = !this.active
    }
  </script>
</notebutton>
