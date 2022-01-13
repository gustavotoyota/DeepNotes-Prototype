<template>
  
  <div style="position: absolute;
  background-color: #2196F3;
  pointer-events: auto;
  border-radius: 999px;
  width: 10px; height: 10px;
  transform: translate(-50%, -50%)"
  :style="`left: ${left}%; top: ${top}%;
  cursor: ${side}-resize; ` +
  ($state.dragging.active ? `pointer-events: none; opacity: 0.7` : ``)"
  @pointerdown.left.stop="onPointerDown">
  </div>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    side: { type: String },
  },



  methods: {

    onPointerDown(event) {
      $app.resizing.start(event, this.elem, this.side)
    },

  },



  computed: {

    left() {
      if (this.side.includes('w'))
        return 0
      else if (this.side.includes('e'))
        return 100
      else
        return 50
    },

    top() {
      if (this.side.includes('n'))
        return 0
      else if (this.side.includes('s'))
        return 100
      else
        return 50
    },
    
  },

}
</script>

<style scoped>

</style>