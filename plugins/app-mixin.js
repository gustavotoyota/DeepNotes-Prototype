export default async function ({ app }) {
	(app.mixins ??= []).push({
    beforeCreate() {
      globalThis.$nuxt = this
      
      globalThis.$set = $nuxt.$set
      globalThis.$delete = $nuxt.$delete
      globalThis.$nextTick = $nuxt.$nextTick

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

      $app.init()
    },

    beforeDestroy() {
      document.removeEventListener('pointerdown', this.onPointerDown, true)
      document.removeEventListener('pointermove', this.onPointerMove)
      document.removeEventListener('pointerup', this.onPointerUp)
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

    },
	})
}