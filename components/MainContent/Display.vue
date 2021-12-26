<template>

  <div id="display"
  :style="`height: 100%;
  position: relative;
  overflow: hidden`"
  @mousewheel="onMouseWheel"
  @pointerdown="onPointerDown">

    <Background/>
    <Viewbox/>
    <BoxSelection/>

  </div>

</template>

<script>
export default {

  methods: {

    onMouseWheel(event) {
      $app.zooming.perform(event)
    },

    onPointerDown(event) {
      $app.panning.start(event)
    },

  },

  watch: {

    '$getters.currentPage.camera.zoom'() {
      $app.tooltips.fix()
    },

  },

}
</script>

<style>

</style>