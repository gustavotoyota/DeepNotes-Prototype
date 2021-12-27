<template>

  <Note v-if="this.elem.type === 'note'" :elem="elem"/>
  <Container v-else-if="this.elem.type === 'container'" :elem="elem"/>
  <Arrow v-else-if="this.elem.type === 'arrow'" :elem="elem"/>
    
</template>

<script>
export default {

  props: {
    elem: { type: Object },
  },

}
</script>

<style scoped>
</style>