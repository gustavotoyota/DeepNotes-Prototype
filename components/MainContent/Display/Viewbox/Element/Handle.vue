<template>
  
  <div :style="`position: absolute;
  background-color: #2196F3;
  pointer-events: auto;
  cursor: ${side}-resize;
  border-radius: 999px;
  width: 10px; height: 10px;
  transform: translate(-50%, -50%) ` +
  `scale(${1 / $getters.currentPage.camera.zoom})`"
  @pointerdown.stop="onPointerDown">
  </div>
  
</template>

<script>
export default {

  props: {
    side: { type: String },
  },


  methods: {

    onPointerDown(event) {
      $app.resizing.start(event, this.side)
    },

  },

}
</script>

<style>

</style>