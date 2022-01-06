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



  mounted() {
    this.updateDisplayRect()
  },



  data() {
    return {
      displayRect: {
        pos: { x: 0, y: 0 },
        size: { x: 0, y: 0 },
      },
    }
  },



  methods: {
    
    updateDisplayRect() {
      this.$nextTick(() => {
        const clientRect = $app.elems.getClientRect(this.elem)

        this.displayRect = {
          pos: $app.coords.clientToDisplay(clientRect),
          size: { x: clientRect.width, y: clientRect.height },
        }
      })
    },

  },



  watch: {

    '$getters.page.camera': {
      deep: true,

      handler() {
        this.updateDisplayRect()
      },
    },
    elem: {
      deep: true,

      handler() {
        this.updateDisplayRect()
      },
    },

  },

}
</script>

<style>

</style>