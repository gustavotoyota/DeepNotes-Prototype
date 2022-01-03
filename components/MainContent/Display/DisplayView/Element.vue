<template>

  <Note v-if="this.elem.type === 'note'" :elem="elem" :parent-width="parentWidth"/>
  <Container v-else-if="this.elem.type === 'container'" :elem="elem" :parent-width="parentWidth"/>
  <Arrow v-else-if="this.elem.type === 'arrow'" :elem="elem" :parent-width="parentWidth"/>
    
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    parentWidth: { },
  },

}
</script>

<style scoped>
</style>