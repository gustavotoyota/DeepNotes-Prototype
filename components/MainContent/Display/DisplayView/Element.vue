<template>

  <Block v-if="elem.type === 'block'"
  :elem="elem" :target-width="targetWidth"/>
  
  <Arrow v-else-if="elem.type === 'arrow'"
  :elem="elem"/>
    
</template>

<script>
export default {

  props: {
    elem: { type: Object },
    
    targetWidth: { type: String },
  },

}
</script>

<style scoped>
</style>