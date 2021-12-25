<template>
  <div :style="`height: 100%;
  background-color: #1e1e1e;`"
  @pointerdown="onPointerDown"
  @dblclick="onDoubleClick">
  </div>
</template>

<script>
export default {

  methods: {

    onPointerDown(event) {
      if (event.button === 0 && !event.ctrlKey)
        $app.selection.clear()

      $app.boxSelection.start(event)
    },

    onDoubleClick(event) {
      const displayPos = $app.display.getMousePos(event)
      const worldPos = $app.pages.displayToWorld($getters.currentPage, displayPos)

      $app.notes.create(worldPos)
    },

  },

}
</script>

<style>

</style>