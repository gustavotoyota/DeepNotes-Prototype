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
      $app.editing.stop()

      if (event.button === 0 && !event.ctrlKey && !event.shiftKey)
        $app.selection.clear()

      $app.boxSelection.start(event)
    },

    onDoubleClick(event) {
      $app.popup.show(event)

      // const clientPos = $app.coords.getClientPos(event)

      // $app.notes.create(clientPos)
    },

  },

}
</script>

<style scoped>

</style>