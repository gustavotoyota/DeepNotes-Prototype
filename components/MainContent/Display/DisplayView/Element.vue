<template>

  <Note v-if="elem.type === 'note'" :elem="elem" :root-width="rootWidth"/>
  <Container v-else-if="elem.type === 'container'" :elem="elem" :root-width="rootWidth"/>
  <Arrow v-else-if="elem.type === 'arrow'" :elem="elem" :root-width="rootWidth"/>
    
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    rootWidth: { },
  },

}
</script>

<style scoped>
</style>