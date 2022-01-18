<template>
  
  <div v-if="elem.collapsible && topSection === section"
  style="flex: none">

    <v-btn plain tile
    class="block-collapse-button"
    :style="{ 'height': numSections === 1 ? '38.45px' : '100%' }"
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

<style scoped>
.block-collapse-button {
  min-width: 0;
  width: 32px;
}
</style>