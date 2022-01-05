<template>
  
  <div v-if="elem.resizable"
  style="position: absolute"
  :style="`left: ${displayRect.pos.x}px; top: ${displayRect.pos.y}px;
  width: ${displayRect.size.x}px; height: ${displayRect.size.y}px`">

    <Handle :elem="elem" side="s"/>

    <div v-if="elem.parentId == null">
      <Handle :elem="elem" side="nw"/>
      <Handle :elem="elem" side="n"/>
      <Handle :elem="elem" side="ne"/>
      <Handle :elem="elem" side="w"/>
      <Handle :elem="elem" side="e"/>
      <Handle :elem="elem" side="sw"/>
      <Handle :elem="elem" side="se"/>
    </div>

  </div>

</template>

<script>
export default {

  props: {
    elem: { type: Object },
  },



  computed: {
    
    displayRect() {
      // Dependencies

      $getters.page.camera.pos.x
      $getters.page.camera.pos.y
      $getters.page.camera.zoom

      this.elem.parentId
      
      this.elem.pos.x; this.elem.pos.y

      this.elem.anchor.x; this.elem.anchor.y

      this.elem.size.x; this.elem.size.y
      this.elem.collapsedSize.x; this.elem.collapsedSize.y
      
      this.elem.collapsible
      this.elem.collapsed
      
      this.elem.resizable

      this.elem.hasTitle; this.elem.hasBody
      this.elem.title; this.elem.body

      

      const clientRect = $app.elems.getClientRect(this.elem)

      return {
        pos: $app.coords.clientToDisplay(clientRect),
        size: { x: clientRect.width, y: clientRect.height },
      }
    },

  },

}
</script>

<style>

</style>