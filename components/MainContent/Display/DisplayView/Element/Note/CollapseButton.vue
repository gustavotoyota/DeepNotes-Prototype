<template>
  
  <div v-if="elem.collapsible && topSection === section"
  style="flex: none /* Button is horizontally inflexible */">

    <v-btn plain tile
    style="min-width: 0 /* Allows reducing collapse button width */;
    width: 32px /* Reduces collapse button width to 32px */"
    :style="`height: ${numSections === 1 ? '38.45px' : '100%'}`"
    @pointerdown.left.stop
    @click.left.stop="$app.collapsing.toggleCollapsed(elem)"
    @dblclick.left.stop>

      <v-icon v-if="elem.collapsed">mdi-chevron-down</v-icon>
      <v-icon v-else>mdi-chevron-up</v-icon>

    </v-btn>

  </div>

</template>

<script>
export default {
  
  props: {
    elem: { type: Object },

    section: { type: String },
  },



  
  computed: {

    topSection() {
      return $app.elems.getTopSection(this.elem)
    },

    numSections() {
      return $app.elems.getNumSections(this.elem)
    },

  },

}
</script>

<style>

</style>