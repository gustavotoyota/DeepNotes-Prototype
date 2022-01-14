<template>

  <Note v-if="elem.type === 'note'"
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