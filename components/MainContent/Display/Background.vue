<template>

  <div style="position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background-color: #1e1e1e"
  @pointerdown.left="onPointerDown"
  @dblclick.left="$app.popup.show($event)">
  </div>

</template>

<script>
export default {

  methods: {

    onPointerDown(event) {
      $app.editing.stop()

      if (!event.ctrlKey && !event.shiftKey)
        $app.selection.clear(null)

      $app.boxSelection.start(event)
    },

  },

}
</script>

<style scoped>

</style>