export default async function ({ app }) {
	(app.mixins ??= []).push({
    beforeCreate() {
      globalThis.$nuxt = this
      
      globalThis.$nextTick = $nuxt.$nextTick
      globalThis.$set = $nuxt.$set
      globalThis.$delete = $nuxt.$delete
      globalThis.$assign = (target, source) => {
        for (const key of Object.keys(source))
          $set(target, key, source[key])
      }

      globalThis.$store = $nuxt.$store
      globalThis.$getters = $store.getters
      globalThis.$commit = $store.commit

      Object.defineProperty(globalThis, '$state', {
        get() { return $store.state },
        set(value) { $store.replaceState(value) },
      })
    },

    created() {
      $app.init()
    },

    mounted() {
      document.addEventListener('pointerdown', this.onPointerDown, true)
      document.addEventListener('pointermove', this.onPointerMove)
      document.addEventListener('pointerup', this.onPointerUp)
      
      document.addEventListener('keydown', this.onKeyDown)
    },

    beforeDestroy() {
      document.removeEventListener('pointerdown', this.onPointerDown, true)
      document.removeEventListener('pointermove', this.onPointerMove)
      document.removeEventListener('pointerup', this.onPointerUp)
      
      document.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {

      onPointerDown(event) {
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

        if (event.target.nodeName === 'INPUT'
        || event.target.nodeName === 'TEXTAREA'
        || event.target.isContentEditable)
          return
        
        if (event.code === 'Delete')
          $app.deleting.perform(event)

        if (event.code === 'KeyD' && event.ctrlKey) {
          $app.selection.clone()
          event.preventDefault()
        }

        if (event.code === 'F2')
          $app.editing.start($getters.activeElem, 0)

        if (event.code === 'Backspace')
          $app.pages.back()
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