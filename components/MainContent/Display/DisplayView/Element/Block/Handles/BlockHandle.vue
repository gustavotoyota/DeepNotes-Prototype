<template>
  
  <div class="block-handle"
  :style="{
    'left': left,
    'top': top,
    'cursor': `${side}-resize`,
    'pointer-events': $state.dragging.active ? 'none' : 'auto',
    'opacity': $state.dragging.active ? '0.7' : null,
  }"
  @pointerdown.left.stop="onPointerDown">
  </div>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    side: { type: String },
    section: { type: String },
  },



  methods: {

    onPointerDown(event) {
      $app.resizing.start(event, this.elem, this.side, this.section)
    },

  },



  computed: {

    left() {
      if (this.side.includes('w'))
        return '0%'
      else if (this.side.includes('e'))
        return '100%'
      else
        return '50%'
    },

    top() {
      if (this.side.includes('n'))
        return '0%'
      else if (this.side.includes('s'))
        return '100%'
      else
        return '50%'
    },
    
  },

}
</script>

<style scoped>
.block-handle {
  position: absolute;

  border-radius: 999px;
  width: 10px; height: 10px;
  transform: translate(-50%, -50%);

  background-color: #2196F3;
  pointer-events: auto;
  z-index: 1;
}
</style>