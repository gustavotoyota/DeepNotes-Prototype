export default async function ({ app }) {
	(app.mixins = app.mixins ?? []).push({
    beforeCreate() {
      globalThis.$nuxt = this
      
      globalThis.$nextTick = $nuxt.$nextTick
      globalThis.$set = $nuxt.$set
      globalThis.$delete = $nuxt.$delete
      globalThis.$assign = (target, source) => {
        for (const key of Object.keys(source))
          $set(target, key, source[key])
      }
      globalThis.$merge = (target, ...sources) => {
        for (const source of sources) {
          for (const [key, value] of Object.entries(source)) {
            if (value != null && value.constructor === Object)
              $set(target, key, $merge(target[key] ?? {}, value))
            else
              $set(target, key, value)
          }
        }
      
        return target
      }

      globalThis.$store = $nuxt.$store
      globalThis.$getters = $store.getters
      globalThis.$commit = $store.commit

      if (!globalThis.$state) {
        Object.defineProperty(globalThis, '$state', {
          get() { return $store.state },
          set(value) { $store.replaceState(value) },
        })
      }
    },

    created() {
      $app.init()
    },

    mounted() {
      document.addEventListener('pointerdown', this.onPointerDownCapture, true)
      document.addEventListener('pointermove', this.onPointerMove)
      document.addEventListener('pointerup', this.onPointerUp)
      
      document.addEventListener('keydown', this.onKeyDown)
      document.addEventListener('keypress', this.onKeyPress)
      
      document.addEventListener('paste', this.onPaste)
    },

    beforeDestroy() {
      document.removeEventListener('pointerdown', this.onPointerDownCapture, true)
      document.removeEventListener('pointermove', this.onPointerMove)
      document.removeEventListener('pointerup', this.onPointerUp)
      
      document.removeEventListener('keydown', this.onKeyDown)
      document.removeEventListener('keypress', this.onKeyPress)
      
      document.removeEventListener('paste', this.onPaste)
    },

    methods: {

      
      onPointerDownCapture(event) {
        event.target.releasePointerCapture(event.pointerId)
      },
      onPointerMove(event) {
        $app.panning.update(event)
        $app.dragging.update(event)
        $app.boxSelection.update(event)
        $app.resizing.update(event)
      },
      onPointerUp(event) {
        $app.panning.finish(event)
        $app.dragging.finish(event)
        $app.boxSelection.finish(event)
        $app.resizing.finish(event)
      },



      onKeyDown(event) {
        if (event.target.isContentEditable
          && event.code === 'Escape')
            $app.editing.stop()
        
        if (event.code === 'KeyD' && event.ctrlKey)
          event.preventDefault()

        if (event.target.nodeName === 'INPUT'
        || event.target.nodeName === 'TEXTAREA'
        || event.target.isContentEditable)
          return
        
        if (event.code === 'Delete')
          $app.deleting.deleteSelection(event)

        if (event.code === 'KeyA' && event.ctrlKey)
          $app.selection.addAll()

        if (event.code === 'KeyD' && event.ctrlKey)
          $app.cloning.perform()

        if (event.code === 'KeyC' && event.ctrlKey)
          $app.clipboard.copy()

        if (event.code === 'KeyX' && event.ctrlKey)
          $app.clipboard.cut()

        if (event.code === 'KeyV' && event.ctrlKey && window.clipboardData)
          $app.clipboard.paste()

        if (event.code === 'F2' && $getters.elem)
          $app.editing.start($getters.elem)

        if (event.code === 'Backspace')
          $app.pages.back()

        if (event.code === 'ArrowLeft')
          $app.selection.shift(-1, 0)
        if (event.code === 'ArrowRight')
          $app.selection.shift(1, 0)
        if (event.code === 'ArrowUp')
          $app.selection.shift(0, -1)
        if (event.code === 'ArrowDown')
          $app.selection.shift(0, 1)
      },
      onKeyPress(event) {
        if (event.target.nodeName === 'INPUT'
        || event.target.nodeName === 'TEXTAREA'
        || event.target.isContentEditable)
          return
          
        if ($getters.elem)
          $app.editing.start($getters.elem)
      },



      onPaste(event) {
        if (event.target.nodeName === 'INPUT'
        || event.target.nodeName === 'TEXTAREA'
        || event.target.isContentEditable)
          return

        const text = (event.clipboardData || window.clipboardData).getData('text')

        $app.clipboard.paste(text)
      },

    },

    watch: {
  
      '$state.project': {
        deep: true,
        
        handler() {
          $state.storage.modified = true
  
          clearTimeout($state.storage.timeout)
  
          $state.storage.timeout = setTimeout(() => {
            $app.storage.saveProject()
          }, 1000)
        },
      },
  
    },
	})
}