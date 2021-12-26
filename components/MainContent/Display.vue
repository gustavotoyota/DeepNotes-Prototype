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

    '$getters.currentPage.camera.zoom'(value) {
      if (!$getters.activeElem)
        return

      const tooltips = document.querySelectorAll(`#elem-${$getters.activeElem.id} .ql-tooltip`)
      if (tooltips.length === 0)
        return
      
      for (const tooltip of tooltips)
        tooltip.style.transform = `scale(${1 / value})`
    },

  },

}
</script>

<style>

</style>