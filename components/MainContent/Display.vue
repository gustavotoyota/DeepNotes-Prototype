<template>

  <div id="display"
  :style="`height: 100%;
  overflow: hidden`"
  @wheel="onWheel"
  @pointerdown="onPointerDown">

    <Background/>
    <DisplayView/>
    <HandlesView/>
    <BoxSelection/>
    <DisplayButtons/>

  </div>

</template>

<script>
export default {

  methods: {

    onWheel(event) {
      $app.zooming.perform(event)
    },

    onPointerDown(event) {
      $app.panning.start(event)
    },

  },

}
</script>

<style scoped>

</style>