<template>

  <!-- Centralizer -->
  <div style="position: absolute; left: 50%; top: 50%">

    <!-- Viewbox -->
    <div :style="`width: 0; height: 0; position: relative;
    transform: scale(${page.camera.zoom}) ` +
    `translate(${-page.camera.pos.x}px, ${-page.camera.pos.y}px)`">
      
      <Element
      v-for="elem in page.elems.list" :key="elem.id"
      :elem="elem"/>

    </div>

  </div>
  
</template>

<script>
export default {

  computed: {

    page() {
      return $getters.currentPage
    },

  },

}
</script>

<style scoped>

</style>