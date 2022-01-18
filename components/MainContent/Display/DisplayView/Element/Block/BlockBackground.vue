<template>

  <v-sheet class="block-background"
  elevation="6"
  :style="{
    'cursor': (elem.linkedPageId == null || selected) ? null : 'pointer',
    'background-color': color,
  }"
  @pointerdown.left.stop="onPointerDown"
  @click.left.stop="onClick">

    <slot/>

  </v-sheet>
  
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    selected: { type: Boolean },
    color: { type: String },
  },




  methods: {

    onPointerDown(event) {
      // Stop selecting element on scrollbar click

      if (event.target.scrollWidth > event.target.clientWidth
      && event.offsetY > event.target.clientHeight) 
        return

      if (event.target.scrollHeight > event.target.clientHeight
      && event.offsetX > event.target.clientWidth)
        return

      


      if (event.target.style.opacity === '0.8')
        return

      if (!$app.activeElem.is(this.elem))
        $app.editing.stop()

      if (this.elem.linkedPageId != null
      && !event.ctrlKey
      && !event.altKey
      && !event.shiftKey
      && !this.selected)
        return

      $app.clickSelection.perform(this.elem, event)

      if ($app.selection.has(this.elem)
      && !$getters.editing)
        $app.dragging.start(event, this.elem)
    },

    onClick(event) {
      if (this.elem.linkedPageId == null
      || event.ctrlKey || event.shiftKey || this.selected)
        return

      $app.pages.navigate(this.elem.linkedPageId)
    },

  },

}
</script>

<style scoped>
.block-background {
  border-radius: 7px;
  border: 1px solid #212121;
  border-left-color: #757575;
  border-top-color: #757575;

  height: 100%;

  overflow: hidden;
}
</style>