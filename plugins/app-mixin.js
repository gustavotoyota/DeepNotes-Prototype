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

    mounted() {
      document.addEventListener('pointerdown', this.onPointerDown, true)
      document.addEventListener('pointermove', this.onPointerMove)
      document.addEventListener('pointerup', this.onPointerUp)
      
      document.addEventListener('keydown', this.onKeyDown)

      $app.init()
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
      },
      onPointerUp(event) {
        $app.panning.finish(event)
        $app.dragging.finish(event)
        $app.boxSelection.finish(event)
      },



      onKeyDown(event) {
        if (event.target.nodeName === 'INPUT'
        || event.target.nodeName === 'TEXTAREA')
          return



        $app.deleting.perform(event)
      },

    },
	})
}