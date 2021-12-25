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
      $getters.currentPage.elems.editing = false

      if (event.button === 0 && !event.ctrlKey)
        $app.selection.clear()

      $app.boxSelection.start(event)
    },

    onDoubleClick(event) {
      $app.creation.perform(event)
    },

  },

}
</script>

<style>

</style>